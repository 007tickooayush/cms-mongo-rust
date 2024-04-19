export type StudentBodySchema = {
    name: string,
    uid: string,
    enrolled: boolean
};
export type EditStudentSchema = {
    id: string
};

export const createStudentState = {
    name: '',
    uid: '',
    enrolled: null
}

export const studentsListState = [];

export type StudentsListState = typeof studentsListState;