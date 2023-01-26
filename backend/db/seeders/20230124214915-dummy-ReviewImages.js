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
    options.tableName = 'ReviewImages';
   return queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.mydomaine.com%2Fthmb%2FWZTAIESRWf_ktr2tDmcGtpCdhoU%3D%2F1500x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fcdn.cliqueinc.com__cache__posts__278369__new-york-city-condo-278369-1552332287978-image.700x0c-2808796aae6648688abebd3b72f4f9bc.jpg&imgrefurl=https%3A%2F%2Fwww.mydomaine.com%2Fmodern-new-york-city-condo&tbnid=ZDcKNsQggb4qnM&vet=12ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygKegUIARDyAQ..i&docid=6Zn4cGJQqrTYDM&w=700&h=467&q=manhattan%20condo&ved=2ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygKegUIARDyAQ'
    },
    {
      reviewId: 2,
      url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fthumbs.nestseekers.com%2FPdujQA87gWCAIcl.jpg&imgrefurl=https%3A%2F%2Fwww.nestseekers.com%2Fsales%2Fmanhattan%2Fcondo&tbnid=64LOeullFsbbWM&vet=12ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygTegUIARCEAg..i&docid=Zjli2S6GsdiavM&w=300&h=200&q=manhattan%20condo&ved=2ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygTegUIARCEAg'
    },
    {
      reviewId: 3,
      url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fs.wsj.net%2Fpublic%2Fresources%2Fimages%2FB3-BQ388_kim091_M_20180907104457.jpg&imgrefurl=https%3A%2F%2Fwww.wsj.com%2Farticles%2Fnew-york-life-insurance-president-lists-his-manhattan-condo-for-11-95-million-1536334558&tbnid=Ik1fgRUfmE3xnM&vet=12ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygVegUIARCIAg..i&docid=10EHwA0T84IvEM&w=1280&h=853&q=manhattan%20condo&ved=2ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygVegUIARCIAg'
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
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: {
        [Op.in]: [1,2,3]
      }
    }, {});
  }
};
