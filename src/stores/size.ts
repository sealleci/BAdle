import { makeAutoObservable } from 'mobx'

class SizeStore {
    private _isSmallScreen: boolean = false
    private _isHeightChanged: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    get isSmallScreen() {
        return this._isSmallScreen
    }

    get isHeightChanged() {
        return this._isHeightChanged
    }

    private set isSmallScreen(value: boolean) {
        this._isSmallScreen = value
    }

    private set isHeightChanged(value: boolean) {
        this._isHeightChanged = value
    }

    setIsSmallScreen(value: boolean) {
        this.isSmallScreen = value
    }

    setIsHeightChanged(value: boolean) {
        this.isHeightChanged = value
    }
}

const sizeStore = new SizeStore()

export default sizeStore