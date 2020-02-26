import { exportExcel } from '../src/exportExcel'
import fs from 'fs'
import request from 'request'
import config from '../config'

import { filterNationalities } from '../src/filterNationalities'

test('Site disponivel', async () => {
    request(config.URL_CLIENT, (error, response, body) => {
        expect(response.statusCode).toBe(200)
    })
})

test('Gerar o arquivo XLS', () => {
    let elements = [{ playerName: 'joaquim', rank: 80, nationality: 'Brazil', goals: 540 }]
    exportExcel(elements)
    const exist = fs.existsSync('src/uploads/premier_league.xls');
    expect(exist).toBe(true)
    if (exist) fs.unlinkSync('src/uploads/premier_league.xls')
})

test('Filtrar nacionalidades', () => {
    let nationalitys = ['England', 'Bulgaria', 'England']
    expect(filterNationalities(nationalitys)).toStrictEqual({ Nationalities: { 'England': 2, 'Bulgaria': 1 } })
})