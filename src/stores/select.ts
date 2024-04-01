import { createContext } from "react"
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

const SelectContext = createContext<SelectStore>(new SelectStore())

export { SelectContext, SelectStore }