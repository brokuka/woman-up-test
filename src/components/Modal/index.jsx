import React from "react";
import { createPortal } from "react-dom";
import IconButton from "../IconButton";
import Input from "../Input";
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
    setOpen(false);
  };

  const handleClick = () => {
    handleClose();
  };

  React.useEffect(() => {
    if (dateIsBefore(expire)) {
      setCanceled(true);
    } else setCanceled(false);
  }, [expire]);

  const updateTodo = async () => {
    outSideCompletedChange(isCompleted);
    outSideHeaderChange(header);
    outSideExpireChange(expire);
    outSideDescriptionChange(description);
    outSideCanceledChange(isCanceled);

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
          <Input>
            <Input.TextField
              className={styles.title}
              value={header}
              onChange={setHeader}
              readOnly={false}
              defaultStyles={false}
            />
          </Input>

          <div className={styles.body}>
            <div className={styles.left}>
              <div className={styles.date}>
                <span className={styles.createdAt}>{createdAt}</span>
                <Input>
                  <Input.Date
                    expire={expire}
                    defaultStyles={false}
                    onChange={setExpire}
                    className={styles.expire}
                  />
                </Input>
              </div>

              <div className={styles.description}>
                <Input>
                  <Input.TextField
                    className={styles.textarea}
                    value={description}
                    onChange={setDescription}
                    readOnly={false}
                    defaultStyles={false}
                    type="textarea"
                  />
                </Input>
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
                  <IconButton onClick={() => setCompleted(!isCompleted)}>
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
                  header === outSideHeader &&
                  isCompleted === outSideCompleted &&
                  description === outSideDescription &&
                  expire === outSideExpire
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
