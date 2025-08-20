const express =require("express");
const app =express();
const port =8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

 
app.get("/register",(req,res) => {
    let {user,password}=req.query;
    res.send(`standard GET response! Welcome ${user}`);
})

app.post("/register",(req,res) => {
    console.log(req.body);
    let {user ,password}=req.body;
     res.send(`standard POST response! Welcome ${user}`);
})

app.listen(port,()=>{
    console.log(`Listening to ${port}`)
})

app.get("/",(req,res)=>{
    res.send("hello hi i am pranay gupta");
})


app.get("/reg",(req,res)=>{
    let {user,password}=req.query;
    res.send(`hi my name is ${user} & i gave my password as ${password}`);
    
})

app.post("/reg",(req,res)=>{
    let {user,password}=req.body;
    console.log({user,password});
    
    res.send(`hi my name is ${user} & i gave my password as ${password}`);
    
})