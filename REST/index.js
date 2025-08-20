const { log } = require("console");
const express =require("express");
const app =express();
const port =8080;
const path=require("path");

app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        username :"Pranay",
        content:"I loved her :("
    },
    {
        username :"Didi",
        content:"I love her :)"
    },
    {
        username :"Lavanya",
        content:"I love her as well :)"
    }
]


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username ,content}=req.body;
    posts.push({username,content});
    res.send("post req working")
    
})


app.listen(port,()=>{
    console.log(`Listening to ${port}`);
})

app.get("/",(req,res)=>{
    res.send("Yeah ! Its Working !");
})


app.get("/google",(req,res)=>{
    res.redirect("https://google.com");
})

