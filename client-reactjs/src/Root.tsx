import { useState } from "react";
import { StudentContext } from "./utils/context";
import { StudentsListState } from "./utils/model";

const Root = ({ children }: React.PropsWithChildren) => {
    const [studentsList, setStudentsList] = useState<StudentsListState>([]);
    return (
        <>
            <StudentContext.Provider value={{ studentsList: [], setStudentsList: () => {} }}>
                {children}
            </StudentContext.Provider>
        </>
    )
}

export default Root;