var lastClicked;
var grid = clickableGrid(30,60,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    if (el.className!='I') {
        el.className='I';
    }
    else {
        el.className='S';
    }
    //if (lastClicked) lastClicked.className='';
    lastClicked = el;

});

document.body.appendChild(grid);
     
function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.setAttribute("row", r);
            cell.setAttribute("col", c);
            cell.id = i;
            cell.className='S';
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

function getCellAt(row, col)    {
  var All = document.getElementsByTagName('*');
  for (var i = 0; i < All.length; i++)       {
    if (All[i].getAttribute("row") == row && All[i].getAttribute("col") == col) { return All[i] }
  }
}

function alterCell(cell, state){
    cell.className=state;
}

function nextStep(grid) {

}