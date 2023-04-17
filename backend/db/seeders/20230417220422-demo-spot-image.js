'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://imgur.com/gallery/x6G5q3n',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://imgur.com/gallery/eK2M9Qz',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://imgur.com/gallery/vMnC8Bf',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://imgur.com/gallery/nZtD1Ui',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://imgur.com/gallery/xyrp3qE',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://imgur.com/gallery/fv7I2tm',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://imgur.com/gallery/qPvKiuL',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://imgur.com/gallery/ib1v7Ne',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://imgur.com/gallery/BLMkEs7',
        preview: true
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9]}
    }, {})
  }
};
