// Одноразовый скрипт: копирует документы из папки "Файлы которые нужно добавить..."
// в portfolio/documents/ с подпапками по категориям. Запуск: node copy-documents.js

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const sourceBase = path.join(projectRoot, 'Файлы которые нужно добавить в Онлайн веб портфолио');
const destBase = path.join(__dirname, 'documents');

const categories = [
    {
        source: path.join(sourceBase, 'ГЕРАСИН', 'Проектирование защиты веб серверов'),
        dest: 'gerasin_web',
        title: 'Программное обеспечение Web-серверов (защита)'
    },
    {
        source: path.join(sourceBase, 'ГЕРАСИН', 'Эксплуатация автоматизированных'),
        dest: 'gerasin_auto',
        title: 'Эксплуатация автоматизированных (информационных) систем в защищенном исполнении'
    },
    {
        source: path.join(sourceBase, 'ГЕРАСИН', 'Эксплуатация компьютерных сетей'),
        dest: 'gerasin_networks',
        title: 'Эксплуатация компьютерных сетей'
    },
    {
        source: path.join(sourceBase, 'Дмитренко', 'ПЗ 1 ПОЛУГОДИЯ'),
        dest: 'dmitrenko_pz1',
        title: 'Техническое защита информации ПЗ1'
    },
    {
        source: path.join(sourceBase, 'Дмитренко', 'ПЗ 2 ПОЛУГОДИЯ'),
        dest: 'dmitrenko_pz2',
        title: 'Техническое защита информации ПЗ2'
    },
    {
        source: path.join(sourceBase, 'Дмитренко', 'Работа с сетями'),
        dest: 'dmitrenko_networks',
        title: 'Сети'
    },
    {
        source: path.join(sourceBase, 'Курсовые и ДИПЛОМНЫЕ проект'),
        dest: 'course_diploma',
        title: 'Дипломные работы'
    }
];

if (!fs.existsSync(sourceBase)) {
    console.error('Папка с исходными файлами не найдена:', sourceBase);
    process.exit(1);
}

let total = 0;
categories.forEach(cat => {
    const destDir = path.join(destBase, cat.dest);
    if (!fs.existsSync(cat.source)) {
        console.warn('Пропуск (нет папки):', cat.source);
        return;
    }
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const files = fs.readdirSync(cat.source);
    files.forEach(f => {
        const src = path.join(cat.source, f);
        if (!fs.statSync(src).isFile()) return;
        const dest = path.join(destDir, f);
        fs.copyFileSync(src, dest);
        total++;
    });
    console.log('Скопировано в', cat.dest + ':', fs.readdirSync(destDir).length, 'файлов');
});
console.log('Всего скопировано файлов:', total);
