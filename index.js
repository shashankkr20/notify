const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path=require("path")

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname+"/public")))
const db = mysql.createConnection({
  host: 'containers-us-west-135.railway.app',
  port: '6251',
  user: 'root',
  password: 'rIKjp6Jje5yismcrUApm',
  database: 'railway'
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const uname = req.body.uname;
  const pass = req.body.pass;

  db.query(
    "INSERT INTO user (name, username, email, password) VALUES (?,?,?,?)",
    [name, uname, email, pass],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.post("/addnote", (req, res) => {
  const title = req.body.title;
  const uname = req.body.uname;
  const content = req.body.content;
  const date=req.body.date;
  db.query(
    "INSERT INTO msg (title, uname, content,date) VALUES (?,?,?,?)",
    [title, uname, content,date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.post("/delete", (req, res) => {
  const id = req.body.titval;
  const uname=req.body.uname;
  db.query("DELETE FROM msg WHERE title = ? AND uname=?", [id,uname], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/deletemul", (req, res) => {
  const id = req.body.element;
  const uname=req.body.uname;
  db.query("DELETE FROM msg WHERE title = ? AND uname=?", [id,uname], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});
app.put("/updatenote", (req, res) => {
  const oldtitle = req.body.title;
  const uname = req.body.uname;
  const newtitle=req.body.newtitle;
  const content=req.body.content;
  const date=req.body.date;
  console.log(oldtitle,uname,newtitle,content,date)
  // //`UPDATE msg SET title = ${newtitle},content= ${content},date=${date} WHERE uname = ${uname} and title=${oldtitle}`
  db.query(
    "UPDATE msg SET title = ?,content= ?,date=? WHERE uname = ? AND title=?",
    [newtitle,content,date,uname,oldtitle],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result)
      }
    }
  );
});
app.post("/validate", (req, res) => {
  const uname = req.body.uname;
  const pass = req.body.pass;
  db.query(
    `SELECT * FROM user WHERE username="${uname}" and password="${pass}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})
app.post("/fetchdata", (req, res) => {
  const uname = req.body.uname;
  db.query(
    `SELECT * FROM msg WHERE uname="${uname}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
