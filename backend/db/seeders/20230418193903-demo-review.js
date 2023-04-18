'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'This was an awesome spot!',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'What a great experience!',
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: 'The view was amazing!',
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: 'I loved this place!',
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Definitely worth a visit!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'One of the best spots!',
        stars: 3
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Such a beautiful location!',
        stars: 4
      },
      {
        spotId: 4,
        userId: 3,
        review: 'The atmosphere was perfect!',
        stars: 4
      },
      {
        spotId: 5,
        userId: 1,
        review: 'I highly recommend this spot!',
        stars: 3
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Great food and drinks!',
        stars: 5
      },
      {
        spotId: 6,
        userId: 1,
        review: 'What a great experience!',
        stars: 4
      },
      {
        spotId: 6,
        userId: 3,
        review: 'This was an awesome spot!',
        stars: 3
      },
      {
        spotId: 7,
        userId: 1,
        review: 'The view was amazing!',
        stars: 4
      },
      {
        spotId: 7,
        userId: 2,
        review: 'I loved this place!',
        stars: 5
      },
      {
        spotId: 8,
        userId: 1,
        review: 'Definitely worth a visit!',
        stars: 4
      },
      {
        spotId: 8,
        userId: 2,
        review: 'One of the best spots!',
        stars: 3
      },
      {
        spotId: 9,
        userId: 1,
        review: 'Such a beautiful location!',
        stars: 4
      },
      {
        spotId: 9,
        userId: 2,
        review: 'The atmosphere was perfect!',
        stars: 5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9]}
    }, {});
  }
};
