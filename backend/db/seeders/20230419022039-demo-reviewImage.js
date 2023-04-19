'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://imgur.com/gallery/Yc6QfJe'
      },
      {
        reviewId: 2,
        url: 'https://imgur.com/gallery/w5U6LyD'
      },
      {
        reviewId: 3,
        url: 'https://imgur.com/gallery/BtbhzXK'
      },
      {
        reviewId: 4,
        url: 'https://imgur.com/gallery/15vHOUt'
      },
      {
        reviewId: 5,
        url: 'https://imgur.com/gallery/Jx58lkX'
      },
      {
        reviewId: 6,
        url: 'https://imgur.com/gallery/l7E8M97'
      },
      {
        reviewId: 7,
        url: 'https://imgur.com/gallery/zq2Qz8f'
      },
      {
        reviewId: 8,
        url: 'https://imgur.com/gallery/azl7mb8'
      },
      {
        reviewId: 9,
        url: 'https://imgur.com/gallery/ZJO3GnH'
      },
      {
        reviewId: 10,
        url: 'https://imgur.com/gallery/eZfzWTd'
      },
      {
        reviewId: 11,
        url: 'https://imgur.com/gallery/BOyLxtW'
      },
      {
        reviewId: 12,
        url: 'https://imgur.com/gallery/SLnv6Zf'
      },
      {
        reviewId: 13,
        url: 'https://imgur.com/gallery/kUOwe1y'
      },
      {
        reviewId: 14,
        url: 'https://imgur.com/gallery/7rGOnPq'
      },
      {
        reviewId: 15,
        url: 'https://imgur.com/gallery/mYxEYOl'
      },
      {
        reviewId: 16,
        url: 'https://imgur.com/gallery/3fV8LPv'
      },
      {
        reviewId: 17,
        url: 'https://imgur.com/gallery/iOrMyw8'
      },
      {
        reviewId: 18,
        url: 'https://imgur.com/gallery/2BtsJWx'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
    }, {});
  }
};
