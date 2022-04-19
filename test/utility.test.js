const fs = require('fs');
const { loadDataFromFile, addCommaAfter, capitalize, Compare } = require('../app/utility');

describe('loading the data and utility functionality testing', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fails when there is no data', async () => {
    const fsReadFileSpy = jest.spyOn(fs, 'readFile');
    const error = new Error('oops');
    fsReadFileSpy.mockImplementation((path, enc, cb) => cb(error));

    await expect(loadDataFromFile(fsReadFileSpy)).rejects.toEqual(error);
  });

  it('parses the JSON file with address data', async () => {
    const fixture = [
      {
        recipient: 'Sam Smith',
        addressLine1: 'My flat name',
        addressLine2: 'My Apartment building',
        addressLine3: 'My complex',
        addressLine4: 'My Street',
        locality: 'My Town',
        region: 'My Region',
        country: 'UK',
        postcode: 'MY1 2HR',
      },
    ];
    const fsReadFileSpy = jest.spyOn(fs, 'readFile');
    fsReadFileSpy.mockImplementation((path, enc, cb) => cb(null, JSON.stringify(fixture)));
    await expect(loadDataFromFile(fsReadFileSpy)).resolves.toEqual(fixture);
  });

  it('Add comma after string ', () => {
    expect(addCommaAfter('England')).toEqual('England,');
  });

  it('Add comma after string ', () => {
    expect(capitalize('England')).toEqual('ENGLAND');
  });

  it('Add comma after string ', () => {
    const input = 'South Georgia and the South'; // from address json might be come
    const countryName = 'South Georgia and the South Sandwich Islands'; //  this is full name of country
    expect(Compare(input, countryName) > 65).toBeTruthy();
  });
});
