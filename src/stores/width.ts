import { makeAutoObservable } from 'mobx'

class WidthStore {
    private _isSmallScreen: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    get isSmallScreen() {
        return this._isSmallScreen
    }

    private set isSmallScreen(value: boolean) {
        this._isSmallScreen = value
    }


    setIsSmallScreen(value: boolean) {
        this.isSmallScreen = value
    }
}

const widthStore = new WidthStore()

export default widthStore