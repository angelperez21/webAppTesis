var pageNumber = 1;
var elementsXPage = 1;
var templateHTML = "";
var user = "";
var pagination;
var pageCount = 0;
var data = [];
var dataObj = [];
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

function getStop() {
    min = Math.ceil(40);
    max = Math.floor(60);
    return Math.floor(Math.random() * (max - min + 1) + 40);
}

function nextPage() {
    endTagged = new Date();
    totalTagged = endTagged.getTime() - startTagged.getTime();
    min = Math.floor((totalTagged / 1000 / 60) << 0);
    sec = Math.floor((totalTagged / 1000) % 60);
    count += 1;
    var valuebu = $('input[name="acoso"]:checked').val();
    var valuevi = $('input[name="violencia"]:checked').val();
    var tweet = document.getElementById("tweet").innerHTML;
    user = document.getElementById("user").innerHTML;
    var id = document.getElementById("idTweet").innerHTML;
    dataObj.push({
        evaluator: user,
        bullying: valuebu,
        violence: valuevi,
        timeTagged: min + ":" + sec,
    });
    newObj = {
        _id: id,
        tweet: tweet,
        evaluation: dataObj,
    };
    dataList.push(newObj);
    pageNumber++;
    if (count == pause) {
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
    data = dataDB;
    showContent(dataDB);
}

function save() {
    endLogin = new Date();
    total = endLogin.getTime() - startLogin.getTime();
    min = Math.floor((total / 1000 / 60) << 0);
    sec = Math.floor((total / 1000) % 60);
    console.log("Minutos: " + min + "\nSegundos: " + sec);
    user = document.getElementById("user").innerHTML;
    console.table(dataList);
    dataList.forEach((item) => {
        item["evaluation"].forEach((evaluation) => {});
    });
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
    templateHTML = "";
    pagination.forEach((item) => {
        dataObj = item["evaluation"];
        templateHTML +=
            '<div class="row justify-content-center pt-2 mt-2 mr-2">' +
            '<div class="col-md-12">' +
            '<div class="card text-center text-white bg-dark mb-3">' +
            '<div class="card-header">' +
            "Identificador del tweet " +
            "<p id=idTweet>" +
            item["_id"] +
            "</p>" +
            "</div>" +
            '<div class="card-body">' +
            '<p class="card-text" id="tweet" style="font-size: 20px;">' +
            item["tweet"] +
            "</p>" +
            "</div>" +
            '<div class="card-body">' +
            '<div class="input-group mb-1 ">' +
            '<div class="offset-1 input-group-prepend" >' +
            '<label class="input-group-text" style="background-color: #343A40; color: #FFFFFF; border:0;" for="inputGroupSelect01">' +
            "Acoso" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1">' +
            "<label>" +
            '<input  type="radio" name="acoso" class="card-input-element" value="0.0" checked />' +
            '<div class="panel panel-default card-input" >' +
            '<div class="panel-heading btn btn-light" style = "border-radius: 10px" >' +
            "Nada" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input  type = "radio" name = "acoso" class = "card-input-element" value = "0.35" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading btn btn-light" style="border-radius: 10px">' +
            "Poco" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input  type = "radio" name = "acoso" class = "card-input-element" value = "0.65" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading btn btn-light" style="border-radius: 10px ">' +
            "Mucho" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input  type = "radio" name = "acoso" class = "card-input-element" value = "1" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading btn btn-light" style="border-radius: 10px">' +
            "Elevado" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            "</div>" +
            '<div class = "input-group mb-1" >' +
            '<div class="offset-1 input-group-prepend">' +
            '<label class = "input-group-text" style="background-color: #343A40; color: #FFFFFF; border:0;" for = "inputGroupSelect01" >' +
            "Violencia" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "violencia" class = "card-input-element" value = "0.0" checked />' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading btn btn-light" style="border-radius: 10px">' +
            "Nada" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "violencia" class = "card-input-element" value = "0.35" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading btn btn-light" style="border-radius: 10px">' +
            "Poco" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "violencia" class = "card-input-element" value = "0.65" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading btn btn-light" style="border-radius: 10px">' +
            "Mucho" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "violencia" class = "card-input-element" value = "1" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading btn btn-light" style="border-radius: 10px">' +
            "Elevado" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
    });
    templateHTML +=
        '<div class="container">' +
        '<div class="row">' +
        '<div class="col text-center">';
    templateHTML +=
        pageNumber > 1 ?
        " <button class='btn btn-primary' onclick='previusPage()'>Anterior</button>" :
        "";
    templateHTML +=
        pageNumber < data.length ?
        " <button class='btn btn-primary' onclick='nextPage()'>Siguiente</button>" :
        "";
    templateHTML += "</div></div></div>";
    document.getElementById("container").innerHTML = "";
    document.getElementById("container").innerHTML = templateHTML;
}

getStarted();