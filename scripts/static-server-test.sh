#! /bin/sh

# "npx http-server dist --port 3005 --silent" \

npx concurrently -k -s first -n "App,Feature Tests" -c "bgGray.white,auto" \
	"npx http-server dist --port 3001" \
	"npx wait-on tcp:3001 && npm run test:features"
