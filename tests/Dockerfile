FROM mcr.microsoft.com/playwright:v1.17.0-focal
WORKDIR /app

COPY . .
RUN npm install -g npm && npm install && npx playwright install

CMD ["npm", "run", "test"]
