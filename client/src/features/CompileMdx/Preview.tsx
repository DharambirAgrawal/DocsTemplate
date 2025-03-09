import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import MDXError from "./MDXError";

interface PreviewProps {
  children: React.ReactNode;
}

const Preview = ({ children }: PreviewProps) => {
  return (
    <div>
      <ErrorBoundary errorComponent={MDXError}>
        <div className="flex flex-col items-center px-4 md:px-10 w-full bg-white my-10">
          <article className="prose prose-lg mx-auto my-8 w-full max-w-4xl h-[calc(100vh-100px)] overflow-y-auto">
            {children}
          </article>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Preview;
