import { StudentBodySchema, EditStudentSchema } from "./model";

export let urlList: string[] = [
    "http://localhost:4000/api/",
    "http://server-mongo-rust:4000/api/",
];

let url: string;
export const setUrl = async () => {
    try {
        let connected:boolean = false;
        for(let link of urlList) {
            const response = await fetch(link, {
                method: "GET",
            });
            const data = await response.json();
            // console.log('Data:', data);

            /// using status 302 in backend to check if server is connected because as a generic response 200 is received
            if (response.status === 302) {
                url = link;
                connected = true;
                break;
            }
        }
        return connected;
    } catch (err:any) {
        console.error("Error occured while connecting to server:", err.toString());

    }
}

export const getAllStudents = async (page?: number, limit?: number) => {
    try {
        const response = await fetch(url + `students?page=${(page) ? page : 1}&limit=${(limit) ? limit : 10}`, {
            method: "GET",
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Students:', data);
            return { ...data, status: 200 };
        }
    } catch (err: any) {
        console.error("Error occured:", err.toString())
    }
};

export const createStudent = async (student: StudentBodySchema) => {
    try {
        const response = await fetch(url + "students/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Body:', data);
            return { ...data, status: 201 };
        }
    } catch (err: any) {
        console.error("Error occured:", err.toString())
    }
};

export const editStudent = async (id: EditStudentSchema, student: StudentBodySchema) => {
    try {
        const response = await fetch(url + `students/:${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Body:', data);
            return { ...data, status: 200 };
        }

    } catch (err: any) {
        console.error("Error occured:", err.toString())
    }
};

export const deleteStudent = async (id: EditStudentSchema) => {
    try {
        const response = await fetch(url + `students/:${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Body:', data);
            return { ...data, status: 200 };
        }

    } catch (err: any) {
        console.error("Error occured:", err.toString())
    }
}