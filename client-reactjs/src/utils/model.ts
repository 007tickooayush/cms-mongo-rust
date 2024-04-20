export type DateMillis = {
    $date: {
        $numberLong: string
    }
};

export type StudentType = {
    id: string,
    name: string,
    uid: string,
    enrolled: boolean,
    createdAt: DateMillis,
    updatedAt: DateMillis
};

export type StudentContextType = {
    studentsList: StudentType[],
    setStudentsList: (students: StudentType[]) => void
};

export type StudentsRespSchema = {
    data: StudentType[],
    status: number
};

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