import React from "react";
import DatePicker from "react-datepicker";
import { ReactComponent as Calendar } from "../../../assets/calendar.svg";
import { ReactComponent as Remove } from "../../../assets/remove.svg";
import IconButton from "../../IconButton";
import dayjs from "dayjs";

import styles from "./InputDate.module.less";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";

const NOT_CHOOSE = "Дата истечения: не выбрано";

const InputDate = ({
  expire,
  onChange: outSideChange,
  defaultStyles = true,
  className,
}) => {
  const onChange = (date) => {
    outSideChange(dayjs(date).toISOString());
  };

  const onRemove = () => {
    outSideChange(null);
  };

  const renderText = () => {
    if (!expire) return NOT_CHOOSE;

    return (
      <>
        Дата истечения:{" "}
        <span className={styles.choosed}>
          {dayjs(expire).format("DD.MM.YYYY hh:mm")}
        </span>
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(
          styles.root,
          {
            [styles.default]: defaultStyles,
          },
          className
        )}
      >
        <span>{renderText()}</span>

        {!expire && (
          <DatePicker
            wrapperClassName={styles.picker}
            showTimeSelect
            value={expire}
            timeIntervals="15"
            selected={dayjs().toDate()}
            onChange={onChange}
            minDate={dayjs().toDate()}
            timeFormat="HH:mm:ss"
            customInput={
              <IconButton className={styles.calendar}>
                <Calendar />
              </IconButton>
            }
          />
        )}

        {expire && (
          <IconButton onClick={onRemove} className={styles.remove}>
            <Remove />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default InputDate;
