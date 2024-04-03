import { makeAutoObservable } from 'mobx'

class SelectStore {
    private _studentId: string = ''
    private _isClear: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    get studentId() {
        return this._studentId
    }

    private set studentId(value: string) {
        this._studentId = value
    }

    get isClear() {
        return this._isClear
    }

    private set isClear(value: boolean) {
        this._isClear = value
    }

    setIsClear(value: boolean) {
        this.isClear = value
    }

    setStudentId(value: string) {
        this.studentId = value
    }
}

const selectStore = new SelectStore()

export default selectStore