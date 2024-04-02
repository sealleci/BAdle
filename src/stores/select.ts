import { makeAutoObservable } from "mobx"

class SelectStore {
    studentId: string = ''
    isClear: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setStudentId(id: string) {
        this.studentId = id
    }

    setIsClear(isClear: boolean) {
        this.isClear = isClear
    }
}

const selectStore = new SelectStore()

export default selectStore