/*
 * Anand Biehl
 * 101007500
 * Lab Exercise 5
 */

const fs = require('node:fs/promises')
const express = require('express');
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile('./home.html', {root: __dirname});
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.sendFile(__dirname + "/user.json")
});

router.get('/login/:uname/:passwd', async (req,res) => {
  
  const json = await fs.open(__dirname + "/user.json", 'r')
  const obj = JSON.parse(await json.readFile())
  let retObj = {}

  if (obj.username === req.params.uname &&
      obj.password === req.params.passwd) {
    retObj = {
      status: true,
      message: "User Is Valid!"
    }
  } else if (obj.username === req.params.uname &&
             obj.password !== req.params.passwd) {
    retObj = {
      status: false,
      message: "Password is invalid"
    }
  } else {
    retObj = {
      status: false,
      message: "Username is invalid"
    }
  }

  res.json(retObj)

});

router.get('/logout/:uname', (req,res) => {
  res.send(`<b>${req.params.uname} successfully logged out.</b>`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));
