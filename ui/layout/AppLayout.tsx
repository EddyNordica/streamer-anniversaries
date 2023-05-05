import React from "react";
import { Header } from "@/ui/widgets/Header";
import { Footer } from "@/ui/widgets/Footer";

export const AppLayout = (props: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none">
        <Header />
      </div>

      <main className="bg-gray-100 flex-1 overflow-y-auto">
        {props.children}
      </main>

      <div className="flex-none">
        <Footer />
      </div>
    </div>
  );
};
