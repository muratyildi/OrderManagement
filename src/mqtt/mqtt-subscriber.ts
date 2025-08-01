import mqtt from 'mqtt';

const MQTT_BROKER_URL = 'mqtt://localhost:1883';
const client = mqtt.connect(MQTT_BROKER_URL);

client.on('connect', () => {
  console.log('Subscriber connected to MQTT broker');
  client.subscribe('orders/+/status', (err) => {
    if (err) {
      console.error('Subscribe error:', err);
    } else {
      console.log('Subscribed to orders/+/status');
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});
