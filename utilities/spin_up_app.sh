#!/usr/bin/bash


REPO_ROOT="/Users/ant0n/Documents/Repos/f22-black-1"

# Spin up Front End

cd $REPO_ROOT/application/client

nohup docker build -t pest_patrol_app_client:1.0 .  > ~/log.out &

nohup docker run -p 4200:4200 pest_patrol_app_client:1.0  >> ~/log.out &

# Spin up Back End and Database

cd $REPO_ROOT/application/server

nohup docker compose up >> ~/log.out &

cd $REPO_ROOT/application && tail -f ~/log.out

