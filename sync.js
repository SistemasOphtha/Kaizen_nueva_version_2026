const fs = require('fs');
const htmlPath = 'D:/CLIENTES/ophtha/proyecto_kaizen/Documentacion/cronograma_gantt.html';
const mdPath = 'D:/CLIENTES/ophtha/proyecto_kaizen/Documentacion/comparativo_alcance_contrato.md';
const html = fs.readFileSync(htmlPath, 'utf8');
const md = fs.readFileSync(mdPath, 'utf8');
const regex = /(<script type="text\/markdown" id="md-source">)[\s\S]*?(<\/script>)/i;
const updatedHtml = html.replace(regex, '$1\n' + md + '\n$2');
fs.writeFileSync(htmlPath, updatedHtml, 'utf8');
console.log('HTML updated successfully!');
