/* eslint-env jest */
const location = require('../src/location');

test('distanceBetween calculates distances between two geographic points', () => {
  const source = { latitude: 1, longitude: 5 };
  const destination = { latitude: 12, longitude: 3 };
  expect(location.distanceBetween(source, destination)).toEqual(11.180339887498949);
});

test('gradientBetween calculates gradient between two geographic points', () => {
  const source = { latitude: 1, longitude: 5 };
  const destination = { latitude: 12, longitude: 3 };
  expect(location.gradientBetween(source, destination)).toEqual(-2 / 11);
});

test('sortDestinationsByDistanceFromAnchor sorts destinations by their distance from an anchor', () => {
  const destinations = [
    {
      name: 'Home',
      latitude: 35.725554,
      longitude: -86.883529
    },
    {
      name: "King's Daughters School",
      latitude: 35.613464,
      longitude: -87.041243
    },
    {
      name: 'Forty AU',
      latitude: 36.151694,
      longitude: -86.820352
    },
    {
      name: "DeJarnette's",
      latitude: 35.607521,
      longitude: -87.0999
    }
  ];

  const anchor = destinations[0];

  const sortedDestinations = location.sortDestinationsByDistanceFromAnchor(destinations, anchor);

  expect(sortedDestinations[0]).toMatchObject(destinations[0]);
  expect(sortedDestinations[1]).toMatchObject(destinations[1]);
  expect(sortedDestinations[2]).toMatchObject(destinations[3]);
  expect(sortedDestinations[3]).toMatchObject(destinations[2]);
});
