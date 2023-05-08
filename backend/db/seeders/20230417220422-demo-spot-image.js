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
        url: 'https://i.imgur.com/5kPqXAb.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/wRS2Shv.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/mXZX1nm.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/uOEj82R.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/drqU2Ls.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/Equa3aD.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/F5sZxpS.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/PixTKhj.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/lt8LHy1.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/Berrpkm.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/ETDDV6G.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/UDxhftQ.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/LOrOmmV.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/oLyfRgP.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/jhFsUXK.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/Tn6QsXZ.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/RL7ba6X.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/wh1VkAk.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/7ApJD6t.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/ejw4lVm.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/RJDDCer.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/QdRUjVq.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/ntpPxYW.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/lt8LHy1.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/hF9wEK7.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/k5vkDND.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/vhpZHb1.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/6UjBchY.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/rrzOZ1d.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/5hl36on.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/8lgVJ8S.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/ieA59Z5.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/8MKnLdT.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/GogZ0aw.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/2ATxbgd.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/LTtZs7F.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/6F3GWc3.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/jpPMuL8.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/TG4EN7b.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/880UT5e.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://i.imgur.com/ueWOV4v.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.imgur.com/2qlDg6g.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.imgur.com/0FzoZNd.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.imgur.com/1pBicl4.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.imgur.com/LJGp0cb.jpg',
        preview: true
      }
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
