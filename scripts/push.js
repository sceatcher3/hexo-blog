/**
 * 使用 isomorphic-git 初始化仓库并推送到 GitHub
 * 使用方法:
 *   1. 设置环境变量 GITHUB_TOKEN
 *   2. node scripts/push.js
 *
 * 如果未设置 GITHUB_TOKEN，会尝试从命令行参数读取:
 *   node scripts/push.js YOUR_GITHUB_TOKEN
 */

const fs = require('fs')
const path = require('path')
const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')

const REPO_DIR = path.resolve(__dirname, '..')
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.argv[2]
const REMOTE_URL = 'https://github.com/sceatcher3/hexo-blog.git'
const BRANCH = 'main'

async function main() {
  if (!GITHUB_TOKEN) {
    console.error('错误: 需要 GitHub 个人访问令牌 (token)')
    console.error('  方式1: set GITHUB_TOKEN=你的token')
    console.error('  方式2: node scripts/push.js 你的token')
    console.error('')
    console.error('如何创建 token: https://github.com/settings/tokens')
    console.error('  勾选 repo (Full control) 权限')
    process.exit(1)
  }

  const auth = {
    username: 'sceatcher3',
    password: GITHUB_TOKEN,
  }

  // 检查 .git 是否已存在
  const gitDir = path.join(REPO_DIR, '.git')
  const isRepo = fs.existsSync(gitDir)

  if (!isRepo) {
    console.log('1/6 初始化 git 仓库...')
    await git.init({ fs, dir: REPO_DIR, defaultBranch: BRANCH })
  } else {
    console.log('1/6 git 仓库已存在，跳过初始化')
  }

  // 读取 .gitignore，没有则创建
  const gitignorePath = path.join(REPO_DIR, '.gitignore')
  if (!fs.existsSync(gitignorePath)) {
    console.log('创建 .gitignore...')
    fs.writeFileSync(gitignorePath, [
      'node_modules/',
      '.DS_Store',
      'Thumbs.db',
      'public/',
      'db.json',
      '*.log',
      '.deploy*/',
    ].join('\n') + '\n')
  }

  // 获取所有要追踪的文件
  console.log('2/6 扫描文件...')
  const files = await walkDir(REPO_DIR)

  // 按 .gitignore 规则过滤
  const ignoredPatterns = getIgnoredPatterns(gitignorePath)
  const trackedFiles = files.filter(f => {
    const relPath = path.relative(REPO_DIR, f).replace(/\\/g, '/')
    // 排除 .git 目录
    if (relPath.startsWith('.git/') || relPath === '.git') return false
    // 排除 node_modules
    if (relPath.startsWith('node_modules/')) return false
    // 检查 .gitignore 规则
    return !ignoredPatterns.some(p => relPath === p || relPath.startsWith(p + '/'))
  })

  console.log(`3/6 添加 ${trackedFiles.length} 个文件到暂存区...`)
  
  for (const file of trackedFiles) {
    const relPath = path.relative(REPO_DIR, file).replace(/\\/g, '/')
    try {
      await git.add({ fs, dir: REPO_DIR, filepath: relPath })
    } catch (err) {
      // 跳过二进制文件或无法读取的文件
      console.error(`  跳过 ${relPath}: ${err.message}`)
    }
  }

  // 检查是否有变更
  console.log('4/6 创建提交...')
  const statusMatrix = await git.statusMatrix({ fs, dir: REPO_DIR })
  const hasChanges = statusMatrix.some(row => {
    const [, head, workdir, stage] = row
    // head=0 means new file, head!==workdir means modified
    // head 1=exists, 2=modified, 3=deleted
    return head !== 1 || workdir !== 1 || stage !== 1
  })

  if (!hasChanges && isRepo) {
    console.log('  没有新的变更，跳过提交')
  } else {
    await git.commit({
      fs,
      dir: REPO_DIR,
      message: '禁用评论功能，按官方文档优化配置',
      author: {
        name: 'sceatcher3',
        email: 'sceatcher3@users.noreply.github.com',
      },
    })
    console.log('  提交成功')
  }

  // 添加远程仓库
  console.log('5/6 配置远程仓库...')
  const remotes = await git.listRemotes({ fs, dir: REPO_DIR })
  const hasRemote = remotes.some(r => r.remote === 'origin')
  
  if (hasRemote) {
    await git.deleteRemote({ fs, dir: REPO_DIR, remote: 'origin' })
  }
  await git.addRemote({ fs, dir: REPO_DIR, remote: 'origin', url: REMOTE_URL })

  // 推送
  console.log('6/6 推送到 GitHub...')
  try {
    const pushResult = await git.push({
      fs,
      dir: REPO_DIR,
      http,
      remote: 'origin',
      ref: BRANCH,
      onAuth: () => auth,
      force: false,
    })
    
    if (pushResult.ok && pushResult.ok.length > 0) {
      console.log(`\n✓ 推送成功! 分支: ${BRANCH}`)
      console.log(`  仓库: ${REMOTE_URL}`)
    } else if (pushResult.errors) {
      console.error('\n✗ 推送失败:')
      pushResult.errors.forEach(e => console.error(`  ${e}`))
      process.exit(1)
    } else {
      console.log('\n✓ 推送完成 (可能无变更)')
    }
  } catch (err) {
    console.error(`\n✗ 推送失败: ${err.message}`)
    if (err.message.includes('401') || err.message.includes('403')) {
      console.error('\n认证失败，请检查 GitHub Token 是否有效')
      console.error('创建 token: https://github.com/settings/tokens')
      console.error('需要勾选 repo 权限')
    } else if (err.message.includes('404')) {
      console.error('\n远程仓库不存在，请先在 GitHub 上创建:')
      console.error('  https://github.com/new')
      console.error('  仓库名: hexo-blog')
    }
    process.exit(1)
  }
}

// 递归遍历目录
async function walkDir(dir) {
  const results = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      // 跳过 .git 和 node_modules
      if (entry.name === '.git' || entry.name === 'node_modules') continue
      const subResults = await walkDir(fullPath)
      results.push(...subResults)
    } else {
      results.push(fullPath)
    }
  }
  return results
}

// 解析简单的 .gitignore 规则
function getIgnoredPatterns(gitignorePath) {
  if (!fs.existsSync(gitignorePath)) return []
  const lines = fs.readFileSync(gitignorePath, 'utf-8').split('\n')
  return lines
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'))
    .map(l => l.endsWith('/') ? l.slice(0, -1) : l)
    .map(l => l.replace(/\\/g, '/'))
}

main().catch(err => {
  console.error('脚本异常:', err)
  process.exit(1)
})
