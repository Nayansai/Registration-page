var express=require("express")
var bodyparser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb+srv://nayansai:password@cluster0.b4deb.mongodb.net/Database')
var db=mongoose.connection
db.on('error',()=>console.log("Error is connecting to Database"))
db.once('open',()=>console.log("conneccted to Database"))

app.post("/sign_up",(req,res)=>{
    var name=req.body.name
    var age=req.body.age
    var phone=req.body.phone
    var email=req.body.email
    var pass=req.body.password

    var data={
        "name":name,
        "age":age,
        "phone":phone,
        "email":email,
        "password":pass,
        
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully")
    })
    return res.redirect('signup_successful.html')
})

app.get("/",(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("listening on port 3000")