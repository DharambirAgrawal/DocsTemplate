
import { cookies } from 'next/headers';

export async function setCookie(name: string, value: string, options: any = {}) {

  const res = await fetch(`${process.env.CLIENT_BASE_URL}/api/cookies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.JWT_TOKEN_SECRET}`, // Add Authorization header
    },
    body: JSON.stringify({
      name,
      value,
      options
    })
  });

  console.log(res)
  

  if(!res.ok){
    throw new Error("Error setting cookie");
  }
  }
  
  
  export async function getCookie(name: string) {
    const cookieStore = await cookies();  // Get cookie store
    return cookieStore.get(name);
    const res = await fetch(`${process.env.CLIENT_BASE_URL}/api/cookies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.JWT_TOKEN_SECRET}`, // Add Authorization header
      },
      body: JSON.stringify({
        name,
       
      })
    });
    
  
    if(!res.ok){
      throw new Error("Error setting cookie");
    }
    const data = await res.json();
    return data.cookie;
  }

  export async function removeCookie(name: string, all: boolean = false) {
    const cookieStore = await cookies();  // Get cookie store
    if(all) {
      cookieStore.getAll().forEach(cookie => {
        cookieStore.delete(cookie.name)
      }); // Delete all cookies
      return;
    }
    const hasCookie = cookieStore.has(name)
    if(hasCookie) {
      cookieStore.delete(name)
    }
  }