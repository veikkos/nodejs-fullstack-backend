const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const supertest = require('supertest')
const expect = require('chai').expect
const app = require('../index')

const api = supertest(app)

let mongoServer

before(async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  await mongoose.connect(mongoUri)
});

after(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
});

describe('API', () => {
  it('/address', async () => {
    const checkEmptyMongo = async () => {
      await api
        .get('/address')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }

    await checkEmptyMongo();

    const testUser = {
      name: "Name",
      address: "Address",
      developer: true
    }

    await api
      .post('/address')
      .send(testUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    let id;

    await api
      .get('/address')
      .expect(200)
      .expect(function (result) {
        const body = result.body
        expect(body.length).to.be.equal(1)
        expect(body[0].name).to.be.equal(testUser.name)
        expect(body[0].address).to.be.equal(testUser.address)
        expect(body[0].developer).to.be.equal(testUser.developer)
        id = body[0].id
      })
      .expect('Content-Type', /application\/json/)

    await api
      .delete('/address')
      .query({ id: id })
      .expect(204)

    await checkEmptyMongo();
  });
});
