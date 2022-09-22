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
	"pestId": "",
	"pestType": "",
  "xCoord": "",
  "yCoord": ""
}

// Add a new pest to db from the front end
app.route('/api/pest/create').post((req, res) => {
    
    pestToCreate = pestObj

    pestToCreate.pestId = req.body.pestId
    pestToCreate.pestType = req.body.pestType
    pestToCreate.xCoord=req.body.xCoord
    pestToCreate.yCoord=req.body.yCoord

    const query = `INSERT INTO pest(pest_id, pest_type, x_coord, y_coord) 
                   VALUES (${pestToCreate.pestId}, '${pestToCreate.pestType}', ${pestToCreate.xCoord}, ${pestToCreate.yCoord});`

    const queryDB = async () => {
      try {
        await pool.connect();
        const q = await pool.query(query);
        console.log(q.command)
        res.status(201).send()
      } catch (err) {
        console.log(err);
      }
    };
    
    queryDB();

})

// Retrieve all pests of a certain type
app.route('/api/pests/:type').get((req, res) => {

    const requestedPestType = req.params['type']

    // TODO: add logic for splicing multiple params and inserting them as " + param + " to an array
    quotedStringArray = `"ants", "spiders"`

    getQuery = `SELECT * FROM pest_patrol_db.pest_table WHERE pest_type IN (${quotedStringArray});`

    console.log(getQuery)

    // TODO: modify res.send to send to database
    res.send({ type: requestedPestType })

  })


// Update a Pest's Location 
app.route('/api/pests/:location').put((req, res) => {
    res.status(200).send(req.body)
  })

// Delete an object
app.route('/api/pests/:type').delete((req, res) => {
res.sendStatus(204)
})