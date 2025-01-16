'use server'
import { redirect } from "next/navigation"
export const signinAction= async (formData:FormData)=>{
    // {
    //     email: 'dffg@gmail.com',
    //     password: 'rtyrty',
    //     remember: 'checked'
    //   }
console.log(formData)
}

export const signupAction= async (formData:FormData)=>{
    // {
    //     firstName: 'fddfgfd',
    //     lastName: 'dfgdf',
    //     email: 'dfgd@gmail.com',
    //     password: 'rtw34',
    //     passwordConfirmation: 'fdsdf',
    //     accept: 'on'
    //   }
console.log(formData)
}

export const forgetPasswordAction= async (formData:FormData)=>{
console.log(formData)
}

export const googleLoginAction= async ()=>{

    redirect('https://upgraded-space-meme-gv67xr5w9572wvx9-8080.app.github.dev/api/auth/google')
    console.log('google login')
    // const res = await fetch('https://upgraded-space-meme-gv67xr5w9572wvx9-8080.app.github.dev/api/auth/google', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   console.log(res)
    //   const data = await res.json();
    //   console.log(data)
}