import classNames from "classnames";
import React from "react";

import styles from "./IconButton.module.less";

/**
 * IconButton - компонент кнопки с иконкой
 * - `children` - всё что будет включать в себе компонент
 * - `ref` - ссылка на элемент кнопки
 * - `className` - классовые стили
 * - `onClick` - функция обработчик клика
 */
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
