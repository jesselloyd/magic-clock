/* eslint-env jest */
const LocationEmitter = require('../src/location/location-emitter');

describe('LocationEmitter', () => {
  test('listenForAndEmitLocations configures MQTT client successfully', async done => {
    const emitter = new LocationEmitter();
    await emitter.listenForAndEmitLocations();
    expect(emitter.listenForAndEmitLocations).not.toThrowError();
    done();
  });
});
