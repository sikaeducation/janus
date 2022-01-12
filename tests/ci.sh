#!/bin/bash

./wait-for-it.sh -t 60 frontend:3000 -- sleep 10 # Wait for React to finish building to prevent flake
npm run test
