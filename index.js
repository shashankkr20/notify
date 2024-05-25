const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const path=require("path")
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname+"/public")))
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
db.connect((err) => {
  if (err) {
    console.log(process.env.MYSQL_HOST+
      process.env.MYSQL_PORT
      +process.env.MYSQL_USER
      +process.env.MYSQL_PASSWORD
      +process.env.MYSQL_DB)
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});

app.post("/putdel", (req, res) => {
  const title = req.body.title;
  const uname = req.body.uname;
  const content = req.body.content;
  const date=req.body.date;
  db.query(
    "INSERT INTO delmsg (deltitle, deluname, delcontent,deldate) VALUES (?,?,?,?)",
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
// app.get("/test",(req,res)=>{
// console.log(req.body.title);
// res.send(req.body.title);
// })
app.post("/addnote", (req, res) => {
  const title = req.body.title;
  const uname = req.body.uname;
  const content = req.body.content;
  const date=req.body.date;
  console.log(req.body)
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
app.post("/rdelete", (req, res) => {
  const id = req.body.titval;
  const uname=req.body.uname;
  db.query("DELETE FROM delmsg WHERE deltitle = ? AND deluname=?", [id,uname], (err, result) => {
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
app.post("/rdeletemul", (req, res) => {
  const id = req.body.element;
  const uname=req.body.uname;
  db.query("DELETE FROM delmsg WHERE deltitle = ? AND deluname=?", [id,uname], (err, result) => {
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
  console.log(uname);
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
app.post("/fetchddata", (req, res) => {
  const uname = req.body.uname;
  db.query(
    `SELECT * FROM delmsg WHERE deluname="${uname}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})

app.post("/fetchredata", (req, res) => {
  const uname = req.body.uname;
  db.query(
    `SELECT * FROM archmsg WHERE archuname="${uname}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})

app.post("/redeletemul", (req, res) => {
  const id = req.body.element;
  const uname=req.body.uname;
  db.query("DELETE FROM archmsg WHERE archtitle = ? AND archuname=?", [id,uname], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/redelete", (req, res) => {
  const id = req.body.titval;
  const uname=req.body.uname;
  db.query("DELETE FROM archmsg WHERE archtitle = ? AND archuname=?", [id,uname], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});


app.post("/readd", (req, res) => {
  const title = req.body.title;
  const uname = req.body.uname;
  const content = req.body.content;
  const date=req.body.date;
  db.query(
    "INSERT INTO archmsg (archtitle, archuname, archcontent,archdate) VALUES (?,?,?,?)",
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

app.post("/searchdata", (req, res) => {
  const uname = req.body.uname;
  const title=req.body.title;
  const value="%"+title+"%"
  db.query(
    `SELECT * FROM msg WHERE title like (?) and uname="${uname}"`,[value],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})
app.post("/searchdel", (req, res) => {
  const uname = req.body.uname;
  const title=req.body.title;
  const value="%"+title+"%"
  db.query(
    `SELECT * FROM delmsg WHERE deltitle like (?) and deluname="${uname}"`,[value],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})
app.post("/searcharch", (req, res) => {
  const uname = req.body.uname;
  const title=req.body.title;
  const value="%"+title+"%"
  db.query(
    `SELECT * FROM archmsg WHERE archtitle like (?) and archuname="${uname}"`,[value],
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
