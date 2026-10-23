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
  // Location service pages
  'refrigerator-repair-centennial-co.html',
  'refrigerator-repair-columbine-valley-co.html',
  'refrigerator-repair-downtown-littleton.html',
  'refrigerator-repair-englewood-co.html',
  'refrigerator-repair-greenwood-village-co.html',
  'refrigerator-repair-highlands-ranch-co.html',
  'refrigerator-repair-ken-caryl.html',
  'refrigerator-repair-littleton-village.html'
];

function updateHero(content) {
  const heroRegex = /(<section[^>]*>)([\s\S]*?<h1[\s\S]*?)(<\/section>)/i;
  const match = content.match(heroRegex);
  if (!match) return content;

  let [fullMatch, secOpen, secBody, secClose] = match;

  // 1. Update section padding
  secOpen = secOpen
    .replace(/\bpt-(?:48|44)\s+pb-(?:24|20)\b/, 'pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20')
    .replace(/pt-\[110px\]\s+pb-16\s+md:pt-\[130px\]\s+lg:pt-\[150px\]/, 'pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20');

  // 2. In secBody: update nav breadcrumb margin: mb-8 or mb-6 -> mb-3 sm:mb-4
  secBody = secBody.replace(/(<nav[^>]*class="[^"]*?\b)mb-(?:8|6)(\b[^"]*")/i, '$1mb-3 sm:mb-4$2');

  // 3. In secBody: update H1 margin: mb-6 -> mb-3 sm:mb-4
  secBody = secBody.replace(/(<h1[^>]*class="[^"]*?\b)mb-6(\b[^"]*")/i, '$1mb-3 sm:mb-4$2');

  // 4. In secBody: update paragraph after H1: mb-8 -> mb-5 sm:mb-6, text-xl -> text-base sm:text-lg
  secBody = secBody.replace(/(<p[^>]*class="[^"]*?)\bmb-8\b([^"]*")/i, '$1mb-5 sm:mb-6$2');
  secBody = secBody.replace(/(<p[^>]*class="[^"]*?)\btext-xl\b([^"]*")/i, '$1text-base sm:text-lg$2');

  // 5. In secBody: update buttons padding
  secBody = secBody.replace(/\bpx-8\s+py-4\b/g, 'px-7 py-3 sm:px-8 sm:py-3.5');
  secBody = secBody.replace(/\bpx-7\s+py-4\b/g, 'px-6 py-3 sm:px-7 sm:py-3.5');

  // 6. Right side image constraint
  secBody = secBody.replace(/(class="[^"]*?\baspect-(?:square|4\/3|3\/4)\b)(?! max-h)/g, '$1 max-h-[380px] lg:max-h-[420px]');

  return content.replace(fullMatch, secOpen + secBody + secClose);
}

for (const file of serviceAndLocationFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const updated = updateHero(content);
  if (content === updated) {
    console.log(`[NO CHANGE] ${file}`);
  } else {
    console.log(`[UPDATED]   ${file}`);
  }
}
