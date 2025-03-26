// 'use client';

// const MDXError = ({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string };
//   reset: () => void;
// }) => {
//   return (
//     <div className="flex flex-col items-center px-4 md:px-10 w-full bg-red-600">
//       <h2>Something went wrong!</h2>
//       <button onClick={() => reset()}>Try again</button>
//     </div>
//   );
// };

// export default MDXError;
"use client";
import { FallbackProps } from "react-error-boundary";

// Updated component to match FallbackProps interface
const MDXError = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="p-4 border border-red-500 bg-red-50 rounded">
      <h2 className="text-red-700 text-lg font-semibold">
        Error rendering content
      </h2>
      <p className="text-red-600">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
};

export default MDXError;
