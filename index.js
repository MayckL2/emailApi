const express = require('express')
const app = express()
const cors = require('cors')
const {sendEmailService} = require('./sendEmail') 

// habilida dotenv
require('dotenv').config()

// habilida uso de json
app.use(express.json())

// CORS
app.use((req, res, next) => {
    console.log('Cors funcionando!')
    res.header('Access-Control-Allow-Origin', '*')
    app.use(cors())
    next()
})

app.post('/', (req, res)=>{
    const {email, toEmail, subject, text} = req.body

    if(!email || !subject || !text){
        return res.status(401).send({msg: "Envie email, toEmail, subject e text para enviar email..."})
    }

    sendEmailService(email, toEmail, subject, text)

    res.status(200).send({msg: "Email enviado com sucesso!"})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})