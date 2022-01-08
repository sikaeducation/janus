#!/bin/bash

./wait-for-it.sh -t 30 "$BASE_URL" -- npm test
