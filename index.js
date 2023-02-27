const express = require ('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require("cors")
const path = require('path')


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    port: "3030",
    password: "Anith@11",
    database: "voting_main",
    insecureAuth : true
})

app.use(express.static(path.join(__dirname+'/public/build')))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/president',(req,res)=>{

    const vote =  req.body.vote
    const result  = req.body.result
    const queryInsert = "update pdf_excel_data_csv set president= (?) where roll_num =(?) "
    db.query(queryInsert,[vote,result],(err,result)=>{
       console.log("president:  ",err,2)
        console.log("president :  ",result,4);
    })
    res.send("president votes done")
})


app.post('/vice',(req,res)=>{

    const vote =  req.body.vote
    const result  = req.body.result
    const queryInsert = "update pdf_excel_data_csv set vice_president = (?) where roll_num =(?) "
    db.query(queryInsert,[vote,result],(err,result)=>{
       console.log("vice :  ",err,2)
        console.log("vice :  ",result,4);
    })
    res.send("vice-president vote done")
})


app.post('/credentials',(req,res)=>{

    const resu  = req.body.result
    const queryInsert = "select * from pdf_excel_data_csv where roll_num = (?) and president = 3 and vice_president = 1"
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


const PORT = process.env || 8000
app.listen(8000,()=>{
    console.log("server running :8000")
})