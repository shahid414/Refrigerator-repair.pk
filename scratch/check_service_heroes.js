const fs = require('fs');

const serviceAndLocationFiles = [
  'chest-freezer-repair.html',
  'commercial-refrigerator-repair.html',
  'freezer-not-freezing.html',
  'freezer-repair.html',
  'fridge-repair.html',
  'ice-maker-repair.html',
  'mini-fridge-repair.html',
  'noisy-refrigerator-repair.html',
  'refrigerator-compressor-repair.html',
  'refrigerator-door-repair.html',
  'refrigerator-frost-buildup.html',
  'refrigerator-not-cooling.html',
  'refrigerator-repair-samsung.html',
  'refrigerator-repair-technician.html',
  'refrigerator-water-leaking.html',
  'services.html',
  // Locations
  'refrigerator-repair-centennial-co.html',
  'refrigerator-repair-columbine-valley-co.html',
  'refrigerator-repair-downtown-littleton.html',
  'refrigerator-repair-englewood-co.html',
  'refrigerator-repair-greenwood-village-co.html',
  'refrigerator-repair-highlands-ranch-co.html',
  'refrigerator-repair-ken-caryl.html',
  'refrigerator-repair-littleton-village.html'
];

for (const file of serviceAndLocationFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/<section[^>]*>[\s\S]*?<h1[\s\S]*?<\/section>/i);
  if (!match) {
    console.log(file, 'NO MATCH');
    continue;
  }
  const sec = match[0];
  const secTag = sec.match(/<section[^>]*>/i)[0];
  const navMatch = sec.match(/<nav[^>]*class="([^"]*)"[^>]*>/i);
  const h1Match = sec.match(/<h1[^>]*class="([^"]*)"[^>]*>/i);
  const pMatch = sec.match(/<p[^>]*class="([^"]*)"[^>]*>/i);
  const btnDivMatch = sec.match(/<div class="([^"]*gap-[^"]*)">/i);

  console.log(`=== ${file} ===`);
  console.log('Sec: ', secTag);
  if (navMatch) console.log('Nav: ', navMatch[0]);
  if (h1Match) console.log('H1:  ', h1Match[0]);
  if (pMatch) console.log('P:   ', pMatch[0]);
  if (btnDivMatch) console.log('Btns:', btnDivMatch[0]);
}
