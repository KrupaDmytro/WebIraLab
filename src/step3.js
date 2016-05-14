// send loanding request




"use strict";

// hide local variables scope
(function()
{
    var $ = function (a) { return document.getElementById(a);}

   // var myitems = [ {name:"Вимог до переказів валюти українцями поменшало", desc:" НБУ спростив процедуру валютних переказiв. Надсилати доляри та євро стало простiше.", foto:0, href:"#"},
   //     {name:"Кінець мрії про Європу", desc:"  Несподівана заява президента Єврокомісії стала холодним душем для багатьох українців Жан-Клод Юнкер уперше публічно визнав, "+
   //     "що у найближчі 20 - 25 років Україна не зможе набути членство в Євросоюзі.", foto:0, href:"#"},
   //     {name:"Як найкраще фотографувати людей, які сплять.", desc:"Видання National Geographic показало найкращі фото, на яких продемонстровані люди, котрі сплять.", foto:1, href:"FotoOfPeopels.html"}];
    var myitems = [];
    var itemcontainer = $("itemcontainer");

    for(var i in myitems)
    {
        var item = myitems[i];

        if(item.href == "#") {
            itemcontainer.innerHTML += '<div class="w3-col">' +
                '<h2>' +
                item.name;

            +'</h2>';
            if (item.foto == 1) itemcontainer.innerHTML += '<div class="w3-round-jumbo w3-tag w3-red" h2>ФОТО</div></h2>';
            itemcontainer.innerHTML += '<br>' + item.desc + '<hr>' +
                '</div>';
        }
        else {
            itemcontainer.innerHTML += '<div class="w3-col">' +
                '<h2><a href="' + item.href + '">' +
                item.name;

            +'</h2></a>';
            if (item.foto == 1) itemcontainer.innerHTML += '<div class="w3-round-jumbo w3-tag w3-red" h2>ФОТО</div></h2>';
            itemcontainer.innerHTML += '<br>' + item.desc + '<hr>' +
                '</div>';
        }
    }
    function w3_open() {
        document.getElementsByClassName("w3-sidenav")[0].style.display = "block";
        document.getElementsByClassName("w3-overlay")[0].style.display = "block";
    }

    function w3_close() {
        document.getElementsByClassName("w3-sidenav")[0].style.display = "none";
        document.getElementsByClassName("w3-overlay")[0].style.display = "none";
    }

    var xmlhttp = new XMLHttpRequest();
    var url = "step3.php";
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4)
        {
            if (xmlhttp.status == 200)
            {
                myitems = JSON.parse(xmlhttp.responseText);
                updateContentF();
            }
            else
            {
                alert("Error loading shop content. xmlhttp.status = " + xmlhttp.status);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
})();
var xmlhttp = new XMLHttpRequest();
var url = "step3.php";
xmlhttp.onreadystatechange = function()
{
    if (xmlhttp.readyState == 4)
    {
        if (xmlhttp.status == 200)
        {
            myitems = JSON.parse(xmlhttp.responseText);
            updateContentF();
        }
        else
        {
            alert("Error loading shop content. xmlhttp.status = " + xmlhttp.status);
        }
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
