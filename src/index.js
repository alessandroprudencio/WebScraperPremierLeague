const puppeteer = require('puppeteer')
import { exportExcel } from './exportExcel.js'
import { filterNationalities } from './filterNationalities'
import config from '../config'

(async () => {
    console.log('\n Generating xls file please wait...');

    const browser = await puppeteer.launch();
    let page = await browser.newPage()

    await page.goto(config.URL_CLIENT, { waitUntil: 'networkidle2' })

    await page.waitFor(4000);

    const numEntries = 2362
    const pageSize = (await page.$$('tbody > tr')).length
    const numberPages = Math.round(numEntries / pageSize)

    let entryNumber = 0
    let nationalities = []
    let playersNow = []

    for (let i = 0; i <= numberPages; i++) {
        let rows = await page.$$('.statsTableContainer > tr')
        for (const player of rows) {
            let playerName = await player.$eval('td:nth-child(2) > a > strong', playerName => playerName.innerText)
            let rank = await player.$eval('td.rank > strong', rank => rank.innerText.replace('.', ''))
            let nationality = await player.$eval('td:nth-child(4) > div > .playerCountry', nationality => nationality.innerText)
            let goals = await player.$eval('td.mainStat', goals => goals.innerText)
            nationalities.push(nationality)
            playersNow.push({ playerName: playerName, rank: rank, nationality: nationality, goals: goals })
            entryNumber++
            if (entryNumber === numEntries) break
        }
        await page.click('.chevron-rightblack-normal');
        await page.waitForSelector('.statsTableContainer');
        await page.waitFor(500)
    }

    playersNow.push(filterNationalities(nationalities))

    await exportExcel(playersNow)

    await browser.close()
    console.log("\x1b[32m", '\n Successfully generated file.');

})()
