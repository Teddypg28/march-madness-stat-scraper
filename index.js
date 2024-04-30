import puppeteer from 'puppeteer'

import { teamData } from './teams.js'
import { teams } from "./teams.js"

// const defensiveEfficiencyUrl = 'https://www.teamrankings.com/ncaa-basketball/stat/defensive-efficiency'
// const offensiveEfficiencyUrl = 'https://www.teamrankings.com/ncaa-basketball/stat/offensive-efficiency'
// const threesPerGameUrl = 'https://www.teamrankings.com/ncaa-basketball/stat/three-pointers-made-per-game'
// const closeGameWinPercentageUrl = 'https://www.teamrankings.com/ncaa-basketball/stat/win-pct-close-games'
// const threePointPercentageUrl = 'https://www.teamrankings.com/ncaa-basketball/stat/three-point-pct'
// const opponentPointsPerGameUrl = 'https://www.teamrankings.com/ncaa-basketball/stat/opponent-points-per-game'
// const pointsPerGameUrl = 'https://www.teamrankings.com/ncaa-basketball/stat/points-per-game'

const scrape = async () => {
    
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto(threePointPercentageUrl)
    
    const oddContainers = await page.$$('tr.odd')
    const evenContainers = await page.$$('tr.even')
    
    let done

        for (let i = 0; i<oddContainers.length; i++) {
            const teamName = await oddContainers[i].$eval('a', el => el.textContent)
            if (teams.includes(teamName)) {
                const index = teamData.findIndex(team => team.teamName === teamName)
                const threePointPercentage = await oddContainers[i].$eval('td.text-right', el => el.textContent)
                teamData[index].threePointPercentage = threePointPercentage
            }
        }
    
            for (let i = 0; i<evenContainers.length; i++) {
                const teamName = await evenContainers[i].$eval('a', el => el.textContent)
                if (teams.includes(teamName)) {
                    const index = teamData.findIndex(team => team.teamName === teamName)
                    const threePointPercentage = await evenContainers[i].$eval('td.text-right', el => el.textContent)
                    teamData[index].threePointPercentage = threePointPercentage
                }
                if (i === oddContainers.length - 1) {
                    done = true
                }
            }

            if (done === true) {
                console.log(teamData)
            }
        
    }


scrape()

