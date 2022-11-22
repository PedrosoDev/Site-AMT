import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

function Input({ leftIcon, rightIcon, ...props }: Props, ref: any) {
  return (
    <div
      className={`flex flex-row justify-center items-center ${props.className}`}
    >
      {leftIcon ? <div className="pl-1">{leftIcon}</div> : ""}
      <input
        ref={ref}
        type="text"
        {...props}
        className="form-input border-none focus:ring-0 bg-transparent"
      />
      {rightIcon ? <div className="pr-1">{rightIcon}</div> : ""}
    </div>
  );
}

export default forwardRef<HTMLInputElement, Props>(Input);
