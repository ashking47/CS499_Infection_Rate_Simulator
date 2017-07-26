var diseaseSelected;

function diseaseSelection(){
    diseaseSelected = document.getElementById('diseaseDropdown').value;
    console.log(diseaseSelected);
    return diseaseSelected;
}

function getDiseaseSelected(){
    return diseaseSelected;
}

window.onclick = function(event){
    if(!event.target.mathes('dropbtn')){
        var dropdowns = document.getElementsByClassName("dropdown-content");
        
        for(var i = 0; i < dropdowns.length; i++){
            var openDropdown = dropdowns[i];
            if(openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show');
            }
        }
    }

}