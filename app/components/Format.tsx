import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface FormatProps {
  children: ReactNode;
}

const Format: React.FC<FormatProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header></Header>
      <main className="flex-grow">{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Format;
