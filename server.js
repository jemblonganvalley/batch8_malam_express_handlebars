//kita import package yang dibutuhkan
const express = require("express")
const cors = require("cors")
const hbs = require("express-handlebars")
const path = require("path")
const app = express()

//kita gunakan middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname , "public")))
app.use(express.urlencoded())

//setup template engine
app.set("views" , path.join(__dirname , "view"))
app.set("view engine" , "handlebars")
app.engine("handlebars" , hbs({
    layoutsDir : path.join(__dirname , "view/layouts"),
    partialsDir : path.join(__dirname , "view/components"),
    defaultLayout : "main_layout.handlebars" 
}))

//routing
app.get("/" , (req, res)=>{
    res.render("index", {
        title : "Home Page",
    })
})

app.get("/about" , (req, res)=>{
    res.render('about' , {
        title : "About Page"
    })
})

app.get("/contact" , (req, res)=>{
    res.render('contact' , {
        title : "Contact Page"
    })
})

app.get("/gallery" , (req, res)=>{
    res.render('gallery' , {
        title : "Gallery Page"
    })
})

app.get("/send", (req,res)=>{

    //kita tangkap data dari query
    const nm = req.query.name
    const ph = req.query.phone
    const em = req.query.email
    const msg = req.query.message

    console.log(`
    name : ${nm}
    phone : ${ph}
    email : ${em}
    message : ${msg}
    `)

    res.render("contact", {
        name : nm,
        phone : ph,
        email : em,
        message : msg
    })

})

app.post("/message" , (req,res)=>{

    //kita tangkap req body
    const nm = req.body.name
    const ph = req.body.phone
    const em = req.body.email
    const msg = req.body.message

    console.log(`
    --------------------------
    REQUEST BODY
    --------------------------
    name : ${nm}
    phone : ${ph}
    email : ${em}
    message : ${msg}
    `)

    res.render("contact", {
        name : nm,
        phone : ph,
        email : em,
        message : msg
    })
})







//REQUEST PARAMS
app.get("/about/:username/:address" , (req, res)=>{
    
    //kita tangkap req paramsnya
    const us = req.params.username
    const ad = req.params.address

    res.send(`selamat datang ${us} kamu tinggal di ${ad}`)

})

//REQUEST QUERY
// http://localhost:3000/contact/detail/?email=asd@gmail.com&phone=081239123123
app.get("/contact/detail/" , (req , res)=>{

    const em = req.query.email
    const ph = req.query.phone

    res.send(`
    email : ${em} <br>
    phone : ${ph}
    `)

})




//req error handle
app.use((req,res)=>{
    res.send('ngetes ilmu bang..?')
}) 

//menjalankan web server 
app.listen( 3000 , ()=>{console.log("kamu menjalankan server di port 3000")} )