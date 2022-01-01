#!/bin/bash

./wait-for-it.sh "$BASE_URL" -- npm test
