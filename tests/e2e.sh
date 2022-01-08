#!/bin/bash

./wait-for-it.sh -p "$PORT" "$BASE_URL" -- npm run test:watch
