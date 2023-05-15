'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '456 Haven Street',
        city: 'Thimphu',
        state: 'Alpha',
        country: 'Bhutan',
        lat: 37.7641234,
        lng: 22.4729876,
        name: 'Haven',
        description: 'Three sites, diverse, spacious.',
        price: 150
      },
      {
        ownerId: 1,
        address: '789 Ascent Road',
        city: 'Venice',
        state: 'Beta',
        country: 'Italy',
        lat: 34.056731,
        lng: 118.261928,
        name: 'Ascent',
        description: 'Open, bright, mid-centric.',
        price: 200
      },
      {
        ownerId: 1,
        address: '321 Split Lane',
        city: 'Tokyo',
        state: 'Gamma',
        country: 'Japan',
        lat: 40.7128,
        lng: 74.006,
        name: 'Split',
        description: 'Vertical, asymmetric, urban.',
        price: 200
      },
      {
        ownerId: 2,
        address: '654 Icebox Boulevard',
        city: 'Sakha',
        state: 'Delta',
        country: 'Russia',
        lat:  41.8781,
        lng: 87.6298,
        name: 'Icebox',
        description: 'Sleek, icy, complex.',
        price: 500
      },
      {
        ownerId: 2,
        address: '305 Breeze Street',
        city: 'Bermuda',
        state: 'Epsilon',
        country: 'Atlantic',
        lat:  25.7617,
        lng: 80.1918,
        name: 'Breeze',
        description: 'Tropical, large, open.',
        price: 600
      },
      {
        ownerId: 2,
        address: '888 Bind Lane',
        city: 'Rabat',
        state: 'Zeta',
        country: 'Morocco',
        lat:  44.3156,
        lng: 78.1029,
        name: 'Bind',
        description: 'Sandy, tight, short.',
        price: 800
      },
      {
        ownerId: 3,
        address: '111 Pearl Boulevard',
        city: 'Lisbon',
        state: 'Theta',
        country: 'Portugal',
        lat:  32.7767,
        lng: 96.797,
        name: 'Pearl',
        description: 'Underwater and tropical.',
        price: 500
      },
      {
        ownerId: 3,
        address: '676 Lotus Lane',
        city: 'Western Ghats',
        state: 'Kappa',
        country: 'India',
        lat:  76.9706,
        lng: 56.1246,
        name: 'Lotus',
        description: 'Flowery, green, luscious.',
        price: 300
      },
      {
        ownerId: 3,
        address: '409 Fracture Street',
        city: 'Santa Fe',
        state: 'New Mexico',
        country: 'United States',
        lat:  34.8694,
        lng: 76.1293,
        name: 'Fracture',
        description: 'High-tech, futuristic, fractured.',
        price: 250
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3]}
    }, {})
  }
};
