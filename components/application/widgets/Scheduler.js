/**
 * @description
 * This component is used for schedule date picking.
 *
 * @param
 * data: incoming data {selectedDate: 'yyyy-mm-dd'}
 * onChangeDate: fn (the return data of fn is {dateTime: Date, dateStr:"yyyy-mm-dd"})
 * onOverlayClick: fn  (usually used for hide the component)
 *
 * @usage
 * <Scheduler data={selectedDate:"yyyy-mm-dd" onChangeDate={(data)=>{...}} onOverlayClick={()=>{...}} />
 */

import styles from "../../../styles/scss/components/application/widgets/taskEditor.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import DatePicker from "./DatePicker";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToastId } from "../../../store/toastIds";

function Scheduler({ data, onChangeDate, onOverlayClick, isEdit }) {
  const dispatch = useDispatch();
  //---------------- variables -----------------
  // Calculate the dates for quick selection buttons.
  const today = new Date();

  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const weekend = new Date(
    today.getTime() +
      (6 - today.getDay() + (today.getDay() === 6 ? 7 : 0)) *
        24 *
        60 *
        60 *
        1000
  );

  const nextWeek = new Date(
    today.getTime() + (8 - today.getDay()) * 24 * 60 * 60 * 1000
  );

  const thisMonth = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    selected: 0,
    top: 0,
  };

  /** incoming data, which date should be selected by default. If it is empty, return new Date(), if not, return the date */
  const selectedDate =
    data.selectedDate == null || data.selectedDate === ""
      ? new Date()
      : new Date(data.selectedDate);

  //------------- common functions ---------------
  /**Clone object (eg: json date) to another variable */
  function deepClone(originValue) {
    function isObject(value) {
      const valueType = typeof value;
      // the value cannot be null，and has to be object or function
      return (
        value !== null && (valueType === "object" || valueType === "function")
      );
    }
    // If incoming value is not object, return itself
    if (!isObject(originValue)) {
      return originValue;
    }

    const newObj = {};
    // Get all the key-value pairs and put them into newObj
    // Using for...in will include the properties that inherited. Thus using hasOwnProperty to get own properties
    for (const key in originValue) {
      if (originValue.hasOwnProperty(key)) {
        // Call deepClone recursively，if there are objects in values, deep clone as well.
        newObj[key] = deepClone(originValue[key]);
      }
    }
    return newObj;
  }

  /** Calcuate a month add a number of months. @param num can be negative */
  const monthCalc = (m, num) => {
    let newMonth = deepClone(m);
    const newDate = new Date(newMonth.year, newMonth.month + num - 1);
    newMonth.year = newDate.getFullYear();
    newMonth.month = newDate.getMonth() + 1;
    return newMonth;
  };

  /** Calculate height of a month in the infinite scrolling calendar */
  const calcMonthH = (month) => {
    let height = 0;
    // How many days in the month
    const days = new Date(month.year, month.month, 0).getDate();
    /** What is the first week day of the month (Sunday:0)*/
    const firstWeekDay = new Date(month.year, month.month - 1, 1).getDay();
    if (
      month.year === today.getFullYear() &&
      month.month === today.getMonth() + 1
    ) {
      height = Math.ceil((days + firstWeekDay) / 7) * 26;
    } else {
      /**@todo: 1rem=?px. In current setting in chrome, 1rem = 10px*/
      height = Math.ceil((days + firstWeekDay) / 7) * 26 + 32;
    }
    return height;
  };

  /** Given a value of scroll top, calculate which month should be shown */
  const calcMonthByScrollTop = (top) => {
    let h = top;
    let i = 0;
    while (h - calcMonthH(monthCalc(thisMonth, i)) > 0) {
      h = h - calcMonthH(monthCalc(thisMonth, i));
      i++;
    }

    let theMonth = monthCalc(thisMonth, i);
    theMonth.top = top - h;
    return theMonth;
  };

  /** Given a month, calculate how far should it be put from the top */
  const calcTopByMonth = (month) => {
    let top = 0;
    let m = deepClone(month);
    while (m.year !== thisMonth.year && m.month !== thisMonth.month) {
      top = top + calcMonthH(monthCalc(m, -1));
      m = monthCalc(m, -1);
    }
    return top;
  };

  /** The list of months to be rendered. */
  const setRenderedMonthsList = (currentShowedMonth) => {
    let renderedMonthsList = [];
    for (let i = -3; i <= 3; i++) {
      const monthItem = monthCalc(currentShowedMonth, i);
      if (
        new Date(monthItem.year, monthItem.month) <
        new Date(today.year, today.month)
      ) {
        continue;
      }

      if (data.selectedDate !== "") {
        if (
          selectedDate.getFullYear() === monthItem.year &&
          selectedDate.getMonth() + 1 === monthItem.month
        ) {
          monthItem.selected = selectedDate.getDate();
        }
      }

      /** How much higher the month is than the current showed month */
      let offsetTop = 0;
      if (i < 0) {
        for (let j = -1; j >= i; j--) {
          offsetTop = offsetTop - calcMonthH(monthCalc(currentShowedMonth, j));
        }
      }
      if (i > 0) {
        for (let j = 0; j < i; j++) {
          offsetTop = offsetTop + calcMonthH(monthCalc(currentShowedMonth, j));
        }
      }
      monthItem.top = currentShowedMonth.top + offsetTop;
      renderedMonthsList.push(monthItem);
    }
    return renderedMonthsList;
  };

  /** To avoid multiple calling function in a short time. Usually used in mouse scroll event. Not be used in this component */
  const debounce = useCallback((fn, wait = 50, immediate) => {
    let timer = null;
    return function (...args) {
      // using context to save this
      const context = this;
      if (timer) clearTimeout(timer);

      // if immediate is true means execute once without waiting
      // if timer is null means first trigger
      if (immediate && !timer) {
        fn.apply(context, args);
      }

      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    };
  }, []);

  //-------------- states ------------
  // Month string showed in datepicker header. Default: this month (example: December 2023)
  const [currentMonthLabel, setCurrentMonthLabel] = useState(
    `${
      today.toLocaleString("En", { month: "long" }) +
      " " +
      today.getFullYear().toString()
    }`
  );
  const changeCurrentMonthLabel = (str) => {
    setCurrentMonthLabel(str);
  };

  // The month list to be rendered in this component
  /** Current displayed month.
   * To avoid beingn initialized when re-render, using 'useRef'
   * */
  let currentDispMonth = useRef({
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth() + 1,
    selected: 0,
    // data.selectedDate == null || data.selectedDate == ""
    //   ? 0
    //   : selectedDate.getDate(),
    top: calcTopByMonth({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
    }),
  });

  const [monthsRendered, setMonthsRendered] = useState(
    setRenderedMonthsList(currentDispMonth.current)
  );
  // [
  //   { year: 2023, month: 12, selected: 4, top: 0 },
  //   { year: 2024, month: 1, selected: 0, top: 162 },
  //   { year: 2024, month: 2, selected: 0, top: 320 },
  //   { year: 2024, month: 3, selected: 0, top: 540 },
  // ];
  const changeMonthsRendered = (monthList) => {
    setMonthsRendered(monthList);
  };

  //------------ useEffect -----------
  // add scroll event listener
  const calendarRef = useRef(null);
  useEffect(() => {
    const calendarScroll = //debounce(
      (e) => {
        currentDispMonth.current = calcMonthByScrollTop(e.target.scrollTop);
        const monthList = setRenderedMonthsList(currentDispMonth.current);
        // Change monthsRendered state to render the months
        changeMonthsRendered(monthList);
        // Change month string in datepicker header
        changeCurrentMonthLabel(`
        ${
          new Date(
            currentDispMonth.current.year + "-" + currentDispMonth.current.month
          ).toLocaleString("En", { month: "long" }) +
          " " +
          currentDispMonth.current.year
        }`);
        return () => {
          calendarRef.current?.removeEventListener("scroll", calendarScroll);
        };
      };
    //   20,
    //   true
    // );
    calendarRef.current?.addEventListener("scroll", calendarScroll);
  }, []);

  useEffect(() => {
    // set default scroll position by incoming parameter 'data'
    calendarRef.current?.scrollTo(
      0,
      currentDispMonth.current.top === 0 ? 0 : currentDispMonth.current.top + 32
    );
  }, []);

  //------------ useEffect for disable scroll ------------
  const disableScroll = (event) => {
    const menu = document.querySelector(
      `.${styles.datepicker_monthlist_wrapper}`
    );
    const isInsideMenu = menu && menu.contains(event.target);

    if (!isInsideMenu) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("wheel", disableScroll, { passive: false });
    document.addEventListener("touchmove", disableScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", disableScroll);
      document.removeEventListener("touchmove", disableScroll);
    };
  }, []);

  //--------- functions for interactive ------------
  const goToToday = (event) => {
    event.preventDefault();
    calendarRef.current?.scrollTo(0, 0);
  };
  const goToNextMonth = (event) => {
    event.preventDefault();
    const top =
      currentDispMonth.current.top + calcMonthH(currentDispMonth.current) + 32;
    calendarRef.current?.scrollTo(0, top);
  };
  const goToPrevMonth = (event) => {
    event.preventDefault();
    if (
      currentDispMonth.current.year === thisMonth.year &&
      currentDispMonth.current.month === thisMonth.month
    ) {
      return false;
    }
    let top =
      currentDispMonth.current.top -
      calcMonthH(monthCalc(currentDispMonth.current, -1)) +
      32;
    if (top === 32) {
      top = 0;
    }
    calendarRef.current?.scrollTo(0, top);
  };

  //--------- select date ------------
  const selectDate = (selDate) => {
    if (selDate == "") {
      onChangeDate({dateStr: null});
      return;
    }
    let dateJson = formatDate(selDate);

    // Change current selected date
    // Call parent function when select a date, and pass the date to parent using json convert
    // Show notification and undo button
    const newToastId = !isEdit && toast.info(
      <Notification
        onUndo={() => {
          let originalDateJson = formatDate(data.selectedDate);
          onChangeDate(originalDateJson);
          onOverlayClick();
        }}
        date={dateJson.dateStr}
      />,
      {
        pauseOnHover: false,
      }
    );
    
    onChangeDate(dateJson);
    !isEdit && dispatch(addToastId(newToastId));
  };

  //----------------- Notification ----------------
  const Notification = ({ onUndo, closeToast, date }) => {
    const handleClick = () => {
      onUndo();
      closeToast();
    };
    return (
      <div className={styles.notification}>
        Task scheduled on <u>{date}</u>
        <button onClick={handleClick} className={styles.undoBtn}>
          Undo
        </button>
      </div>
    );
  };

  return (
    <>
      <div
        className={styles.scheduler}
        scrollable={"scrollable_area"}
      >
        <button
          className={styles.scheduler_quickbutton}
          onClick={() => selectDate(today)}
        >
          Today
          <div>{today.toLocaleString("En", { weekday: "short" })}</div>
        </button>
        <button
          className={styles.scheduler_quickbutton}
          onClick={() => selectDate(tomorrow)}
        >
          Tomorrow
          <div>{tomorrow.toLocaleString("En", { weekday: "short" })}</div>
        </button>
        {/* If today is not weekend, show 'This Weekend'. If today is weekend, show 'Next weekend'. */}
        <button
          className={styles.scheduler_quickbutton}
          onClick={() => selectDate(weekend)}
        >
          {today.getDay() === 6 || today.getDay() === 0 ? (
            <>
              Next Weekend
              <div>
                {weekend.toLocaleString("En", { weekday: "short" })}&nbsp;
                {weekend.toLocaleDateString().replace(/\//g, "-")}
              </div>
            </>
          ) : (
            <>
              This Weekend
              <div>{weekend.toLocaleString("En", { weekday: "short" })}</div>
            </>
          )}
        </button>
        {/* If today is Sunday, not display. */}
        {today.getDay() === 0 ? null : (
          <button
            className={styles.scheduler_quickbutton}
            onClick={() => selectDate(nextWeek)}
          >
            Next Week
            <div>
              {nextWeek.toLocaleString("En", { weekday: "short" })}&nbsp;
              {nextWeek.toLocaleDateString().replace(/\//g, "-")}
            </div>
          </button>
        )}
        {/* <button className={styles.scheduler_quickbutton}>Delay</button> */}
        <button
          className={styles.scheduler_quickbutton}
          onClick={() => selectDate("")}
        >
          No Date
        </button>
        <div className={styles.datepicker}>
          <div className={styles.datepicker_head}>
            <span className={styles.datepicker_header_month}>
              {currentMonthLabel}
            </span>
            <div className={styles.datepicker_header_action}>
              <button onClick={goToPrevMonth}> &lt;</button>
              <button onClick={goToToday}> ○</button>
              <button onClick={goToNextMonth}> &gt;</button>
            </div>
          </div>
          <div className={styles.week_names}>
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div
            className={styles.datepicker_monthlist_wrapper}
            ref={calendarRef}
          >
            <div className={styles.datepicker_monthlist}>
              {/* <DatePicker
                onDateSelect={selectDate}
                data={{ year: 2023, month: 12, selected: 4 }}
              />
              <DatePicker
                onDateSelect={selectDate}
                data={{ year: 2024, month: 1, selected: 0 }}
              /> */}
              {monthsRendered.map((item) => (
                <DatePicker
                  key={item.year + "-" + item.month}
                  onDateSelect={selectDate}
                  data={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Convert selected date to string [today, tomorrow....]
function convertSelectedDate(date) {
  if (date === "" || date === null || date === undefined) {
    return "Due date";
  }
  const sameDate = (date1, date2) => {
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      return true;
    }
    return false;
  };

  // Dates need to be convert
  const today = new Date();
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Date type of the param 'date'
  const d = new Date(date);

  // Return the date string to be shown
  if (sameDate(d, today)) {
    return "Today";
  }
  if (sameDate(d, tomorrow)) {
    return "Tomorrow";
  }
  return date;
}

export function formatDate(inDate) {
  const indate = new Date(inDate);

  let dateJson = { dateTime: null, dateStr: "" };
  if (indate !== "" || indate != null) {
    dateJson.dateTime = indate;
    dateJson.dateStr =
    indate.getFullYear() +
      "-" +
      (indate.getMonth() + 1) +
      "-" +
      indate.getDate();
  }

  return dateJson;
}

export default Scheduler;

export const convertDate = convertSelectedDate;
