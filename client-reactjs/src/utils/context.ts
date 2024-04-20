import { createContext } from "react";
import { StudentContextType } from "./model";
export const StudentContext = createContext<StudentContextType>({
    studentsList: [],
    setStudentsList: () => {}
});
// export const StudentContext = createContext({ studentsList: [], setStudentsList: () => {} });