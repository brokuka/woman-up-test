import React from "react";
import { createPortal } from "react-dom";
import IconButton from "../IconButton";
import InputTextField from "../InputTextField";
import InputDate from "../InputDate";
import Button from "../Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { dateIsBefore } from "../../utils";
import { ReactComponent as Close } from "../../assets/close.svg";
import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as CheckFilled } from "../../assets/check-filled.svg";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { ReactComponent as Link } from "../../assets/link.svg";

import styles from "./Modal.module.less";
import classNames from "classnames";

/**
 * Modal - копмонент модального окна, которая принимает как параметры сотояния и обработчики конкретной задачи
 * - `id` - айди
 * - `setOpen` - функция которая меняет состояние компонента(вкл\выкл)
 * - `createdAt` - дата создании
 * - `attachments` - массив с загруженными данными
 * - `header` - название
 * - `setHeader` - функция для изменении названия
 * - `description` - описание
 * - `setDescription` - функция изменении описания
 * - `expire` - дата истечения
 * - `setExpire` - функция для изменении даты истечения
 * - `isCompleted` - завершена ли задача
 * - `setCompleted` - функция для изменении статуса завершённости
 * - `isCanceled` - отменена ли задача
 * - `setCanceled` - функция которая задаётё статус отмены
 */
const Modal = ({
  id,
  setOpen,
  createdAt,
  attachments,
  header: outSideHeader,
  setHeader: outSideHeaderChange,
  description: outSideDescription,
  setDescription: outSideDescriptionChange,
  expire: outSideExpire,
  setExpire: outSideExpireChange,
  isCompleted: outSideCompleted,
  setCompleted: outSideCompletedChange,
  isCanceled: outSideCanceled,
  setCanceled: outSideCanceledChange,
}) => {
  const body = document.querySelector("body");
  const [header, setHeader] = React.useState(outSideHeader);
  const [description, setDescription] = React.useState(outSideDescription);
  const [expire, setExpire] = React.useState(outSideExpire);
  const [isCompleted, setCompleted] = React.useState(outSideCompleted);
  const [isCanceled, setCanceled] = React.useState(outSideCanceled);

  React.useEffect(() => {
    /* Закрывать при нажатии на кнопку `Esacpe` */
    const handleEscape = (e) => {
      if (e.key !== "Escape") return;

      handleClose();
    };
    body.addEventListener("keydown", handleEscape);

    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = "";
      body.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleClose = () => {
    /* Обработчик закрытия модалки */
    setOpen(false);
  };

  const handleClick = () => {
    /* Обработчик закрытия модалки по клику */
    handleClose();
  };

  React.useEffect(() => {
    /* Если дата истечения наступило, изменить статус отмены */
    if (dateIsBefore(expire)) {
      setCanceled(true);
    } else setCanceled(false);
  }, [expire]);

  const updateTodo = async () => {
    /* Обновить состояния в задаче */
    outSideCompletedChange(isCompleted);
    outSideHeaderChange(header);
    outSideExpireChange(expire);
    outSideDescriptionChange(description);
    outSideCanceledChange(isCanceled);

    /* Обновить документ в firebase */
    await updateDoc(doc(db, "todos", id), {
      header,
      description,
      status: isCompleted ? "completed" : "not completed",
      expire,
    });

    handleClose();
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.root} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <IconButton className={styles.exit} onClick={handleClick}>
            <Close />
          </IconButton>
          <InputTextField
            className={classNames(styles.title, styles.change)}
            value={header}
            onChange={setHeader}
            readOnly={false}
            defaultStyles={false}
          />

          <div className={styles.body}>
            <div className={styles.left}>
              <div className={styles.date}>
                <span className={styles.createdAt}>{createdAt}</span>
                <InputDate
                  expire={expire}
                  defaultStyles={false}
                  onChange={setExpire}
                  className={styles.expire}
                />
              </div>

              <div className={styles.description}>
                <InputTextField
                  className={classNames(styles.textarea, styles.change)}
                  value={description}
                  onChange={setDescription}
                  readOnly={false}
                  defaultStyles={false}
                  type="textarea"
                />
              </div>
            </div>
            <div className={styles.right}>
              <div>
                {isCanceled && (
                  <IconButton>
                    <Cancel />
                  </IconButton>
                )}

                {!isCanceled && (
                  <IconButton
                    onClick={() => setCompleted(!isCompleted)}
                    className={styles.change}
                  >
                    {isCompleted ? <CheckFilled /> : <Check />}
                  </IconButton>
                )}
              </div>

              <div className={styles.attachments}>
                {attachments?.map((item) => (
                  <a
                    key={item}
                    className={styles.attachment}
                    href={item}
                    target="_blank"
                  >
                    <Link />
                  </a>
                ))}
              </div>

              <Button
                className={styles.button}
                type="save"
                onClick={updateTodo}
                disabled={
                  !header ||
                  !description ||
                  (header === outSideHeader &&
                    description === outSideDescription &&
                    isCompleted === outSideCompleted)
                }
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
