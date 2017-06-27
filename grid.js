var rows = 30; //30
var cols = 60; //60
var mapOfInfected = new Map();

var image = clickableGrid(rows,cols,function(cell,row,col,i){

    if (cell.getAttribute("state") !='I') {
        cell.setAttribute("state", "I")
        mapOfInfected.set((cell.getAttribute(row),cell.getAttribute(col)), 1);
    }
    else {
        cell.setAttribute("state", "S")
        mapOfInfected.delete(cell.getAttribute(row),cell.getAttribute(col));
    }

});


function getListOfInfected(){
    return mapOfInfected;
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
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            var cell = grid[r][c];
            
            var left = -1;
            var right = 1;
            var top = -1;
            var bottom = 1;

            if ( isInfected(cell) ) {

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

                if( isAlive() ) {
                    newgrid[r][c] = tryRecover(r, c);
                } else {
                    newgrid[r][c] = "D";
                }

                for(var i = top; i<=bottom; i++){
                    for (var ii = left; ii<=right; ii++) {
                        if (grid[r+i][c+ii].getAttribute("state") == "S") {
                            newgrid[r+i][c+ii] = tryInfectNeighbor(r, c);
                        }     
                    }
                }
            }

        }
    }
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            grid[r][c].setAttribute("state", newgrid[r][c]);
        }
    }
    
}

function isInfected(cell){
    return cell.getAttribute("state") == "I";
}

function isSus(cell){
    return cell.getAttribute("state") == "S";
}

function tryRecover(r, c){
    var chance = 0.5;
    
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
    
    //for(var i = -1; i<=1; i++){
    //    for (var ii = -1; ii<=1; ii++) {
    for(var i = top; i<=bottom; i++){
        for (var ii = left; ii<=right; ii++) {
            if (grid[r+i][c+ii].getAttribute("state") == "I") {
                chance -= .04;
            }     
        }
    }
    if (rando() <= chance) {
        return "R";
    } else {
        return "I";
    }

}

function isAlive(){
    var chanceOfDeath = 0.04;
    if (rando() <= chanceOfDeath) {
        return false;
    } else {
        return true;
    }
}

function tryInfectNeighbor(){
    if (rando() <= .5) {
        return "I";
    } else {
        return "S";
    }
}

function rando(){
    return Math.random();
}