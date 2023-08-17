#! /bin/sh

npm run test:unit &&
	npx concurrently -k -s first -n "Storybook,Component Tests" -c "bgGray.white,auto" \
		"npx http-server storybook-static --port 6006 --silent" \
		"npx wait-on tcp:6006 && npm run test:components" &&
	npx concurrently -k -s first -n "App,Feature Tests" -c "bgGray.white,auto" \
		"npx http-server build --port 3000 --silent" \
		"npx wait-on tcp:3000 && npm run test:features"
