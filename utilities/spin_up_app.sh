#!/usr/bin/bash


REPO_ROOT="/Users/ant0n/Documents/Repos/f22-black-1"

# Clean Up
docker container prune --force
docker image prune --force
old_cont=$(docker container ls | cut -c1-12 | tail -n1)
rm -rf "$REPO_ROOT/application/server/data"

if [ "$old_cont" = "CONTAINER ID" ];
then
    echo "No dangling containers to delete..."
else
    echo "Removing $old_cont..."
    docker rm -f $old_cont
fi



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

nohup docker compose up >> ~/log.out &

cd $REPO_ROOT/application && tail -f ~/log.out

