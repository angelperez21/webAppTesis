import { makeContent } from "./templates.js";

var pageNumber = 1;
var elementsXPage = 1;
var templateHTML = "";
var user = "";
var pagination;
var pageCount = 0;
var data = [];
var tagList = [];
var dataList = [];
var count = 0;
var pause = 0;
var startLogin, endLogin, startTagged, endTagged;

function paginate(array, elements_page, page_number) {
    return array.slice(
        (page_number - 1) * elements_page,
        page_number * elements_page
    );
}

// Función para obtener el numero de tweets antes de una
// pregunta para verificar si el usuario se encuentra atento
function getStop() {
    var min = Math.ceil(40);
    var max = Math.floor(60);
    return Math.floor(Math.random() * (max - min + 1) + 40);
}

function nextPage() {
    endTagged = new Date();
    totalTagged = endTagged.getTime() - startTagged.getTime();
    seg = totalTagged / 1000;
    console.log("Tiempo ocupado para etiquetar -> " + seg);
    count += 1;
    var valuebu = $('input[name="acoso"]:checked').val();
    var valuevi = $('input[name="violencia"]:checked').val();
    var tweet = document.getElementById("tweet").innerHTML;
    user = document.getElementById("user").innerHTML;
    var id = document.getElementById("idTweet").innerHTML;
    tagList.push({
        evaluator: user,
        bullying: valuebu,
        violence: valuevi,
        timeTagged: seg,
    });
    newObj = {
        _id: id,
        tweet: tweet,
        evaluation: tagList,
    };
    dataList.push(newObj);
    pageNumber++;
    if (count == pause) {
        console.table(dataList);
        save();
    }
    showContent(pagination);
}

function previusPage() {
    dataList.pop();
    pageNumber--;
    showContent(pagination);
}

function setData(dataDB) {
    if (dataDB != "Server error") {
        data = dataDB;
        showContent(dataDB);
    } else {
        data.push({
            _id: "No id",
            evaluation: [],
            tweet: "No tweet",
        });
        console.table(data);
        showContent(dataDB);
    }
}

function save() {
    endLogin = new Date();
    total = endLogin.getTime() - startLogin.getTime();
    seg = total / 1000;
    console.log("Tiempo en segundos loggeado: " + seg);
    user = document.getElementById("user").innerHTML;
    console.table(dataList);
    $.ajax({
        url: "/saveTags",
        type: "POST",
        data: JSON.stringify(dataList),
        contentType: "application/json",
        success: function() {
            window.location = "/";
        },
        error: function() {},
    });
}

function getStarted() {
    startLogin = new Date();
    pause = getStop();
    $.ajax({
        url: "/getTweets",
        type: "POST",
        data: JSON.stringify({
            user: document.getElementById("user").innerHTML,
            stop: pause,
        }),
        contentType: "application/json",
        success: function(response) {
            setData(response, response.length);
        },
        error: function() {
            console.log("not response");
        },
    });
}

function showContent(_data) {
    startTagged = new Date();
    pagination = paginate(data, elementsXPage, pageNumber);
    templateHTML += makeContent(pagination, pageNumber, data.length);
    document.getElementById("container").innerHTML = "";
    document.getElementById("container").innerHTML = templateHTML;
}

getStarted();