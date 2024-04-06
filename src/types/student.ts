import type { LanguageType } from './language'

type DamageType = 'explosive' | 'piercing' | 'mystic' | 'sonic'
type ArmorType = 'light' | 'heavy' | 'special' | 'elastic'
type StudentRole = 'tank' | 'dealer' | 'healer' | 'support' | 't.s.'
type StudentSchool = 'abydos' | 'arius' | 'gehenna' | 'hyakkiyako' | 'millennium' | 'redwinter' | 'shanhaijing' | 'srt' | 'trinity' | 'valkyrie' | 'tokiwadai' | 'etc'
type WeaponType = 'sg' | 'smg' | 'ar' | 'gl' | 'hg' | 'rl' | 'sr' | 'rg' | 'mg' | 'mt' | 'ft'
type PositionType = 'front' | 'middle' | 'back'

interface StudentItem {
    displayName: {
        full: Record<LanguageType, string>
        abbrev: Record<LanguageType, string>
    }
    variant: Record<LanguageType, string> | Record<string, never>
    school: StudentSchool
    role: StudentRole
    damageType: DamageType
    armorType: ArmorType
    weaponType: WeaponType
    positionType: PositionType
    avatarUrl: string
}

interface StudentDataType {
    students: Record<string, StudentItem>
}

export type {
    ArmorType,
    DamageType,
    PositionType,
    StudentDataType,
    StudentItem,
    StudentRole,
    StudentSchool,
    WeaponType
}
