'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 8,
        startDate: new Date('2022-05-01'),
        endDate: new Date('2022-05-14'),
      },
      {
        spotId: 2,
        userId: 9,
        startDate: new Date('2022-06-01'),
        endDate: new Date('2022-06-14'),
      },
      {
        spotId: 3,
        userId: 10,
        startDate: new Date('2022-07-01'),
        endDate: new Date('2022-07-14'),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [1,2,3]
      },
      userId: {
        [Op.in]: [8,9,10]
      }
    }, {})
  }
};
