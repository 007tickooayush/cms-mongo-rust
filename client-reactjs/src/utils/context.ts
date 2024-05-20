import { createContext } from "react";
import { StudentContextType } from "./model";
export const StudentContext = createContext<StudentContextType>({
    studentsList: [],
    setStudentsList: () => {},
    page: 1,
    setPage: () => {},
    limit: 10,
    setLimit: () => {}
});
// export const StudentContext = createContext({ studentsList: [], setStudentsList: () => {} });