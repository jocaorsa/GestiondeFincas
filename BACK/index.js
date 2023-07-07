const express = require ('express')
const mongoose = require ('mongoose')
const morgan = require ('morgan')
const bodyParser = require ('body-parser')
const router = require ('./api/routes/index')
mongoose.connect('mongodb://localhost/GesFin', {})
const db = mongoose.connection

db.on('error', (err) =>{
    console.log(err)
})

db.once('open', () => {
    console.log('DB Connection Established!')
})

const app  = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api', router)


const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})