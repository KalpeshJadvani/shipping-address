const path = require('path');
const { loadDataFromFile, Compare } = require('./utility');
const { arrayParser } = require('./addressTransforms');
const { addressFormats } = require('./addressFormats');
const dataFile = path.resolve(__dirname, '../data', 'addresses.json');
const countriesMapsFile = path.resolve(__dirname, '../data', 'countriesMaps.json');
const countriesFile = path.resolve(__dirname, '../data', 'countries.json');

let data;
let countriesMaps;
let countries;

const getCode = (country, countries) => {
  const findCountry = countries.find((item) => {
    if (item.code3 === country) {
      // both will value come uppercase
      return item;
    } else if (Compare(country, item.name) > 65) {
      return item;
    }
    return null;
  });
  return findCountry?.code;
};

const getCountryCode = (country = 'UK', countriesMaps, countries) => {
  let code = country.length === 2 ? country : countriesMaps[country];
  return code || getCode(country, countries) || 'UK';
};

const getFormat = (formatForCountry, formatForType) => {
  let formatsAvailable = addressFormats[formatForCountry];
  if (!formatsAvailable) {
    // Default to the UK format
    formatsAvailable = addressFormats?.UK;
  }
  const outputType = formatsAvailable?.[formatForType] || formatsAvailable?.default;
  if (outputType?.array) {
    return outputType.array;
  }
  return null;
};

const transformAddress = (address) => {
  const code = getCountryCode(address.country, countriesMaps, countries);
  const getAddressFormat = getFormat(code, address.type);
  return arrayParser(address, getAddressFormat);
};

const toConvertString = (output) => {
  if (output?.length) {
    const divider = '+--------\n';
    return `${divider}${output.map((part) => part.join(' ')).join('\n')}`;
  }
};

const run = async () => {
  data = await loadDataFromFile(dataFile);
  countriesMaps = await loadDataFromFile(countriesMapsFile);
  countries = await loadDataFromFile(countriesFile);
  console.log(data.map(transformAddress).map(toConvertString).join('\n'));
};

if (require.main === module) {
  run();
} else {
  module.exports = {
    transformAddress,
    getCountryCode,
    getFormat,
    toConvertString,
    getCode,
    run,
  };
}
