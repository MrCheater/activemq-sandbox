const { connect } = require('stompit');

const connectOpts = {
  'host': 'b-8cea65a2-a6e1-4ec8-85f8-86d0e4c93c6a-1.mq.eu-central-1.amazonaws.com',
  'port': 61614,
  'ssl': true,
  'connectHeaders': {
    'host': '/',
    'login': 'client',
    'passcode': 'gwJKORpKYI1U',
    'heart-beat': '5000,5000'
  }
};

const topic = '/topic/com.resolvejs.sample';

exports.handler = (event, context, callback) => {
  connect(connectOpts, (err, client) => {
    if (err) {
      console.error('Oh no :( - ' + err.message);
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

    client.disconnect();

    callback(null, 'Done');
  });
};
