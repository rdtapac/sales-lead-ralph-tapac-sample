# Sales Leads App - hipages Full Stack Engineer Tech Challenge (Ralph Tapac)

Description: The sample is composed of a backend API developed in Python 3.7 and Flask Framework
while the client app is developed using react.js

## Things to consider before running the sample app

Accessing the docker container is different from OS. Usually for Mac (OSX), the endpoints are accessed using
**http://MACHINE_IP:port/endpoint** while accssing endpoints of other OS environment is **http://localhost:port/endpoint**

Example:

- http://192.168.99.100:5000/test_endpoint (API backend test)
- http://192.168.99.100:3000 (client app)

Configurations must also be considered:

- Please adjust SalesApp/instance/config.py with
  `SQLALCHEMY_DATABASE_URI='mysql+mysqlconnector://root:hipages@<your ip adderess>/db_sales_lead'` (Mac OS)
  `SQLALCHEMY_DATABASE_URI='mysql+mysqlconnector://root:hipages@localhost/db_sales_lead'` (non-Mac OS)
- You can reach my at rdtapac@gmail.com if you have questions regarding how to make the sample run

## Running the app

Access http://<MACHINE_IP>:3000/ or http://localhost:3000/
Please use icognito mode. Still resolving issue of the normal browser appends a trailing slash on the API endpoints which triggers error 400 during GET requests

## Why I chose to design the app this way (Architecture)

I considered microservices and single page application because it's more efficient in handling data in terms of backend
and front-end. An idea setup is that there are number of microservices which shares the data load while the using the react.js
just adjusts the changed html element

Python's strength is speed on processing backend requests and it's syntax is easier to understand.

## Things left to do (due to limited time):

- Still resolving error 400 when clicking accept or decline button (React to Python Backend - Flask)
- Update state job list after clicking a card's accept or decline button
- Adjust the footer details of the job list item based on selected menu tab (function to switch display of elements)
- UI Styling

## Additional Note

Please verify that all containers are running
`docker ps`
