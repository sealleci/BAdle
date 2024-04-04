import type { LanguageType } from '../types/language.ts'
import type { DamageType, ArmorType, StudentRole, StudentSchool } from '../types/student.ts'

const RED_COLOR: string = 'red'
const YELLOW_COLOR: string = 'yellow'
const BLUE_COLOR: string = 'blue'
const PURPLE_COLOR: string = 'purple'

function getDamageText(damageType: DamageType, language: LanguageType): string {
    switch (damageType) {
        case 'explosive':
            switch (language) {
                case 'en':
                    return 'Explosive'
                case 'jp':
                    return '爆発'
                case 'zh_cn':
                    return '爆炸'
                case 'kr':
                    return '폭발'
                default:
                    return ''
            }
        case 'piercing':
            switch (language) {
                case 'en':
                    return 'Piercing'
                case 'jp':
                    return '貫通'
                case 'zh_cn':
                    return '贯通'
                case 'kr':
                    return '관통'
                default:
                    return ''
            }
        case 'mystic':
            switch (language) {
                case 'en':
                    return 'Mystic'
                case 'jp':
                    return '神秘'
                case 'zh_cn':
                    return '神秘'
                case 'kr':
                    return '신비'
                default:
                    return ''
            }
        case 'sonic':
            switch (language) {
                case 'en':
                    return 'Sonic'
                case 'jp':
                    return '振動'
                case 'zh_cn':
                    return '振动'
                case 'kr':
                    return '진동'
                default:
                    return ''
            }
        default:
            return ''

    }
}

function getDamageColor(damageType: DamageType): string {
    switch (damageType) {
        case 'explosive':
            return RED_COLOR
        case 'piercing':
            return YELLOW_COLOR
        case 'mystic':
            return BLUE_COLOR
        case 'sonic':
            return PURPLE_COLOR
        default:
            return ''
    }
}

function getArmorText(armorType: ArmorType, language: LanguageType): string {
    switch (armorType) {
        case 'light':
            switch (language) {
                case 'en':
                    return 'Light'
                case 'jp':
                    return '軽装備'
                case 'zh_cn':
                    return '轻型\n装甲'
                case 'kr':
                    return '경장갑'
                default:
                    return ''
            }
        case 'heavy':
            switch (language) {
                case 'en':
                    return 'Heavy'
                case 'jp':
                    return '重装甲'
                case 'zh_cn':
                    return '重型\n装甲'
                case 'kr':
                    return '중장갑'
                default:
                    return ''
            }
        case 'special':
            switch (language) {
                case 'en':
                    return 'Special'
                case 'jp':
                    return '特殊\n装甲'
                case 'zh_cn':
                    return '特殊\n装甲'
                case 'kr':
                    return '특수\n장갑'
                default:
                    return ''
            }
        case 'elastic':
            switch (language) {
                case 'en':
                    return 'Elastic'
                case 'jp':
                    return '弾力\n装甲'
                case 'zh_cn':
                    return '弹性\n装甲'
                case 'kr':
                    return '탄력\n장갑'
                default:
                    return ''
            }
        default:
            return ''
    }
}

function getArmorColor(armorType: ArmorType): string {
    switch (armorType) {
        case 'light':
            return RED_COLOR
        case 'heavy':
            return YELLOW_COLOR
        case 'special':
            return BLUE_COLOR
        case 'elastic':
            return PURPLE_COLOR
        default:
            return ''
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

export { getDamageText, getDamageColor, getArmorText, getArmorColor, getRoleIconUrl, getSchoolIconUrl }
