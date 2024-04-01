import { writeFile } from 'fs/promises'
import { PlaywrightCrawler } from '@crawlee/playwright'

const studentData = { 'students': {} }
let studentUrlList = []

const studentCrawler = new PlaywrightCrawler({
    launchContext: {
        launchOptions: {
            headless: true
        }
    },
    minConcurrency: 10,
    async requestHandler({ log, page, request }) {
        const idName = request.url.match(/https:\/\/schale\.gg\/\?chara=(.+)/)[1].toLowerCase()
        let studentItem = {
            'displayName': {
                'full': {},
                'abbrev': {}
            },
            'variant': {}
        }

        log.info(`Student crawler is processing ${idName}...`)
        await page.locator('#loaded-module').waitFor()

        const changeLog = page.locator('#modal-changelog .btn-close')
        if (await changeLog.isVisible()) {
            await changeLog.click()
        }

        await page.locator('#ba-navbar-settings').click()
        await page.locator('#ba-navbar-languageselector').click()
        await page.locator('#ba-navbar-languageselector-en').click()
        await page.locator('body.font-en').waitFor()
        studentItem = await page.$$eval('#loaded-module', ($posts, studentItem) => {
            $posts.forEach($post => {
                const rawName = $post.querySelector('#ba-student-name').textContent.trim()
                let abbrevName = rawName

                if (/.+?\s*\(.+\)$/.test(rawName)) {
                    abbrevName = rawName.match(/(.+?)\s*\(.+\)/)[1]
                    studentItem['variant']['en'] = rawName.match(/.+?\s*\((.+)\)/)[1].trim()
                }

                studentItem['displayName']['full']['en'] = $post.querySelector('#ba-student-fullname').textContent.trim()
                studentItem['displayName']['abbrev']['en'] = abbrevName
                studentItem['school'] = $post.querySelector('#ba-student-school-img').getAttribute('src').match(/.*?School_Icon_(.+?)_.*/)[1].toLowerCase().trim()
                studentItem['role'] = $post.querySelector('#ba-student-role-label').textContent.toLowerCase().trim()
                studentItem['damageType'] = $post.querySelector('#ba-student-attacktype-label').textContent.toLowerCase().trim()
                studentItem['armorType'] = $post.querySelector('#ba-student-defensetype-label').textContent.toLowerCase().trim()
                studentItem['weaponType'] = $post.querySelector('#ba-student-weapon-type').textContent.toLowerCase().trim()
                studentItem['avatarUrl'] = `https://schale.gg/${$post.querySelector('#ba-profile-portrait-img').getAttribute('src')}`
            })

            return studentItem
        }, studentItem)

        await page.locator('#ba-navbar-languageselector').click()
        await page.locator('#ba-navbar-languageselector-cn').click()
        await page.locator('body.font-cn').waitFor()
        studentItem = await page.$$eval('#loaded-module', ($posts, studentItem) => {
            $posts.forEach($post => {
                const rawName = $post.querySelector('#ba-student-name').textContent.trim()
                let abbrevName = rawName

                if (/.+?\s*（.+）$/.test(rawName)) {
                    abbrevName = rawName.match(/(.+?)\s*（.+）/)[1]
                    studentItem['variant']['zh_cn'] = rawName.match(/.+?\s*（(.+)）/)[1].trim()
                }

                studentItem['displayName']['full']['zh_cn'] = $post.querySelector('#ba-student-fullname').textContent.trim()
                studentItem['displayName']['abbrev']['zh_cn'] = abbrevName
            })

            return studentItem
        }, studentItem)

        await page.locator('#ba-navbar-languageselector').click()
        await page.locator('#ba-navbar-languageselector-jp').click()
        await page.locator('body.font-jp').waitFor()
        studentItem = await page.$$eval('#loaded-module', ($posts, studentItem) => {
            function deleteNotation(rawStr) {
                let result = ''
                let isNotation = false

                for (let i = 0; i < rawStr.length; i += 1) {
                    if (rawStr[i] === '(') {
                        isNotation = true
                    } else if (rawStr[i] === ')') {
                        isNotation = false
                    } else if (!isNotation) {
                        result += rawStr[i]
                    }
                }

                return result
            }

            $posts.forEach($post => {
                const rawName = $post.querySelector('#ba-student-name').textContent.trim()
                let abbrevName = rawName

                if (/.+?\s*（.+）$/.test(rawName)) {
                    abbrevName = rawName.match(/(.+?)\s*（.+）/)[1]
                    studentItem['variant']['jp'] = rawName.match(/.+?\s*（(.+)）/)[1].trim()
                }

                studentItem['displayName']['full']['jp'] = deleteNotation($post.querySelector('#ba-student-fullname').textContent.trim())
                studentItem['displayName']['abbrev']['jp'] = deleteNotation(abbrevName)
            })

            return studentItem
        }, studentItem)

        studentData['students'][idName] = studentItem
        await page.close()
    },
    async failedRequestHandler({ log, request }) {
        log.info(`Request ${request.url} failed too mant times.`)
    }
})
const rootCrawler = new PlaywrightCrawler({
    launchContext: {
        launchOptions: {
            headless: true
        }
    },
    async requestHandler({ log, page }) {
        log.info('Root crawler is processing...')
        await page.locator('#student-select-grid').waitFor({ state: 'attached' })
        await new Promise(resolve => setTimeout(resolve, 10000))

        studentUrlList = await page.$$eval('#student-select-grid>.card-student', ($posts) => {
            const tmpStudentUrlList = []

            $posts.forEach($post => {
                const studentUrl = $post.getAttribute('onclick').match(/loadStudent\('(.*)'\)/)[1]
                tmpStudentUrlList.push(`https://schale.gg/?chara=${studentUrl}`)
            })

            return tmpStudentUrlList
        })

        await page.close()
    },
    async failedRequestHandler({ log, request }) {
        log.info(`Request ${request.url} failed too mant times.`)
    }
})

async function dumpJson() {
    try {
        await writeFile('./data/students.json', JSON.stringify(studentData))
        console.log('Dumped json.')
    } catch (err) {
        console.error(`Error occurred during dumping json: ${err}`)
    }
}

(async () => {
    await rootCrawler.run(['https://schale.gg/?chara=Kayoko_NewYear'])
    console.log(`Crawling ${studentUrlList.length} students...`)
    await studentCrawler.run(studentUrlList)
    await dumpJson()
})()
