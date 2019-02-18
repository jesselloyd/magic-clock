function distanceBetween(source, destination) {
  return Math.sqrt(
    (source.latitude - destination.latitude) ** 2 + (source.longitude - destination.longitude) ** 2
  );
}

function gradientBetween(source, destination) {
  return (destination.longitude - source.longitude) / (destination.latitude - source.latitude);
}

function sortDestinationsByDistanceFrom(unsortedDestinations, position) {
  return [...unsortedDestinations].sort(
    (destination, nextDestination) =>
      distanceBetween(destination, position) - distanceBetween(nextDestination, position)
  );
}

function getIndexRelativeToDestinations(destinations, position) {
  const [nearestDestination] = sortDestinationsByDistanceFrom(destinations, position);
  const nearestDestinationIndex = destinations.findIndex(
    d => d.latitude === nearestDestination.latitude && d.longitude === nearestDestination.longitude
  );

  const distanceFromNearestDestination = distanceBetween(position, nearestDestination);
  const directionRelativeToNearestDestination = Math.sign(
    gradientBetween(position, nearestDestination)
  );
  const nextNearestDestinationIndex =
    (((nearestDestinationIndex + directionRelativeToNearestDestination) % destinations.length) +
      destinations.length) %
    destinations.length;

  const normalizedDistanceFromNearestDestination =
    distanceFromNearestDestination /
    distanceBetween(nearestDestination, destinations[nextNearestDestinationIndex]);

  return (
    nearestDestinationIndex +
    directionRelativeToNearestDestination * normalizedDistanceFromNearestDestination
  );
}

module.exports = {
  distanceBetween,
  sortDestinationsByDistanceFrom,
  getIndexRelativeToDestinations,
  gradientBetween
};
