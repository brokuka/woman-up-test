import React from "react";
import classNames from "classnames";

import styles from "./Button.module.less";

const Button = ({
  type,
  htmlType = "button",
  className,
  disabled,
  children,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        styles.root,
        {
          [styles.add]: type === "add",
          [styles.save]: type === "save",
        },
        className
      )}
      type={htmlType}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
