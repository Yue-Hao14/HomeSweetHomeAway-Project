'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Spots';
   return queryInterface.bulkInsert(options, [
    {
      ownerId: 7,
      address: '111 Road',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      name: '111',
      price: 100
    },
    {
      ownerId: 8,
      address: '222 Road',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      name: '222',
      price: 200
    },
    {
      ownerId: 9,
      address: '333 Road',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      name: '333',
      price: 300
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ['111','222','333']
      }
    }, {});
  }
};
