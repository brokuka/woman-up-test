import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useGetOneTodo = (id) => {
  const [todo, setTodo] = useState();

  useEffect(() => {
    const fetchDocById = async () => {
      const docRef = doc(db, "todos", `${id}`); // db = getFirestore()

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setTodo(docSnap.data());
    };

    fetchDocById();
  }, [id]);

  return todo;
};

export default useGetOneTodo;
