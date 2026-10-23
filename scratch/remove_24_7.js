const fs = require('fs');

const replacements = [
  {
    file: 'about.html',
    from: '<div class="text-5xl md:text-6xl font-black mb-2">24/7</div>\n          <div class="font-bold uppercase tracking-widest text-sm text-white">Emergency response</div>',
    to: '<div class="text-5xl md:text-6xl font-black mb-2">Fast</div>\n          <div class="font-bold uppercase tracking-widest text-sm text-white">Emergency response</div>'
  },
  {
    file: 'blog.html',
    from: 'Available 24/7 across all Littleton neighborhoods.',
    to: 'Available across all Littleton neighborhoods.'
  },
  {
    file: 'commercial-refrigerator-repair.html',
    from: '24/7 emergency dispatch.',
    to: 'Emergency same-day dispatch.'
  },
  {
    file: 'freezer-not-freezing.html',
    from: 'Available 24/7 in Littleton',
    to: 'Available in Littleton'
  },
  {
    file: 'freezer-not-freezing.html',
    from: 'why we offer 24/7 emergency repair services.',
    to: 'why we offer emergency repair services.'
  },
  {
    file: 'freezer-repair.html',
    from: 'Available 24/7 in Littleton',
    to: 'Available in Littleton'
  },
  {
    file: 'ice-maker-repair.html',
    from: 'Available 24/7 in Littleton',
    to: 'Available in Littleton'
  },
  {
    file: 'ice-maker-repair.html',
    from: 'respond to ice maker emergencies 24/7.',
    to: 'respond to ice maker emergencies.'
  },
  {
    file: 'noisy-refrigerator-repair.html',
    from: 'Available 24/7 in Littleton',
    to: 'Available in Littleton'
  },
  {
    file: 'noisy-refrigerator-repair.html',
    from: 'Our team is on standby 24/7 to address',
    to: 'Our team is on standby to address'
  },
  {
    file: 'refrigerator-compressor-repair.html',
    from: 'Available 24/7 in Littleton',
    to: 'Available in Littleton'
  },
  {
    file: 'refrigerator-compressor-repair.html',
    from: 'Our team is on standby 24/7 to address',
    to: 'Our team is on standby to address'
  },
  {
    file: 'refrigerator-frost-buildup.html',
    from: 'Available 24/7 in Littleton',
    to: 'Available in Littleton'
  },
  {
    file: 'refrigerator-frost-buildup.html',
    from: 'Our team is on standby 24/7 to address',
    to: 'Our team is on standby to address'
  },
  {
    file: 'refrigerator-repair-downtown-littleton.html',
    from: '<div class="text-primary font-black text-4xl mb-1">24/7</div>\n              <div class="text-zinc-500 font-bold uppercase tracking-widest text-xs">Local experience</div>',
    to: '<div class="text-primary font-black text-4xl mb-1">15+</div>\n              <div class="text-zinc-500 font-bold uppercase tracking-widest text-xs">Years experience</div>'
  },
  {
    file: 'refrigerator-repair-downtown-littleton.html',
    from: 'With our 24/7 refrigerator repair in Downtown Littleton,',
    to: 'With our refrigerator repair in Downtown Littleton,'
  },
  {
    file: 'refrigerator-repair-ken-caryl.html',
    from: '"Yes, we offer emergency refrigerator repair services in Ken Caryl, available 24/7 for urgent food-safety situations."',
    to: '"Yes, we offer emergency refrigerator repair services in Ken Caryl, available with fast same-day dispatch for urgent food-safety situations."'
  },
  {
    file: 'refrigerator-repair-ken-caryl.html',
    from: '<div class="text-primary font-black text-4xl mb-1">24/7</div>\n              <div class="text-zinc-500 font-bold uppercase tracking-widest text-xs">Local experience</div>',
    to: '<div class="text-primary font-black text-4xl mb-1">15+</div>\n              <div class="text-zinc-500 font-bold uppercase tracking-widest text-xs">Years experience</div>'
  },
  {
    file: 'refrigerator-repair-ken-caryl.html',
    from: '<p class="text-muted-foreground font-medium text-sm">Yes, we offer emergency refrigerator repair services in Ken Caryl, available 24/7 for urgent food-safety situations.</p>',
    to: '<p class="text-muted-foreground font-medium text-sm">Yes, we offer emergency refrigerator repair services in Ken Caryl, available with fast same-day dispatch for urgent food-safety situations.</p>'
  },
  {
    file: 'refrigerator-repair-ken-caryl.html',
    from: 'and 24/7 emergency repair support for critical cooling failures.',
    to: 'and emergency repair support for critical cooling failures.'
  },
  {
    file: 'refrigerator-repair-littleton-village.html',
    from: '"Yes, we offer emergency refrigerator repair services in Littleton Village, available 24/7 for urgent situations."',
    to: '"Yes, we offer emergency refrigerator repair services in Littleton Village, available with fast same-day service for urgent situations."'
  },
  {
    file: 'refrigerator-repair-littleton-village.html',
    from: '<div class="text-primary font-black text-4xl mb-1">24/7</div>\n              <div class="text-zinc-500 font-bold uppercase tracking-widest text-xs">Local experience</div>',
    to: '<div class="text-primary font-black text-4xl mb-1">15+</div>\n              <div class="text-zinc-500 font-bold uppercase tracking-widest text-xs">Years experience</div>'
  },
  {
    file: 'refrigerator-repair-littleton-village.html',
    from: 'including 24/7 refrigerator repair in Littleton Village.',
    to: 'including same-day refrigerator repair in Littleton Village.'
  },
  {
    file: 'refrigerator-repair-littleton-village.html',
    from: 'Our team is available for emergency calls 24/7, ensuring that residents receive prompt assistance when needed.',
    to: 'Our team is available for emergency calls with prompt dispatch, ensuring that residents receive timely assistance when needed.'
  },
  {
    file: 'refrigerator-water-leaking.html',
    from: 'Our team provides 24/7 refrigerator leak diagnostics across Littleton,',
    to: 'Our team provides fast refrigerator leak diagnostics across Littleton,'
  },
  {
    file: 'refrigerator-water-leaking.html',
    from: 'alt="Emergency refrigerator leak repair specialist available 24/7."',
    to: 'alt="Emergency refrigerator leak repair specialist available in Littleton."'
  },
  {
    file: 'refrigerator-water-leaking.html',
    from: 'Available 24/7 in Littleton',
    to: 'Available in Littleton'
  },
  {
    file: 'refrigerator-water-leaking.html',
    from: 'Our team is on standby 24/7 to address any refrigerator water leaking issues',
    to: 'Our team is on standby to address any refrigerator water leaking issues'
  }
];

// Group by file
const byFile = {};
for (const r of replacements) {
  if (!byFile[r.file]) byFile[r.file] = [];
  byFile[r.file].push(r);
}

let totalMatches = 0;
for (const [file, items] of Object.entries(byFile)) {
  let content = fs.readFileSync(file, 'utf8');
  for (const item of items) {
    // Normalize newlines in search if needed
    if (!content.includes(item.from)) {
      // try crlf
      const fromCRLF = item.from.replace(/\n/g, '\r\n');
      if (content.includes(fromCRLF)) {
        content = content.replace(fromCRLF, item.to.replace(/\n/g, '\r\n'));
        totalMatches++;
      } else {
        console.warn(`NOT FOUND in ${file}: "${item.from.slice(0, 40)}..."`);
      }
    } else {
      content = content.replace(item.from, item.to);
      totalMatches++;
    }
  }
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}

console.log(`\nReplaced ${totalMatches}/${replacements.length} occurrences.`);
