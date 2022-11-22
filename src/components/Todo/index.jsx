import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React from "react";
import { db, storage } from "../../firebase";
import Button from "../Button";
import ListItem from "../ListItem";
import useGetAllTodos from "../../hooks/useGetAllTodos";
import { dateNowIso } from "../../utils";
import InputTextField from "../InputTextField";
import InputUpload from "../InputUpload";
import InputDate from "../InputDate";

import styles from "./Todo.module.less";

const Todo = () => {
  const [header, setHeader] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [attachments, setAttachments] = React.useState(null);
  const [expire, setExpire] = React.useState("");
  const todos = useGetAllTodos();

  const createTodo = async () => {
    /* Добавление задачи в базу */
    const docRef = await addDoc(collection(db, "todos"), {
      header,
      description,
      status: "not completed",
      createdAt: dateNowIso,
      expire,
    });

    if (attachments) {
      /* Добавление файлов в хранилище */
      attachments.map((item) => {
        const fileRef = ref(storage, `upload/${docRef.id}/${item.name}`);
        uploadBytes(fileRef, item, "data_url").then(async () => {
          const downloadUrl = await getDownloadURL(fileRef);

          await updateDoc(doc(db, "todos", docRef.id), {
            attachments: arrayUnion(downloadUrl),
          });
        });
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    createTodo();

    setHeader("");
    setDescription("");
    setAttachments(null);
    setExpire(null);
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputs}>
          <InputTextField
            onChange={(value) => setHeader(value)}
            placeholder="Введите заголовок"
            readOnly={false}
            value={header}
          />

          <InputTextField
            className={styles.textarea}
            onChange={(value) => setDescription(value)}
            type="textarea"
            placeholder="Введите описание.."
            readOnly={false}
            value={description}
          />

          <InputUpload
            onChange={(value) => setAttachments(value)}
            type="textarea"
            placeholder="Введите описание.."
            readOnly={false}
            attachments={attachments}
          />

          <InputDate onChange={setExpire} expire={expire} />
        </div>

        <Button type="add" htmlType="submit" disabled={!header || !description}>
          Добавить
        </Button>
      </form>

      <div className={styles.todos}>
        <h1 className={styles.title}>Список задач</h1>
        <ul className={styles.list}>
          {todos.map(({ createdAt, ...props }) => (
            <ListItem key={createdAt} createdAt={createdAt} {...props} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
