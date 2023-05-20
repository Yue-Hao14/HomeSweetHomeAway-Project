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
      price: 470
    },
    {
      ownerId: 2,
      address: '222 Road',
      city: 'Waimea',
      state: 'HI',
      country: 'USA',
      name: 'Grandma\'s Castle on the Kohala Coast, Kona',
      description: 'Grandma\'s Castle on the Kohala Coast, Kona- in Moani Heights is our family vacation home with 2 split master suites with their own in suite bathrooms, one with a King bed and the 2nd a Queen. The den has a single bed with trundle that pulls out from underneath. The 20 by 40 foot swimming pool is 8 feet deep. Both the pool and spa are SOLAR heated.',
      price: 902
    },
    {
      ownerId: 3,
      address: '333 Road',
      city: 'Hendersonville',
      state: 'NC',
      country: 'USA',
      name: 'Luxury Glamping Dome #1 - Chimney Rock/Lake Lure',
      description: 'Nature meets luxury in this unique Glamping Experience. If you don’t see your dates available, pls check out our other dome “The Overlook.” <br> Enjoy the privacy of a peaceful, secluded setting, without sacrificing comfort. Relax in the hot tub or by the pond. Roast smores at the firepit at night, ( wood not provided) sleep under the stars on a king-size comfort foam bed. Connect with your surroundings without having to rough it.',
      price: 347
    },
    {
      ownerId: 1,
      address: '444 Road',
      city: 'Mykonos',
      state: 'Egeo',
      country: 'Greece',
      name: 'Mykonos Sea View Luxury villa pool kite surf yoga',
      description: 'Calypso Sunset Villa is built in the most privileged position offering complete tranquility combined with breathtaking views and the best sunsets of the island.<br> The villa comprises exquisite luxury, built with every amenity making life richer, more relaxing and more rewarding.',
      price: 1802
    },
    {
      ownerId: 2,
      address: '555 Road',
      city: 'Tepoztlan',
      state: 'Morelos',
      country: 'Mexico',
      name: 'Amatlán Casa Caracol',
      description:"Only for lovers of adventure, Casa Caracol is located in the middle of the mountain, at the foot of the Guardians Mountains, in front of La Puerta, in Amatlán de Quetzalcóatl, with a dreamy landscape to be immersed in nature. Ancestral fractal design, which represents an excellent option to sleep on a round bed under a super-dobe dome and looking at the stars from its terraces. Organic architecture, the best option for a magical and sacred place.",
      price: 195
    },
    {
      ownerId: 3,
      address: '666 Road',
      city: 'Madison',
      state: 'New Hampshire',
      country: 'USA',
      name: 'Breathtaking Views in Conway- Hidden gem!',
      description:"Chalet in the Clouds! Relax & Rejuvenate w/ panoramic views of White Mountains from any of the 4 decks of Kailaśa Chalet! Perched on top of a mountain overlooking Mt Chocorua & Silver Lake w/ majestic views of Mt Washington Valley. So easy to get lost in the beauty of Kailaśa! Wake up to the experience of being above the clouds overlooking the valley! Settle down after dinner around the stone fireplace while watching your favorite shows on 65\" TV. It's not just a rental it's an experience!",
      price: 1112
    },
    {
      ownerId: 1,
      address: '777 Road',
      city: 'Olhuveli',
      state: 'North Central Province',
      country: 'Maldives',
      name: 'Stunning Villa on the Water w/ Private Pool',
      description:"The perfect example of affordable luxury, these villas have a built-in wow factor. Incredibly spacious decks are furnished with an oversized daybed, dining area, sun loungers, a private pool and steps straight down to the lagoon. Inside, the king size bedroom boasts an alcoved daybed and a spectacular bathroom.",
      price: 1712
    },
    {
      ownerId: 2,
      address: '888 Road',
      city: 'Kyoto-fu',
      state: 'Kyoto',
      country: 'Japan',
      name: 'Tabitabi Moonlight',
      description:"「Tabitabi Moonlight」 is a traditional two-storey machiya , which was built in the Taisho era with more than one hundred years history. We retain the original properties of the machiya by using a lot of wood materials, and design of hollow-out and high ceilings and embellishment of cement and steel elements give this house a sense of modernity. Here, you can experience the original and traditional Japan, and also the ingenuity of combining modern elements with traditional craftsmanship.",
      price: 381
    },
    {
      ownerId: 3,
      address: '999 Road',
      city: 'Hella',
      state: 'Hella',
      country: 'Iceland',
      name: 'Glass cottage with Hot tub "Blár"',
      description:"Welcome to Glass cottages Iceland. We are located on a lava desert in the south of Iceland. 5 minutes from the small town of Hella, close to all the popular attractions that southern Iceland has to offer, but also in a secret and secluded location.",
      price: 787
    },
    {
      ownerId: 1,
      address: '1000 Road',
      city: 'Canmore',
      state: 'Alberta',
      country: 'Canada',
      name: 'Stunning Top Flr Luxury Suite w/ Mountain Views!',
      description:"Welcome to this top floor suite with vaulted ceilings, massive windows and unobstructed views of the Rundle Range, Ha Ling Peak and Grotto Mountain! Located at Stoneridge Mountain Resort, this condo is just minutes from the heart of Downtown Canmore, Bow River, local shops and restaurants.",
      price: 285
    },
    {
      ownerId: 2,
      address: '1001 Road',
      city: 'Giza',
      state: 'Giza',
      country: 'Egypt',
      name: 'Pyramids view apartment & tour service',
      description:"Furnished roof flat for rent located 200 m from monuments area with magnificent view of Sphinx and Pyramids. The apartment now have air conditions in all of it not only the bedrooms.",
      price: 80
    },
    {
      ownerId: 3,
      address: '1002 Road',
      city: 'Sindun-myeon',
      state: 'Gyeonggi Province',
      country: 'South Korea',
      name: 'Emotional Healing in Lee Cheon-si, Seoul',
      description:"Tongui-shaped cottage in a two-thousand pottery art village. A large monolithic house with a three-floor terrace of the Serra Guitar Cultural Museum, renowned for its distinctive facade in a two-thousand pottery art village that blends very well with nature. Enjoy a relaxing emotional healing holiday in a cozy, welcoming room. On the third floor of a village without a tall building, you can enjoy the open nature scene, and picnic on the lawn in front of the Tongui house. If you prefer, you can also take Ukurelle lessons on the first floor of the building, a handcrafted workshop and other venue.",
      price: 94
    },
    {
      ownerId: 1,
      address: '1003 Road',
      city: 'Ponta Delgada',
      state: 'S. Miguel - Açores',
      country: 'Portugal',
      name: 'Flea Windmill | The Mill',
      description:"Built in the 19th century, with a 360 degrees view over the sea and surroundings on the top floor. It features a Bedroom with a king size bed, a very well-decorated living room with kitchenette, and a WC. Free WiFi, air conditioning, Led TV and DVD player. Private parking inside the premises, providing extra security. Perfect for an unforgettable honeymoon experience.",
      price: 157
    },
    {
      ownerId: 2,
      address: '1004 Road',
      city: 'Rhinebeck',
      state: 'New York',
      country: 'USA',
      name: 'Architectural wonder in the woods',
      description:"Unique experience, secluded. Enjoy a weekend or a few days eco-friendly retreat in an architectural, geometric masterpiece on 30 preserved acres just minutes from all that Rhinebeck and the Hudson Valley have to offer. The house is an open plan, and though it has zero bedrooms, it can sleep 3!",
      price: 591
    },
    {
      ownerId: 3,
      address: '1005 Road',
      city: 'Willington',
      state: 'Connecticut',
      country: 'USA',
      name: 'Heavenly Treehouse in Countryside w/ Farm Animals',
      description:"Have you ever wanted to stay in a Treehouse? Well... here is your chance! The Treehouse is custom built for your comfort at Bluebird Farm! As you drive up to Bluebird Farm you will be captivated by amazing views of the Bluebird Farm Life. This amazing Cabin in the sky has all the modern amenities you'll need to relax in the countryside, while still giving you a sense of camping. Spacious but simply designed for your comfort, the Treehouse has all the supplies you need in the kitchenette, bathroom, and shower. Great Wi-Fi for those who work from home, need to catch up on emails or seek creative spaces in-between relaxing at Bluebird Farm. During your lazy days you can visit the Farm animals, guided by property management in the morning and early evenings. Say, Hi to our animals / pets during the farm stay, you'll enjoy meeting Babydoll Sheep, Goats, Chickens, Pigs, Cats and Dogs. You can walk the grounds and even take a small hike! Relax among the farm as you take in the smell, taste and feel the air around you! Sounds relaxing eh? Or, take a day trip to local vineyards or breweries. Into antiquing or vintage? Well the property is close to some of the coolest in the State!",
      price: 515
    },
    {
      ownerId: 1,
      address: '1006 Road',
      city: 'Nassau',
      state: 'New Providence',
      country: 'Bahamas',
      name: 'Amura sailing Catamaran with captain and chef',
      description:"The nicest thing about the Bahamas is the water! Why staying in a hotel on land when you can visit the most beautiful highlights of the Bahamas. This boat is a 56 foot lagoon. There are 4 rooms and 4 bathrooms, one is occupied by the crew onboard, a great and equipped galley, a nice seated area outside and comfortable space in the front to hang out. You are most welcome to use the snorkeling gear, dinghy, paddle boards and tubing.",
      price: 6619
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
        [Op.in]: ['111 Road','222 Road','333 Road','444 Road','555 Road','666 Road','777 Road','888 Road','999 Road','1000 Road','1001 Road','1002 Road','1003 Road','1004 Road','1005 Road','1006 Road']
      }
    }, {});
  }
};
