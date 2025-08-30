const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const { log } = require('console');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'Admin123'
});

let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
  ];
};
//count route
app.get("/", (req, res) => {
  let q = "SELECT count(*)FROM user;"
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      console.log(result[0]["count(*)"]);
      res.render("home.ejs", { count });
    })
  } catch (err) {
    console.log(err);
    res.send("error in database");
  }
})
//show route
app.get("/user", (req, res) => {
  let q = "SELECT * FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.render("showuser.ejs", { result });
    })
  } catch (err) {
    console.log(err);
    res.send("error in database");
  }
})

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id ='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.render("edit.ejs",{result});
    })
  } catch (err) {
    console.log(err);
    res.send("error in database");
  }
})

app.listen("8080", () => {
  console.log("Listening to 8080");
})