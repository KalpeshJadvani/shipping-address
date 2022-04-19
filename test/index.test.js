const fs = require('fs');
const {
  transformAddress,
  getCountryCode,
  getFormat,
  toConvertString,
  getCode,
  run,
} = require('../app/index');
describe('address label printer', () => {
  describe('transforming an address', () => {
    it('prints all address fields', () => {
      const data = {
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
      expect(transformAddress(data)).toEqual([
        ['Sam Smith'],
        ['My flat name', 'My Apartment building', 'My complex', 'My Street'],
        ['My Town'],
        ['My Region,', 'MY1 2HR'],
        ['UK'],
      ]);
    });
    it('ignores empty lines', () => {
      const data = {
        recipient: 'Sam Smith',
        addressLine1: '7 My Road',
        addressLine2: '',
        addressLine3: '',
        addressLine4: '',
        locality: 'My Town',
        region: 'My Region',
        country: 'UK',
        postcode: 'MY1 2HR',
      };
      expect(transformAddress(data)).toEqual([
        ['Sam Smith'],
        ['7 My Road'],
        ['My Town'],
        ['My Region,', 'MY1 2HR'],
        ['UK'],
      ]);
    });
  });

  describe('loading the files and test depended methods', () => {
    it('share the code file data and get country code', () => {
      const countriesMaps = {
        UKRAINE: 'UA',
        'UNITED ARAB EMIRATES': 'AE',
        'UNITED KINGDOM': 'UK',
        'UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND': 'GB',
        'UNITED STATES OF AMERICA': 'US',
      };
      const countries = [
        { code: 'TV', code3: 'TUV', name: 'Tuvalu', number: '798' },
        { code: 'UG', code3: 'UGA', name: 'Uganda', number: '800' },
        { code: 'UA', code3: 'UKR', name: 'Ukraine', number: '804' },
        { code: 'AE', code3: 'ARE', name: 'United Arab Emirates (the)', number: '784' },
        {
          code: 'UK',
          code3: 'GBR',
          name: 'United Kingdom of Great Britain and Northern Ireland (the)',
          number: '826',
        },
        {
          code: 'UM',
          code3: 'UMI',
          name: 'United States Minor Outlying Islands (the)',
          number: '581',
        },
        { code: 'US', code3: 'USA', name: 'United States of America (the)', number: '840' },
      ];
      expect(getCountryCode('United Kingdom', countriesMaps, countries)).toEqual('UK');
    });

    it('if getCountryCode will not return code then this function find the code from given data', () => {
      const countries = [
        { code: 'TV', code3: 'TUV', name: 'Tuvalu', number: '798' },
        { code: 'UG', code3: 'UGA', name: 'Uganda', number: '800' },
        { code: 'UA', code3: 'UKR', name: 'Ukraine', number: '804' },
        { code: 'AE', code3: 'ARE', name: 'United Arab Emirates (the)', number: '784' },
        {
          code: 'UK',
          code3: 'GBR',
          name: 'United Kingdom of Great Britain and Northern Ireland (the)',
          number: '826',
        },
        {
          code: 'UM',
          code3: 'UMI',
          name: 'United States Minor Outlying Islands (the)',
          number: '581',
        },
        { code: 'US', code3: 'USA', name: 'United States of America (the)', number: '840' },
      ];
      expect(getCode('United States of America', countries)).toEqual('US');
    });

    it('pass code and type we should get address formate', () => {
      expect(getFormat('UK', 'default')).toEqual([
        ['recipient'],
        ['companyName'],
        ['addressLine1', 'addressLine2', 'addressLine3', 'addressLine4'],
        ['locality'],
        [{ attribute: 'region', transforms: [expect.any(Function)] }, 'postcode'],
        ['country'],
      ]);
    });

    it('pass array of address & we should get address in string', () => {
      const address = [
        ['Sam Smith'],
        ['My flat name', 'My Apartment building', 'My complex', 'My Street'],
        ['My Town'],
        ['My Region,', 'MY1 2HR'],
        ['UK'],
      ];

      expect(toConvertString(address)).toMatch(`+--------
Sam Smith
My flat name My Apartment building My complex My Street
My Town
My Region, MY1 2HR
UK`);
    });
  });

  describe('running the application', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('prints out a list of labels', async () => {
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
        {
          recipient: 'Alex Johnson',
          addressLine1: 'My place',
          addressLine2: '',
          addressLine3: '',
          addressLine4: '',
          locality: 'My Town',
          region: 'My Region',
          country: 'UK',
          postcode: 'MY2 3PL',
        },
      ];
      const fsReadFileSpy = jest.spyOn(fs, 'readFile');
      fsReadFileSpy.mockImplementation((path, enc, cb) => cb(null, JSON.stringify(fixture)));
      // eslint-disable-next-line no-console
      console.log = jest.fn();

      await run();
      // eslint-disable-next-line no-console
      const message = console.log.mock.calls[0][0];
      expect(message).toMatchSnapshot();
    });
  });
});
