'use strict';
const bcrypt = require ('bcryptjs')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'hotstuff22@user.io',
        firstName: 'Pheonix',
        lastName: 'Fireguy',
        username: 'hothandzz',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'lineupbrim@user.io',
        firstName: 'Brimstone',
        lastName: 'Eyepad',
        username: 'brimmystimmy',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'cowerpower5@user.io',
        firstName: 'Reyna',
        lastName: 'Clutcherson',
        username: 'UcantSeeMe',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['hothandzz', 'brimmystimmy', 'UcantSeeMe'] }
    }, {});
  }
};
