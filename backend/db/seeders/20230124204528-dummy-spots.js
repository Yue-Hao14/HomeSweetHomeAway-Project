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
      ownerId: 1,
      address: '111 Road',
      city: 'Kerhonkson',
      state: 'NY',
      country: 'USA',
      name: 'A Black A- Frame: Sustainable Catskills Cabin',
      description: 'The Black A-frame is a two bed two bath 1961 cabin set on a private road in the heart of the Catskills in Kerhonkson, NY. It was named the "Coolest A-frame in NY" by the New York Post in 2020. Relax in the open dinning room with original wood ceilings and beams and enjoy a home cooked meal made in the renovated chef\'s kitchen, or walk outdoors to soak in the magic of the Catskills through the endless wooded views from the back yard!',
      price: 100
    },
    {
      ownerId: 2,
      address: '222 Road',
      city: 'Waimea',
      state: 'HI',
      country: 'USA',
      name: 'Grandma\'s Castle on the Kohala Coast, Kona',
      description: 'Grandma\'s Castle on the Kohala Coast, Kona- in Moani Heights is our family vacation home with 2 split master suites with their own in suite bathrooms, one with a King bed and the 2nd a Queen. The den has a single bed with trundle that pulls out from underneath. The 20 by 40 foot swimming pool is 8 feet deep. Both the pool and spa are SOLAR heated.',
      price: 200
    },
    {
      ownerId: 3,
      address: '333 Road',
      city: 'Hendersonville',
      state: 'NC',
      country: 'USA',
      name: 'Luxury Glamping Dome #1 - Chimney Rock/Lake Lure',
      description: 'Nature meets luxury in this unique Glamping Experience. If you don’t see your dates available, pls check out our other dome “The Overlook.” <br> Enjoy the privacy of a peaceful, secluded setting, without sacrificing comfort. Relax in the hot tub or by the pond. Roast smores at the firepit at night, ( wood not provided) sleep under the stars on a king-size comfort foam bed. Connect with your surroundings without having to rough it.',
      price: 300
    },
    {
      ownerId: 1,
      address: '444 Road',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      name: 'Mykonos Sea View Luxury villa pool kite surf yoga',
      description: 'Calypso Sunset Villa is built in the most privileged position offering complete tranquility combined with breathtaking views and the best sunsets of the island.<br> The villa comprises exquisite luxury, built with every amenity making life richer, more relaxing and more rewarding.',
      price: 400
    },
    {
      ownerId: 2,
      address: '555 Road',
      city: 'Tepoztlan',
      state: 'Morelos',
      country: 'Mexico',
      name: 'Amatlán Casa Caracol',
      description:"Only for lovers of adventure, Casa Caracol is located in the middle of the mountain, at the foot of the Guardians Mountains, in front of La Puerta, in Amatlán de Quetzalcóatl, with a dreamy landscape to be immersed in nature. Ancestral fractal design, which represents an excellent option to sleep on a round bed under a super-dobe dome and looking at the stars from its terraces. Organic architecture, the best option for a magical and sacred place.",
      price: 500
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
      address: {
        [Op.in]: ['111 Road','222 Road','333 Road','444 Road','555 Road']
      }
    }, {});
  }
};
