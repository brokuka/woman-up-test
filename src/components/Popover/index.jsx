import React from "react";
import { createPortal } from "react-dom";
import IconButton from "../IconButton";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";

import styles from "./Popover.module.less";

/**
 * Popover - компонент окна для дополнительных действий
 * - `state` - проверка на передаваемое состояние, если его нет, то компонент вернёт null
 * - `setState` - функция которая будет менять передаваемое состояние
 * - `elementRef` - ссылка на элемент рядом с которым будет рендериться компонент
 * - `children` - всё что будет включать в себе компонент
 */
const Popover = ({ state, setState, elementRef, children }) => {
  if (!state) return null;

  const element = elementRef.current;
  const top = element.offsetTop + elementRef.current.offsetHeight / 2;
  const right =
    window.innerWidth - element.offsetLeft - element.offsetWidth - 48;

  const onClose = () => {
    setState(false);
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.root}
        style={{ top, right, transform: `translateY(-50%)` }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("popover")
  );
};

export default Popover;
