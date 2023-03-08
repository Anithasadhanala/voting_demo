const express = require ('express')
const app = express()
const phpmyadmin = require('mysql')
const bodyParser = require('body-parser')
const cors = require("cors")
const path = require('path')



const db = phpmyadmin.createPool({
    host: "sql12.freesqldatabase.com",
    user: "sql12603856",
    port: "3306",
    password: "PlgXRHs5yG",
    database: "sql12603856",
    insecureAuth : true
})

app.use(express.static(path.join(__dirname+'/public/build')))


console.log("testing.....")
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/president',(req,res)=>{

    const vote =  req.body.vote
    const result  = req.body.result
    const queryInsert = "update voting_demo set president= (?) where roll_num =(?) "
    db.query(queryInsert,[vote,result],(err,result)=>{
       console.log("president:  ",err,2)
        console.log("president :  ",result,4);
    })
    res.send("president votes done")
})


app.post('/vice',(req,res)=>{

    const vote =  req.body.vote
    const result  = req.body.result
    const queryInsert = "update voting_demo set vice_president = (?) where roll_num =(?) "
    db.query(queryInsert,[vote,result],(err,result)=>{
       console.log("vice :  ",err,2)
        console.log("vice :  ",result,4);
    })
    res.send("vice-president vote done")
})


app.post('/credentials',(req,res)=>{

    const resu  = req.body.result
    const queryInsert = "select * from voting_demo where roll_num = (?) and president = 0 and vice_president = 0"
    db.query(queryInsert,[resu],(err,result)=>{
       console.log("credencials :  ",err,2)
        console.log("credencials :  ",result,4);
        if(err === null && result.length !== 0){
            res.send(resu)
        }
        else{
            res.send("no result")
        }
    })  
})


const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log("server running :8000")
})