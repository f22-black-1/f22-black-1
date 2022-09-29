#!/usr/bin/bash

# If you're using windows, please use git bash instead of Powershell

# Please change REPO_ROOT to your ROOT
REPO_ROOT="/Users/ant0n/Documents/Repos/f22-black-1"

# Clean Up # Warning, these baddies will remove stuff
#docker container prune --force
docker image rm -f pest_patrol_app_client
docker image rm -f server-api
docker image rm -f postgres
#docker volume prune --force
old_cont=$(docker container ls | cut -c1-12 | tail -n1)
rm -rf "$REPO_ROOT/application/server/data"

if [ "$old_cont" = "CONTAINER ID" ];
then
    echo "No dangling containers to delete..."
else
    echo "Old container found: $old_cont... you may want to remove it"
    docker rm -f $old_cont
fi


# Spin up Front End
# TODO: Something is buggy here... if you're not seeing the front end build, just run these commands manually
cd $REPO_ROOT/application/client

# install dependencies
npm install

nohup docker build -t pest_patrol_app_client:latest .  > ~/log.out &

nohup docker run -p 4200:4200 pest_patrol_app_client:latest  >> ~/log.out &

# Spin up Back End and Database

cd $REPO_ROOT/application/server

# install dependencies
npm install

nohup docker compose up >> ~/log.out &

cd $REPO_ROOT/application && tail -f ~/log.out

