const express = require('express')
const { connect } = require('stompit');

const connectOpts = {
  'host': 'localhost',
  'port': 61613,
  'connectHeaders': {
    'host': '/',
    'login': 'admin',
    'passcode': 'admin',
    'heart-beat': '5000,5000'
  }
};

const topic = '/topic/com.resolvejs.sample';

connect(connectOpts, (err, client) => {
  if (err) {
    console.log('Oh no :( - ' + err.message);
    return;
  }

  client.subscribe({
    'destination': topic,
    'ack': 'client-individual'
  }, (err, message) => {
    message.readString('utf-8', (err, body) => {
      console.log('*-sub: ' + body);
      client.ack(message);
    });
  });

  client.subscribe({
    'destination': topic,
    'ack': 'client-individual',
    'selector': "eventType = 'a' OR eventType = 'b'"
  }, (err, message) => {
    message.readString('utf-8', (err, body) => {
      console.log('A|B-sub: ' + body);
      client.ack(message);
    });
  });

  client.subscribe({
    'destination': topic,
    'ack': 'client-individual',
    'selector': "eventType = 'a'"
  }, (err, message) => {
    message.readString('utf-8', (err, body) => {
      console.log('A-sub: ' + body);
      client.ack(message);
    });
  });

  client.subscribe({
    'destination': topic,
    'ack': 'client-individual',
    'selector': "eventType = 'b'"
  }, (err, message) => {
    message.readString('utf-8', (err, body) => {
      console.log('B-sub: ' + body);
      client.ack(message);
    });
  });

  setInterval(() => {
      let frame = client.send({
          'destination': topic,
          'content-type': 'application/json',
          'eventType': 'a'
      });
      frame.write(JSON.stringify({ type: 'a-type', timestamp: Date.now() }));
      frame.end();
    
      frame = client.send({
          'destination': topic,
          'content-type': 'application/json',
          'eventType': 'b'
      });
      frame.write(JSON.stringify({ type: 'b-type', timestamp: Date.now() }));
      frame.end();
  }, 2000)


});

const app = express()

app.use(express.static('static'));
app.use(express.static('node_modules/webstomp-client/dist/'));

app.listen(3000)
