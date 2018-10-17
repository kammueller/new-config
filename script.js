function showAdd() {
    document.getElementById("add-container__inner").style.display = "flex";
    document.getElementById("add-dropdown").classList.add("add-container__button--expanded");
}

function hideAdd() {
    document.getElementById("add-container__inner").style.display = "none";
    document.getElementById("add-dropdown").classList.remove("add-container__button--expanded");

}

function toggleAdd() {
    if (document.getElementById("add-container__inner").style.display === "flex") {
        hideAdd();
    } else {
        showAdd();
    }
}

function ShowPrefs() {
    window.location = "index.html";
}

function edit(value) {
    alert("editing " + value);
}

function hideOldStuff() {
    Array.from(document.getElementsByClassName("old")).forEach(function (elem) { elem.style.display="none" })
}