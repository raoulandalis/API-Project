'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: '2022-01-01',
        endDate: '2022-01-03'
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2022-01-05',
        endDate: '2022-01-07'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2022-01-09',
        endDate: '2022-01-11'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2022-01-13',
        endDate: '2022-01-15'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2022-01-17',
        endDate: '2022-01-19'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2022-01-21',
        endDate: '2022-01-23'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '2022-01-25',
        endDate: '2022-01-27'
      },
      {
        spotId: 4,
        userId: 3,
        startDate: '2022-01-29',
        endDate: '2022-01-31'
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2022-02-02',
        endDate: '2022-02-04'
      },
      {
        spotId: 5,
        userId: 3,
        startDate: '2022-02-06',
        endDate: '2022-02-08'
      },
      {
        spotId: 6,
        userId: 1,
        startDate: '2022-02-10',
        endDate: '2022-02-12'
      },
      {
        spotId: 6,
        userId: 3,
        startDate: '2022-02-14',
        endDate: '2022-02-16'
      },
      {
        spotId: 7,
        userId: 1,
        startDate: '2022-02-18',
        endDate: '2022-02-20'
      },
      {
        spotId: 7,
        userId: 2,
        startDate: '2022-02-22',
        endDate: '2022-02-24'
      },
      {
        spotId: 8,
        userId: 1,
        startDate: '2022-02-26',
        endDate: '2022-02-28'
      },
      {
        spotId: 8,
        userId: 2,
        startDate: '2022-03-02',
        endDate: '2022-03-04'
      },
      {
        spotId: 9,
        userId: 1,
        startDate: '2022-03-06',
        endDate: '2022-03-08'
      },
      {
        spotId: 9,
        userId: 2,
        startDate: '2022-03-10',
        endDate: '2022-03-12'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9]}
    }, {});
  }
};
