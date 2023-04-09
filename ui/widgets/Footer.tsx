import { PageContainer } from "@/ui/layout/PageContainer";
import { HeartIcon } from "@heroicons/react/20/solid";

export const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <PageContainer>
        <div className="max-w-7xl py-6 flex items-center">
          <p className="text-center text-s leading-5 text-gray-400 m-auto">
            <span>
              Made with{" "}
              <HeartIcon aria-label="love" className="inline h-4 w-4" /> by{" "}
            </span>
            <span className="text-gray-300 hover:underline">
              <a href="https://twitter.com/Eddy_Nordica" target="_blank">
                Eddy
              </a>
            </span>
          </p>
        </div>
      </PageContainer>
    </footer>
  );
};
