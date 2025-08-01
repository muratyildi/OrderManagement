import mqtt from 'mqtt';

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';

const client = mqtt.connect(MQTT_BROKER_URL);

client.on('connect', () => {
  console.log('MQTT connected');
});

client.on('error', (error) => {
  console.error('MQTT connection error:', error);
});

export default client;
