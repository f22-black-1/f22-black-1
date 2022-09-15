## The Application Stack

### Docker

#### Install Docker Desktop

Navigate here to install Docker Desktop: https://www.docker.com/products/docker-desktop/

#### Angular Front End
Once docker has been installed as is working we run the Front End Server as follows:

`cd f22-black-1/application/client`

`docker build -t pest_patrol_app_client:1.0 .`

`docker run -p 4200:4200 pest_patrol_app_client:1.0`

Everything needed for development can be done with a browser and IDE

#### Node.js Middleware

In another terminal, we will run the Back End Server as follws:

`cd f22-black-1/application/server`

`docker build -t pest_patrol_app_server:1.0 .`

`docker run -p 8080:8080 pest_patrol_app_server:1.0`

In order to develop easily with REST APIs it's helpful to have a an API Client. I recommend using https://insomnia.rest/download

### Database Stuff

[TBD]
