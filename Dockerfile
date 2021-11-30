# Pull base image from stock node image.
FROM node:16

#install PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
RUN npm install pm2 -g

RUN useradd --user-group --create-home --shell /bin/false appuser
ENV HOME=/home/appuser

COPY package.json $HOME/app/
RUN chown -R appuser:appuser $HOME/*

USER appuser

WORKDIR $HOME/app
RUN npm install

ADD ./ $HOME/app/

#Expose port and start application
EXPOSE 4000

#Start APP with PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
CMD ["pm2-runtime", "app.js"]