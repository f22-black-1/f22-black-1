const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const { Pool } = require('pg');
const { response } = require('express');

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

let responseObj = {
  ThreadID: String,
  UserID: String,
  ResponseDate: Date,
  Comment: String,
}


let activityObj = {
  ActivityID: String,
  ActivityType: String,
  ActivityTS: Date,
  ReportID: String,
  PestType: String,
  SubmitterID: String,
  Submitter: String,
  PestDescription: String,
  ReportText: String,
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

    query = `SELECT pestreport.reportid, pestreport.incidentid, thread.threadid, pestreport.locid, pestreport.submitterid, users_1.username AS ReportSubmitterUsername, 
    pestreport.reportdate AS RepCreationDate, thread.creatorid, thread.createdate, thread.subject, thread.comment, pestreport.pestimage, 
    '../../assets/Incident_Report_Images/Incident_Coyote.png' AS iconPath, Count(threadfeedback.feedbackid) as Record_Count, 
    coalesce(Sum(abs(threadfeedback.positive::int)),0) as Total_Positive, pest.pesttype, pest.pestid, users.username
    FROM (pest INNER JOIN (pestreport LEFT JOIN ((thread LEFT JOIN threadfeedback ON thread.threadid = threadfeedback.threadid) LEFT JOIN 
    users ON thread.creatorid = users.userid) ON pestreport.incidentid = thread.incidentid) ON pest.pestid = pestreport.pestid) LEFT JOIN 
    users AS users_1 ON pestreport.submitterid = users_1.userid
    GROUP BY pestreport.reportid, pestreport.incidentid, thread.threadid, pestreport.locid, pestreport.submitterid, users_1.username, 
    pestreport.reportdate, thread.creatorid, thread.createdate, thread.subject, thread.comment, pestreport.pestimage, pest.pesttype, pest.pestid, users.username
    ORDER BY pestreport.reportdate DESC;`

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

//filter by pest type
app.route(`/api/summaryThreadList/pestType`).post((req, res) => {

  console.log('--------------------------------------- TEST ---------------------------------------');
  console.log(req.body.pesttype);
  console.log(req.headers.pesttype);
  console.log('--------------------------------------- TEST ---------------------------------------');

  query = `SELECT pestreport.reportid, pestreport.incidentid, thread.threadid, pestreport.locid, pestreport.submitterid, users_1.username AS ReportSubmitterUsername, 
  pestreport.reportdate AS RepCreationDate, thread.creatorid, thread.createdate, thread.subject, thread.comment, pestreport.pestimage, 
  '../../assets/Incident_Report_Images/Incident_Coyote.png' AS iconPath, Count(threadfeedback.feedbackid) as Record_Count, 
  coalesce(Sum(abs(threadfeedback.positive::int)),0) as Total_Positive, pest.pesttype, pest.pestid, users.username
  FROM (pest INNER JOIN (pestreport LEFT JOIN ((thread LEFT JOIN threadfeedback ON thread.threadid = threadfeedback.threadid) LEFT JOIN 
  users ON thread.creatorid = users.userid) ON pestreport.incidentid = thread.incidentid) ON pest.pestid = pestreport.pestid) LEFT JOIN 
  users AS users_1 ON pestreport.submitterid = users_1.userid
  where (((pest.pesttype)='${req.body.pesttype}'))
  GROUP BY pestreport.reportid, pestreport.incidentid, thread.threadid, pestreport.locid, pestreport.submitterid, users_1.username, 
  pestreport.reportdate, thread.creatorid, thread.createdate, thread.subject, thread.comment, pestreport.pestimage, pest.pesttype, pest.pestid, users.username
  ORDER BY pestreport.reportdate DESC;`

  const queryDB = async () => {
    try {
      // const client = await pool.connect();
      // const q = await client.query(query);
      // console.log(q.rows);
      // res.status(200).send(q.rows)
      
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


//Create new discussion thread -- Step 1: Add record to incident table
app.route(`/api/incident/createNewIncident`).post((req, res) => {

  console.log('--------------------------------------- step 1 test ---------------------------------------');
  console.log(req.body.locid);
  console.log(req.body.submitterid);
  console.log(req.body.pestid);
  console.log('--------------------------------------- step 1 test ---------------------------------------');

  query = `INSERT INTO incident ( incidentid, locid, submitterid, pestid, reportdate )
  SELECT '${req.body.reportid}' as incidentid, '${req.body.locid}' AS LocID, '${req.body.submitterid}' AS SubmitterID, '${req.body.pestid}' AS PestID, 
  '${req.body.reportdate}' AS ReportDate;`

  const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rows);
      res.status(201).send()
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
};

queryDB();
})

//Create new discussion thread -- Step 2: update pestreport with incident id
app.route(`/api/pestreport/updateIncidentID`).post((req, res) => {

  console.log('--------------------------------------- step 2 test ---------------------------------------');
  console.log(req.body.reportid)
  console.log('--------------------------------------- step 2 test ---------------------------------------');

  query = `UPDATE pestreport SET incidentid = '${req.body.reportid}'
  WHERE (((reportid)='${req.body.reportid}'));`

  const queryDB = async () => {
    try {
        const q = await pool.query(query);
        console.log(q.rows);
        res.status(201).send()
      } catch (err) {
        console.log(err);
        res.status(500).send()
      }
  };

queryDB();
})

//Create new discussion thread -- Step 3: add new record to thread table
app.route(`/api/thread/addCreationThread`).post((req, res) => {

  console.log('--------------------------------------- step 3 test ---------------------------------------');
  console.log(req.body.incidentid);
  console.log(req.body.locid);
  console.log(req.body.creatorid);
  console.log(req.body.createdate);
  console.log(req.body.subject);
  console.log(req.body.comment);
  console.log('--------------------------------------- step 3 test ---------------------------------------');

  query = `insert into thread ( incidentid, locid, creatorid, createdate, subject, comment)
  select '${req.body.incidentid}' as incidentid, '${req.body.locid}' as locid, 
  '${req.body.creatorid}' as creatorid, '${req.body.createdate}' as createdate, '${req.body.subject}' as title,
  '${req.body.comment}' as comment
  returning threadid;`

  query2 = `INSERT INTO activity(submitterid,submitter,reporttext,activitytype)
  VALUES('${req.body.creatorid}',
         '${req.body.creatorid}',
         '${req.body.comment}',
         'Thread'  
         );
         UPDATE Activity
         SET Submitter = Users.UserName FROM Users
         WHERE Activity.SubmitterID = Users.UserID::VARCHAR;`


  const queryDB = async () => {
    try {
        const q = await pool.query(query);
        console.log("logging threadid: " + q.rows[0].threadid);
        //res.status(201).send(q.rows[0].threadid);
        res.status(201).send(q.rows[0]);
        //res.status(201).send(q.rows);
      } catch (err) {
        console.log(err);
        res.status(500).send()
      }
  };
  const queryDB2 = async () => {
    try {
        const q = await pool.query(query2);
        console.log("logging activity: ");
        //res.status(201).send(q.rows[0].threadid);
        res.status(201).send(q.rows[0]);
        //res.status(201).send(q.rows);
      } catch (err) {
        console.log(err);
        res.status(500).send()
      }
  };

  queryDB();
  queryDB2();
})

//Create new discussion thread -- Step 3.5: get newly created threadid
app.route(`/api/thread/getThreadID`).post((req, res) => {

  console.log('--------------------------------------- TEST ---------------------------------------');
  console.log(req.body.reportid);
  console.log('--------------------------------------- TEST ---------------------------------------');

  query = `select threadid
  from thread
  where incidentid = '${req.body.reportid}';`

  const queryDB = async () => {
    try {
      const q = await pool.query(query);
      console.log(q.rows);
      console.log(results.insertId);
      res.status(200).send(q.rows)
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };

  queryDB();
})

//Create new discussion thread -- Step 4: add original post to threadresponse
app.route(`/api/threadresponse/addOriginalThread`).post((req, res) => {

  console.log('--------------------------------------- step 4 test ---------------------------------------');
  console.log(req.body.responseid);
  console.log(req.body.userid);
  console.log(req.body.responsedate);
  console.log(req.body.comment);
  console.log('--------------------------------------- step 4 test ---------------------------------------');

  query = `insert into threadresponse (responseid, threadid, userid, responsedate, comment)
  select '${req.body.responseid}' as responseid, '${req.body.responseid}' as threadid, 
  '${req.body.userid}' as creatorid, '${req.body.responsedate}' as responsedate, 
  'Original_Thread' as comment;`

  const queryDB = async () => {
    try {
        const q = await pool.query(query);
        console.log(q.rows);
        res.status(201).send()
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
  selectedThread = tidObj
  selectedThread.reqThreadID = req.body.params.updates[0].value

  query = `SELECT 1 AS sort_order, thread.incidentid, thread.threadid, thread.creatorid as userid, thread.createdate, thread.subject, thread.comment, users.username
  FROM thread left join users on thread.creatorid = users.userid
  WHERE (((thread.threadid)='${selectedThread.reqThreadID}'))
  UNION ALL
  SELECT 2 AS Sort_Order, null AS incidentid, threadresponse.responseid, threadresponse.userid, threadresponse.responsedate, 'Sub_Thread' AS subject, threadresponse.comment, users.username
  FROM threadresponse left join users on threadresponse.userid = users.userid
  WHERE (((threadresponse.threadid)='${selectedThread.reqThreadID}') and ((threadresponse.responseid)<>'${selectedThread.reqThreadID}'))
  ORDER BY sort_order asc;`
  
    const queryDB = async () => {
    try {
      // const client = await pool.connect();
      // const q = await client.query(query);
      // console.log(q.rows);
      // res.status(200).send(q.rows)
      const q = await pool.query(query);
      console.log(q.rows)
      res.status(200).send(q.rows)
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
   
  queryDB();
})

app.route(`/api/createThreadResponse`).post((req, res) => {
  
  reqresponse = responseObj;

  reqresponse.ThreadID = req.body.threadid;  
  reqresponse.UserID = req.body.userid;
  reqresponse.ResponseDate = req.body.responsedate;
  reqresponse.Comment = req.body.comment;

  query = `insert into threadresponse (threadid, userid, responsedate, comment)
  SELECT '${reqresponse.ThreadID}' as threadid, '${reqresponse.UserID}' as userid, '${reqresponse.ResponseDate}' as responsedate, '${reqresponse.Comment}' as comment;`

  query2 = `INSERT INTO activity(threadid,submitterid,submitter,reporttext,activitytype)
           VALUES(
            '${reqresponse.ThreadID}',
            '${reqresponse.UserID}',
            'PestPatrolUser',
            '${reqresponse.Comment}',
            'Thread Response'
           );
           UPDATE Activity
           SET Submitter = Users.UserName FROM Users
           WHERE Activity.SubmitterID = Users.UserID::VARCHAR;`

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

  const queryDB2 = async () => {
    try {
      const q = await pool.query(query2);
      console.log(q.command)
      res.status(201).send()
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };

  queryDB();
  queryDB2();
})

//Delete response
app.route(`/api/deleteThreadResponse`).post((req, res) => {

  console.log('--------------------------------------- TEST ---------------------------------------');
  console.log(req.body.responseid);
  console.log('thread id: ' + req.body.threadid);
  console.log('--------------------------------------- TEST ---------------------------------------');
  
  query = ``;

  if(req.body.threadid === 'REMOVE_ALL')
    query = `DELETE FROM threadresponse WHERE threadresponse.threadid = '${req.body.responseid}';`;
  else
    query = `DELETE FROM threadresponse WHERE threadresponse.responseid = '${req.body.responseid}';`;
  
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

//Delete thread
app.route(`/api/deleteThread`).post((req, res) => {

  console.log('--------------------------------------- TEST ---------------------------------------');
  console.log(req.body.responseid);
  console.log('--------------------------------------- TEST ---------------------------------------');
 
  query = `delete from thread where thread.threadid = '${req.body.responseid}';`

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

app.route(`/api/ThreadResponse`).get((req, res) => {

  query = `SELECT * from ThreadResponse;`

  const queryDB = async () => {
    try {
      // const client = await pool.connect();
      // const q = await client.query(query);
      // console.log(q.rows);
      // res.status(200).send(q.rows)

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

  //Add pest to activity table every time it's added to pestreport
  const query2 = `INSERT INTO Activity(ActivityType,PestType,Submitter,ActivityTS)
  VALUES (
          'Incident',
          '${pestToCreate.pestType}',
          'Some_guy',
          CURRENT_TIMESTAMP
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
  const queryDB2 = async () => {
    try {
      const q2 = await pool.query(query2);
      console.log(q2.command)
      res.status(201).send()
    } catch (err) {
      console.log(err);
      res.status(500).send()
    }
  };
  
  queryDB();
  queryDB2();

})


// Delete a Pest
app.route('/api/pest/delete').post((req, res) => {
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
app.route(`/api/activity/all`).get((req, res) => {
  query = `SELECT * FROM Activity ORDER BY ActivityTS DESC`

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

//Get 10 most recent activities
app.route(`/api/activity/`).get((req, res) => {
  query = `SELECT * FROM Activity ORDER BY ActivityTS DESC LIMIT 10`

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

//Add a new activity
// app.route('/api/activity/create').post((req, res) => {
    
//   console.log(req.body);

//   activityToCreate = activityObj;

//   activityToCreate.ActivityType = req.body.ActivityType;
//   activityToCreate.ReportID = req.body.ReportID;
//   activityToCreate.PestName = req.body.PestType;
//   activityToCreate.SubmitterID = req.body.SubmitterID;
//   activityToCreate.Submitter = req.body.Submitter;
//   activityToCreate.PestDescription = req.body.PestDescription
//   activityToCreate.ReportText = req.body.ReportText


//   console.log(activityToCreate)



//   const query = `INSERT INTO Activity(ActivityType, ReportID, PestName, SubmitterID, Submitter, PestDescription, ReportText) 
//                   VALUES (
//                           'Incident',
//                           '${activityToCreate.ReportId}',
//                           '${activityToCreate.PestType}',
//                           '${activityToCreate.SubmitterID}',
//                           '${activityToCreate.Submitter}',
//                           '${activityToCreate.PestDescription}',
//                           '${activityToCreate.ReportText}'
//                                          );`



//   const queryDB = async () => {
//     try {
//       const q = await pool.query(query);
//       console.log(q.command)
//       res.status(201).send()
//     } catch (err) {
//       console.log(err);
//       res.status(500).send()
//     }
//   };
  
//   queryDB();

// })

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