const { arrayParser } = require('../app/addressTransforms');
const { addCommaAfter } = require('../app/utility');
describe('transforms addresses through formate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const address = {
    recipient: 'Sam Smith',
    addressLine1: 'My flat name',
    addressLine2: 'My Apartment building',
    addressLine3: 'My complex',
    addressLine4: 'My Street',
    locality: 'My Town',
    region: 'My Region',
    country: 'UK',
    postcode: 'MY1 2HR',
  };
  const formate = [
    ['recipient'],
    ['companyName'],
    ['addressLine1', 'addressLine2', 'addressLine3', 'addressLine4'],
    ['locality'],
    [{ attribute: 'region', transforms: [addCommaAfter] }, 'postcode'],
    ['country'],
  ];
  const result = [
    ['Sam Smith'],
    ['My flat name', 'My Apartment building', 'My complex', 'My Street'],
    ['My Town'],
    ['My Region,', 'MY1 2HR'],
    ['UK'],
  ];

  it(' this function parser address', () => {
    expect(arrayParser(address, formate)).toEqual(result);
  });
});
