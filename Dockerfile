FROM keymetrics/pm2:16-alpine

COPY src src/
COPY . .

# Install app dependencies
RUN npm install
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
