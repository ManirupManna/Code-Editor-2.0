require("dotenv").config();
const express = require("express");
const port = process.env.DEV_PORT||3000;
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json());
const fs = require("fs");
const path = require("path")
const ejs = require("ejs");
const exec = require("child_process");
const { urlencoded } = require("express");
app.set("view engine", ejs);
app.use(express.static("views/"))
const templatePath = path.join(__dirname, "/templates/");
const programFilePath = path.join(__dirname, "/program\ files/");
// console.log(programFilePath);
app.get("/", (req, res)=>{
    res.redirect("/java");
})
app.get("/java", (req, res)=>{
    fs.readFile(templatePath+"Main.java", "utf-8", (err, data)=>{
        if(err)
        {
            console.log(err);
            res.send("error")
        }
        else
            res.render("index.ejs", {code:data, langlist:["java","python", "c", "cpp"], lang:"java"});
    })
})
app.get("/python", (req, res)=>{
    fs.readFile(templatePath+"Main.py", "utf-8", (err, data)=>{
        if(err)
        {
            console.log(err);
            res.send("error")
        }
        else
            res.render("index.ejs",{code:data, langlist:["java","python", "c", "cpp"], lang:"python"});
    })
})

app.get("/c", (req, res)=>{
    fs.readFile(templatePath+"Main.c", "utf-8", (err, data)=>{
        if(err)
        {
            console.log(err);
            res.send("error")
        }
        else
            res.render("index.ejs", {code:data, langlist:["java","python", "c", "cpp"], lang:"c"});
    })
})

app.get("/cpp", (req, res)=>{
    fs.readFile(templatePath+"Main.cpp", "utf-8", (err, data)=>{
        if(err)
        {
            console.log(err);
            res.send("error")
        }
        else
            res.render("index.ejs", {code:data, langlist:["java","python", "c", "cpp"], lang:"cpp"});
    })
})

app.post("/run", (req, res)=>{
    console.log(req.body);
    const {lang, code, input} = req.body;
    console.log(lang, code, input);
    // res.send(lang, code, input);
    fs.writeFile(programFilePath+"/input.txt", input, (err)=>{
        if(err)
        {
            res.send("ERR: couldn't write in input file");
        }
        else
        {
            switch(lang)
            {
                case  "python" :{
                    fs.writeFile(programFilePath+"/Main.py", code, (err)=>{
                        if(err)
                            res.send("ERR: couldn't write in python file");
                        else
                        {
                            res.send("Written in python file");
                            //Execute python code
                        }
                    })
                    break;
                }
                case "java" : {
                    fs.writeFile(programFilePath+"Main.java", code, (err)=>{
                        if(err)
                            res.send("ERR: couldn't write in java file");
                        else
                        {
                            res.send("Written in java file");
                            //Execute java code
                        }
                    })
                    break;
                }
                case "cpp":{
                    fs.writeFile(programFilePath+"Main.cpp", code, (err)=>{
                        if(err)
                            res.send("ERR: couldn't write in CPP file");
                        else
                        {
                            res.send("Written in cpp file");
                            //Execute CPP code
                        }
                    })
                    break;
                }
                case "c":{
                    fs.writeFile(programFilePath+"Main.c", code, (err)=>{
                        if(err)
                            res.send("ERR: couldn't write in C file");
                        else
                        {
                            res.send("Written in c file");
                            //Execute C code
                        }
                    })
                    break;
                }
                default:{
                    res.send("Programming language not found");
                }
            }
        }
    })
})



app.listen(port, (err)=>{
    let starterMSG = err?"Error in starting server":`Server started at http://localhost:${port}`;
})