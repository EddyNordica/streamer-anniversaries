import React from "react";
import { Header } from "@/ui/widgets/Header";
import { Footer } from "@/ui/widgets/Footer";
import { PageContainer } from "./PageContainer";

export const PageLayout = (props: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <PageContainer>
          <div className="py-6">{props.children}</div>
        </PageContainer>
      </div>
      <Footer />
    </>
  );
};
