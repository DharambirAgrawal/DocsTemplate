import React from "react";

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container(props: Readonly<ContainerProps>) {
  return (
    <div
      {...props} // Spread all props, including id, className, etc.
      className={`container p-8 mx-auto xl:px-0 ${props.className ? props.className : ""}`} // Handle className
    >
      {props.children}
    </div>
  );
}