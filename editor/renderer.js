const fs = require("fs");

// Asynchronous read
fs.readFile('./json/file.json', function (err, data) {
  if (err) {
    return console.error(err);
  }
  document.getElementById('container').innerHTML = parse(JSON.parse(data).main)
});

function parse(object) {
  var result = "";
  for (key in object) {
    var item = object[key];
    switch (item.type) {

      case 'label':
      result += `<div id="div-${key}"><span class="title">${key}: </span><span class="label-value">${item.value}</span></div>`;
      break;

      case 'textfield':
      result += `<div id="div-${key}"><span class="title">${key}: </span><input type="text"></input></div>`
      break;

      case 'dropdown':
      break;

      case 'number':
      break;

      case 'slider':
      break;

      case 'category':
      result += `<div class="category" id="cat-${key}"><span class="category-title">${key}</span>${parse(item.contents)}</div>`
      break;

    }
  }
  return result;
}
