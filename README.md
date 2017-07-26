# CS499_Infection_Rate_Simulator
This is an infection rate simulator. To start this program open the MainPage.html file. In this file the user will be able to select a disease from the dropdown menu and press submit. Once the submit button has been clicked, the MapCreator.html page will appear. From here, the user can click on any number of cells within the grid to select them as the individuals who will act as patient zero in this simulation. A cell can be clicked twice to remove selection. Once all desired cells are selected the user can press the simulate button located at the top of the screen. This button will simulate one day in the given city with this disease. At this point the only city that will display is Indianapolis, IN. Each click of the simulate button will act as one day’s passing. The button can be pressed any number of times.

//This program does not properly retrieve data from the DBConnection class to grid.js
The database connection is established and the query and data retrieved are correct it just does not translate over to grid.js

For this project we would still like to achieve the following:
1. properly connect grid.js to DBConnection.js
2. Add in long and lad coordinates for different cities into our database
3. Create a dropdown for these locations in the MainPage.html
4. Find a new way to redraw the grid that would decrease time complexity
