import { useState } from "react";
import { StudentContext } from "./utils/context";
import { StudentType } from "./utils/model";

const Root = ({ children }: React.PropsWithChildren) => {

    const [studentsList, setStudentsList] = useState<StudentType[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    return (
        <>
            <StudentContext.Provider value={{ studentsList, setStudentsList, page, setPage, limit, setLimit }}>
                {children}
            </StudentContext.Provider>
        </>
    )
}

export default Root;