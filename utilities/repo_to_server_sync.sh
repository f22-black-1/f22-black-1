#!/usr/bin/bash

########################################################################
## A utility for syncing GitHub main code line to ODU CS Linux Server
##
##
## Prerequisites for using this script: 
## > passwordless ssh to server
## > VPN access (if not on campus)
## > For help in getting that setup, please contact @anton
########################################################################

#TODO: Add proper logging, error handling, and email-alerting

echo "Let the syncing begin..."
DATE=$(date "+%Y%m%d")
HOME_DIR="/Users/ant0n" # Provide your own $HOME dir
REPO_DIR="$HOME_DIR/Documents/Repos/f22-black-1/" # Provide your own repo directory
SSH_PRIVATE_KEY_FILE="$HOME_DIR/.ssh/antonMac"  # Provide your own private key (with no password)

## Create Backup on ODU CS Server
echo "Creating backup..."
BACKUP_LOC="website_backups/$DATE/secure_html/"
ssh -i $SSH_PRIVATE_KEY_FILE -o IdentitiesOnly=yes -t 411black@linux.cs.odu.edu "mkdir -p $BACKUP_LOC && cp -R secure_html $BACKUP_LOC"
echo "Backup complete..."

## Update main with latest Website Code
echo "Update main branch to get latest Website code..."
mkdir $HOME_DIR/repo_clone_tmp
cd $HOME_DIR/repo_clone_tmp
git clone "git@github.com:f22-black-1/f22-black-1.git"

## sftp Website Code to ODU CS Server
echo "Copying website to ODU CS Server..."
scp -i $SSH_PRIVATE_KEY_FILE -r $HOME_DIR/repo_clone_tmp/f22-black-1/website/secure_html 411black@linux.cs.odu.edu:/home/411black/
echo "Copying website to ODU CS Server complete!"

## Alert that Copy has been Completed
echo "Alert the team of sync via email..."
TO_ADDRESS="lmcke009@odu.edu, arasm002@odu.edu, tcooc001@odu.edu, bburt007@odu.edu, thess005@odu.edu, hmall001@odu.edu, aunde001@odu.edu, vvega001@odu.edu" # Include email addresses of people that need to be notified
FROM_ADDRESS="411black"
SUBJECT="Sync completed"
BODY="The sync and backup of the CS 411 Team Black website from Github has been completed."
echo ${BODY} | mail -s ${SUBJECT} ${TO_ADDRESS} -- -r ${FROM_ADDRESS}
echo "Team notification complete."

## Clean Up
echo "Cleaning up..."
rm -rf $HOME_DIR/repo_clone_tmp/
echo "Program complete."