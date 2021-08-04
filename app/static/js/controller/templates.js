function makeContent(pagination, pageNumber, sizeData) {
    var templateHTML = "";
    pagination.forEach((item) => {
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
        pageNumber < sizeData ?
        " <button class='btn btn-primary' onclick='nextPage()'>Siguiente</button>" :
        "";
    templateHTML += "</div></div></div>";
    return templateHTML;
}

export { makeContent };