"use client";
import { useActionState } from "react";
import { subscribeEmailAction } from "@/app/(blog)/components/actions";
const initialState = {
  type: "",
  content: "",
};
const Subscribe = () => {
  const [state, formAction, isPending] = useActionState(
    subscribeEmailAction,
    initialState
  );
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" id="subscribe">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-8">
          Get the latest articles and news delivered straight to your inbox.
        </p>
        <form
          action={formAction}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg flex-1 max-w-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {isPending ? <>subscribing...</> : <>Subscribe</>}
          </button>
        </form>
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
      </div>
    </section>
  );
};

export default Subscribe;
