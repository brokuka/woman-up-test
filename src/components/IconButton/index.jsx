import classNames from "classnames";
import React from "react";

import styles from "./IconButton.module.less";

const IconButton = ({ children, onClick, className }, ref) => {
  return (
    <button
      type="button"
      className={classNames(styles.root, className)}
      onClick={onClick}
      disabled={!onClick}
      ref={ref}
    >
      {children}
    </button>
  );
};

export default React.forwardRef(IconButton);
