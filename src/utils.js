import "dayjs/locale/ru";
import dayjs from "dayjs";

dayjs.locale("ru");

export const dateNow = dayjs().toDate();
export const dateNowIso = dayjs().toISOString();
export const dateToIso = (date) => dayjs(date).toISOString();
export const dateFormatTitle = (date) => dayjs(date).format("DD.MM.YYYY hh:mm");
export const dateIsBefore = (date) => dayjs(date).isBefore(dateNow);
