import { makeAutoObservable } from 'mobx'

class DialogStore {
    private _isOpen: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    get isOpen() {
        return this._isOpen
    }

    private set isOpen(value: boolean) {
        this._isOpen = value
    }


    setIsOpen(value: boolean) {
        this.isOpen = value
    }
}

const dialogStore = new DialogStore()

export default dialogStore