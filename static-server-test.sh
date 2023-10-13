#! /bin/sh

npx concurrently -k -s first -n "App,Feature Tests" -c "bgGray.white,auto" \
	"npx http-server build --port 3000 --silent" \
	"npx wait-on tcp:3000 && npm run test:features"
