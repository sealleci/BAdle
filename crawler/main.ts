import { writeFile } from 'fs/promises'
import { PlaywrightCrawler } from '@crawlee/playwright'
import type { Page } from 'playwright'

interface StudentItem {
    displayName: {
        full: Record<string, string>
        abbrev: Record<string, string>
    }
    variant: Record<string, string>
    school: string
    role: string
    damageType: string
    armorType: string
    weaponType: string
    positionType: string
    avatarUrl: string
}

const studentData: { students: Record<string, StudentItem> } = { 'students': {} }
let studentUrlList: string[] = []

function scrapeCJKHtml(rawAbbrevName: string, rawFullName: string, studentItem: StudentItem, language: string): StudentItem {
    function deleteNotation(raw: string): string {
        let result = ''
        let isNotation = false

        for (let i = 0; i < raw.length; i += 1) {
            if (raw[i] === '(' || raw[i] === '（') {
                isNotation = true
            } else if (raw[i] === ')' || raw[i] === '）') {
                isNotation = false
            } else if (!isNotation) {
                result += raw[i]
            }
        }

        return result
    }

    let abbrevName = rawAbbrevName

    if (/.+?\s*[（(].+[）)]$/.test(rawAbbrevName)) {
        const tmpNameRxMatch1 = rawAbbrevName.match(/(.+?)\s*[（(].+[）)]/)
        const tmpNameRxMatch2 = rawAbbrevName.match(/.+?\s*[（(](.+)[）)]/)
        abbrevName = tmpNameRxMatch1 !== null ? tmpNameRxMatch1[1].trim() : ''
        studentItem['variant'][language] = tmpNameRxMatch2 !== null ? tmpNameRxMatch2[1].trim() : ''
    }

    studentItem['displayName']['full'][language] = deleteNotation(rawFullName.replace(/\s+/g, ' '))
    studentItem['displayName']['abbrev'][language] = deleteNotation(abbrevName)

    return studentItem
}

async function parseStudentInfo(page: Page): Promise<StudentItem> {
    let studentItem: StudentItem = {
        'displayName': {
            'full': {},
            'abbrev': {}
        },
        'variant': {},
        'school': '',
        'role': '',
        'damageType': '',
        'armorType': '',
        'weaponType': '',
        'positionType': '',
        'avatarUrl': ''
    }

    await page.locator('#loaded-module').waitFor()

    const changeLog = page.locator('#modal-changelog .btn-close')
    if (await changeLog.isVisible()) {
        await changeLog.click()
    }

    await page.locator('#ba-navbar-settings').click()
    await page.locator('#ba-navbar-languageselector').click()
    await page.locator('#ba-navbar-languageselector-en').click()
    await page.locator('body.font-en').waitFor()
    studentItem = await page.locator('#loaded-module').evaluate(($post, studentItem) => {
        const rawName = $post.querySelector('#ba-student-name')?.textContent?.trim() ?? ''
        let abbrevName = rawName

        if (/.+?\s*\(.+\)$/.test(rawName)) {
            const tmpNameRxMatch1 = rawName.match(/(.+?)\s*\(.+\)/)
            const tmpNameRxMatch2 = rawName.match(/.+?\s*\((.+)\)/)
            abbrevName = tmpNameRxMatch1 !== null ? tmpNameRxMatch1[1].trim() : ''
            studentItem['variant']['en'] = tmpNameRxMatch2 !== null ? tmpNameRxMatch2[1].trim() : ''
        }

        studentItem['displayName']['full']['en'] = $post.querySelector('#ba-student-fullname')?.textContent?.trim().replace(/\s+/g, ' ') ?? ''
        studentItem['displayName']['abbrev']['en'] = abbrevName
        const tmpSchoolRxMatch = $post.querySelector('#ba-student-school-img')?.getAttribute('src')?.match(/.*?School_Icon_(.+?)_.*/)
        studentItem['school'] = tmpSchoolRxMatch !== null && tmpSchoolRxMatch !== undefined ? tmpSchoolRxMatch[1].toLowerCase().trim() : ''
        studentItem['role'] = $post.querySelector('#ba-student-role-label')?.textContent?.toLowerCase().trim() ?? ''
        studentItem['damageType'] = $post.querySelector('#ba-student-attacktype-label')?.textContent?.toLowerCase().trim() ?? ''
        studentItem['armorType'] = $post.querySelector('#ba-student-defensetype-label')?.textContent?.toLowerCase().trim() ?? ''
        studentItem['weaponType'] = $post.querySelector('#ba-student-weapon-type')?.textContent?.toLowerCase().trim() ?? ''
        studentItem['positionType'] = $post.querySelector('#ba-student-position-label')?.textContent?.toLowerCase().trim() ?? ''
        studentItem['avatarUrl'] = `https://schale.gg/${$post.querySelector('#ba-profile-portrait-img')?.getAttribute('src') ?? ''}`

        return studentItem
    }, studentItem)

    await page.exposeFunction('scrapeCJKHtml', scrapeCJKHtml)
    await page.locator('#ba-navbar-languageselector').click()
    await page.locator('#ba-navbar-languageselector-kr').click()
    await page.locator('body.font-kr').waitFor()
    studentItem = await page.locator('#loaded-module').evaluate(($post, studentItem) => {
        const rawAbbrevName = $post.querySelector('#ba-student-name')?.textContent?.trim() ?? ''
        const rawFullName = $post.querySelector('#ba-student-fullname')?.textContent?.trim() ?? ''

        return scrapeCJKHtml(rawAbbrevName, rawFullName, studentItem, 'kr')
    }, studentItem)

    await page.locator('#ba-navbar-languageselector').click()
    await page.locator('#ba-navbar-languageselector-jp').click()
    await page.locator('body.font-jp').waitFor()
    studentItem = await page.locator('#loaded-module').evaluate(($post, studentItem) => {
        const rawAbbrevName = $post.querySelector('#ba-student-name')?.textContent?.trim() ?? ''
        const rawFullName = $post.querySelector('#ba-student-fullname')?.textContent?.trim() ?? ''

        return scrapeCJKHtml(rawAbbrevName, rawFullName, studentItem, 'jp')
    }, studentItem)

    await page.locator('#ba-navbar-languageselector').click()
    await page.locator('#ba-navbar-languageselector-zh').click()
    await page.locator('body.font-zh').waitFor()
    studentItem = await page.locator('#loaded-module').evaluate(($post, studentItem) => {
        const rawAbbrevName = $post.querySelector('#ba-student-name')?.textContent?.trim() ?? ''
        const rawFullName = $post.querySelector('#ba-student-fullname')?.textContent?.trim() ?? ''

        return scrapeCJKHtml(rawAbbrevName, rawFullName, studentItem, 'zh_cn')
    }, studentItem)

    return studentItem
}

const studentCrawler = new PlaywrightCrawler({
    launchContext: {
        launchOptions: {
            headless: true
        }
    },
    minConcurrency: 15,
    async requestHandler({ log, page, request }) {
        const tmpRxMatch = request.url.match(/https:\/\/schale\.gg\/\?chara=(.+)/)
        const idName = tmpRxMatch === null ? '' : tmpRxMatch[1].toLowerCase()
        log.info(`Student crawler is processing ${idName}...`)
        studentData['students'][idName] = await parseStudentInfo(page)
        await page.close()
    },
    async failedRequestHandler({ log, request }) {
        log.info(`Request ${request.url} failed too many times.`)
    }
})

const rootCrawler = new PlaywrightCrawler({
    launchContext: {
        launchOptions: {
            headless: true
        }
    },
    async requestHandler({ log, page, request }) {
        const tmpRxMatch = request.url.match(/https:\/\/schale\.gg\/\?chara=(.+)/)
        const idName = tmpRxMatch === null ? '' : tmpRxMatch[1].toLowerCase()
        log.info(`Root crawler is processing ${idName}...`)
        studentData['students'][idName] = await parseStudentInfo(page)

        await page.locator('#student-select-grid').waitFor({ state: 'attached' })
        studentUrlList = await page.$$eval('#student-select-grid>.card-student', ($posts) => {
            const tmpStudentUrlList: string[] = []
            $posts.forEach($post => {
                const tmpRxMatch = $post.getAttribute('onclick')?.match(/loadStudent\('(.*)'\)/)
                const studentUrl = tmpRxMatch !== null && tmpRxMatch !== undefined ? tmpRxMatch[1] : ''
                tmpStudentUrlList.push(`https://schale.gg/?chara=${studentUrl}`)
            })

            return tmpStudentUrlList
        })

        await page.close()
    },
    async failedRequestHandler({ log, request }) {
        log.info(`Request ${request.url} failed too many times.`)
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
    await rootCrawler.teardown()
    console.log(`Crawling ${studentUrlList.length} students...`)
    await studentCrawler.run(studentUrlList)
    await studentCrawler.teardown()
    await dumpJson()
})()
