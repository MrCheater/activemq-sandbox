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

  let frame = client.send({
    'destination': topic,
    'content-type': 'application/json',
    'eventType': 'a'
  });
  frame.write(JSON.stringify({ type: 'a-type' }));
  frame.end();

  frame = client.send({
    'destination': topic,
    'content-type': 'application/json',
    'eventType': 'b'
  });
  frame.write(JSON.stringify({ type: 'b-type' }));
  frame.end();
});