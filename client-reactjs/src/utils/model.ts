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
    setStudentsList: (students: StudentType[]) => void,
    page: number,
    setPage: (page: number) => void,
    limit: number
    setLimit: (limit: number) => void
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
// export type EditStudentSchema = {
//     id: string
// };

export type EditStudentBodySchema = {
    studentId: string,
    studentFormData: StudentBodySchema, 
    isEdit: Boolean
};

export const createStudentState = {
    name: '',
    uid: '',
    enrolled: null
}