const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== '404.html' && f !== 'googlebbe0edbb5a43dcf0.html');

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const sectionMatch = content.match(/<section[^>]*>[\s\S]*?<h1[\s\S]*?<\/section>/i);
  if (!sectionMatch) continue;
  const sec = sectionMatch[0];
  const secTag = sec.match(/<section[^>]*>/i)[0];
  const navMatch = sec.match(/<nav[^>]*class="([^"]*)"[^>]*>/i);
  const h1Match = sec.match(/<h1[^>]*class="([^"]*)"[^>]*>/i);
  const pMatch = sec.match(/<p[^>]*class="([^"]*)"[^>]*>/i);
  const btnMatch = sec.match(/<a[^>]*href="(tel:[^"]*|contact\.html)"[^>]*class="([^"]*)"/i);

  console.log([
    file.padEnd(42),
    secTag.slice(0, 50).padEnd(50),
    (navMatch ? navMatch[1] : 'no-nav').slice(0, 25).padEnd(25),
    (h1Match ? h1Match[1] : 'no-h1').slice(0, 30).padEnd(30),
    (pMatch ? pMatch[1] : 'no-p').slice(0, 30).padEnd(30),
    (btnMatch ? 'BTN' : 'NO-BTN')
  ].join(' | '));
}
