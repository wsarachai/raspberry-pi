const mqtt = require('mqtt');

// your credentials
const options = {
  username: 'sarachai-01',
  password: 'Tmkh1318',
};

// connect to your cluster, insert your host name and port
const client = mqtt.connect('tls://783efd6e5c5341568b2411727df72f7f.s1.eu.hivemq.cloud:8883', options);

// prints a received message
client.on('message', function (topic, message) {
  console.log(String.fromCharCode.apply(null, message)); // need to convert the byte array to string
});

// reassurance that the connection worked
client.on('connect', () => {
  console.log('Connected!');
});

// prints an error message
client.on('error', (error) => {
  console.log('Error:', error);
});

// subscribe and publish to the same topic
client.subscribe('sarachai/cm/home/light-01');
client.publish('sarachai/cm/home/light-01', 'OFF');