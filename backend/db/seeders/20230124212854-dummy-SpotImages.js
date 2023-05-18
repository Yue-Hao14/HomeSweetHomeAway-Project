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
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/4ab19ea1-5b52-4727-9834-e6938138c473.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-33622503/original/3b0821a4-b088-40e1-afde-d434bee62ce3.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-33622503/original/81e4bbb7-a745-4531-ad07-e45841e387aa.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-33622503/original/c5690a77-3e98-46b0-b234-d463d34c1d64.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-33622503/original/181bb8d1-5cda-4cb9-9342-fb72409c5dc9.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/80385d19-c9dc-4dda-9d80-e16e55a8a6fd.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/ade2f12c-d3b2-4c66-9b0d-39fa8a772c9e.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42164367/original/f982ef05-5cdd-449f-9a08-e3f6e249adcf.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42164367/original/f59bd4b0-e34c-42fc-b921-934c1d8cefd4.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42164367/original/40e333c5-609e-45db-ae60-a9f09bfa772c.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49519963/original/2bb50add-a1c0-4f81-9d91-1152e895d94b.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49519963/original/a0886058-c695-47d3-b45e-90fbbfcf5bd6.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49519963/original/e74b0559-ae68-4b5a-aa50-1b6609b2b569.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49519963/original/ec03491d-464f-498e-a056-d4dfa848a4b5.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49519963/original/91f028c7-3e05-4d8d-9bc3-62e8d514e504.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/50d1b353-4227-4fbf-af5d-5226f2d21b11.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/d4732d15-aff7-4b4e-88f8-b515b4a3564b.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/77840114/918e2c5e_original.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/be7dfc8c-625b-468c-9513-9cb21a8fd05e.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/d8eb2572-2a69-461a-9e82-9220d9b026a7.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49519963/original/2bb50add-a1c0-4f81-9d91-1152e895d94b.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49519963/original/a0886058-c695-47d3-b45e-90fbbfcf5bd6.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49519963/original/e74b0559-ae68-4b5a-aa50-1b6609b2b569.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49519963/original/ec03491d-464f-498e-a056-d4dfa848a4b5.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49519963/original/91f028c7-3e05-4d8d-9bc3-62e8d514e504.jpeg?im_w=720',
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
        [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12]
      }
    }, {});
  }
};
