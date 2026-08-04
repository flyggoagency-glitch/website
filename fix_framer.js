const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace motion elements
code = code.replace(/<motion\.div/g, '<div');
code = code.replace(/<\/motion\.div>/g, '</div>');
code = code.replace(/<motion\.p/g, '<p');
code = code.replace(/<\/motion\.p>/g, '</p>');
code = code.replace(/<motion\.span/g, '<span');
code = code.replace(/<\/motion\.span>/g, '</span>');

// Remove framer-motion props
code = code.replace(/\s+variants=\{[^}]+\}/g, '');
code = code.replace(/\s+initial=\{\{[^}]+\}\}/g, '');
code = code.replace(/\s+initial="[^"]+"/g, '');
code = code.replace(/\s+whileInView=\{\{[^}]+\}\}/g, '');
code = code.replace(/\s+whileInView="[^"]+"/g, '');
code = code.replace(/\s+viewport=\{\{[^}]+\}\}/g, '');
code = code.replace(/\s+transition=\{\{[^}]+\}\}/g, '');

fs.writeFileSync('src/app/page.tsx', code);
console.log('Fixed page.tsx');
