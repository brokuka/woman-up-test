import classNames from "classnames";
import React from "react";
import IconButton from "../IconButton";
import Modal from "../Modal";
import { dateFormatTitle, dateIsBefore } from "../../utils";
import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as CheckFilled } from "../../assets/check-filled.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as More } from "../../assets/more.svg";
import { ReactComponent as Attachment } from "../../assets/attachment.svg";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import Popover from "../Popover";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import styles from "./ListItem.module.less";

const ListItem = ({
  id,
  status: outSideStatus,
  header: outSideHeader,
  attachments,
  createdAt: outSideCreatedAt,
  description: outSideDescription,
  expire: outSideExpire,
}) => {
  const [open, setOpen] = React.useState(false);
  const [isModal, setModal] = React.useState(false);
  const [header, setHeader] = React.useState(outSideHeader);
  const [description, setDescription] = React.useState(outSideDescription);
  const [createdAt, setCreatedAt] = React.useState(
    dateFormatTitle(outSideCreatedAt)
  );
  const [expire, setExpire] = React.useState(outSideExpire);

  const [isCompleted, setCompleted] = React.useState(
    outSideStatus === "completed"
  );
  const [isCanceled, setCanceled] = React.useState(
    outSideStatus === "canceled" || dateIsBefore(expire)
  );

  React.useEffect(() => {
    updateTodo();
  }, []);

  const listRef = React.useRef();

  const deleteTodo = async () => {
    await deleteDoc(doc(db, "todos", id));
  };

  const updateTodo = async () => {
    if (dateIsBefore(expire) && !isCompleted) {
      await updateDoc(doc(db, "todos", id), {
        status: "canceled",
      });
    }
  };

  const onOpenModal = () => {
    setModal(true);
    setOpen(false);
  };

  return (
    <>
      <li
        className={classNames(styles.root, {
          [styles.attached]: attachments,
        })}
        ref={listRef}
      >
        {attachments && (
          <IconButton className={styles.attachments}>
            <Attachment />
          </IconButton>
        )}
        <span>{header}</span>
        <div className={styles.icons}>
          {isCanceled && (
            <IconButton>
              <Cancel />
            </IconButton>
          )}

          {!isCanceled && (
            <IconButton>{isCompleted ? <CheckFilled /> : <Check />}</IconButton>
          )}

          <IconButton onClick={() => setOpen(!open)}>
            <More />
          </IconButton>
        </div>
      </li>

      <Popover state={open} setState={setOpen} elementRef={listRef}>
        <IconButton onClick={() => deleteTodo()}>
          <Delete />
        </IconButton>
        <IconButton onClick={() => onOpenModal()}>
          <Edit />
        </IconButton>
      </Popover>

      {isModal && (
        <Modal
          id={id}
          setOpen={setModal}
          header={header}
          setHeader={setHeader}
          description={description}
          setDescription={setDescription}
          createdAt={createdAt}
          setCreatedAt={setCreatedAt}
          isCompleted={isCompleted}
          setCompleted={(value) => setCompleted(value)}
          isCanceled={isCanceled}
          setCanceled={setCanceled}
          expire={expire}
          setExpire={setExpire}
          attachments={attachments}
        />
      )}
    </>
  );
};

export default ListItem;
