#!/bin/bash

rm -rf data
echo "data/ removed"
nohup docker compose up > ~/log.out &
tail -f ~/log.out