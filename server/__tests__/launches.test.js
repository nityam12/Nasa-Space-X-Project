const request = require('supertest');
const app = require('../src/app');
const { mongoConnect, mongoDisconnect } = require('../src/services/mongo');
const { loadPlanetsData } = require('../src/models/planets.model');

describe('Launches Api', () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET/launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('Test POST/launches', () => {
    const completeLaunchDate = {
      mission: 'USSd Enterprises',
      rocket: 'NCCd 1710D',
      target: 'Kepler-296 f',
      launchDate: 'January 4,2040',
    };
    const launchDateWithoutDate = {
      mission: 'USSd Enterprises',
      rocket: 'NCCd 1710D',
      target: 'Kepler-296 f',
    };
    const launchDateWithInvalidDate = {
      mission: 'USSd Enterprises',
      rocket: 'NCCd 1710D',
      target: 'Kepler-296 f',
      launchDate: 'Hello',
    };
    test('It should respond with 201 success', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunchDate)
        .expect('Content-Type', /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchDate.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDateWithoutDate);
    });

    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDateWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: 'Missing Required launch Property',
      });
    });
    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDateWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: 'Invalid Launch Date',
      });
    });
  });
});
