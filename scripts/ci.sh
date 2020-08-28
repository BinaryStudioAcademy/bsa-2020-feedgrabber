#!/bin/bash
#if PR on dev - run tests
if [[ $TRAVIS_EVENT_TYPE == "pull_request" && ($TRAVIS_PULL_REQUEST_BRANCH == "dev") ]]  
    then bash test.sh  
fi

#if push on dev - deploy, else - run tests
if [[ $TRAVIS_EVENT_TYPE == "push" ]] 
    then 
    if [[ $TRAVIS_BRANCH == "dev" ]]
        then bash build.sh && expect deploy.sh
    else
        bash test.sh
    fi 
fi