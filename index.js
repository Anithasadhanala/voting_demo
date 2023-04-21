
const express = require ('express')
const app = express()
const phpmyadmin = require('mysql')


const bodyParser = require('body-parser')
const cors = require("cors")
const path = require('path')



const db = phpmyadmin.createPool({
    host: "database-votingforsac.cvkofbibnz11.ap-northeast-1.rds.amazonaws.com",
    user: "admin",
    port: "3306",
    password: "Anithasai123",
    database: "aws_db",
    insecureAuth : true
})

app.use(express.static(path.join(__dirname+'/public/build')))


console.log("testing.....")
app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))

app.post('/president',(req,res)=>{

    let vote =  req.body.vote
    let result  = req.body.result
    
    
    const queryInsert = "update voting_sac set president =0 where roll_num!=0"
    db.query(queryInsert,[vote],(err,result)=>{
       console.log("president:  ",err,2)
        console.log("president :  ",result,4);
        res.send(result)
    })
    
})

app.post('/manager',(req,res)=>{

    const vote =  req.body.vote
    const result  = req.body.result
    const queryInsert = "update voting_sac set general_manager= 0 where roll_num!=0"
    db.query(queryInsert,[vote],(err,result)=>{
       console.log("manager:  ",err,2)
        console.log("manager :  ",result,4);
    })
    res.send("manager votes done")
})



app.post('/vice',(req,res)=>{

    const vote =  req.body.vote
    const result  = req.body.result
    const queryInsert = "update voting_sac set vice_president =0 where roll_num!=0"
    db.query(queryInsert,[vote],(err,result)=>{
       console.log("vice :  ",err,2)
        console.log("vice :  ",result,4);
    })
    res.send("vice-president vote done")
})



app.post('/credentials',(req,res)=>{

    let resu  = req.body.result
  
    console.log(resu)
    const queryInsert = "select * from voting_sac where roll_num = (?)"
    db.query(queryInsert,[resu],(err,result)=>{
       console.log("credencials :  ",err,2)
        console.log("credencials :  ",result,4);
        if(err === null && result.length !== 0){
            res.send(result)
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
