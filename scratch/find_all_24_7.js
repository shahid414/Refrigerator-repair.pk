const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json') || f.endsWith('.md'));

const results = [];

for (const file of files) {
  if (file.startsWith('scratch') || file.includes('package')) continue;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (/24\s*\/\s*7/i.test(line)) {
      results.push({ file, line: idx + 1, text: line.trim() });
    }
  });
}

console.log(`Found ${results.length} occurrences in ${new Set(results.map(r => r.file)).size} files:`);
results.forEach(r => console.log(`${r.file}:${r.line} -> ${r.text}`));
