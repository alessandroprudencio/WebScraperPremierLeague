import Excel from 'exceljs'

export function exportExcel(elements) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Premier League Player Stats");

    worksheet.columns = [
        { header: 'Rank', key: 'rank', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'Nationality', key: 'nationality', width: 15 },
        { header: 'Goals', key: 'goals', width: 10 },
    ];

    elements.forEach(element => {
        worksheet.addRow({ rank: element.rank, name: element.playerName, nationality: element.nationality, goals: element.goals });
    });

    let countries = []
    let numberQtd = []
    for (const key in elements.slice(-1)[0].Nationalities) {
        countries.push(key)
        numberQtd.push(elements.slice(-1)[0].Nationalities[key])
    }

    countries.splice(0, 0, 'Nationality')
    numberQtd.splice(0, 0, 'Number')

    worksheet.getRow(1).font = { color: "0000", bold: true };

    worksheet.getColumn(7).values = countries
    worksheet.getColumn(8).values = numberQtd

    return workbook.xlsx.writeFile('src/uploads/premier_league.xls');
};