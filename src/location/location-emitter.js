const mqtt = require('mqtt');
const EventEmitter = require('events');
require('dotenv').load();

module.exports = class LocationEmitter extends EventEmitter {
  listenForAndEmitLocations() {
    const client = mqtt.connect(process.env.MQTT_SERVER, {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      port: process.env.MQTT_PORT
    });

    client.on('connect', async () => {
      try {
        await client.subscribe(process.env.MQTT_TOPIC_PATTERN);
      } catch (subscriptionError) {
        throw new Error(
          'Error connecting to Message Queue. Please check all environment variables are configured correctly. SubscriptionError: ',
          subscriptionError
        );
      }
    });

    client.on('message', (topic, message) => {
      const [_topic, user, _device] = topic.split('/');
      const { lat, lon } = JSON.parse(message);
      this.emit('locationChanged', {
        user,
        latitude: lat,
        longitude: lon
      });
    });
  }
};
