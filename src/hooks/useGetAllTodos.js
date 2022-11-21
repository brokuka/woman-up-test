import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useGetAllTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "todos");
    const q = query(collectionRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];

      querySnapshot.forEach((doc) =>
        todosArr.push({ ...doc.data(), id: doc.id })
      );

      setTodos(todosArr);
    });

    return () => unsubscribe();
  }, []);

  return todos;
};

export default useGetAllTodos;
