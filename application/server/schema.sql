DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Neighborhood;
DROP TABLE IF EXISTS Incident;
DROP TABLE IF EXISTS Thread;
DROP TABLE IF EXISTS ThreadResponse;
DROP TABLE IF EXISTS ThreadFeedback;
DROP TABLE IF EXISTS Pest;
DROP TABLE IF EXISTS PestReport;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- For generating UUIDs; may require 'postgresql14-contrib' package

CREATE TABLE IF NOT EXISTS Neighborhood (
  LocID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  LocName VARCHAR(255),
  ZipCode CHAR(5),
  State VARCHAR(255),
  City VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Users(
  UserID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  LocID UUID REFERENCES Neighborhood(LocID),
  UserName VARCHAR(50) UNIQUE,
  Email VARCHAR(255) UNIQUE,
  UserType VARCHAR(50),
  FirstName VARCHAR(50),
  LastName VARCHAR(50),
  Password VARCHAR(200) NOT NULL,
  CustomViewAreaSet BOOLEAN,
  CustomViewArea INT,
  CustomFilterSet BOOLEAN,
  FilterPest VARCHAR(50),
  FilterIncidentAge VARCHAR(255),
  FilterUser VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Pest (
  PestID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  PestName VARCHAR(255),
  PestType VARCHAR(50),
  Severity VARCHAR(255),
  PestDescription TEXT,
  PestImage TEXT
);


CREATE TABLE IF NOT EXISTS Incident (
  IncidentID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  LocID UUID REFERENCES Neighborhood(LocID),
  SubmitterID UUID REFERENCES Users(UserID),
  PestID UUID REFERENCES Pest(PestID),
  ReportDate TIMESTAMP WITH TIME ZONE,
  XCoord FLOAT,
  Ycoord FLOAT
);


CREATE TABLE IF NOT EXISTS Thread (
  ThreadID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  IncidentID UUID REFERENCES Incident(IncidentID),
  LocID UUID REFERENCES Neighborhood(LocID),
  CreatorID UUID REFERENCES Users(UserID),
  CreateDate TIMESTAMP WITH TIME ZONE,
  Subject TEXT,
  Comment TEXT
);

CREATE TABLE IF NOT EXISTS ThreadResponse (
  ResponseID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  ThreadID UUID REFERENCES Thread(ThreadID),
  UserID UUID REFERENCES Users(UserID),
  ResponseDate TIMESTAMP WITH TIME ZONE,
  Comment TEXT
);

CREATE TABLE IF NOT EXISTS ThreadFeedback (
  FeedbackID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  ResponseID UUID REFERENCES ThreadResponse(ResponseID),
  ThreadID UUID REFERENCES Thread(ThreadID),
  SubmitterID UUID REFERENCES Users(UserID),
  UserID UUID REFERENCES Users(UserID),
  Positive BOOLEAN,
  Inappropriate BOOLEAN,
  SubmitDate TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS PestReport (
  ReportID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  IncidentID UUID REFERENCES Incident(IncidentID),
  LocID UUID REFERENCES Neighborhood(LocID),
  SubmitterID UUID REFERENCES Users(UserID),
  PestID UUID REFERENCES Pest(PestID),
  ReportDate TIMESTAMP WITH TIME ZONE,
  ReportText TEXT,
  XCoord FLOAT,
  Ycoord FLOAT,
  PestName VARCHAR(255),
  PestType VARCHAR(50),
  Severity VARCHAR(255),
  PestDescription TEXT,
  PestImage TEXT
);

CREATE TABLE IF NOT EXISTS Activity (
  ActivityID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  ActivityType VARCHAR(255),
  ActivityTS TIMESTAMP,
  ReportID UUID,
  PestID UUID,
  PestType VARCHAR(255),
  SubmitterID UUID,
  Submitter VARCHAR(100),
  OutMessage VARCHAR(500),
  IncidentID UUID,
  ThreadID UUID,
  ThreadSubject VARCHAR(100),
  LocID UUID,
  XCoord FLOAT,
  YCoord FLOAT
);

COPY Neighborhood FROM '/docker-entrypoint-initdb.d/csv/neighborhood.csv' CSV HEADER;
COPY Users FROM '/docker-entrypoint-initdb.d/csv/users.csv' CSV HEADER;
COPY Pest FROM '/docker-entrypoint-initdb.d/csv/pests.csv' CSV HEADER;
COPY Incident FROM '/docker-entrypoint-initdb.d/csv/incident.csv' CSV HEADER;
COPY Thread FROM '/docker-entrypoint-initdb.d/csv/thread.csv' CSV HEADER;
COPY ThreadResponse FROM '/docker-entrypoint-initdb.d/csv/threadresponse.csv' CSV HEADER;
COPY ThreadFeedback FROM '/docker-entrypoint-initdb.d/csv/threadfeedback.csv' CSV HEADER;
-- COPY Activity FROM '/docker-entrypoint-initdb.d/csv/activity.csv' CSV HEADER;
COPY PestReport FROM '/docker-entrypoint-initdb.d/csv/pestreport.csv' CSV HEADER;

--Updates Activity Table with values from other tables

-- INSERT INTO Activity(ReportID)
-- SELECT ReportID FROM PestReport;

-- UPDATE Activity
-- SET ActivityType = 'Incident'
-- WHERE Activity.ActivityType IS NULL;

-- UPDATE Activity
-- SET ActivityTS = NULL
-- WHERE Activity.ActivityTS IS NULL;

-- UPDATE Activity
-- SET SubmitterID = 'Some_UserID'
-- WHERE Activity.SubmitterID IS NULL;

-- UPDATE Activity
-- SET Submitter = 'Some_User'
-- WHERE Activity.Submitter IS NULL;

-- UPDATE Activity
-- SET PestID = PestReport.PestID FROM PestReport
-- WHERE Activity.ReportID = PestReport.ReportID AND PestReport.PestType IS NOT NULL;

-- UPDATE Activity
-- SET PestType = PestReport.PestType FROM PestReport
-- WHERE Activity.ReportID = PestReport.ReportID AND PestReport.PestType IS NOT NULL;

-- UPDATE Activity
-- SET SubmitterID = PestReport.SubmitterID FROM PestReport
-- WHERE Activity.ReportID = PestReport.ReportID AND PestReport.SubmitterID IS NOT NULL;

-- UPDATE Activity
-- SET Submitter = Users.UserName FROM Users
-- WHERE Activity.SubmitterID = Users.UserID::VARCHAR AND Activity.SubmitterID IS NOT NULL;

-- UPDATE Activity
-- SET PestDescription = PestReport.PestDescription FROM PestReport
-- WHERE Activity.ReportID = PestReport.ReportID AND PestReport.PestDescription IS NOT NULL;

-- UPDATE Activity
-- SET ReportText = PestReport.ReportText FROM PestReport
-- WHERE Activity.ReportID = PestReport.ReportID AND PestReport.ReportText IS NOT NULL;

-- UPDATE Activity
-- SET ActivityTS = PestReport.ReportDate FROM PestReport
-- WHERE Activity.ReportID = PestReport.ReportID AND PestReport.ReportDate IS NOT NULL;