const express = require('express')
const app = express()
const {PromisedDatabase} = require('promised-sqlite3')

const db = new PromisedDatabase()

const PORT = 8080;

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/',  async(req,res)=>{
    await db.open('./database/messages.db')
    const departments = await db.all('SELECT * FROM departments')
    await db.close()
    res.render('home', {departments})
})

// app.get('/', async(req,res)=>{
//     await db.open('./database/messages.db')
//     const departments = await db.all('SELECT * FROM departments')
//     await db.close()
//     res.render('index', {departments})
// })


app.listen(PORT,()=>console.log(`SERVER RUNNING ON PORT : ${PORT}`))
