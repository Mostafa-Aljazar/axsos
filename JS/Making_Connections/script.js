
const edit = document.querySelector(".edit");
const profileName = document.querySelector(".profile_name");

edit.addEventListener("click", function () {
    profileName.textContent = "Mostafa Aljazar";
});


const requests = document.querySelectorAll(".request");
const requestsNum = document.querySelector(".requests .card-header .badge");
const connectionsNum = document.querySelector(".connections .card-header .badge");
 
requests.forEach(function (request) {

    const accept = request.querySelector(".accept");
    const decline = request.querySelector(".decline");

    accept.addEventListener("click", function () {
        request.remove();
        requestsNum.textContent = parseInt(requestsNum.textContent) - 1;
        connectionsNum.textContent = parseInt(connectionsNum.textContent) + 1;
    });

    decline.addEventListener("click", function () {
        request.remove();
        requestsNum.textContent = parseInt(requestsNum.textContent) - 1;
    });
});