const sharp = require('sharp');

module.exports = sharp(input)
  .resize(320, 240)
  .toBuffer()
  .toFile(data => { 
    return data;
});

