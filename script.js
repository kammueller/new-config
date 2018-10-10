function showAdd() {
    document.getElementById("add-container").style.display = "block";
}

function hideAdd() {
    document.getElementById("add-container").style.display = "none";
}

function addValue() {
    // TODO: add value...
    hideAdd();
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