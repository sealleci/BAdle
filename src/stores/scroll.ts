import { makeAutoObservable } from 'mobx'

class ScrollStore {
    private _scrollTop: number = 0
    private _startIndex: number = 0
    private _endIndex: number = 0

    constructor() {
        makeAutoObservable(this)
    }

    get scrollTop() {
        return this._scrollTop
    }

    get startIndex() {
        return this._startIndex
    }

    get endIndex() {
        return this._endIndex
    }

    private set scrollTop(value: number) {
        this._scrollTop = value
    }

    private set startIndex(value: number) {
        this._startIndex = value
    }

    private set endIndex(value: number) {
        this._endIndex = value
    }

    setScrollTop(value: number) {
        this.scrollTop = value
    }

    setStartIndex(value: number) {
        this.startIndex = value
    }

    setEndIndex(value: number) {
        this.endIndex = value
    }
}

const scrollStore = new ScrollStore()

export default scrollStore