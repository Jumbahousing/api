# FROM mariadb:10.1.21
#
# ENV MYSQL_ROOT_PASSWORD SZ!=k5|)P}vY(7e
# ENV MYSQL_DATABASE accounts
#
# EXPOSE 3306

FROM node:7.2.0
ADD . /code
WORKDIR /code
RUN npm install
RUN npm install -g nodemon
CMD [ "npm", "start" ]
