// function mypromise(){
//   let data = new Promise((resolve , reject) => {
//     if(0 < 9){
//       resolve("Benar")
//     }else{
//       reject("Salah")
//     }
//   })

//   return data
  
// }
// async function my(){
//   let data = await mypromise()
//   console.log(data)
// }

// my();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const app = express()

const authRoutes = require('./src/Routes/Auth')
const deleteRoutes = require('./src/Routes/Delete')
const authFile =  require('./src/Middleware/Multer')
const storage = multer.diskStorage({
  destination : (req , file , cb) => {
    cb(null , './images')
  } ,

  filename : (req , file , cb) => {
    cb(null , new Date().getTime() + '-' + file.originalname)
  }
})

const upload = multer({storage : storage })

app.use('/images' , express.static(path.join(__dirname , 'images')))
app.use(bodyParser.urlencoded({extended : true }))
app.use(bodyParser.json())
app.use(cors())
app.use((req , res , next) => {
  console.log('your requrest success')
  next()
})


app.use('/auth' , authRoutes )
app.use('/image' , authFile , (req , res , next) => {
    if(!req.file){
      res.send('Invalid')
    }

    res.json({
      name : req.file.filename ,
      path : req.file.path
    })
})
app.use('/delete' , deleteRoutes)


// mongoose.connect('mongodb://localhost:9000/login' , {useUnifiedTopology : true , useNewUrlParser : true})
// .then(success => {
//   console.log('server has running')
//   app.listen(3000)
// })

console.log('server running')
app.listen(3000)