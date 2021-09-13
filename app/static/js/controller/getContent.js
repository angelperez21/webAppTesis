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
    min = Math.ceil(40);
    max = Math.floor(60);
    return Math.floor(Math.random() * (max - min + 1) + 40);
}

function nextPage() {
    var new_tag = [];
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
    if (tagList.length != 0) {
        tagList.push({
            evaluator: user,
            bullying: valuebu,
            violence: valuevi,
            timeTaggedms: seg,
        });
        new_tag = tagList;
    } else {
        new_tag.push({
            evaluator: user,
            bullying: valuebu,
            violence: valuevi,
            timeTaggedms: seg,
        });
    }
    newObj = {
        _id: id,
        tweet: tweet,
        evaluation: new_tag,
    };
    dataList.push(newObj);
    pageNumber++;
    if (count == pause) {
        console.table(dataList);
        save("continue");
    }
    showContent(pagination);
}

function previusPage() {
    dataList.pop();
    pageNumber--;
    showContent(pagination);
}

function setData(dataDB) {
    console.table(dataDB);
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

function save(status) {
    endLogin = new Date();
    total = endLogin.getTime() - startLogin.getTime();
    seg = total / 1000;
    console.log("Tiempo en segundos loggeado: " + seg);
    user = document.getElementById("user").innerHTML;
    console.table(dataList);
    if (status == "end") {
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
    } else {
        $.ajax({
            url: "/saveTags",
            type: "POST",
            data: JSON.stringify(dataList),
            contentType: "application/json",
            success: function() {
                window.location = "/wait";
            },
            error: function() {},
        });
    }
}

function getStarted() {
    startLogin = new Date();
    pause = 5;
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
        console.log("Length " + item["evaluation"].length);
        console.log("Type " + typeof item["evaluation"]);
        item["evaluation"].length > 0 ?
            tagList.push(item["evaluation"]) :
            console.log("No tagged");
        templateHTML +=
            '<div class="card-deck pt-2 mt-2 mr-2">\
            <div class="card text-white">\
                <div class="card-body">\
                    <div class="content">\
                        <p class="text-center">\
                            Identificador del tweet\
                        </p>\
                        <p class="card-title text-center" id="idTweet">' +
            item["_id"] +
            '</p>\
                        <p class="card-text text-justify" id="tweet">' +
            item["tweet"] +
            '</p>\
                        <div class="content_tags">\
                            <!-- Area de etiquetado para acoso-->\
                            <div class="content_inputs">\
                                <p class="acoso text-center">Acoso</p>\
                                <div class="tags text-center">\
                                    <div class="level">\
                                        <input class="inputTags" type="radio" name="acoso" id="acoso" value="-1" checked>\
                                        <label class="info" for="inputTags">Fuera de contexto</label>\
                                    </div>\
                                    <div class="level">\
                                        <input class="inputTags" type="radio" name="acoso" id="acoso" value="0.0">\
                                        <label class="info" for="inputTags">Nada</label>\
                                    </div>\
                                    <div class="level">\
                                        <input class="inputTags" type="radio" name="acoso" id="acoso" value="0.25">\
                                        <label class="info" for="inputTags">Poco</label>\
                                    </div>\
                                    <div class="level">\
                                        <input class="inputTags" type="radio" name="acoso" id="acoso" value="0.50">\
                                        <label class="info" for="inputTags">Mucho</label>\
                                    </div>\
                                    <div class="level">\
                                        <input class="inputTags" type="radio" name="acoso" id="acoso" value="1.0">\
                                        <label class="info" for="inputTags">Demasiado</label>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="content_inputs violencia">\
                                <!-- Area de etiquetado para violencia-->\
                                <p class="acoso text-center">Violencia</p>\
                                <div class="tags text-center">\
                                    <div class="level">\
                                        <input class="inputTags" type="radio" name="violencia" id="acoso" value="-1" checked>\
                                        <label class="info" for="inputTags">Fuera de contexto</label>\
                                    </div>\
                                    <div class="level">\
                                        <input class="inputTags" type="radio" name="violencia" id="acoso" value="0.0">\
                                        <label class="info" class="info" for="inputTags">Nada</label>\
                                    </div>\
                                    <div class="level">\
                                        <input class="inputTags" type="radio" name="violencia" id="acoso" value="0.25">\
                                        <label class="info" for="inputTags">Poco</label>\
                                    </div>\
                                    <div class="level">\
                                        <input class="inputTags" type="radio" name="violencia" id="acoso" value="0.50">\
                                        <label class="info" for="inputTags">Mucho</label>\
                                    </div>\
                                    <div class="level">\
                                        <input class="inputTags" type="radio" name="violencia" id="acoso" value="1.0">\
                                        <label class="info" for="inputTags">Demasiado</label>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        </div>';
    });
    templateHTML += '<div class="buttonsPag text-center">';
    templateHTML +=
        pageNumber > 1 ?
        '<button class="buttonsNP" type="button" onclick="previusPage()">\
            &lt; Anterior\
        </button>' :
        "";
    templateHTML +=
        pageNumber - 1 < data.length ?
        '<button class="buttonsNP" type="button" onclick="nextPage()">\
            Siguiente &gt;\
        </button>' :
        "";
    templateHTML += "</div>";
    document.getElementById("container").innerHTML = "";
    document.getElementById("container").innerHTML = templateHTML;
}

getStarted();