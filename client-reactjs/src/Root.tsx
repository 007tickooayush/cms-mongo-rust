import { useState } from "react";
import { studentsListState } from "./utils/model";
import { StudentContext } from "./utils/context";

const Root = ({ children }: React.PropsWithChildren) => {
    const [studentsList, setStudentsList] = useState(studentsListState);
    return (
        <>
            {/* <StudentContext.Provider value={{ studentsList, setStudentsList }}> */}
                {children}
            {/* </StudentContext.Provider> */}
        </>
    )
}

export default Root;