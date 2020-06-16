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
with for some time along with some new technologies and I quite enjoyed it. Below is a list of some of the key tools I used for this 
project:

bootstrap,
datatable,
ajax,
node.js,
font awesome,
jquery,
pug,
express

I came across a Microsoft tutorial while doing research to get a locally hosted website up and running. 
https://docs.microsoft.com/en-us/windows/uwp/get-started/get-started-tutorial-fullstack-web-app This tutorial influenced a lot 
of the technologies I used because it made making a shell web UI quick and easy. It also gave me insight into what technologies
developers at Microsoft may use or interact with. One tool that proved to be particularly useful was express. I've never used 
express before, but I was pleased how easy setting up a bare website was with this tool. It takes care of a lot of the setup that
gets repetitive over project. 

TESTING:
There are a few points of failure that stick out to me right away. The first point of failure is if the API returns no data. If this happens,
our Data table will simply not be populated. The second point of failure is improper user input. Currently, my solution to this is to
"crop" the data to a valid number if the user enters in invalid input. If the user does not enter in any input, the I default the user 
location to the Microsoft SF office and I default the number of desired food carts to 5 since that was the minimum number of carts 
requested for this assignment. To test what happens with poor user input, I entered in random values into the input fields to see if
I got any errors. I also submitted a request without any input fields being filled out. In these cases, the interface behaved as I would
expect. To check that I was getting complete and accurately sorted and filtered data, I inserted lots of console logging and took note of
what was printed to the console as I interacted with the web page. I have since removed the comments to avoid cluttering up the client 
console. I also tested the app in several browsers to ensure cross browser compatibility. I have not tested on a mobile device due to 
resource and time constraints. 

FUTURE WORK:
Several improvements can be made to this application. First, we could create user accounts for users to sign in and create custom filters
based on what type of food they like or what areas they frequent. They could save what carts they have been to for future reference. Developing
a custom server side API to process more complex requests is also a crucial next step for scaling this project. It would also be nice to
enter in an address instead of latitude and longitude coordiates. Google has some nice APIs that do that, but they aren't free so that has not
been implemented this iteration of the project. It would also be nice for the user to specify if they want to get the closest carts by distance 
or time. Currently, the carts are only filtered by distance. Filtering near by carts by their hours of operation is also a great addition to
this project that could help users avoid making plants to eat lunch at a food truck that isnt open. The website has a very basic UI that could use
some more work. Given more time I would make the design much more polished and attractive. Having more features would also make the page look like
more than just some buttons and a table.