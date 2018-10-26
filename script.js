function showAdd() {
  document.getElementById("dialog-overlay").style.display = "flex";
}

function hideAdd() {
  document.getElementById("dialog-overlay").style.display = "none";
}

function toggleAdd() {
 alert("deprecated")
}

function addPref() {
  document.getElementById('new-name').setCustomValidity("Name of Preference must be unique!");
}

function editPref() {
  alert("should be saved...");
  // TODO: prevent reload of page?!
}

function ShowPrefs() {
  window.location = "index.html";
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
    '<ul class="pref-table__row' + (isModified ? ' pref-table__row--edited' : '') +
    '" aria-label="Preference ' + name + '" role="list">\n' +
    '<li class="pref-table__cell">\n' +
    (isLocked
      ? '<button class="button button--ghost icon icon--lock" title="locked" disabled></button>\n'
      : (isFav
          ? '<button class="button button--ghost icon icon--filled-star" title="is favourite"></button>\n'
          : '<button class="button button--ghost icon icon--star" title="make favourite"></button>\n'
      )) +
    '</li>\n' +
    '<li class="pref-table__cell">\n' +
    '<span' + (isLocked ? ' class="pref-table__cell__disabled-text"' : '') +
    '>' + name.split(".").join(".<wbr>") + '</span>\n' +
    '</li>\n' +
    (Type === "bool"
        ? '<li class="pref-table__cell"><span' +
        (isLocked ? ' class="pref-table__cell__disabled-text"' : '') + '\n>' + value + '</span></li>'

        : '<li class="pref-table__cell">\n' + (isLocked
        ? '<span class="pref-table__cell__disabled-text">' + value + '</span>\n'
        : '<form id="edit-form-' + name + '" aria-label="Edit Value" onsubmit="editPref()">\n' +
        '<input type="text" value="' + value + '"' +
        (Type === "int"
            ? 'pattern="[0-9]*" title="Please enter an integer value">\n'
            : 'title="Please enter the value">\n'
        ) +
        '</form>\n') +
        '</li>\n'
    ) +
    '<li class="pref-table__cell">\n' +
    '<button class="button button--small" form="edit-form-' + name + '"' +
    (isLocked ? ' disabled' : '') + '>' +
    (Type === "bool" ? 'toggle' : 'save') + '</button>\n' +
    '</li>\n' +
    '<li class="pref-table__cell">\n' +
    '<button class="button button--ghost icon ' +
    (isUser
        ? 'icon--trash" title="delete preference"'
        : 'icon--reset" ' + (isModified ? 'title="reset value to default"' : '')
    ) +
    (isLocked || (!isModified) ? ' disabled' : '') +
    '></button> </li>\n';
}

addItem("captivedetect.canonicalContent", "success", true, false, 'string', false, false);
addItem("captivedetect.canonicalURL", "http://detectportal.firefox.com/success.txt", false, true, 'string', false, false);
addItem("captivedetect.maxRetryCount", 5, true, true, 'int', true, false);
addItem("captivedetect.maxWaitingTime", 5000, false, false, 'int', false, false);
addItem("captivedetect.pollingTime", 3000, false, true, 'int', false, false);
addItem("clipboard.autocopy", false, false, false, 'bool', true, false);
addItem("clipboard.plainTextOnly", false, false, true, 'bool', false, true);
addItem('more.accessibility.AOM.enabled', false, false, true, 'bool', true, true);
addItem('more.accessibility.accesskeycausesactivation', true, false, false, 'bool', false, false);
addItem('more.accessibility.blockautorefresh', false, false, true, 'bool', false, false);
addItem('more.accessibility.browsewithcaret', false, false, false, 'bool', false, false);
addItem('more.accessibility.browsewithcaret_shortcut.enabled', true, false, true, 'bool', false, false);
addItem('more.accessibility.delay_plugin_time', 10000, true, true, 'int', false, true);
addItem('more.accessibility.delay_plugins', false, false, true, 'bool', true, false);
addItem('more.accessibility.force_disabled', 0, false, true, 'int', false, false);
addItem('more.accessibility.handler.enabled', true, false, true, 'bool', false, true);
addItem('more.accessibility.indicator.enabled', false, true, false, 'bool', false, false);
addItem('more.accessibility.monoaudio.enable', false, false, true, 'bool', false, false);
addItem('more.accessibility.mouse_focuses_formcontrol', false, false, true, 'bool', true, true);
addItem('more.accessibility.support.url', 'https://support.mozilla.org/%LOCALE%/kb/accessibility-services', false, true, 'String', false, false);
addItem('more.accessibility.tabfocus', 7, false, false, 'int', false, false);
addItem('more.accessibility.tabfocus_applies_to_xul', false, false, false, 'bool', false, false);
addItem('more.accessibility.typeaheadfind', false, false, true, 'bool', false, true);
addItem('more.accessibility.typeaheadfind.autostart', true, false, false, 'bool', false, false);
addItem('more.accessibility.typeaheadfind.casesensitive', 0, false, false, 'int', true, false);
addItem('more.accessibility.typeaheadfind.enablesound', true, false, true, 'bool', false, false);
addItem('more.accessibility.typeaheadfind.flashBar', 1, true, true, 'int', false, true);
addItem('more.accessibility.typeaheadfind.linksonly', false, false, false, 'bool', false, false);
addItem('more.accessibility.typeaheadfind.manual', true, false, true, 'bool', false, false);
