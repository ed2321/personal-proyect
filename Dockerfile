# # Pull base image from stock node image.
# FROM node:16

# #install PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
# RUN npm install pm2 -g

# RUN useradd --user-group --create-home --shell /bin/false appuser
# ENV HOME=/home/appuser

# COPY package.json $HOME/app/

# RUN chown -R appuser:appuser $HOME/*

# USER appuser

# WORKDIR $HOME/app
# RUN npm install

# ADD ./ $HOME/app/
# COPY .env $HOME/app/

# #Start APP with PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
# CMD ["pm2-runtime", "ecosystem.config.js"]

FROM keymetrics/pm2:16-alpine

COPY src src/
COPY . .

# Install app dependencies
RUN npm install

# Show current folder structure in logs
RUN ls -al -R

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
