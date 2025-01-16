'use server'

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