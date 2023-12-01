
const express = require ('express')
const app = express()
const phpmyadmin = require('mysql')
const bodyParser = require('body-parser')
const cors = require("cors")
const path = require('path')


//connection to AWS RDS database
const db = phpmyadmin.createPool({
    host: "database-votingforsac.cvkofbibnz11.ap-northeast-1.rds.amazonaws.com",
    user: "admin",
    port: "3306",
    password: "Anithasai123(not true)",
    database: "aws_db",
    insecureAuth : true
})

//build is called from the client folder and set in static of express
app.use(express.static(path.join(__dirname+'/public/build')))


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


//POST method that takes voted result to president column in the table
app.post('/president',(req,res)=>{

    let vote =  req.body.vote
    let result  = req.body.result
    const queryInsert = "update voting_sac set president =(?) where roll_num = (?)"
    db.query(queryInsert,[vote,result],(err,result)=>{
        res.send(result)
    })
})

// POST method that takes voted result to manager column in the table
app.post('/manager',(req,res)=>{
    const vote =  req.body.vote
    const result  = req.body.result
    const queryInsert = "update voting_sac set general_manager=(?) where roll_num = (?)"
    db.query(queryInsert,[vote,result],(err,result)=>{
        res.send(result)
    })
    res.send("manager votes done")
})

// POST method that takes voted result to vice-president column in the table
app.post('/vice',(req,res)=>{
    const vote =  req.body.vote
    const result  = req.body.result
    const queryInsert = "update voting_sac set vice_president = (?) where roll_num = (?)"
    db.query(queryInsert,[vote,result],(err,result)=>{
       res.send(result)
    })
    res.send("vice-president vote done")
})

//POST method that takes barcode result to DB and validated for the valid voter to cast their or not
app.post('/credentials',(req,res)=>{
    let resu  = req.body.result
    const queryInsert = "select * from voting_sac where roll_num = (?)"
    db.query(queryInsert,[resu],(err,result)=>{
        if(err === null && result.length !== 0) res.send(result)
        else res.send("no result")
    })  
})

//setting port number to the server
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log("server running :8000")
})
