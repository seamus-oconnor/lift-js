############################################################
# Dockerfile for the building & testing using Grunt.
############################################################

# Set the base image to Debian Wheezy
FROM debian:wheezy

# File Author / Maintainer
MAINTAINER "Séamus O'Connor"

# Update the repository
RUN apt-get update --fix-missing

RUN apt-get upgrade

# Get Debian packages
RUN apt-get install -y python g++ make checkinstall fakeroot wget git nginx

# Download and Install Node JS
RUN mkdir tmp/node && \
    cd tmp/node && \
    wget -N http://nodejs.org/dist/v0.10.26/node-v0.10.26.tar.gz && \
    tar xzvf node-v0.10.26.tar.gz && \
    cd node-* && \
    ./configure && \
    checkinstall -y --install=no --pkgversion $(echo $(pwd) | sed -n -re's/.+node-v(.+)$/\1/p') make -j$(($(nproc)+1)) install && \
    dpkg -i node_* && \
    rm -rf /tmp/node

# Update NPM
RUN npm -g update npm

# Install global utilities via NPM
RUN npm -g install grunt-cli@0.1.13 \
    phantomjs@1.9.7-3 \
    bower@1.3.2

# Copy a configuration file from the current directory
ADD package.json /

# Install grunt modules
RUN npm install

ADD bower.json /

RUN bower --allow-root install

### Setup Nginx ###

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
ADD nginx.conf /etc/nginx/

# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Set the default command to execute
# when creating a new container
CMD service nginx start
