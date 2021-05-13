const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const { response } = require('express')

const App = express()
App.use(bodyParser.json())
App.use(bodyParser.urlencoded({extended : true}))
App.use(cors())

const conn = mysql.createConnection({
    host : 'localhost' ,
    user : 'root' ,
    password : '' ,
    database : 'login'
})

App.listen(9000)

App.get("/" , (req , res ) => {
    conn.connect(err => {
        if (err) throw err 

        conn.query("select * from user" , (err , results) => {
            res.send(results)
        })
    })
})


App.post("/login" , (req , res) => {
  conn.connect(err => {
        if (err) throw err 

        conn.query(`select * from user where username = '${req.body.username}' and password = '${req.body.password}'` , (err , results) => {
            if(results.length > 0){
                res.send({
                    status : 200 
                })
            }
        })
    })  
})