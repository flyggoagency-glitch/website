const fs = require('fs');
let content = fs.readFileSync('src/app/globals.css', 'utf8');
const idx = content.indexOf('\0');
if (idx !== -1) {
  content = content.substring(0, idx - 1);
  content += '\nbody { overflow-x: hidden; }\n';
  fs.writeFileSync('src/app/globals.css', content);
  console.log('Fixed CSS');
} else {
  console.log('No null byte found in CSS');
}
