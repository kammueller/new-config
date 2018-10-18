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
 * @param isModified true if pref is modified
 * @param Type bool, int or string
 * @param isFav true if pref is marked as favourite
 * @param isUser true if user-created, i.e. no default-value (has to be modified then)
 */
function addItem(name, value, isLocked, isModified, Type, isFav, isUser) {
    // TODO: codestyle!!
    document.getElementById("pref-table").innerHTML +=
        '<div class="pref-table__cell">\n' +
        (isLocked
            ? '<button class="button button--ghost icon icon--lock" title="locked" disabled></button>\n'
            : (isFav
                    ? '<button class="button button--ghost icon icon--filled-star" title="is favourite"></button>\n'
                    : '<button class="button button--ghost icon icon--star" title="make favourite"></button>\n'
            )) +
        '</div>\n' +
        '<div class="pref-table__cell' + (isModified ? ' pref-table__cell--edited' : '') + '">\n' +
        '<span' + (isLocked ? ' class="pref-table__cell__disabled-text"' : '') +
        '>' + name.split(".").join(".<wbr>") + '</span>\n' +
        '</div>\n' +
        (Type === "bool"
                ? '<div class="pref-table__cell' + (isModified ? ' pref-table__cell--edited' : '') + '"><span' +
                (isLocked ? ' class="pref-table__cell__disabled-text"' : '') + '\n>' + value + '</span></div>'

                : '<div class="pref-table__cell">\n' + (isLocked
                ? '<span class="pref-table__cell__disabled-text">' + value + '</span>\n'
                : '<form id="test-form">\n' +
                '<input type="text" placeholder="New Value" value="' + value + '"' +
                (Type === "int"
                        ? 'pattern="[0-9]*" title="Please enter an integer value">\n'
                        : 'title="Please enter the value">\n'
                ) +
                '</form>\n') +
                '</div>\n'
        ) +
        '<div class="pref-table__cell">\n' +
        '<button class="button button--small" type="submit" form="test-form"' +
        (isLocked ? ' disabled' : '') + '>' +
        (Type === "bool" ? 'toggle' : 'save') + '</button>\n' +
        '</div>\n' +
        '<div class="pref-table__cell">\n' +
        '<button class="button button--ghost icon ' +
        (isUser
                ? 'icon--trash" title="delete preference"'
                : 'icon--reset" ' + (isModified ? 'title="reset value to default"' : '')
        ) +
        (isLocked || (!isModified) ? ' disabled' : '') +
        '></button>\n' + '</div>';
}

function addTests() {
    var testValues = {'string': 'just a test', 'int': '42', 'bool': 'true'};
    console.log(testValues['int']);
    for (var key in testValues) {
        console.log(key + '=>' + testValues[key]);
        addItem("testing.mock.foo." + key, testValues[key], false, false, key, false, false);
        addItem("testing.mock.foo." + key+".fav", testValues[key], false, false, key, true, false);
        addItem("testing.mock.foo." + key+".user", testValues[key], false, true, key, false, true);
        addItem("testing.mock.foo." + key+".locked", testValues[key], true, false, key, false, false);
        addItem("testing.mock.foo." + key+".modified", testValues[key], false, true, key, false, false);
        addItem("testing.mock.foo." + key+".locked&modified", testValues[key], true, true, key, false, false);
        addItem("testing.mock.foo." + key+".locked&user", testValues[key], true, true, key, false, true);
        addItem("testing.mock.foo." + key+".locked&user&fav", testValues[key], true, true, key, true, true);
        addItem("testing.mock.foo." + key+".locked&fav", testValues[key], true, true, key, true, false);
    }
}
