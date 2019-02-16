function distanceBetween(source, destination) {
  return Math.sqrt(
    (source.latitude - destination.latitude) ** 2 + (source.longitude - destination.longitude) ** 2
  );
}

function gradientBetween(source, destination) {
  return (destination.longitude - source.longitude) / (destination.latitude - source.latitude);
}

function sortDestinationsByDistanceFromAnchor(unsortedDestinations, anchor) {
  return [...unsortedDestinations].sort(
    (destination, nextDestination) =>
      distanceBetween(destination, anchor) - distanceBetween(nextDestination, anchor)
  );
}

function getClockPositionForDestination(destinations, destination) {
  return destinations.findIndex(
    d => d.latitude === destination.latitude && d.longitude === destination.longitude
  );
}

function convertGeoPointToPointRelativeToDestinations(destinations, position) {
  const [nearestDestination] = sortDestinationsByDistanceFromAnchor(destinations, position);
  const distanceFromNearestDestination = distanceBetween(position, nearestDestination);
  const clockIndex = getClockPositionForDestination(destinations, nearestDestination);

  const directionRelativeToNearestDestination = Math.sign(
    gradientBetween(position, nearestDestination)
  );

  return clockIndex + directionRelativeToNearestDestination * distanceFromNearestDestination;
}

module.exports = {
  distanceBetween,
  sortDestinationsByDistanceFromAnchor,
  convertGeoPointToPointRelativeToDestinations,
  gradientBetween
};
