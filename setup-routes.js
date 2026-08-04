const fs = require('fs');
const pages = ['services', 'solutions', 'portfolio', 'case-studies', 'about', 'careers', 'blog', 'contact', 'book-consultation', 'privacy', 'terms'];
pages.forEach(p => {
  fs.mkdirSync('src/app/' + p, { recursive: true });
  const title = p.replace('-', ' ');
  fs.writeFileSync('src/app/' + p + '/page.tsx', `export default function Page() {\n  return (\n    <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">\n      <h1 className="text-4xl md:text-6xl font-bold capitalize text-white/50 tracking-tight">{ "${title}" }</h1>\n    </main>\n  );\n}`);
});
