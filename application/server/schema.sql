DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS UserProfileSettings;
DROP TABLE IF EXISTS UserType;
DROP TABLE IF EXISTS Neighborhood;
DROP TABLE IF EXISTS Incident;
DROP TABLE IF EXISTS Thread;
DROP TABLE IF EXISTS ThreadResponse;
DROP TABLE IF EXISTS ThreadFeedback;
DROP TABLE IF EXISTS Pest;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- For generating UUIDs; may require 'postgresql14-contrib' package

CREATE TABLE IF NOT EXISTS Users(
  UserID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  LocID UUID REFERENCES Neighborhood(LocID),
  UserName VARCHAR(50) UNIQUE,
  Email VARCHAR(255) UNIQUE,
  UserTypeID INT REFERENCES UserType(UserTypeID)
);

CREATE TABLE IF NOT EXISTS UserProfileSettings(
  UserProfileID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  FirstName VARCHAR(50),
  LastName VARCHAR(50),
  Password 
  CustomViewAreaSet BOOLEAN,
  CustomViewArea INT,
  CustomeFilterSet BOOLEAN,
  FilterPest VARCHAR(50),
  FIlterIncidentAge VARCHAR(255),
  FilterUser VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS UserType(
  UserTypeID INT PRIMARY KEY,
  UserType VARCHAR(50),
);

CREATE TABLE IF NOT EXISTS Neighborhood (
  LocID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  LocName VARCHAR(255),
  ZipCode CHAR(5),
  State VARCHAR(255),
  City VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Incident (
  IncidentID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  LocID UUID REFERENCES Neighborhood(LocID),
  SubmitterID UUID REFERENCES Users(UserID),
  PestID UUID REFERENCES Pest(PestID),
  ReportDate TIMESTAMP WITH TIME ZONE,
  GeoCodeAvail BOOLEAN,
  GeoCode TEXT
);

CREATE TABLE IF NOT EXISTS Thread (
  ThreadID UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4 (),
  IncidentID UUID REFERENCES Incident(IncidentID),
  LocID UUID REFERENCES Incident(LocID),
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

CREATE TABLE IF NOT EXISTS Pest(
  PestID
  IncidentID
  PestName
  PestType
  Severity
  PestDescription
  PestImage
);