'use client'
import { showToast } from "@/features/ToastNotification";
import { forgetPasswordAction } from "../actions";
import DefaultLayout from "../../components/DefaultLayout";
export default function ForgetPassword() {
    return(
       <DefaultLayout authPage="forgotpassword">
          <form
           action={async (formData) => {
                const res= await forgetPasswordAction(formData);
                showToast("success","Signin Success");
              }}
          >
            <div className="grid gap-y-4">
              <div>
                <label  className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                <div className="relative">
                  <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error"/>
                </div>
                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
              </div>
              <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
            </div>
          </form>
          </DefaultLayout>
       
    )
}