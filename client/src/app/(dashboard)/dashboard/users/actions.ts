'use server'


export const getUsers = async () => {
    const response = await fetch(`${process.env.SERVER_BASE_URL}/api/auth/users?sort=none`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    
    const data = await response.json();
    console.log(data);
    return data.data;
}