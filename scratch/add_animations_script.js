const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== '404.html' && f !== 'googlebbe0edbb5a43dcf0.html');

let addedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('assets/js/animations.js')) {
    console.log(`Already has animations.js: ${file}`);
    continue;
  }

  // Insert before </body>
  if (content.includes('</body>')) {
    content = content.replace('</body>', '  <script src="assets/js/animations.js" defer></script>\n</body>');
    fs.writeFileSync(file, content, 'utf8');
    addedCount++;
    console.log(`Added animations.js to: ${file}`);
  } else {
    console.warn(`No </body> tag in: ${file}`);
  }
}

console.log(`\nSuccessfully added script to ${addedCount} files.`);
