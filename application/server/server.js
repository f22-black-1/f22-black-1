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

let tidObj = { 
  reqThreadID: String
}

// let threadObject = {
//   threadid: number,
//   incidentid: number,
//   locid: number,
//   creatorid: string,
//   createdate: Date,
//   subject: string,
//   comment: string
// }

let activityObj = {
  ActivityID: String,
  ActivityType: String,
  ActivityTS: Date,
  IncidentID: String,
  // ThreadID: String,
  // ResponseID: String,
  // FeedbackID: String,
}

// Get all pests
app.route(`/api/pests/`).get((req, res) => {
  query = `SELECT * FROM pest`

    const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rowCount);
      res.status(200).send(q.rows)
      
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
   
  queryDB();

})

// Get all pest types
app.route(`/api/pests/types`).get((req, res) => {
  query = `SELECT DISTINCT pesttype FROM pest ORDER BY pesttype`

    const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rows);
      res.status(200).send(q.rows)
      
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
   
  queryDB();

})


// Get all incidents
app.route(`/api/incidents/`).get((req, res) => {
  query = `SELECT * FROM incident`

    const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rowCount);
      res.status(200).send(q.rows)
      
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
   
  queryDB();

})

// Get all incidents
app.route(`/api/pestreports/`).get((req, res) => {
  query = `SELECT * FROM pestreport`

    const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rowCount);
      res.status(200).send(q.rows)
      
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
   
  queryDB();

})


//get threads
app.route(`/api/Thread/`).get((req, res) => {
  query = `SELECT * FROM Thread`


    const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rows);
      res.status(200).send(q.rows)
      
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
   
  queryDB();

})


//get summary thread list
app.route(`/api/summaryThreadList/`).get((req, res) => {
  query = `select  thread.*, '../../assets/Incident_Report_Images/PestImage_Coyote.PNG' as imagePath, '../../assets/Incident_Report_Images/Incident_Coyote.png' as iconPath,
  Count(threadfeedback.feedbackid) as Record_Count, coalesce(Sum(abs(threadfeedback.positive::int)),0) as Total_Positive
  from thread left join threadfeedback on thread.threadid = threadfeedback.threadid
  group by thread.threadid;`

    const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rows);
      res.status(200).send(q.rows)
      
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
   
  queryDB();

})

//get expanded thread data

app.route(`/api/expandedThread/`).post((req, res) => {
  console.log("*******************TESTING****************");
  console.log("njs req body: ")
  console.log(req.body.params.updates[0].value)
  // console.log("njs threadid: " + req.body.threadid);
  selectedThread = tidObj
  selectedThread.reqThreadID = req.body.params.updates[0].value

  query = `SELECT 1 AS sort_order, thread.incidentid, thread.threadid, thread.creatorid as userid, thread.createdate, thread.subject, thread.comment
  FROM thread
  WHERE (((thread.threadid)='${selectedThread.reqThreadID}'))
  UNION ALL
  SELECT 2 AS Sort_Order, null AS incidentid, threadresponse.responseid, threadresponse.userid, threadresponse.responsedate, 'Sub_Thread' AS subject, threadresponse.comment
  FROM threadresponse
  WHERE (((threadresponse.threadid)='${selectedThread.reqThreadID}') and ((threadresponse.responseid)<>'${selectedThread.reqThreadID}'))
  ORDER BY sort_order asc;`

  // query = `SELECT 1 AS sort_order, thread.incidentid, thread.threadid, thread.creatorid as userid, thread.createdate, thread.subject, thread.comment
  // FROM thread
  // WHERE (((thread.threadid)='bfa9f607-6c6d-4f42-ba33-ddeb729f02a2'))
  // UNION ALL
  // SELECT 2 AS Sort_Order, null AS incidentid, threadresponse.responseid, threadresponse.userid, threadresponse.responsedate, 'Sub_Thread' AS subject, threadresponse.comment
  // FROM threadresponse
  // WHERE (((threadresponse.threadid)='bfa9f607-6c6d-4f42-ba33-ddeb729f02a2') and ((threadresponse.responseid)<>'bfa9f607-6c6d-4f42-ba33-ddeb729f02a2'))
  // ORDER BY sort_order asc;`
  
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

app.route(`/api/ThreadResponse`).get((req, res) => {

  query = `SELECT * from ThreadResponse;`

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

  pestToCreate.pestType = req.body.pesttype;
  pestToCreate.xCoord = req.body.xcoord;
  pestToCreate.yCoord = req.body.ycoord;

  console.log(pestToCreate)


  const query = `INSERT INTO PestReport(PestType, XCoord, Ycoord) 
                  VALUES (
                         '${pestToCreate.pestType}',
                         '${pestToCreate.xCoord}',
                          '${pestToCreate.yCoord}'
                         );`

  const queryDB = async () => {
    try {
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
app.route('/api/pest/update').post((req, res) => {
  console.log(`-----------`);
  console.log(req.body);
  console.log(`----------`);
  
  pestToUpdate = pestObj;

  pestToUpdate.PestID = req.body.pestid;
  pestToUpdate.PestName = req.body.pestname;
  pestToUpdate.PestType = req.body.pesttype;
  pestToUpdate.Severity = req.body.severity;
  pestToUpdate.PestDescription = req.body.pestdescription;
  pestToUpdate.PestImage = req.body.pestimage;

  //console.log(pestToUpdate)

  const query = `UPDATE pest 
                SET pestname = '${pestToUpdate.PestName}', 
                    pesttype = '${pestToUpdate.PestType}', 
                    severity = '${pestToUpdate.Severity}', 
                    pestdescription = '${pestToUpdate.PestDescription}', 
                    pestimage =  '${pestToUpdate.PestImage}' 
                    WHERE pestid = '${pestToUpdate.PestID}';`
                 
  const queryDB = async () => {
    try {
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

// Get a pest by Pest ID
app.route(`/api/pest/apest`).post((req, res) => {
  console.log(req.body);

  pestToGet = pestObj;
  pestToGet.PestID = req.body.pestid;

  console.log(pestToGet.PestID);

   query = `SELECT * FROM pest WHERE pestid = '${pestToGet.PestID}'`

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

// Get names of all pest with same pest type
app.route(`/api/pests/type`).get((req, res) => {
  console.log(req.body);

  pestNameFromType = pestObj;

  pestNameFromType.pestName = req.body.pesttype;

  console.log(pestNameFromType)



  query = `SELECT pestname FROM pest WHERE pesttype = '${pestNameFromType.pestName}';`
  

    const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rows);
      res.status(200).send(q.rows)
      
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
   
  queryDB();

})

// Get names of all pest with same severity
app.route(`/api/pests/severity`).get((req, res) => {
  console.log(req.body);

  pestNameFromSeverity = pestObj;

  pestNameFromSeverity.pestName = req.body.severity;

  console.log(pestNameFromSeverity)



  query = `SELECT pestname FROM pest WHERE severity = '${pestNameFromSeverity.pestName}';`
  
  

    const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rows);
      res.status(200).send(q.rows)
      
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
   
  queryDB();

})



//Get all activities
app.route(`/api/activity/`).get((req, res) => {
  query = `SELECT * FROM Activity`

    const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rows);
      res.status(200).send(q.rows)
      
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

