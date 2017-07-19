(function(){
    setInterval("document.body.style.zoom=1/window.devicePixelRatio",1);
    var viewport=document.createElement("meta");
    viewport.id="viewport";
    viewport.name="viewport";
    viewport.content="width=device-width, initial-scale=1";
    document.body.parentElement.children[0].appendChild(viewport);
})()

function flipVis() {
    var All = document.getElementsByClassName('invisible');
    for (var i = 0; i < All.length; i++)       {
        All[i].classList.toggle("invisible");
    }
}