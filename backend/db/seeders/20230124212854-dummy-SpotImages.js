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
        url: 'https://a0.muscache.com/im/pictures/cd96b8b7-43c6-4030-8d70-22a78d419e4d.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/8dde9e45-1653-4571-96bc-37eba84d9b0f.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/eb46425c-3213-475c-98f7-e2924540ede8.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/f856ce68-2feb-4924-86e8-c83a5e413704.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/43acab1b-d8a5-48a2-9347-73a2fc12c302.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/5354a4a7-62bd-4c62-87c8-130be1eecaae.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34118159/original/91f20fe2-a03b-4e7b-8c45-7b4f8dd155e7.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34118159/original/688d81a8-dbf5-498e-8de6-e891ab734015.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/5b6c8453-5455-47a5-bedb-8e0d2424a57b.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34118159/original/661a0310-483b-44eb-82f4-7593b17bb631.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/89733ec9-28db-4a63-906d-f695e60e0b67.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/d4c935bb-8854-4d19-9af5-364a8b084a8b.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/50622e1e-3a98-45ad-9c42-43f0b8443de7.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/8e640fc3-78cc-49fe-9d7c-b78ade6c022c.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/7a0197fa-0c6b-40c3-8b95-bee7e7467263.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1603575/original/4df0138b-8374-47c3-ab3e-14ab156bd368.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1603575/original/a47e3e89-a4f1-4604-9a66-e4671ed7f62d.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1603575/original/93e6b191-4344-48e9-ac42-4ba85835b96d.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1603575/original/95cb6570-224d-44b6-a5b1-b850da05e9e4.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/0af2d0a8-d474-4902-ac5a-566812f2ca70.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-28539871/original/7ae20215-239b-46e0-8a30-3ebc50e08c09.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/7340de55-56b9-4280-b9f4-29d2e484b1f3.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-28539871/original/696804ad-5741-414a-8e28-874db764ff4e.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/34c71527-d8c5-44a4-918b-2e1c6119a035.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-28539871/original/a9681209-b45b-49ce-a9cf-2aa3230a3616.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-688467833380191508/original/669cb91d-c008-47fd-bc3b-4d8338f0265c.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/6aca30ae-a6b8-4dab-8ac3-143f643d4960.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/3519a978-e885-4d8a-afc7-0bfb3d663e3d.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/8311e51e-c95f-4c8a-a0af-cc51df74e68e.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-688467833380191508/original/782e2efc-3281-43d6-8fdb-250d2940243f.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-636070119680439851/original/26c46614-4bea-4f2b-9e9d-e09c51b35764.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-636070119680439851/original/00cabccf-73b9-4955-a182-31d5b731cadd.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-636070119680439851/original/0ddb33de-3dca-4a03-97ce-892dd49a27b5.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-636070119680439851/original/3fe1a736-464c-491d-8c79-7c5eabbb6c9f.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-636070119680439851/original/fac47544-1d7f-47ed-892d-a45786bcd248.jpeg?im_w=720',
        preview: false
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
        [Op.in]: [1,2,3,4,5,6,7]
      }
    }, {});
  }
};
