#base image
FROM node:14.21.1

# set working directory
RUN mkdir /usr/src/api

WORKDIR /usr/src/api

COPY . .

# add /usr/src/app/node_modules/.bin' to $PATH
ENV PATH /usr/src/api/node_modules/.bin: $PATH

# install and cache app dependencies
RUN npm install --silent

EXPOSE 5000

# start app
CMD ["npm", "run", "dev"]