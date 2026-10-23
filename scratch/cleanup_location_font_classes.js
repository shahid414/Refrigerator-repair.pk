const fs = require('fs');

const files = [
  'refrigerator-repair-highlands-ranch-co.html',
  'refrigerator-repair-englewood-co.html',
  'refrigerator-repair-greenwood-village-co.html',
  'refrigerator-repair-columbine-valley-co.html',
  'refrigerator-repair-centennial-co.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('text-lg md:text-base sm:text-lg', 'text-base sm:text-lg');
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Cleaned up ${file}`);
}
