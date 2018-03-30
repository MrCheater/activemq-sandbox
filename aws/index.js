const { connect } = require('stompit');

const connectOpts = {
  'host': 'b-83ef68a6-7d58-4401-a156-edad4b8cd5fe-1.mq.eu-central-1.amazonaws.com',
  'port': 61614,
  'ssl': true,
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

  let frame = client.send({
    'destination': topic,
    'content-type': 'application/json',
    'eventType': 'a'
  });
  frame.write(JSON.stringify({ type: 'a-type', timestamp: Date.now(), payload: { name: 'Sarah Connor' } }));
  frame.end();

  frame = client.send({
    'destination': topic,
    'content-type': 'application/json',
    'eventType': 'b'
  });
  frame.write(JSON.stringify({ type: 'b-type', timestamp: Date.now(), payload: { name: 'John Smith' } }));
  frame.end();
});