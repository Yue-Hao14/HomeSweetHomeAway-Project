const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

//simple random number generator
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1)

const seedUsers = (num) => {
  let users = new Array(num).fill('')

  for (const i in users) {
    users[i] = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password())
    }
  }

  return users
}



module.exports = {
  seedUsers
}
