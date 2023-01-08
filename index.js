'use strict';
const XLSX = require('xlsx');
const FS = require('fs/promises');

const readArchive = async () => {
    var workbook = await XLSX.readFile('Migracion_usuarios_sbs.xlsx'); //READ THE ARCHIVE IN THE ROOT DIRECTORY
    var sheet_name_list = workbook.SheetNames;
    const DATA = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    writteMigration(DATA);
};

const writteMigration = async (DATA) => {
    try {
        var content = "";
        DATA.forEach(element => {
            content += `INSERT INTO name_schema.tabla 
              (HEAD1, HEAD2, HEAD3, HEAD4, HEAD5)
            VALUES 
              ('${('value') ? '1' : element.HEAD1}', '${element.HEAD2}', '${element.HEAD3}', '${element.HEAD4}', '${element.HEAD5}')
            ON CONFLICT
              (primary_key) 
            DO UPDATE
            SET
            activo = EXCLUDED.activo;\n\n`;            
        });                        
        await FS.writeFile('C:/Path/nombre_arcihvo.txt', content);
    } catch (err) {
        console.log(err);
    }
}

readArchive();