import React from "react";
import { db, storage } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";
import Input from "./components/Input";
import useGetAllTodos from "./hooks/useGetAllTodos";
import Todo from "./components/Todo";

const App = () => {
  /*   const [value, setValue] = React.useState("");
  const todos = useGetAllTodos();
  const [isAttachment, setAttachment] = React.useState("");
  const [isAttachmentType, setAttachmentType] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    let lastDot = isAttachment.lastIndexOf(".");
    let extension = isAttachment.slice(lastDot);
    let fileName = isAttachment.replace(extension, "");

    const metadata = {
      contentType: `${isAttachmentType}`,
    };
    const upload = ref(storage, `uploads/${fileName + nanoid()}.${extension}`);

    uploadBytes(upload, isAttachment, metadata);
    createTodo(value, isAttachment);

    setValue("");
    setAttachment("");
  };

  const createTodo = async (value) => {
    await addDoc(collection(db, "todos"), {
      value,
      isCompleted: false,
      attachment: isAttachment || null,
      createdAt: serverTimestamp(),
    });
  }; */

  return (
    <div className="container">
      <Todo />
    </div>
    /*     <>
      <form className="form" onSubmit={onSubmit}>
        <Input>
          <Input.Upload
            onChange={(e) => setValue(e.target.value)}
            onUploadChange={(attachment, type) => {
              setAttachment(attachment);
              setAttachmentType(type);
            }}
            value={value}
            attachment={isAttachment}
          />
        </Input>
      </form>

      <div className="input-group">
        {!todos.length ? (
          <div className="smile">
            <span>😞</span> Нет списка задач
          </div>
        ) : (
          todos.map(({ value, id, isCompleted }) => (
            <Input key={id}>
              <Input.TextField value={value} />
              <Input.Buttons
                isAttachment={isAttachment}
                value={value}
                id={id}
                isCompleted={isCompleted}
              />
            </Input>
          ))
        )}
      </div>
    </> */
  );
};

export default App;
