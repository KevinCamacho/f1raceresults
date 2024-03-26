import * as moment from "moment";

export const timeParseFormat = "YYYY-MM-DDTHH:mm:ss";

const timePrintFormat = "MMM Do YYYY h:mm A";

export const printLocalTime = (msEpoch: number) =>
  moment.utc(msEpoch).local().format(timePrintFormat);
