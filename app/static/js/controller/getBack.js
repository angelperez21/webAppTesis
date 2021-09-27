function getBack() {
    var userPage = document.getElementById("user").innerHTML;
    window.location = "/return_tagging?user=" + userPage.trim();
}