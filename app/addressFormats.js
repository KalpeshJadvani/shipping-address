const { addCommaAfter, capitalize } = require('./utility');

const addressFormats = {
  // Brazil
  BR: {
    default: {
      array: [
        ['companyName'],
        ['recipient'],
        ['addressLine1', 'addressLine2', 'addressLine3', 'addressLine4'],
        ['postcode', 'region', 'state'],
        ['country'],
      ],
    },
  },
  UK: {
    default: {
      array: [
        ['recipient'],
        ['companyName'],
        ['addressLine1', 'addressLine2', 'addressLine3', 'addressLine4'],
        ['locality'],
        [{ attribute: 'region', transforms: [addCommaAfter] }, 'postcode'],
        ['country'],
      ],
    },
  },
  // Canada // there is no locality
  CA: {
    default: {
      array: [
        ['recipient'],
        ['companyName'],
        ['addressLine1', 'addressLine2', 'addressLine3', 'addressLine4'],
        [{ attribute: 'region', transforms: [addCommaAfter] }, 'province', 'postcode'],
        ['country'],
      ],
    },
  },

  // Italy
  IT: {
    default: {
      array: [
        ['recipient'],
        ['companyName'],
        ['addressLine1', 'addressLine2', 'addressLine3', 'addressLine4'],
        [''],
        ['countryAlpha2', 'postcode', 'region', 'province'],
        ['country'],
      ],
    },
  },
  // United States
  US: {
    default: {
      array: [
        ['recipient'],
        ['companyName'],
        ['addressLine1'],
        ['addressLine2'],
        ['addressLine3'],
        ['addressLine4'],
        [{ attribute: 'region', transforms: [addCommaAfter] }, 'state', 'postcode'],
        [
          {
            attribute: 'country',
            transforms: [capitalize],
          },
        ],
      ],
    },
  },

  // Switzerland
  CH: {
    default: {
      array: [
        ['recipient'],
        ['addressLine1', 'addressLine2', 'addressLine3', 'addressLine4'],
        ['postcode', 'region'],
        ['country'],
      ],
    },
  },
  // HONG KONG
  HK: {
    default: {
      array: [
        ['recipient'],
        ['addressLine1', 'addressLine2'],
        ['addressLine3', 'addressLine4'],
        ['locality'],
        ['region', 'postcode'],
        [
          {
            attribute: 'country',
            transforms: [capitalize],
          },
        ],
      ],
    },
  },
  // France
  FR: {
    default: {
      array: [
        ['recipient'],
        ['companyName'],
        ['addressLine1'],
        ['addressLine2'],
        ['addressLine3'],
        ['addressLine4'],
        ['postcode', 'region'],
        ['country'],
      ],
    },
  },
  // Germany
  DE: {
    default: {
      array: [
        ['companyName'],
        ['recipient', 'title'],
        ['addressLine1'],
        ['addressLine2'],
        ['addressLine3'],
        ['addressLine4'],
        [''],
        ['countryAlpha2', 'postcode', 'region'],
        ['country'],
      ],
    },
  },

  // Japan,
  JP: {
    default: {
      array: [
        ['country'],
        ['postcode', 'prefecture', 'region'],
        ['addressLine1', 'addressLine2', 'addressLine3', 'addressLine4'],
        ['companyName'],
        ['recipient'],
      ],
    },
    japanese: {
      array: [
        ['postal-symbol', 'postcode'],
        [
          'prefecture',
          'region',
          'locality',
          'addressLine1',
          'addressLine2',
          'addressLine3',
          'addressLine4',
        ],
        ['recipient', 'title'],
      ],
    },
  },
};

module.exports = {
  addressFormats,
};
