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
import Input from "../Input";
import ListItem from "../ListItem";
import useGetAllTodos from "../../hooks/useGetAllTodos";
import "dayjs/locale/ru";
import dayjs from "dayjs";

dayjs.locale("ru");

import styles from "./Todo.module.less";

const Todo = () => {
  const [header, setHeader] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [attachments, setAttachments] = React.useState(null);
  const [expire, setExpire] = React.useState("");
  const todos = useGetAllTodos();

  const timestamp = dayjs().toISOString();

  const createTodo = async () => {
    const docRef = await addDoc(collection(db, "todos"), {
      header,
      description,
      status: "not completed",
      createdAt: timestamp,
      expire,
    });

    if (attachments) {
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
          <Input>
            <Input.TextField
              onChange={(value) => setHeader(value)}
              placeholder="Введите заголовок"
              readOnly={false}
              value={header}
            />
          </Input>

          <Input>
            <Input.TextField
              className={styles.textarea}
              onChange={(value) => setDescription(value)}
              type="textarea"
              placeholder="Введите описание.."
              readOnly={false}
              value={description}
            />
          </Input>

          <Input>
            <Input.Upload
              onChange={(value) => setAttachments(value)}
              type="textarea"
              placeholder="Введите описание.."
              readOnly={false}
              attachments={attachments}
            />
          </Input>

          <Input>
            <Input.Date onChange={setExpire} expire={expire} />
          </Input>
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
