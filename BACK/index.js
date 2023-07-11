const express = require ('express')
const mongoose = require ('mongoose')
const morgan = require ('morgan')
const bodyParser = require ('body-parser')
const router = require ('./api/routes/index')
const cors = require ('cors')
require('dotenv').config()

const uri = process.env.DB_URI;

//mongoose.connect(uri,{dbName: process.env.DB_NAME})

;(async function () {
  // MONGOOSE
  try {
    await mongoose.connect(uri,{dbName: process.env.DB_NAME})
    console.log('Connected to DB')
  } catch (err) {
    throw new Error(`Error connecting to DB: ${err}`)
  }

  try {

    // ADDING MIDDLEWARES & ROUTER
    const app = express()
      .use(cors())
      .use(morgan('combined'))
      .use(express.json())
      .use('/api', require('./api/routes'))

    // Init server

    const PORT = process.env.PORT || 3000
    app.listen(PORT, (err) => {
      
      if (err) {
        throw new Error(err)
      }
      console.log('Server working!!')
      console.info('>'.repeat(40))
      console.info(':computer:  reboot')
      console.info(`📡  PORT: http://localhost:${PORT}`)
      console.info('>'.repeat(40) + '\n')
    })
  } catch (error) {
    throw new Error(error)
  }
})()




// const { MongoClient, ServerApiVersion } = require("mongodb");
// const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// );

// const db = mongoose.connection
// db.on('error', (err) =>{
//     console.log(err)
// })
// db.once('open', () => {
//     console.log('DB Connection Established!')
// })

// // async function run() {
// //   try {
// //     // Connect the client to the server (optional starting in v4.7)
// //     await client.connect();
// //     // Send a ping to confirm a successful connection
// //     await client.db("admin").command({ ping: 1 });
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     await client.close();
// //   }
// // }
// // run().catch(console.dir);

// const app  = express()
// app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())
// app.use('/api', router)


// const PORT = process.env.PORT || 3000

// app.listen(PORT, () =>{
//     console.log(`Server is running on port ${PORT}`)
// })