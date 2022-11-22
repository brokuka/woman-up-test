import React from "react";
import IconButton from "../IconButton";
import { ReactComponent as Upload } from "../../assets/upload.svg";
import { ReactComponent as Remove } from "../../assets/remove.svg";

import styles from "./InputUpload.module.less";

const NOT_UPLOADED = "Прикрепленно: не выбрано";
const UPLOADED_SINGLE = "Прикреплён: один файл";
const UPLOADED_MULTIPLE = "Прикрепленно: несколько файлов";

/**
 *
 * - `onChange` - функция обработчик изменений
 * - `attachments` - массив с загруженными файлами
 */

const InputUpload = ({ onChange: outSideChange, attachments }) => {
  const inputRef = React.useRef();

  const onChange = async (e) => {
    const files = e.target.files;

    outSideChange([...files]);

    /* Для того что предотвратить баг с выбором одного и того же файла */
    e.target.value = null;
  };

  const onRemove = () => {
    /* обработчик клика на кнопку */
    outSideChange(null);
  };

  const renderText = () => {
    /* функция для рендера текста в компоненте */
    if (!attachments) return NOT_UPLOADED;

    return attachments.length > 1 ? UPLOADED_MULTIPLE : UPLOADED_SINGLE;
  };

  return (
    <div className={styles.wrapper}>
      <input type="file" hidden ref={inputRef} onChange={onChange} multiple />

      <div className={styles.root}>
        <span>{renderText()}</span>

        {!attachments && (
          <IconButton onClick={() => inputRef.current.click()}>
            <Upload />
          </IconButton>
        )}

        {attachments && (
          <IconButton onClick={onRemove}>
            <Remove />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default InputUpload;
