import { StudentBodySchema, EditStudentSchema } from "./model";

const url: string = "http://localhost:4000/api/";

export const getAllStudents = async (page?: number, limit?: number) => {
    try {
        const response = await fetch(url + `students?page=${(page) ? page : 1}&limit=${(limit) ? limit : 10}`, {
            method: "GET",
        });
        if (response.ok) {
            const data = await response.json();
            // console.log('Students:', data);
            return { ...data, status: 200 };
        }
    } catch (err: any) {
        console.error("Error occured:", err.toString())
    }
};

export const createStudent = async (student: StudentBodySchema) => {
    try {
        const response = await fetch(url + "/students/", {
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
        const response = await fetch(url + `/students/:${id}`, {
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
        const response = await fetch(url + `/students/:${id}`, {
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