import classNames from "classnames";
import React from "react";

import styles from "./InputTextField.module.less";

const InputTextField = ({
  onChange,
  readOnly = true,
  placeholder,
  className,
  defaultStyles = true,
  type = "input",
  value,
}) => {
  return (
    <>
      {type === "input" && (
        <input
          className={classNames(
            styles.root,
            {
              [styles.default]: defaultStyles,
              [styles.notEditable]: readOnly,
            },
            className
          )}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
        />
      )}
      {type === "textarea" && (
        <textarea
          className={classNames(
            styles.root,
            styles.textarea,
            {
              [styles.default]: defaultStyles,
              [styles.notEditable]: readOnly,
            },
            className
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
        />
      )}
    </>
  );
};

export default InputTextField;
