const fs = require('fs')
const git = require('isomorphic-git')
const dir = process.cwd()

async function main() {
  // Check if .git exists
  console.log('.git exists:', fs.existsSync('.git'))
  
  // Check HEAD
  const headPath = '.git/HEAD'
  if (fs.existsSync(headPath)) {
    console.log('HEAD:', fs.readFileSync(headPath, 'utf-8').trim())
  }

  // Check branches
  const branches = await git.listBranches({ fs, dir })
  console.log('本地分支:', branches.join(', '))

  // Check remotes
  const remotes = await git.listRemotes({ fs, dir })
  console.log('远程仓库:', JSON.stringify(remotes, null, 2))

  // Check remote refs
  const refsDir = '.git/refs/remotes/origin'
  if (fs.existsSync(refsDir)) {
    const refs = fs.readdirSync(refsDir)
    refs.forEach(ref => {
      const val = fs.readFileSync(refsDir + '/' + ref, 'utf-8').trim()
      console.log(`  origin/${ref}: ${val}`)
    })
  } else {
    console.log('  没有远程 refs (推送后会自动拉取)')
  }

  // Check log
  const log = await git.log({ fs, dir, depth: 1 })
  if (log.length > 0) {
    console.log('最新提交:', log[0].oid.slice(0, 8), log[0].commit.message.split('\n')[0])
  }
}

main().catch(e => console.error('错误:', e.message))
