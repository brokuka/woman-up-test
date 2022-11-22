import React from "react";
import classNames from "classnames";

import styles from "./Button.module.less";

/**
 * Button - компонент кнопки
 * - `type` - тип кнопки, может быть: `add` или `save`
 * - `htmlType` - параметр кнопки из html
 * - `className` - классовые стили
 * - `disabled` - отключить кнопку при условии
 * - `children` - всё что будет включать в себе компонент
 * - `onClick` - функция обработчик при клике
 */
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
