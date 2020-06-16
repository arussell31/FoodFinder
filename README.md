# FoodFinder

SETUP:
To Run/Edit this code you will need Node.js and Express generator. Node can be found here: https://nodejs.org/en/download/ 
Once Node has been installed, open a command prompt and run npm install express-generator -g
You can use any development environment that you would like, but I used Visual Studio Code, which can be found here:
https://code.visualstudio.com/ Once your environment is set up, navigate to your project folder in cmd and run npm install.
This should install all the necessary dependencies from the package.json file.

This project is a client side application that interacts with San Francisco's food truck open data set. More info on that
dataset can be found here https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data To access
their API endpoint, you will need to create a free account and generate an application token. You can find more info on how 
to do that here https://dev.socrata.com/foundry/data.sfgov.org/rqzj-sfat 

PROJECT NOTES:
I have made this a client side application for a few reasons. First, The publically accessible API from the San Francisco 
government returns a comprehensive dataset that willgive me the necessary information to build a web application. Calculating 
the distance between a given Lat/Lon point and each food truck Lat/Lon point is mathematically straight forward and the dataset 
is small enough that handling this on the client side should not cause any performance issues. After the initial call to the SF 
API, the client will not need to make any more calls to server side. This should save some time. However, there are some possible 
pitfalls. Security and client side processing ability should be considered as storing and processing data client side can 
exacerbate these vulnerabilities. As this project currently stands, I am not overly concerned about performance or security due 
to the size and public nature of the data set.

I have built client side applications before in a commercial setting, but my primary focus over the past few years has been 
embedded systems and C++ APIs. Working on this project has given me an opportunity to work with technologies I have not worked
with for some time along with some new technologies and I quite enjoyed it. Below is a list of some of the key tools I used for this project:

bootstrap
datatable
ajax
node.js
font awesome
jquery
pug
express

I came across a Microsoft tutorial while doing research to get a locally hosted website up and running. 
https://docs.microsoft.com/en-us/windows/uwp/get-started/get-started-tutorial-fullstack-web-app This tutorial influenced a lot 
of the technologies I used because it made making a shell web UI quick and easy. It also gave me insight into what technologies
developers at Microsoft may use or interact with. One tool that proved to be particularly useful was express. I've never used 
express before, but I was pleased how easy setting up a bare website was with this tool. It takes care of a lot of the setup that
gets repetitive over project. 