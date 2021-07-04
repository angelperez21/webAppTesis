var pageNumber = 1;
var elementsXPage = 1;
var templateHTML = "";
var pagination;
var pageCount = 0;
var data = [];

function paginate(array, elements_page, page_number) {
    return array.slice(
        (page_number - 1) * elements_page,
        page_number * elements_page
    );
}

function nextPage() {
    value = document.getElementsByTagName("acoso").values;
    console.log(value);
    pageNumber++;
    showContent(pagination);
}

function previusPage() {
    pageNumber--;
    showContent(pagination);
}

function setData(dataDB) {
    data = dataDB;
    showContent(dataDB);
}

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
            item["_id"] +
            "</div>" +
            '<div class="card-body">' +
            '<p class="card-text text-muted" style="font-size: 25px;">' +
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
            '<input type="radio" name="acoso" class="card-input-element" value="0.0"/>' +
            '<div class="panel panel-default card-input" >' +
            '<div class = "panel-heading" style = "background-color: #B9DAFC; border-radius: 10px" >' +
            "Nada" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "acoso" class = "card-input-element" value = "0.35" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading" style="background-color: #B9DAFC; border-radius: 10px">' +
            "Poco" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "acoso" class = "card-input-element" value = "0.65" / >' +
            '<div class="panel panel-default card-input">' +
            '<div class="panel-heading" style="background-color: #B9DAFC; border-radius: 10px">' +
            "Mucho" +
            "</div>" +
            "</div>" +
            "</label>" +
            "</div>" +
            '<div class="col-md-1 col-lg-2 col-sm-1 ">' +
            "<label>" +
            '<input type = "radio" name = "acoso" class = "card-input-element" value = "1" / >' +
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
            '<input type = "radio" name = "violencia" class = "card-input-element" value = "0.0" / >' +
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

$.ajax({
    url: "http://10.21.3.80:8000/getTweets",
    success: function(response) {
        console.log("He sido invocado");
        setData(response, response.length);
    },
    error: function() {
        console.log("not response");
    },
});