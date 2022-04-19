const fs = require('fs');
const loadDataFromFile = (dataFile) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const addCommaAfter = (string) => {
  const comma = ',';
  if (string && typeof string === 'string') {
    return `${string}${comma}`;
  }
  return '';
};

const capitalize = (string) => {
  if (typeof string === 'string') {
    return string.toUpperCase();
  }
  return '';
};

const Compare = (inputStr, countryName) => {
  let strA = inputStr.split(' ');
  let strB = countryName.split(' ');
  let intersection = strA.filter((element) => strB.includes(element));
  return (100 * intersection.length) / strB.length;
};

module.exports = {
  loadDataFromFile,
  addCommaAfter,
  capitalize,
  Compare,
};
