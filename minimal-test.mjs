import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
const dir = '/tmp/next-test';
if (existsSync(dir)) rmSync(dir, { recursive: true });
mkdirSync(dir, { recursive: true });
mkdirSync(dir + '/src/app', { recursive: true });
writeFileSync(dir + '/package.json', JSON.stringify({
  "scripts": { "build": "next build" },
  "dependencies": { "next": "latest", "react": "^19", "react-dom": "^19" }
}));
writeFileSync(dir + '/src/app/layout.tsx', `export const metadata = { title: 'T' }
export default function RootLayout({ children }) { return <html><body>{children}</body></html> }`);
writeFileSync(dir + '/src/app/page.tsx', `export default function Page() { return <div>hello</div> }`);
execSync('npm install --prefix ' + dir + ' --no-save 2>&1', { stdio: 'pipe' });
try {
  const out = execSync('npx next build 2>&1', { cwd: dir, stdio: 'pipe' }).toString();
  console.log(out);
} catch(e) {
  console.log(e.stderr.toString());
  console.log(e.stdout.toString());
}
