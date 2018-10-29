/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

ChromeUtils.import("resource://gre/modules/Services.jsm");
ChromeUtils.import("resource://gre/modules/Preferences.jsm");

let gPrefArray;

function onLoad() {
  gPrefArray = Services.prefs.getChildList("").map(name => ({
    name,
    value: Preferences.get(name),
    hasUserValue: Services.prefs.prefHasUserValue(name),
  }));

  gPrefArray.sort((a, b) => a.name > b.name);

  // create table
  gPrefArray.forEach(pref => document.getElementById("pref-table").appendChild(getPrefRow(pref)));
  // create navigation
  let categories = [...new Set(gPrefArray.map(value => value.name.split(".")[0]))];
  categories.forEach(cat => document.getElementById("categories").appendChild(getNavItem(cat)));
}

// region UI-functions
function showAdd() {
  document.getElementById("dialog-overlay").style.display = "flex";
}

function hideAdd() {
  document.getElementById("dialog-overlay").style.display = "none";
}

function addPref() {
  document.getElementById("new-name").setCustomValidity("Name of Preference must be unique!");
}

function dummy() {
  alert("clicked button!");
}

// endregion

// region create UI elements
// TODO: localize!!
function getPrefRow(pref) {
  let isModified = pref.hasUserValue;
  let isLocked = false; // todo
  let isUser = false; // todo
  let isFav = false; // todo
  let type = pref.value.constructor.name;
  let formName = "edit-form-" + pref.name;

  function getFirstCol(row) {
    let cell = document.createElement("li");
    cell.className = "pref-table__cell";
    let button = document.createElement("button");
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
    let cell = document.createElement("li");
    cell.className = "pref-table__cell";
    let text = document.createElement("span");
    if (isLocked) {
      text.className = "pref-table__cell__disabled-text";
    }
    let parts = pref.name.split(".");
    for (let i = 0; i < parts.length - 1; i++) {
      text.append(parts[i] + ".");
      text.append(document.createElement("wbr"));
    }
    text.append(parts[parts.length - 1]);
    cell.appendChild(text);
    row.appendChild(cell);
  }

  function getThirdCol(row) {
    let cell = document.createElement("li");
    cell.className = "pref-table__cell";
    let inner;
    if (type === "Boolean" || isLocked) {
      inner = document.createElement("span");
      inner.innerText = pref.value;
      if (isLocked) {
        inner.className = "pref-table__cell__disabled-text";
      }
    } else {
      inner = document.createElement("form");
      inner.id = formName;
      inner.setAttribute("aria-label", "Edit Value");
      inner.onsubmit = ev => ev.preventDefault();
      let field = document.createElement("input");
      field.type = "text";
      field.value = pref.value;
      if (type === "Number") {
        field.setAttribute("pattern", "-?[0-9]*");
        field.title = "Please enter an integer value";
      } else {
        field.title = "Please enter the value";
      }
      inner.appendChild(field);
    }

    cell.appendChild(inner);
    row.appendChild(cell);
  }


  function getFourthCol(row) {
    let cell = document.createElement("li");
    cell.className = "pref-table__cell";
    let button = document.createElement("button");
    button.classList.add("button", "button--small");
    button.setAttribute("form", formName);
    if (isLocked) {
      button.disabled = true;
    }
    if (type === "Boolean") {
      button.innerText = "toggle";
      button.addEventListener("click", dummy);
    } else {
      button.innerText = "save";
      button.addEventListener("click", dummy);
    }

    cell.appendChild(button);
    row.appendChild(cell);
  }

  function getFifthCol(row) {
    let cell = document.createElement("li");
    cell.className = "pref-table__cell";
    let button = document.createElement("button");
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


  let row = document.createElement("ul");
  row.className = "pref-table__row";
  if (isModified) {
    row.classList.add("pref-table__row--edited");
  }
  row.setAttribute("aria-label", "Preference " + pref.name);
  row.setAttribute("role", "list ");

  getFirstCol(row);
  getSecondCol(row);
  getThirdCol(row);
  getFourthCol(row);
  getFifthCol(row);

  return row;
}

function getNavItem(category) {
  let item = document.createElement("li");
  item.classList.add("category", "category--small");
  let icon = document.createElement("div");
  icon.classList.add("category__icon", "icon");
  item.appendChild(icon);
  let text = document.createElement("div");
  text.className = "category__label";
  text.innerText = category;
  item.appendChild(text);

  return item;
}

// endregion
