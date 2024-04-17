export type CreateStudentSchema = {
    name: string,
    uid: string,
    enrolled: boolean
};

export const createStudentState = {
    name: '',
    uid: '',
    enrolled: null
}

export const studentsListState = [];