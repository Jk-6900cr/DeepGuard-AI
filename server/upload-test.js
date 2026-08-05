const fs = require('fs');
const path = require('path');
const http = require('http');

const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
const filePath = path.join(__dirname, 'uploads', 'sample.txt');
fs.writeFileSync(filePath, 'hello upload');
const fileData = fs.readFileSync(filePath);
const body = Buffer.concat([
  Buffer.from(`--${boundary}\r\n`),
  Buffer.from('Content-Disposition: form-data; name="image"; filename="sample.png"\r\n'),
  Buffer.from('Content-Type: image/png\r\n\r\n'),
  fileData,
  Buffer.from(`\r\n--${boundary}--\r\n`),
]);

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/upload/image',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': body.length,
  },
};

const req = http.request(options, (res) => {
  console.log('status', res.statusCode);
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', (err) => {
  console.error('error', err.message);
});

req.write(body);
req.end();
