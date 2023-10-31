#! /bin/sh

npx concurrently -k -s first -n "App,Feature Tests" -c "bgGray.white,auto" \
	# "npx http-server dist --port 3005 --silent" \
	"npx http-server dist --port 3005" \
	"npx wait-on tcp:3005 && npm run test:features"
