var inEdit = null;

function showAdd() {
  document.getElementById("dialog-overlay").style.display = "flex";
}

function hideAdd() {
  document.getElementById("dialog-overlay").style.display = "none";
}

function toggleAdd() {
  alert("deprecated");
}

function addPref() {
  document.getElementById("new-name").setCustomValidity("Name of Preference must be unique!");
}

function dummy() {
  alert("some action!");
}

function save(value, formName, name) {
  alert("should save");
  abortEdit(value, formName, name);
  inEdit = null;
}

function ShowPrefs() {
  window.location = "index.html";
}

function abortEdit(value, name) {
  var formName = "form-" + name;
  var col1a = inEdit.childNodes[0];
  var col2a = inEdit.childNodes[1];
  var col5a = inEdit.childNodes[4];
  inEdit.innerHTML = "";
  inEdit.appendChild(col1a);
  inEdit.appendChild(col2a);
  var cell = document.createElement("li");
  cell.className = "pref-table__cell";
  var inner;
  inner = document.createElement("span");
  inner.innerText = value;
  cell.appendChild(inner);
  inEdit.appendChild(cell);
  cell = document.createElement("li");
  cell.className = "pref-table__cell";
  var button = document.createElement("button");
  button.classList.add("button", "button--small");
  button.setAttribute("form", formName);
  button.innerText = "edit";
  button.addEventListener("click", function () {
    editItem(name, value, false);
  });
  cell.appendChild(button);
  inEdit.appendChild(cell);
  inEdit.appendChild(col5a);
}

function editItem(name, value, isNr) {
  if (inEdit != null) {
    console.log(inEdit.childNodes[2].firstChild);
    var oldName = inEdit.childNodes[1].firstChild.innerText;
    var oldValue = inEdit.childNodes[2].firstChild.firstChild.placeholder;
    abortEdit(oldValue, oldName);
  }
  var formName = "form-" + name;
  var row = document.getElementById(name);
  inEdit = row;

  function getThirdCol() {
    var cell = document.createElement("li");
    cell.className = "pref-table__cell";
    var inner;
    inner = document.createElement("form");
    inner.id = formName;
    inner.setAttribute("aria-label", "Edit Value");
    inner.addEventListener("submit", function (ev) {
      ev.preventDefault();
    });
    var field = document.createElement("input");
    field.type = "text";
    field.value = value;
    if (isNr) {
      field.setAttribute("pattern", "-?[0-9]*");
      field.title = "Please enter an integer value";
    } else {
      field.title = "Please enter the value";
    }
    field.placeholder = value;
    inner.appendChild(field);

    cell.appendChild(inner);
    return cell;
  }


  function getFourthCol() {
    var cell = document.createElement("li");
    cell.className = "pref-table__cell";
    var button = document.createElement("button");
    button.classList.add("button", "button--small", "button--primary");
    button.setAttribute("form", formName);
    button.innerText = "save";
    button.addEventListener("click", function () {
      save(value, formName, name);
    });
    cell.appendChild(button);
    return cell;
  }

  var col1 = row.childNodes[0];
  var col2 = row.childNodes[1];
  var col5 = row.childNodes[4];
  row.innerHTML = "";
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(getThirdCol());
  row.appendChild(getFourthCol());
  row.appendChild(col5);
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
  var type = "String";
  if (Type === "bool") {
    type = "Boolean";
  }
  if (Type === "int") {
    type = "Number";
  }
  var formName = "form-" + name;

  function getFirstCol(row) {
    var cell = document.createElement("li");
    cell.className = "pref-table__cell";
    var button = document.createElement("button");
    button.classList.add("button", "button--ghost", "icon");
    if (isLocked) {
      button.classList.add("icon--lock");
      button.title = "locked";
      button.disabled = true;
    } else if (isFav) {
      button.classList.add("icon--filled-star");
      button.title = "is favourite";
      button.addEventListener("click", dummy);
    } else {
      button.classList.add("icon--star");
      button.title = "make favourite";
      button.addEventListener("click", dummy);
    }
    cell.appendChild(button);
    row.appendChild(cell);
  }

  function getSecondCol(row) {
    var cell = document.createElement("li");
    cell.className = "pref-table__cell";
    var text = document.createElement("span");
    if (isLocked) {
      text.className = "pref-table__cell__disabled-text";
    }
    var parts = name.split(".");
    for (var i = 0; i < parts.length - 1; i++) {
      text.append(parts[i] + ".");
      text.append(document.createElement("wbr"));
    }
    text.append(parts[parts.length - 1]);
    cell.appendChild(text);
    row.appendChild(cell);
  }

  function getThirdCol(row) {
    var cell = document.createElement("li");
    cell.className = "pref-table__cell";
    var inner;
    inner = document.createElement("span");
    inner.innerText = value;
    if (isLocked) {
      inner.className = "pref-table__cell__disabled-text";
    }

    cell.appendChild(inner);
    row.appendChild(cell);
  }


  function getFourthCol(row) {
    var cell = document.createElement("li");
    cell.className = "pref-table__cell";
    var button = document.createElement("button");
    button.classList.add("button", "button--small");
    button.setAttribute("form", formName);
    if (isLocked) {
      button.disabled = true;
    }
    if (type === "Boolean") {
      button.innerText = "toggle";
      button.addEventListener("click", dummy);
    } else {
      button.innerText = "edit";
      button.addEventListener("click", function () {
        editItem(name, value, type === "Number");
      });
    }

    cell.appendChild(button);
    row.appendChild(cell);
  }

  function getFifthCol(row) {
    var cell = document.createElement("li");
    cell.className = "pref-table__cell";
    var button = document.createElement("button");
    button.classList.add("button", "button--ghost", "icon");
    if (isLocked || !isModified) {
      button.disabled = true;
    }
    if (isUser) {
      button.classList.add("icon--trash");
      button.title = "delete preference";
      button.addEventListener("click", dummy);
    } else {
      button.classList.add("icon--reset");
      button.title = "reset value to default";
      button.addEventListener("click", dummy);
    }
    cell.appendChild(button);
    row.appendChild(cell);
  }


  var row = document.createElement("ul");
  row.className = "pref-table__row";
  if (isModified) {
    row.classList.add("pref-table__row--edited");
  }
  row.setAttribute("aria-label", "Preference " + name);
  row.setAttribute("role", "list ");
  row.id = name;

  getFirstCol(row);
  getSecondCol(row);
  getThirdCol(row);
  getFourthCol(row);
  getFifthCol(row);

  document.getElementById("pref-table").appendChild(row);
}

addItem("captivedetect.canonicalContent", "success", true, false, "string", false, false);
addItem("captivedetect.canonicalURL", "http://detectportal.firefox.com/success.txt", false, true, "string", false, false);
addItem("captivedetect.maxRetryCount", 5, true, true, "int", true, false);
addItem("captivedetect.maxWaitingTime", 5000, false, false, "int", false, false);
addItem("captivedetect.pollingTime", 3000, false, true, "int", false, false);
addItem("clipboard.autocopy", false, false, false, "bool", true, false);
addItem("clipboard.plainTextOnly", false, false, true, "bool", false, true);
addItem("more.accessibility.AOM.enabled", false, false, true, "bool", true, true);
addItem("more.accessibility.accesskeycausesactivation", true, false, false, "bool", false, false);
addItem("more.accessibility.blockautorefresh", false, false, true, "bool", false, false);
addItem("more.accessibility.browsewithcaret", false, false, false, "bool", false, false);
addItem("more.accessibility.browsewithcaret_shortcut.enabled", true, false, true, "bool", false, false);
addItem("more.accessibility.delay_plugin_time", 10000, true, true, "int", false, true);
addItem("more.accessibility.delay_plugins", false, false, true, "bool", true, false);
addItem("more.accessibility.force_disabled", 0, false, true, "int", false, false);
addItem("more.accessibility.handler.enabled", true, false, true, "bool", false, true);
addItem("more.accessibility.indicator.enabled", false, true, false, "bool", false, false);
addItem("more.accessibility.monoaudio.enable", false, false, true, "bool", false, false);
addItem("more.accessibility.mouse_focuses_formcontrol", false, false, true, "bool", true, true);
addItem("more.accessibility.support.url", "https://support.mozilla.org/%LOCALE%/kb/accessibility-services", false, true, "String", false, false);
addItem("more.accessibility.tabfocus", 7, false, false, "int", false, false);
addItem("more.accessibility.tabfocus_applies_to_xul", false, false, false, "bool", false, false);
addItem("more.accessibility.typeaheadfind", false, false, true, "bool", false, true);
addItem("more.accessibility.typeaheadfind.autostart", true, false, false, "bool", false, false);
addItem("more.accessibility.typeaheadfind.casesensitive", 0, false, false, "int", true, false);
addItem("more.accessibility.typeaheadfind.enablesound", true, false, true, "bool", false, false);
addItem("more.accessibility.typeaheadfind.flashBar", 1, true, true, "int", false, true);
addItem("more.accessibility.typeaheadfind.linksonly", false, false, false, "bool", false, false);
addItem("more.accessibility.typeaheadfind.manual", true, false, true, "bool", false, false);

/*
// get a list of all components
let nav = [...new Set(gPrefArray.map(value => value.name.split('.')[0]))];
  */
