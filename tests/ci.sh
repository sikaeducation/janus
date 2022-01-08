#!/bin/bash

./wait-for-it.sh -p "$PORT" -t 30 "$BASE_URL" -- npm test
