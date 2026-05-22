const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const fs = require('fs')
const dir = process.cwd()

const token = process.argv[2]
if (!token) {
  console.error('用法: node scripts/force-push.js YOUR_TOKEN')
  process.exit(1)
}

async function main() {
  const pushResult = await git.push({
    fs, dir, http,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({ username: 'sceatcher3', password: token }),
    force: true,
  })

  if (pushResult.ok && pushResult.ok.length > 0) {
    console.log('✓ 推送成功: ' + pushResult.ok.join(', '))
    console.log('  分支: main -> https://github.com/sceatcher3/hexo-blog.git')
  } else if (pushResult.errors) {
    console.error('✗ 推送失败:')
    pushResult.errors.forEach(e => console.error('  ' + e))
    process.exit(1)
  } else {
    console.log('✓ 推送完成 (远程已是最新)')
  }
}

main().catch(e => {
  console.error('✗ 错误: ' + e.message)
  process.exit(1)
})
