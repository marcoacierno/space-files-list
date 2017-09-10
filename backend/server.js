const express = require('express');
const xml2js = require('xml2js');
const util = require('util');
const fetch = require('node-fetch');
const path = require('path');
const auth = require('http-auth');

const FriendlyJSON = require('./FriendlyJSON');

const SPACE_URL = '';

const app = express();

const promisify = util.promisify;
const promisifyParseString = promisify(xml2js.parseString);


app.use('/static', express.static(path.join(__dirname, 'dist', 'static')))

const basicAuth = auth.basic({ realm: 'Hallo' }, (username, password, callback) => {
  callback(username === 'username' && password === 'password');
});

const authMiddleware = auth.connect(basicAuth);

app.get('/', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/space.json', authMiddleware, async (req, res) => {
  try {
    const files = await fetch(SPACE_URL);
    const text = await files.text();
    const xml = await promisifyParseString(text);
    const json = FriendlyJSON.convert(xml);

    res.header('Access-Control-Allow-Origin', '*');
    res.contentType('json');

    res.send(JSON.stringify(json));
  } catch (e) {
    console.error('Error', e);
    res.send('error');
  }
});

/** Send all requests not handled by node to digital ocean */
app.get('*', async (req, res) => {
    try {
        const digitaloceanRequest = await fetch(`${SPACE_URL}${req.url}`);
        digitaloceanRequest.body.pipe(res);
    } catch (e) {
        console.error('error', e);
        res.send('error');
    }
});

const port = process.argv[2] ? process.argv[2] : 80;

const server = app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

process.on('SIGINT', () => {
  server.close();
});
