# Pre-requisites

Node  

# Instructions
### Clone repository

`git clone git@github.com:johnlinnane/secure-prog-app.git`

### Install App and Dependencies

`cd` into secure-prog-app/client folder  

run this:  
`npm install`  


`cd` into secure-prog-app/server folder  

run this:  
`npm install`  


### Start Server

`cd` into secure-prog-app/server

run this:  

`nodemon server`

### Start Front-end

cd into secure-prog-app/client

run this:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  
  
Will need to get the secure-prog-app/.env file off me, which contains the secret environmental variables

# React

this project is using ReactJS

the file that's sent to the broser is secure-prog-app/client/public/index.html  
which is then populated by secure-prog-app/client/src/index.js  
which draws from the other javascript files in the src folder

Youtube: [Node.js Tutorial For Absolute Beginners](https://www.youtube.com/watch?v=U8XF6AFGqlc)  
Youtube: [Node.js Crash Course](https://www.youtube.com/watch?v=fBNz5xF-Kx4)  
Youtube: [A High Level Overview of React](https://www.youtube.com/watch?v=FRjlF74_EZk)  
Youtube: [Simple Passport Local Authentication w/ React & Node.js](https://www.youtube.com/watch?v=IUw_TgRhTBE)  

# MongoDB

App is running on a free [cloud version](https://https://www.mongodb.com/cloud/atlas) of MongoDB at the moment.
I plan to run an [instance on the server](https://docs.mongodb.com/guides/server/install/) once the site is in order.