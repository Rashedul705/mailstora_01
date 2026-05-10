const fs = require('fs');

function findFiles(dir, files) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = dir + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      findFiles(fullPath, files);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      files.push(fullPath);
    }
  });
  return files;
}

const allFiles = findFiles('/Users/rashedulislam/Downloads/mailstora_01/mailstora_01/Client/src', []);
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('http://localhost:5000')) {
    console.log('Fixing:', file);
    // Replace hardcoded localhost API urls with NEXT_PUBLIC_API_URL
    content = content.replace(/['"`]http:\/\/localhost:5000([^'"`]*)['"`]/g, '`${process.env.NEXT_PUBLIC_API_URL || \'http://localhost:5001\'}$1`');
    fs.writeFileSync(file, content);
  }
});
console.log('Done');
