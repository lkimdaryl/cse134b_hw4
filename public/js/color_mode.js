document.addEventListener('DOMContentLoaded', function () {
    let lightmode = localStorage.getItem("lightmode");

    if (lightmode === "enabled"){
        document.body.classList.add("lightmode");
    }else{
        document.body.classList.remove("lightmode");
    }
});