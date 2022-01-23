#!/bin/bash

./wait-for-it.sh -t 60 frontend:3000 -- npm run test
