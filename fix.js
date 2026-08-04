const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');
const idx = content.indexOf('\0');
if (idx !== -1) {
  content = content.substring(0, idx - 1);
  const lastBrace = content.lastIndexOf('};');
  content = content.substring(0, lastBrace + 2) + `
// Isolated Counter Component
const CenterCounter = () => {
  const projectCount = useCountUp(250, 2000, 1200);
  
  return (
    <div className="absolute" style={{ animation: 'spin-right 30s linear infinite' }}>
      <div className="flex flex-col items-center justify-center bg-[#070319] w-[180px] h-[180px] rounded-full shadow-[0_0_30px_rgba(160,104,255,0.3)] border border-[#A068FF]/30">
         <h2 className="font-['Urbanist'] text-[64px] font-medium text-white leading-none tracking-tight">
           {projectCount}+
         </h2>
         <p className="font-['Urbanist'] text-[16px] font-semibold text-[#A068FF] uppercase tracking-wider mt-1">
           Projects
         </p>
      </div>
    </div>
  );
};
`;
  fs.writeFileSync('src/app/page.tsx', content);
  console.log('Fixed');
} else {
  console.log('Not found');
}
