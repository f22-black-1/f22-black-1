#!/usr/bin/bash

# If you're using windows, please use git bash instead of Powershell

# Please change REPO_ROOT to your ROOT
#REPO_ROOT="/Users/ant0n/Documents/Repos/f22-black-1"
REPO_ROOT="/f22-black-1"

echo $REPO_ROOT

# In order to build the front-end we need to do docker login
docker login

# Clean Up # Warning, these baddies will remove stuff
#docker container prune --force
# docker image rm -f pest_patrol_app_client
# docker image rm -f server-api
# docker image rm -f postgres
#docker volume prune --force
# old_cont=$(docker container ls | cut -c1-12 | tail -n1)


# if [ "$old_cont" = "CONTAINER ID" ];
# then
#     echo "No dangling containers to delete..."
# else
#     echo "Old container found: $old_cont... you may want to remove it"
#     docker rm -f $old_cont
# fi


# Spin up Front End
cd $REPO_ROOT/application/client

# install dependencies
npm install

nohup docker build -t pest_patrol_app_client:1.0 .  > ~/log.out &

nohup docker run -p 4200:4200 pest_patrol_app_client:1.0  >> ~/log.out &

# Spin up Back End and Database

cd $REPO_ROOT/application/server

# install dependencies
npm install
rm -rf "$REPO_ROOT/application/server/data"
nohup docker compose up >> ~/log.out &

cd $REPO_ROOT/application && tail -f ~/log.out
