FROM node:alpine
COPY . /home/app/
WORKDIR /home/app
EXPOSE 3000
RUN yarn
ENTRYPOINT [ "yarn", "start" ]