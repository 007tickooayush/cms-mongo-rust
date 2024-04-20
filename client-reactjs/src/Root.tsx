import { useEffect, useState } from "react";
import { StudentContext } from "./utils/context";
import { StudentType } from "./utils/model";

const Root = ({ children }: React.PropsWithChildren) => {
    
    const [studentsList, setStudentsList] = useState<StudentType[]>([]);

    return (
        <>
            <StudentContext.Provider value={{ studentsList, setStudentsList }}>
                {children}
            </StudentContext.Provider>
        </>
    )
}

export default Root;