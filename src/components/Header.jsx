import React from "react";

export const Header = ({ isDark, setIsDark }) => {
  return (
    <div className="flex justify-center items-center w-full text-white bg-black h-[100px]">
      <div className="change-theme">
        <div className="cursor-pointer" onClick={() => setIsDark(!isDark)}>
          change
        </div>
      </div>
    </div>
  );
};
