FROM ubuntu:latest

# Setting shell
SHELL ["/bin/bash", "-c"]

# Working dir
RUN mkdir /app
WORKDIR /app

# Setting Environment
RUN apt update 
RUN apt install curl sudo -y
RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
RUN source ~/.bashrc   
RUN nvm install 16.16.0
#RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
#RUN apt install nodejs -y
RUN npm version

#Copy package
COPY package.json /app

# Run build
RUN npm install -g @angular/cli
#RUN npm config set registry http://registry.npmjs.org/
RUN yarn install
#RUN npm install -d

#Copy over app to app folder
COPY . /app 

#Expose server at port ( accessible outside of container)
EXPOSE 8080

#Start app 
CMD ["ng", "serve", "--port", "8080"]
