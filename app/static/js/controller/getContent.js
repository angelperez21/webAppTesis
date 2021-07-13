var pageNumber = 1;
var elementsXPage = 1;
var templateHTML = "";
var pagination;
var pageCount = 0;
var data = [];
var dataObj;
var dataList = [];
var count = 0;

function paginate(array, elements_page, page_number) {
    return array.slice(
        (page_number - 1) * elements_page,
        page_number * elements_page
    );
}

function nextPage() {
    count += 1;
    var valuebu = $('input[name="acoso"]:checked').val();
    var valuevi = $('input[name="violencia"]:checked').val();
    var tweet = document.getElementById("tweet").innerHTML;
    var user = document.getElementById("user").innerHTML;
    var id = document.getElementById("idTweet").innerHTML;
    dataObj = {
        _id: id,
        tweet: tweet,
        evaluators: [{
            evaluator: user,
            bullying: valuebu,
            violence: valuevi,
        }, ],
    };
    dataList.push(dataObj);
    pageNumber++;
    if (count == 10) {
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
    for (var i = 0; i < dataList.length; i++) {
        console.log("tweet #: " + i);
        console.log(dataList[i]);
    }
    $.ajax({
        url: "/saveTags",
        type: "POST",
        data: JSON.stringify(dataList),
        contentType: "application/json",
    });
}

$.ajax({
    url: "/getTweets",
    type: "POST",
    data: JSON.stringify({
        user: document.getElementById("user").innerHTML,
    }),
    contentType: "application/json",
    success: function(response) {
        setData(response, response.length);
    },
    error: function() {
        console.log("not response");
    },
});

function showContent(_data) {
    pagination = paginate(data, elementsXPage, pageNumber);
    templateHTML = "";
    pagination.forEach((item) => {
        templateHTML +=
            '<div class="row justify-content-center pt-2 mt-2 mr-2">' +
            '<div class="col-md-12">' +
            '<div class="card text-center">' +
            '<div class="card-header">' +
            "Identificador del tweet " +
            "<p id=idTweet>" +
            item["_id"] +
            "</p>" +
            "</div>" +
            '<div class="card-body">' +
            '<p class="card-text text-muted" id="tweet" style="font-size: 25px;">' +
            item["tweet"] +
            "</p>" +
            "</div>" +
            '<div class="card-body">' +
            '<div class="input-group mb-1 ">' +
            '<div class="offset-1 input-group-prepend">' +
            '<label class="input-group-text" for="inputGroupSelect01">' +
            "Acoso" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1">' +
            "<label>" +
            '<input  type="radio" name="acoso" class="card-input-element" value="0.0" checked />' +
            '<div class="panel panel-default card-input" >' +
            '<div class = "panel-heading" style = "background-color: #B9DAFC; border-radius: 10px" >' +
            "Nada" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input  type = "radio" name = "acoso" class = "card-input-element" value = "0.35" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading" style="background-color: #B9DAFC; border-radius: 10px">' +
            "Poco" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input  type = "radio" name = "acoso" class = "card-input-element" value = "0.65" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading" style="background-color: #B9DAFC; border-radius: 10px">' +
            "Mucho" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input  type = "radio" name = "acoso" class = "card-input-element" value = "1" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading" style="background-color: #B9DAFC; border-radius: 10px">' +
            "Elevado" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            "</div>" +
            '<div class = "input-group mb-1" >' +
            '<div class="offset-1 input-group-prepend">' +
            '<label class = "input-group-text" for = "inputGroupSelect01" >' +
            "Violencia" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "violencia" class = "card-input-element" value = "0.0" checked />' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading" style="background-color: #B9DAFC; border-radius: 10px">' +
            "Nada" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "violencia" class = "card-input-element" value = "0.35" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading" style="background-color: #B9DAFC; border-radius: 10px">' +
            "Poco" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "violencia" class = "card-input-element" value = "0.65" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading" style="background-color: #B9DAFC; border-radius: 10px">' +
            "Mucho" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "violencia" class = "card-input-element" value = "1" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading" style="background-color: #B9DAFC; border-radius: 10px">' +
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
showContent(data);