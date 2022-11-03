DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Neighborhood;
DROP TABLE IF EXISTS Incident;
DROP TABLE IF EXISTS Thread;
DROP TABLE IF EXISTS ThreadResponse;
DROP TABLE IF EXISTS ThreadFeedback;
DROP TABLE IF EXISTS Pest;

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

-- DROP TABLE IF EXISTS pest;
-- CREATE TABLE IF NOT EXISTS pest (
--     pest_id INTEGER, 
--     pest_type TEXT,
--     x_coord INTEGER,
--     y_coord INTEGER,
--     id INTEGER,
--     name TEXT);

-- INSERT INTO pest VALUES (1, 'Ants', 100, 100, 1001, 'Formicoidea');
-- INSERT INTO pest VALUES (2, 'Bees', 100, -100, 1002, 'Apoidea');
-- INSERT INTO pest VALUES (3, 'Cougers', -100, 100, 1003, 'Felidae');
-- INSERT INTO pest VALUES (4, 'Dragonflies', -100, -100, 1004, 'Anisoptera');


CREATE TABLE IF NOT EXISTS Incident (
  IncidentID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  LocID UUID REFERENCES Neighborhood(LocID),
  SubmitterID UUID REFERENCES Users(UserID),
  PestID UUID REFERENCES Pest(PestID),
  ReportDate TIMESTAMP WITH TIME ZONE,
  GeoCodeAvail BOOLEAN,
  GeoCode TEXT
);


-- CREATE TABLE IF NOT EXISTS Activity (
--   ActvivityID,
--   ActivityType, -- IncidentReport, ThreadCreate, ThreadResponse, ThreedFeedback, etc.
--   ActivityTS, -- Incident.ReportDate
--   IncidentID NULL, --Incident.IncidentID
--   ThreadID NULL, --TreadID
--   ResponseID NULL, 
--   FeedbackID NULL
-- );


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

COPY Neighborhood FROM '/docker-entrypoint-initdb.d/csv/neighborhood.csv' CSV HEADER;
COPY Users FROM '/docker-entrypoint-initdb.d/csv/users.csv' CSV HEADER;
COPY Pest FROM '/docker-entrypoint-initdb.d/csv/pests.csv' CSV HEADER;
COPY Incident FROM '/docker-entrypoint-initdb.d/csv/incident.csv' CSV HEADER;
COPY Thread FROM '/docker-entrypoint-initdb.d/csv/thread.csv' CSV HEADER;
COPY ThreadResponse FROM '/docker-entrypoint-initdb.d/csv/threadresponse.csv' CSV HEADER;
COPY ThreadFeedback FROM '/docker-entrypoint-initdb.d/csv/threadfeedback.csv' CSV HEADER;