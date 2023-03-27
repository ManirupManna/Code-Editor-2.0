require("dotenv").config();
const express = require("express");
const port = process.env.DEV_PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { exec } = require("child_process");
const { urlencoded } = require("express");
app.set("view engine", ejs);
app.use(express.static("views/"));
const templatePath = path.join(__dirname, "/templates/");
const programFilePath = path.join(__dirname, "/");
// console.log(programFilePath);
app.get("/", (req, res) => {
  res.redirect("/java");
});
app.get("/java", (req, res) => {
  fs.readFile(templatePath + "Java.java", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else
      res.render("index.ejs", {
        code: data,
        langlist: ["Python", "C", "CPP"],
        lang: "Java",
      });
  });
});
app.get("/python", (req, res) => {
  fs.readFile(templatePath + "Main.py", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else
      res.render("index.ejs", {
        code: data,
        langlist: ["Java", "C", "CPP"],
        lang: "Python",
      });
  });
});

app.get("/c", (req, res) => {
  fs.readFile(templatePath + "Main.c", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else
      res.render("index.ejs", {
        code: data,
        langlist: ["Java", "Python", "CPP"],
        lang: "C",
      });
  });
});

app.get("/cpp", (req, res) => {
  fs.readFile(templatePath + "Main.cpp", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else
      res.render("index.ejs", {
        code: data,
        langlist: ["Java", "Python", "C"],
        lang: "CPP",
      });
  });
});

// app.post("/run", (req, res) => {
//   console.log(req.body);
//   res.send(req.body);
// });
app.post("/run", (req, res) => {
  console.log(req.body);
  const { lang, code, input } = req.body;
  console.log(lang, code, input);
  // res.send(lang, code, input);
  fs.writeFile(programFilePath + "input.txt", input, (err) => {
    if (err) {
      res.send("ERR: couldn't write in input file");
    } else {
      switch (lang) {
        case "python": {
          fs.writeFile(programFilePath + "Python.py", code, (err) => {
            if (err) res.send("ERR: couldn't write in python file");
            else {
              // res.send("Written in python file");
              //Execute python code
              runCode(lang, res);
            }
          });
          break;
        }
        case "java": {
          fs.writeFile(programFilePath + "Java.java", code, (err) => {
            if (err) res.send("ERR: couldn't write in java file");
            else {
              //Execute java code
              // res.send("Written in java file");
              runCode(lang, res);
            }
          });
          break;
        }
        case "cpp": {
          fs.writeFile(programFilePath + "Cpp.cpp", code, (err) => {
            if (err) res.send("ERR: couldn't write in CPP file");
            else {
              //Execute CPP code
              // res.send("Written in cpp file");
              runCode(lang, res);
            }
          });
          break;
        }
        case "c": {
          fs.writeFile(programFilePath + "C.c", code, (err) => {
            if (err) res.send("ERR: couldn't write in C file");
            else {
              //Execute C code
              // res.send("Written in c file");
              runCode(lang, res);
            }
          });
          break;
        }
        default: {
          res.send("Programming language not found");
        }
      }
    }
  });
});

const runCode = (lang, res) => {
  fs.writeFile(programFilePath + "output.txt", "", (err) => {
    if (err) res.send("ERR: can't modify output.txt");
    else {
      exec(`sh shell.sh ${lang}`, (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          res.send("ERR: can't execute program");
        } else {
          res.sendFile(__dirname + "/output.txt");
        }
      });
    }
  });
};

app.listen(port, (err) => {
  let starterMSG = err
    ? "Error in starting server"
    : `Server started at http://localhost:${port}`;
});
