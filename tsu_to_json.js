const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function jsonToXml(obj, nodeName) {
  if (obj === null) return `<${nodeName}/>`;
  if (typeof obj !== 'object') {
    const text = String(obj).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;' }[c]));
    return `<${nodeName}>${text}</${nodeName}>`;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => jsonToXml(item, nodeName)).join('\n');
  }
  // object
  const children = Object.entries(obj).map(([k,v]) => {
    const tag = k.replace(/[^a-zA-Z0-9_\-:.]/g, '_');
    return jsonToXml(v, tag);
  }).join('\n');
  return `<${nodeName}>\n${children}\n</${nodeName}>`;
}

function convert(tsuPath, outDir) {
  if (!fs.existsSync(tsuPath)) {
    console.error(`File not found: ${tsuPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const data = fs.readFileSync(tsuPath);
  // try gunzip
  zlib.gunzip(data, (err, buffer) => {
    if (err) {
      console.error('Error: not a gzipped file or failed to gunzip:', err.message);
      process.exit(1);
    }

    const content = buffer.toString('utf8');
    let jsonData;
    try {
      jsonData = JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse JSON inside TSU:', e.message);
      // write raw content for inspection
      fs.writeFileSync(path.join(outDir, 'raw_content.txt'), content, 'utf8');
      process.exit(1);
    }

    const jsonOutput = path.join(outDir, 'tosca_content.json');
    fs.writeFileSync(jsonOutput, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log('Wrote', jsonOutput);

    // convert to XML
    const xmlRoot = jsonToXml(jsonData, 'ToscaExport');
    const xmlOutput = path.join(outDir, 'converted_tosca_test.xml');
    const xmlHeader = `<?xml version="1.0" encoding="utf-8"?>\n`;
    fs.writeFileSync(xmlOutput, xmlHeader + xmlRoot, 'utf8');
    console.log('Wrote', xmlOutput);
  });
}

if (require.main === module) {
  const tsu = process.argv[2] || 'avi.tsu';
  const out = process.argv[3] || 'extracted_tosca_files_js';
  convert(tsu, out);
}
