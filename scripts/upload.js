const Ftp = require('./jsftp-utils')

const HOST = 'host'
const USERNAME = 'username'
const PASSWORD = 'password'
const PORT = 22

const ftp = new Ftp()

ftp.connect({
  host: HOST,
  username: USERNAME,
  password: PASSWORD,
  port: PORT
}).then(async() => {
  await ftp.remove('/home/www/maikro/', ['src', 'package.json', 'pm2.json'])
  await ftp.uploadDir('dist', '/home/www/maikro/')
  ftp.end()
}).catch((err) => {
  console.log(err)
})
