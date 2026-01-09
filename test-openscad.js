
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const OPENSCAD_PATH = '"C:\\Program Files\\OpenSCAD\\openscad.exe"';
const testScad = path.join(__dirname, 'test.scad');
const testStl = path.join(__dirname, 'test.stl');

const scadContent = `
$fn = 20;
cube([10, 10, 10], center = true);
translate([0, 0, 10]) text("Hi", size = 5, halign = "center");
`;

fs.writeFileSync(testScad, scadContent);

console.log('Running OpenSCAD...');
exec(`${OPENSCAD_PATH} -o "${testStl}" "${testScad}"`, (error, stdout, stderr) => {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    if (stderr) console.log('Stderr:', stderr);
    console.log('Success! STL generated at:', testStl);
    if (fs.existsSync(testStl)) {
        console.log('File size:', fs.statSync(testStl).size, 'bytes');
    }
});
