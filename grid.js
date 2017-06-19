var rows = 30;
var cols = 60;

var image = clickableGrid(rows,cols,function(cell,row,col,i){

    if (cell.getAttribute("state")!='I') {
        cell.setAttribute("state", "I");
    }
    else {
        cell.setAttribute("state", "S");
    }

});

function clickableGrid( rows, cols, callback ){
    var i=0;
    var table = document.createElement('table');
    table.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = table.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.className='cell';
            cell.setAttribute("row", r);
            cell.setAttribute("col", c);
            cell.setAttribute("state", "S");
            cell.id = i;
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
            i++;
        }
    }
    return table;
}

document.body.appendChild(image);     

var grid = []

function init_grid() {
    for (var r = 0; r < rows; ++r) {
        grid[r] = [];
        for (var c = 0; c < cols; ++c) {
            grid[r][c] = getCellAt(r, c);
        }
    }
}

function getGridCopy() {
    var newgrid = [];
    for (var r = 0; r < rows; ++r) {
        newgrid[r] = [];
        for (var c = 0; c < cols; ++c) {
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
    cell.className=state;
}

function nextStep() {
    init_grid();
    var newgrid = getGridCopy();
    for (var r = 0; r < rows; ++r) {
        for (var c = 0; c < cols; ++c) {
            
            if ( grid[r][c].getAttribute("state") == "I") {
                for(var i = -1; i<=1; i++){
                    for (var ii = -1; ii<=1; ii++) {
                        newgrid[r+i][c+ii] = "I" //Want to create functions like "infect neighbors(r,c)" and "try recovery(r,c)";    
                    }
                }
            }
            
        }
    }
    for (var r = 0; r < rows; ++r) {
        for (var c = 0; c < cols; ++c) {
            grid[r][c].setAttribute("state", newgrid[r][c]);
        }
    }
    //grid = newgrid;
}

function infect(r, c){

}