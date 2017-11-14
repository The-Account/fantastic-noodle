const fs = require("fs");

// Asynchronous read
fs.readFile('./json/file.json', function (err, data) {
  if (err) {
    return console.error(err);
  }
  document.getElementById('container').innerHTML = `<span class="file-title">Charakterbogen</span><div class="field first"><span class="title">${JSON.parse(data).main.Rasse.value} - ${JSON.parse(data).main.Geschlecht.value}</span></div>${parse(JSON.parse(data).main)}`
  document.getElementById('container').style.borderLeft = `19px solid #${JSON.parse(data).main.Rasse.hex}`
});

function parse(object) {
  var result = "";
  for (key in object) {
    var item = object[key];
    switch (item.type) {
      case 'textfield':
      result += `
      <div class="field" id="div-${key}">
        <span class="title">${key}: </span>
        <input type="text"></input>
      </div>`
      break;

      case 'dropdown':
      result += `
      <div class="field" id="div-${key}">
        <span class="title">${key}: </span>Hier kommt ein dropdown
      </div>`;
      break;

      case 'number':
      result += `
      <div class="field" id="div-${key}">
        <span class="title">${key}: </span>
        <input type="text"></input>
      </div>`
      break;

      case 'slider':
      result += `
      <div class="field" id="div-${key}">
        <span class="title">${key}: </span>
        <span class="slider-group">
          <span class="sliderlabel" id="sliderlabel-${key}">
            ${item.default}
          </span>
          <input class="slider" oninput="updateSliderLabel(this.id)" id="${key}" type="range" min="${item.min}" max="${item.max}" value="${item.default}">
        </span>
      </div>`;
      break;

      case 'category':
      result += `
      <div class="field category" id="cat-${key}">
        <span class="category-title">
          ${key}
        </span>
        <div class="category-contents">
          ${parse(item.contents)}
        </div>
      </div>`
      break;

    }
  }
  return result;
}