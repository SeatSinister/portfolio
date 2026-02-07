// Скрипт для автоматического обновления списка PDF файлов
// Запустите: node update-documents.js

const fs = require('fs');
const path = require('path');

const documentsDir = path.join(__dirname, 'documents');
const listFile = path.join(__dirname, 'documents-list.json');

// Создать папку documents, если её нет
if (!fs.existsSync(documentsDir)) {
    fs.mkdirSync(documentsDir, { recursive: true });
    console.log('✅ Папка documents создана');
}

// Получить список PDF файлов
let pdfFiles = [];
if (fs.existsSync(documentsDir)) {
    const files = fs.readdirSync(documentsDir);
    pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));
}

// Обновить JSON файл
const data = {
    documents: pdfFiles.map(file => ({
        filename: file,
        name: file.replace(/\.pdf$/i, '').replace(/_/g, ' ').replace(/-/g, ' ')
    })).sort((a, b) => a.name.localeCompare(b.name, 'ru'))
};

try {
    fs.writeFileSync(listFile, JSON.stringify(data, null, 2), 'utf8');
} catch (err) {
    console.error('❌ Ошибка записи documents-list.json:', err.message);
    process.exit(1);
}

console.log(`✅ Найдено PDF файлов: ${pdfFiles.length}`);
if (pdfFiles.length > 0) {
    console.log('📄 Файлы:');
    pdfFiles.forEach(file => console.log(`   - ${file}`));
} else {
    console.log('ℹ️  Добавьте PDF файлы в папку documents/ и запустите скрипт снова');
}
