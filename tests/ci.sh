#!/bin/bash

./wait-for-it.sh -t 60 frontend:3000 -- sleep 5
npm run test
