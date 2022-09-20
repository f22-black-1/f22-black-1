const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const { Pool, Client } = require('pg');

const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432")
});

console.log(pool)

const connectToDB = async () => {
  try {
    await pool.connect();
    const now = await pool.query("SELECT NOW()");
    console.log(now)
  } catch (err) {
    console.log(err);
  }
};

connectToDB();

// clients will also use environment variables
// for connection information
const client = new Client()

// callback
client.query('SELECT NOW() as now', (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})
// promise
client
  .query('SELECT NOW() as now')
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))


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
	"id": "",
	"pestType": "",
	"pestLocation": {"xCoord":"","yCoord":""}
}

// Add a new pest to db from the front end
app.route('/api/pest/create').post((req, res) => {
    
    pestToCreate = pestObj

    pestToCreate.id = req.body.id
    pestToCreate.pestType = req.body.pestType
    pestToCreate.pestLocation.xCoord=req.body.pestLocation.xCoord
    pestToCreate.pestLocation.yCoord=req.body.pestLocation.yCoord

    createQuery = `INSERT INTO pest_patrol_db.pest_table(pest_id, pest_type, pest_x_coord, pest_y_coord) 
                   VALUES (${pestToCreate.id}, "${pestToCreate.pestType}", ${pestToCreate.pestLocation.xCoord}, ${pestToCreate.pestLocation.yCoord});`


    // TODO: add database logic

    // TEMP: Logging the query we will send to the DB to create the new pest
    console.log(createQuery)

    res.status(201).send(req.body)

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