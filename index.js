const { Client:AMQPClient } = require('amqp10');
const Promise = require('bluebird');

const client = new AMQPClient();

client.connect('amqp://localhost:5672')
  .then(() => {
    console.log('connected');
    return client.createSender('topic://resolvejs.bus');
  })
  .then(sender => {
    sender.on('errorReceived', (err) => console.log('pesda' + err.message));
    console.log('sender created')
  })
  .catch((err) => {
    console.error(err.message);
  });




