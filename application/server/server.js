const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const { Pool } = require('pg');

const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432")
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
 next()
})


app.listen(config.port, () => console.log(`Example app listening on ${config.port}!`))

// CRUD Operations for Pest Table
let pestObj = {
  PestID: String,
  PestName: String,
  PestType: String,
  Severity: String,
  PestDescription: String,
  PestImage: String,
}

// Get all pests
app.route(`/api/pests/`).get((req, res) => {
  query = `SELECT * FROM pest`


    const queryDB = async () => {
    try {
      const client = await pool.connect();
      const q = await client.query(query);
      console.log(q.rows);
      res.status(200).send(q.rows)
      
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
   
  queryDB();

})


// Add a new pest
app.route('/api/pest/create').post((req, res) => {
    
  console.log(req.body);

  pestToCreate = pestObj;

  pestToCreate.PestID = req.body.pestid;
  pestToCreate.PestName = req.body.pestname;
  pestToCreate.pestType = req.body.pesttype;
  pestToCreate.Severity = req.body.severity;
  pestToCreate.PestDescription = req.body.pestdescription;
  pestToCreate.PestImage = req.body.pestimage;

  console.log(pestToCreate)


  const query = `INSERT INTO Pest(PestName,PestType, Severity, PestDescription, PestImage) 
                  VALUES (
                        '${pestToCreate.PestName}',
                         '${pestToCreate.PestType}',
                         '${pestToCreate.Severity}',
                          '${pestToCreate.PestDescription}',
                          '${pestToCreate.PestImage}'
                         );`

  const queryDB = async () => {
    try {
      await pool.connect();
      const q = await pool.query(query);
      console.log(q.command)
      res.status(201).send()
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
  
  queryDB();

})


// Delete a Pest
app.route('/api/pest/delete').delete((req, res) => {
  console.log(req.body);

  pestToDelete = pestObj;

  pestToDelete.pestId = req.body.pestid;

  console.log(pestToDelete)


  const query = `DELETE FROM pest WHERE pestid = '${pestToDelete.pestId}';`

  const queryDB = async () => {
    try {
      await pool.connect();
      const q = await pool.query(query);
      console.log(q.command)
      res.status(201).send()
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
  
  queryDB();

})


// Update a whole Pest object (except the key)
app.route('/api/pest/update').put((req, res) => {
  console.log(req.body);

  pestToUpdate = pestObj;

  pestToUpdate.pestId = req.body.pest_id;
  pestToUpdate.pestType = req.body.pest_type;
  pestToUpdate.xCoord = req.body.x_coord;
  pestToUpdate.yCoord = req.body.y_coord;
  pestToUpdate.id = req.body.id;
  pestToUpdate.name = req.body.name;

  console.log(pestToUpdate)

  const query = `UPDATE pest 
                 SET pest_type = '${pestToUpdate.pestType}', 
                     x_coord = ${pestToUpdate.xCoord}, 
                     y_coord = ${pestToUpdate.yCoord}, 
                     id = ${pestToUpdate.id}, 
                     name =  '${pestToUpdate.name}' 
                 WHERE pest_id = ${pestToUpdate.pestId} ;` 
                 
  const queryDB = async () => {
    try {
      await pool.connect();
      const q = await pool.query(query);
      console.log(q.command)
      res.status(201).send()
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
  
  queryDB();

})



// // Get pest by id
// // app.route(`/api/pest/id`).get((req, res) => {
// //   query = `SELECT * FROM pest WHERE pest_id = ${pestObj.pestId}`
// //   console.log(query)
  
// //   res.status(200).send(pestObj);

// // })

// // Post pestId
// app.route('/api/detail/:id').post((req, res) => {    
//   console.log(`Put pestId: ${JSON.stringify(req.body)}`)

// })


// Retrieve all pests of a certain type
// app.route('/api/pests/:type').get((req, res) => {

//     const requestedPestType = req.params['type']

//     // TODO: add logic for splicing multiple params and inserting them as " + param + " to an array
//     quotedStringArray = `"ants", "spiders"`

//     getQuery = `SELECT * FROM pest_patrol_db.pest_table WHERE pest_type IN (${quotedStringArray});`

//     console.log(getQuery)

//     // TODO: modify res.send to send to database
//     res.send({ type: requestedPestType })

//   })


// Update a Pest's Location 
// app.route('/api/pests/update/:location').put((req, res) => {
//     res.status(200).send(req.body)
//   })

