var infectedMap = getListOfInfected();
/*
function instantiateInfectedMap(){
    var i = getListOfInfected();
}
*/
function incrementDaysInfected(){
    for(element in infectedMap){
        infectedMap[element] ++;
    }
    return infectedMap;
}