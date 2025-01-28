'use server'
import { handleServerError } from "@/lib/error-handler";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
export const getUsers = async () => {

    const response =await fetchWithTokenRefresh('/api/auth/users?sort=none')
   
    console.log(response);
    return response.data;
}


export const updateUser     = async (formData:any) => {
    try {
        // const response = await fetch(`/api/users/update`, {
        // method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(formData),
        // });
        // const data = await response.json();
        // return data;

                console.log(formData)
    } catch (error) {
        handleServerError(error);
    }
} 