## The Application Stack

### Docker

[TBD Instructions for Installing Docker]

#### Angular Front End
Once docker has been installed as is working we run the Front End Server as follows:

`cd f22-black-1/application/client`

`docker build -t meanstackapp:1.0 .`

`docker run -p 4200:4200 meanstackapp:1.0`

#### Node.js Middleware

In another terminal, we will run the Back End Server as follws:

`cd f22-black-1/application/server`

`docker build -t meanserver:1.0 .`

`docker run -p 8080:8080 meanserver:1.0`


[TBD More Instructions]
