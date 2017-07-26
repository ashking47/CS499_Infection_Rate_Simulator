var rows = 40; 
var cols = 80; 
var mapOfInfected = new Map();
var listOfInfected = [];
var modifiedCells = [];


var image = clickableGrid(rows,cols,function(cell,row,col,i){

    if (cell.getAttribute("state") !='I') {
        cell.setAttribute("state", "I");
        listOfInfected.push(cell);
        modifiedCells.push(cell);
    }
    else {
        cell.setAttribute("state", "S");
        removeInfected(cell, listOfInfected);
        removeInfected(cell, modifiedCells);
    }

});

//used for testing to make sure cells are actually getting added/removed from arrays in above function.
function printCells(array){
    for(var i = 0; i < array.length; i++){
        console.log(array[i]);
    }
}


function removeInfected(cell, array){
    var row = (cell.getAttribute("row"));
    var col = (cell.getAttribute("col"));
    var index = array.indexOf(getCellAt(row, col));
    if(index != -1){
        array.splice(index, 1);
    }
}

     
function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0; r<rows; r++){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0; c<cols; c++){
            var cell = tr.appendChild(document.createElement('td'));
            cell.setAttribute("row", r);
            cell.setAttribute("col", c);
            cell.id = i;
            alterCell(cell, "S");
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
            i++;
        }
    }
    return grid;
}

document.body.appendChild(image);     

var grid = []

function init_grid() {
    for (var r = 0; r < rows; r++) {
        grid[r] = [];
        for (var c = 0; c < cols; c++) {
            grid[r][c] = getCellAt(r, c);
        }
    }
}

function getGridCopy() {
    var newgrid = [];
    for (var r = 0; r < rows; r++) {
        newgrid[r] = [];
        for (var c = 0; c < cols; c++) {
            newgrid[r][c] = grid[r][c].getAttribute("state");
        }
    }
    return newgrid;
}

function getCellAt(row, col)    {
  var All = document.getElementsByTagName('*');
  for (var i = 0; i < All.length; i++)       {
    if (All[i].getAttribute("row") == row && All[i].getAttribute("col") == col) { return All[i] }
  }
}

function alterCell(cell, state){
    cell.setAttribute("state", state)
}


function nextStep() {
    init_grid();
    var newgrid = getGridCopy();
    printCells(modifiedCells);

//Takes the cells saved in the infected array and uses those to try and infect surrounding cells.
     for (var i = 0; i < listOfInfected.length; i++) {
            var cell = listOfInfected[i];
            if ( isInfected(cell) ) {
                spreadFrom(newgrid, parseInt(cell.getAttribute("row")), parseInt(cell.getAttribute("col")));
            }
        }

//Takes the cells in the modified cell array(cells that are recovered/dead/infected) and pushes them to the new grid.
    for(var i = 0; i < modifiedCells.length; i++){
        var cell = modifiedCells[i];
        var r = parseInt(cell.getAttribute("row"));
        var c = parseInt(cell.getAttribute("col"));
        cell.setAttribute("state", newgrid[r][c]);
    }
}

function spreadFrom(newgrid, r, c){
    if( isAlive() ) {
        newgrid[r][c] = tryRecover(r, c);
    } else {
        newgrid[r][c] = "D";
        modifiedCells.push(getCellAt(r,c));
    }

    doThisToNeighbors(r,c,infectNeighbor,newgrid);

}

//actionFunction is a function that will either infect, recover, or kill cells.
//doThisToNeighbors is a function that will take the actionFunction and perform that action on the surrounding cells.
function doThisToNeighbors(r, c, actionFunction, mut) {
    var borders = getBorders(r, c);
    var left = borders.left;
    var right = borders.right;
    var top = borders.top;
    var bottom = borders.bottom;
    for(var i = top; i<=bottom; i++){
        for (var ii = left; ii<=right; ii++) {
            actionFunction(r, c, i, ii, mut);    
        }
    }
}

function infectNeighbor(r, c, i, ii, newgrid) {
    if (grid[r+i][c+ii].getAttribute("state") == "S") {
        var state = tryInfectNeighbor(r, c)
        newgrid[r+i][c+ii] = state;
        if (state == "I") {
            listOfInfected.push(grid[r+i][c+ii]);
            modifiedCells.push(grid[r+i][c+ii]);
        }
    }
}
//This function retrieves the borders of the grid so that the program will continue even if it reaches one of the edges.
function getBorders(r, c) {
    var left = -1;
    var right = 1;
    var top = -1;
    var bottom = 1;
    if (r == 0) {
        top = 0;
    }
    if (r == rows-1) {
        bottom = 0;
    }
    if (c == 0) {
        left = 0;
    }
    if (c == cols-1) {
        right = 0;
    }
    return {
        top: top,
        bottom: bottom,
        left: left,
        right: right
    };
}

function isInfected(cell){
    return cell.getAttribute("state") == "I";
}

function isSus(cell){
    return cell.getAttribute("state") == "S";
}

function tryRecover(r, c){

    var infectedCount = 0
    doThisToNeighbors(r,c,countInfected,infectedCount);
    var chance = 0.3 - (0.04 * infectedCount);  // var chance = diseaseAttributes[1];

    if (randomNumber() <= chance) {
        index = listOfInfected.indexOf(getCellAt(r, c));
        if (index > -1) {
            listOfInfected.splice(index, 1);
        }
        modifiedCells.push(getCellAt(r,c));
        return "R";
    } else {
        return "I";
    }

}

function countInfected(r, c, i, ii, infectedNeighbors) {
    if (grid[r+i][c+ii].getAttribute("state") == "I") {
        infectedNeighbors += 1;
    }  
}

function isAlive(){
    var chanceOfDeath = 0.1 ;  // chanceOfDeath = diseaseAttributes[2]
    if (randomNumber() <= chanceOfDeath) {
        return false;
    } else {
        return true;
    }
}

function tryInfectNeighbor(){               //////////////////////// CHANCE TO INFECT NEIGHBOR
    if (randomNumber() <= 0.5 ) { // randomNumber() <= diseaseAttributes[0];
        return "I";
    } else {
        return "S";
    }
}

function randomNumber(){
    return Math.random();
}

function startSim() {
    for( var days = 0; days < 1; days++) {
        nextStep();
    }
}

/*diseaseAttributes should call fetchDisease from DBConnection. fetchDisease creates a connection to the db and returns an array of selected values retrieved from a query.
The db connects and stores the values in the array but does not transfer over to this class. I cannot figure out why it will not work.
*/
var selectedDisease = getDiseaseSelected();
var diseaseAttributes = fetchDisease(selectedDisease);//List of attributes: infection_rate, recovery_rate, _death,rate