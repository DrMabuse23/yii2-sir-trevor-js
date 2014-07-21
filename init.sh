#!/usr/bin/env bash
#
# Script to initialize the repo
# - install required node packages
# - install required bower packages
# - install git hooks

node=`which node 2>&1`
if [ $? -ne 0 ]; then
  echo "Please install NodeJS."
  echo "http://nodejs.org/"
  exit 1
fi

overcommit=`which overcommit 2>&1`
if [ $? -ne 0 ]; then
  echo "Please install overcommit:"
  echo "gem install overcommit"
fi

bower=`which bower 2>&1`
if [ $? -ne 0 ]; then
  echo "Installing Bower ..."
  npm install -g bower
fi

echo "Fetching latest master version ..."
git checkout master
git pull origin master

echo "Installing required npm packages ..."
npm install


echo "Installing required bower packages ..."
bower install


echo "Initializing required submodules ..."
git submodule update --init

echo "Initializing git hooks ..."
overcommit

echo "Done."