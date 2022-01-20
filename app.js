const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

http
  .createServer(function (req, res) {
    let parsedUrl = url.parse(req.url);
    let fileName = path.parse(parsedUrl.pathname);

    let file = fileName.name == '' ? 'index' : fileName.name;
    let ext = fileName.ext == '' ? '.html' : fileName.ext;
    let dir = fileName.dir == '/' ? '' : fileName.dir + '/';
    let page = fileName.name == '' ? 'index.html' : fileName.name;

    let f = (dir + file + ext).replace('/', '');

    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      'gif': 'image/gif',
    };

    if (f) {
      fs.readFile(f, function (err, data) {
        if (page) {
          if (mimeTypes.hasOwnProperty(ext)) {
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] });
            res.write("<script> let page = '"+ page + "'</script>");
            res.end(data, 'utf-8');
          }
        }
      });
    }
  })
  .listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
  });
