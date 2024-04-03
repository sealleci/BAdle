import { makeAutoObservable } from 'mobx'
import type { LanguageType } from '../types/language.ts'

class LanguageStore {
    private _language: LanguageType = 'zh_cn'

    constructor() {
        makeAutoObservable(this)
    }

    get language() {
        return this._language
    }

    private set language(value: LanguageType) {
        this._language = value
    }

    setLanguage(value: LanguageType) {
        this.language = value
    }
}

const languageStore = new LanguageStore()

export default languageStore
