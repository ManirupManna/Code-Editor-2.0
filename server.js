//This is the main file now
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
  const id = `${Date.now()}`;
  const programfile = `Main_${id}`;
  const inputfile = `input${id}.txt`;
  const outputfile = `output${id}.txt`;
  const programStructure = {
    lang,
    programfile,
    inputfile,
    outputfile,
  };
  console.log("program structure", programStructure);
  fs.writeFile(programFilePath + inputfile, input, (err) => {
    if (err) {
      res.json({
        output: "",
        err: "",
        executionStatus: false,
        serverError: "ERR: couldn't write in input file",
      });
      return;
    }
    fs.writeFile(programFilePath + outputfile, "", (err) => {
      if (err) {
        res.json({
          output: "",
          err: "",
          executionStatus: false,
          serverError: "ERR: couldn't write in output file",
        });

        return;
      }

      switch (lang) {
        case "python": {
          fs.writeFile(programFilePath + `${programfile}.py`, code, (err) => {
            if (err) {
              res.json({
                output: "",
                err: "",
                executionStatus: false,
                serverError: "ERR: couldn't write in python file",
              });
              return;
            }
            // res.send("Written in python file");
            //Execute python code
            programStructure.langCode = "py";
            runCode(programStructure, res);
          });
          break;
        }
        case "java": {
          fs.writeFile(
            programFilePath + `${programfile}.java`,
            code.replace("Java", programfile),
            (err) => {
              if (err) {
                res.json({
                  output: "",
                  err: "",
                  executionStatus: false,
                  serverError: "ERR: couldn't write in Java file",
                });
                return;
              }
              //Execute java code
              // res.send("Written in java file");
              programStructure.langCode = "java";
              runCode(programStructure, res);
            }
          );
          break;
        }
        case "cpp": {
          fs.writeFile(programFilePath + `${programfile}.cpp`, code, (err) => {
            if (err) res.send("ERR: couldn't write in CPP file");
            else {
              //Execute CPP code
              // res.send("Written in cpp file");
              programStructure.langCode = "cpp";
              runCode(programStructure, res);
            }
          });
          break;
        }
        case "c": {
          fs.writeFile(programFilePath + `${programfile}.c`, code, (err) => {
            if (err) res.send("ERR: couldn't write in C file");
            else {
              //Execute C code
              // res.send("Written in c file");
              programStructure.langCode = "c";
              runCode(programStructure, res);
            }
          });
          break;
        }
        default: {
          res.send("Programming language not found");
        }
      }
    });
  });
});

const runCode = (programStructure, res) => {
  const { lang, programfile, inputfile, outputfile, langCode } =
    programStructure;
  exec(
    `sh shell.sh ${lang} ${programfile} ${inputfile} ${outputfile}`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        res.send("ERR: can't execute program");
      } else {
        fs.readFile(__dirname + `/${outputfile}`, (err, data) => {
          if (err) {
            res.json({
              output: "",
              err: "",
              executionStatus: false,
              serverError: "ERR: couldn't read the output file",
            });
          } else {
            fs.unlink(outputfile, (err) => {
              if (err) console.log("couldn't delete output file");
              res.json({
                output: data.toString(),
                err: "",
                executionStatus: true,
                serverError: "",
              });
            });
          }
        });
      }
    }
  );
};

app.listen(port, (err) => {
  let starterMSG = err
    ? "Error in starting server"
    : `Server started at http://localhost:${port}`;
});
