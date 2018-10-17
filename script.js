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
    Array.from(document.getElementsByClassName("old")).forEach(function (elem) {
        elem.style.display = "none"
    })
}

/**
 *
 * @param name name of the pref
 * @param value momentary value
 * @param isLocked true if locked
 * @param isDefault false if pref is modified
 * @param Type bool, int or string
 * @param isFav true if pref is marked as favourite
 * @param isUser true if user-created, i.e. no default-value
 */
function addItem(name, value, isLocked, isDefault, Type, isFav, isUser) {
    document.getElementById("pref-table").innerHTML +=
        '<div class="pref-table__cell">\n' +
        (isFav
                ? '<button class="button button--ghost icon icon--filled-star" title="is favourite"></button>\n'
                : '<button class="button button--ghost icon icon--star" title="make favourite"></button>\n'
        ) +
        '</div>\n' +
        '<div class="pref-table__cell' + (!isDefault ? ' pref-table__cell--edited' : '') + '">\n' +
        '<span>' + name.split(".").join(".<wbr>") + '</span>\n' +
        '</div>\n' +
        (Type === "bool"
                ? '<div class="pref-table__cell' + (!isDefault ? ' pref-table__cell--edited' : '') + '"><span>' +
                value + '</span></div>'
                : '<div class="pref-table__cell">\n' +
                '<form id="test-form">\n' +
                '<input type="text" placeholder="New Value" value="' + value + '"' +
                (Type === "int"
                        ? 'pattern="[0-9]*" title="Please enter an integer value">\n'
                        : 'title="Please enter the value">\n'
                ) +
                '</form>\n' +
                '</div>\n'
        ) +
        '<div class="pref-table__cell">\n' +
        '<button class="button button--small" type="submit" form="test-form">' +
        (Type === "bool" ? 'toggle' : 'save') + '</button>\n' +
        '</div>\n' +
        '<div class="pref-table__cell">\n' +
        '<button class="button button--ghost icon ' +
        (isUser
                ? 'icon--trash" title="delete preference"'
                : 'icon--reset" ' + (isDefault ? 'disabled' : 'title="reset value to default"')
        ) +
        '></button>\n' +
        '</div>'
}

addItem("component.sub-component.foo.JS-Test", "just a test", false, false, "string", true, false);