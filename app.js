const express = require('express')
const ip = require('ip')
const mysql = require('./database')();

const app = express()
const port = 3000

const connection = mysql.init();
mysql.db_open(connection);



app.get('/', (req, res) => {
  connection.query('SELECT * FROM USER',
    function (error, results, fields) {
      if (error) {
        res.send(error);
      }
      // return current server ip address
      res.send(`Hello World! (ip: ${ip.address()})`);
    });
})

app.get('/name', (req, res) => {
  connection.query('SELECT * FROM USER',
    function (error, results, fields) {
      if (error) {
        res.send(error);
      }
      // send query result as json
      res.json(results);
    });
})

// get name and insert into mysql
app.get('/name/:name', (req, res) => {
  const name = req.params.name;
  connection.query(`INSERT INTO USER (name) VALUES ('${name}')`,

    function (error, results, fields) {
      if (error) {
        res.send(error);
      }

      // send query result as json
      res.send('success');
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})