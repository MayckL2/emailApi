const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer')

// habilida dotenv
require('dotenv').config()

// habilida uso de json
app.use(express.urlencoded())
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

     //if(!email || !toEmail || !subject || !text){
      //  return res.status(401).send({msg: "Envie email, toEmail, subject e text para enviar email..."})
    //}
    if(!email){
        return res.status(401).send({msg: "Envie o email..." + email})
    }
    if(!subject){
        return res.status(401).send({msg: "Envie o assunto..." + subject})
    }
    if(!toEmail){
        return res.status(401).send({msg: "Envie o email para..." + toEmail})
    }
    if(!text){
        return res.status(401).send({msg: "Envie o texto..." + text})
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });

    let mailOptions = {
        to: toEmail,
        subject: subject ? subject : 'Assunto',
        html: ` 
        ${text}
        <hr>
        <h4>Email enviado por <span style="color: purple, font-weight: bold">${email}</span></h4>
        `
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            res.status(400).send({msg: "Error " + err});
        } else {
            res.status(200).send({msg: "Email sent successfully"});
        }
    });

    // res.status(200).send({msg: "Email enviado com sucesso!"})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})
