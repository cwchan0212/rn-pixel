import { format, parse, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const dateStrToObj = (str) => {
  const isPM = str.includes("PM") ? 12 : 0;
  str = str.replace(/AM|PM|,/gi, "").trim();
  const parts = str.split(" ");

  const month = parseInt(parts[0].split("/")[0]) - 1;
  const day = parseInt(parts[0].split("/")[1]);
  const year = parseInt(parts[0].split("/")[2]);
  const hour = isPM ? parseInt(parts[1].split(":")[0]) + 12 : parseInt(parts[1].split(":")[0]);
  const minute = parseInt(parts[1].split(":")[1]);
  const second = parseInt(parts[1].split(":")[2]);

  const dummyDate = new Date(year, month, day, hour, minute, second);
  return dummyDate;
};

export const formatDate = (date) => {
  // console.log("date", date, " ", date instanceof Date)
  const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
  return formattedDate;
};


export const textToString = (text) => {
  if (text !== null && text !== undefined && text !== "") {
    if (typeof text === "string") {
      // console.log("String:", text);
      return text;
    } else if (typeof text === "number") {
      // console.log("Number:", text.toString());
      return text.toString();
    } else if (text instanceof Date) {
      // console.log("Date:", text.toLocaleString()); // Fixed the typo here
      return text.toLocaleString(); // Changed toLocaleString
    } else {
      return null;
    }
  } else {
    return "";
  }
};


// const convertStrToDateObj = () => {
//   let dd = new Date();

//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   };

  
//   console.log("dd", dd, "@", dd.toLocaleString("en-US", options));
//   const dStr = dd.toLocaleString("en-US", options);
//   const [, monthLabel, day, year, time] = dStr.match(/(\w+) (\d+), (\d+) at (\d+:\d+:\d+)/);
//   const [hours, minutes, seconds] = time.split(":");
//   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
//   const numericMonth = monthNames.indexOf(monthLabel);
//   const numericYear = parseInt(year, 10);
//   const numericDay = parseInt(day, 10);
//   const numericHours = parseInt(hours, 10);
//   const numericMinutes = parseInt(minutes, 10);
//   const numericSeconds = parseInt(seconds, 10);

//   console.log(numericYear, numericMonth, numericDay, numericHours, numericMinutes, numericSeconds, "!")

//   const newDate = new Date(Date.UTC(numericYear, numericMonth, numericDay, numericHours, numericMinutes, numericSeconds));
//   console.log("dd time: ", dd)
//   console.log("newDate time: ", newDate)
//   const diff = newDate.getTime() - dd.getTime();
//   console.log(diff, Math.round(diff/60/1000/60));

//   // return newDate;
// };

// const convertedDate = convertStrToDateObj();
// console.log("Converted Date:", convertedDate);