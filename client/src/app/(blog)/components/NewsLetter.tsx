"use client";
import { useActionState } from "react";
// import { subscribeEmail } from '@/lib/publicActions';
const initialState = {
  type: "",
  content: "",
};
const NewsLetter = () => {
  const subscribeEmail = async (formData: FormData) => {};

  const [state, formAction, isPending] = useActionState(
    subscribeEmail,
    initialState
  );
  return (
    <section className=" px-4 sm:px-8 sm:py-10 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
        Newsletter
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        Join 70,000+ subscribers!
      </p>
      <form className="space-y-3 sm:space-y-4" action={formAction}>
        <div className="relative">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base"
        >
          {isPending ? <>Subscribing...</> : <>Subscribe Now</>}
        </button>
        {state?.content &&
          (state?.type === "error" ? (
            <div className="mb-4 text-red-500 text-sm text-center">
              <p>{state.content}</p>
            </div>
          ) : (
            <div className="mb-4 text-green-500 text-sm text-center">
              <p>{state.content}</p>
            </div>
          ))}
      </form>
      <p className="text-xs text-gray-500 mt-3 sm:mt-4 text-center">
        By signing up, you agree to our Privacy Policy
      </p>
    </section>
  );
};

export default NewsLetter;
