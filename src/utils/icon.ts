import type { LanguageType } from '../types/language.ts'
import type { DamageType, ArmorType, StudentRole, StudentSchool } from '../types/student.ts'

const RED_COLOR: string = ''
const YELLOW_COLOR: string = ''
const BLUE_COLOR: string = ''
const PURPLE_COLOR: string = ''

function getDamageTextAndColor(damageType: DamageType, language: LanguageType): [string, string] {
    switch (damageType) {

        case 'explosive':
            switch (language) {
                case 'en':
                    return ['Explosive', RED_COLOR]
                case 'jp':
                    return ['爆発', RED_COLOR]
                case 'zh_cn':
                    return ['爆发', RED_COLOR]
                default:
                    return ['', RED_COLOR]
            }
        case 'piercing':
            switch (language) {
                case 'en':
                    return ['Piercing', YELLOW_COLOR]
                case 'jp':
                    return ['貫通', YELLOW_COLOR]
                case 'zh_cn':
                    return ['贯穿', YELLOW_COLOR]
                default:
                    return ['', YELLOW_COLOR]
            }
        case 'mystic':
            switch (language) {
                case 'en':
                    return ['Mystic', BLUE_COLOR]
                case 'jp':
                    return ['神秘', BLUE_COLOR]
                case 'zh_cn':
                    return ['神秘', BLUE_COLOR]
                default:
                    return ['', BLUE_COLOR]
            }
        case 'sonic':
            switch (language) {
                case 'en':
                    return ['Sonic', PURPLE_COLOR]
                case 'jp':
                    return ['振動', PURPLE_COLOR]
                case 'zh_cn':
                    return ['震动', PURPLE_COLOR]
                default:
                    return ['', PURPLE_COLOR]
            }
        default:
            return ['', '']

    }
}

function getArmorTextAndColor(armorType: ArmorType, language: LanguageType): [string, string] {
    switch (armorType) {
        case 'light':
            switch (language) {
                case 'en':
                    return ['Light', RED_COLOR]
                case 'jp':
                    return ['軽装備', RED_COLOR]
                case 'zh_cn':
                    return ['轻装甲', RED_COLOR]
                default:
                    return ['', RED_COLOR]
            }
        case 'heavy':
            switch (language) {
                case 'en':
                    return ['Heavy', YELLOW_COLOR]
                case 'jp':
                    return ['重装甲', YELLOW_COLOR]
                case 'zh_cn':
                    return ['重装甲', YELLOW_COLOR]
                default:
                    return ['', YELLOW_COLOR]
            }
        case 'special':
            switch (language) {
                case 'en':
                    return ['Special', BLUE_COLOR]
                case 'jp':
                    return ['特殊装甲', BLUE_COLOR]
                case 'zh_cn':
                    return ['特殊\r\n装甲', BLUE_COLOR]
                default:
                    return ['', BLUE_COLOR]
            }
        case 'elastic':
            switch (language) {
                case 'en':
                    return ['Elastic', PURPLE_COLOR]
                case 'jp':
                    return ['弾力装甲', PURPLE_COLOR]
                case 'zh_cn':
                    return ['弹力\r\n装甲', PURPLE_COLOR]
                default:
                    return ['', PURPLE_COLOR]
            }
        default:
            return ['', '']
    }
}

function getRoleIconUrl(role: StudentRole): string {
    switch (role) {
        case 'tank':
            return 'https://schale.gg/images/ui/Role_Tanker.png'
        case 'dealer':
            return 'https://schale.gg/images/ui/Role_DamageDealer.png'
        case 'healer':
            return 'https://schale.gg/images/ui/Role_Healer.png'
        case 'support':
            return 'https://schale.gg/images/ui/Role_Supporter.png'
        case 't.s.':
            return 'https://schale.gg/images/ui/Role_Vehicle.png'
        default:
            return ''
    }
}

function getSchoolIconUrl(school: StudentSchool): string {
    switch (school) {
        case 'abydos':
            return 'https://schale.gg/images/schoolicon/School_Icon_ABYDOS_W.png'
        case 'arius':
            return 'https://schale.gg/images/schoolicon/School_Icon_ARIUS_W.png'
        case 'etc':
            return 'https://schale.gg/images/schoolicon/School_Icon_ETC_W.png'
        case 'gehenna':
            return 'https://schale.gg/images/schoolicon/School_Icon_GEHENNA_W.png'
        case 'hyakkiyako':
            return 'https://schale.gg/images/schoolicon/School_Icon_HYAKKIYAKO_W.png'
        case 'millennium':
            return 'https://schale.gg/images/schoolicon/School_Icon_MILLENNIUM_W.png'
        case 'redwinter':
            return 'https://schale.gg/images/schoolicon/School_Icon_REDWINTER_W.png'
        case 'shanhaijing':
            return 'https://schale.gg/images/schoolicon/School_Icon_SHANHAIJING_W.png'
        case 'srt':
            return 'https://schale.gg/images/schoolicon/School_Icon_SRT_W.png'
        case 'tokiwadai':
            return 'https://schale.gg/images/schoolicon/School_Icon_TOKIWADAI_W.png'
        case 'trinity':
            return 'https://schale.gg/images/schoolicon/School_Icon_TRINITY_W.png'
        case 'valkyrie':
            return 'https://schale.gg/images/schoolicon/School_Icon_VALKYRIE_W.png'
        default:
            return ''
    }
}

export { getDamageTextAndColor, getArmorTextAndColor, getRoleIconUrl, getSchoolIconUrl }
