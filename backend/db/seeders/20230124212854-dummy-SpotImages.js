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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.brickunderground.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fblog_primary_image%2Fpublic%2Fblog%2Fimages%2F190501Tribeca111MurrayStMAINPIC.jpg&imgrefurl=https%3A%2F%2Fwww.brickunderground.com%2Fbuy%2Fbuy-curious-new-condo-investment-properties&tbnid=iycHX4jhcax0NM&vet=12ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygCegUIARDiAQ..i&docid=b-ufDhMJbxCN_M&w=1071&h=714&q=manhattan%20condo&ved=2ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygCegUIARDiAQ',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwp.zillowstatic.com%2Fstreeteasy%2F2%2FPasted-image-at-2017_09_29-05_09-PM-3f451a.png&imgrefurl=https%3A%2F%2Fstreeteasy.com%2Fblog%2Fcondo-investment-returns-nyc%2F&tbnid=z0pdCP7aLp9DBM&vet=12ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygEegUIARDmAQ..i&docid=0EWpF47d_7oJNM&w=990&h=660&q=manhattan%20condo&ved=2ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygEegUIARDmAQ',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fthumbs.cityrealty.com%2Fassets%2Fsmart%2F736x%2Fwebp%2F2%2F27%2F271f436102a85631906022de71a34ecfc30a0fd9&imgrefurl=https%3A%2F%2Fwww.cityrealty.com%2Fnyc%2Fmarket-insight%2Ffeatures%2Fgreat-listings%2Fdiscounted-manhattan-2-bedroom-condos-under-2-million%2F53061&tbnid=v4F3KFblrzowdM&vet=12ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygIegUIARDuAQ..i&docid=hn72cBx3LTVATM&w=736&h=491&q=manhattan%20condo&ved=2ahUKEwiKpq_Wk-H8AhUKoXIEHWkXDgMQMygIegUIARDuAQ',
        preview: true
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [1,2,3]
      }
    }, {});
  }
};
