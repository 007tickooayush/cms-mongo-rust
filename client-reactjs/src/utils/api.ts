import { CreateStudentSchema } from "./model";

const url: string = "http://localhost:4000/api/";

export const getAllStudents = async () => {
    try {
        const response = await fetch(url + "students", {
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

export const createStudent = async (student: CreateStudentSchema) => {
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