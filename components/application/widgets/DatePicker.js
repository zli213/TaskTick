/**
 *
 * @param
 * onDateSelect: fn, return a Date() that seleted
 * data: incoming data {year:yyyy,month:mm,selected:0-31}
 *
 */

import styles from "../../../styles/scss/components/application/widgets/scheduler.module.scss";

function DatePicker({ onDateSelect, data }) {
  const month = data.month;
  const year = data.year;
  const selected = data.selected;

  /** Get today. Date structure in browser: "Fri Dec 01 2023 00:02:55 GMT+1300 (新西兰夏令时间)"*/
  const today = new Date();
  /** The first day of the month in Date type*/
  const renderdate = new Date(year.toString() + "-" + month.toString());
  /** The long month string */
  const monthString = renderdate.toLocaleString("En", { month: "long" });

  /** Week day of first day*/
  const firstDay = renderdate.getDay();

  /** Date of last day of the month.*/
  const lastday = new Date(year, month, 0).getDate();

  /** Structure of calendar for render.*/
  let calendarList = [{ id: 0, days: [] }];
  /** How many days have not been pushed to the list.*/
  let daysLeft = lastday;

  // First week
  while (calendarList[0].days.length < firstDay) {
    calendarList[0].days.push("");
  }
  while (calendarList[0].days.length < 7) {
    --daysLeft;
    calendarList[0].days.push((lastday - daysLeft).toString());
  }
  // Middle weeks
  while (daysLeft >= 7) {
    calendarList.push({ id: calendarList.length, days: [] });
    for (let i = 0; i < 7; i++) {
      --daysLeft;
      calendarList[calendarList.length - 1].days.push(
        (lastday - daysLeft).toString()
      );
    }
  }
  // Last week
  if (daysLeft > 0) {
    calendarList.push({ id: calendarList.length, days: [] });
    while (daysLeft > 0) {
      --daysLeft;
      calendarList[calendarList.length - 1].days.push(
        (lastday - daysLeft).toString()
      );
    }
    while (calendarList[calendarList.length - 1].days.length < 7) {
      calendarList[calendarList.length - 1].days.push("");
    }
  }

  /** When using map to render list, every item need a key. The 'tempKey' is used for the blanks of beginning and end of the calendar.*/
  let tempKey = Date.now();

  return (
    <>
      <div
        className={styles.datepicker_calendar}
        style={{ top: data.top + "px" }}
      >
        {/* Not show the month string of the current month */}
        {today.getFullYear().toString() + today.getMonth().toString() ==
        renderdate.getFullYear().toString() +
          renderdate.getMonth().toString() ? null : (
          <div className={styles.datepicker_calendar_header}>{monthString}</div>
        )}

        <div className={styles.datepicker_calendar_body}>
          {calendarList.map((item) => (
            <div
              key={"w" + year + "-" + month + "-" + item.id}
              className={styles.datepicker_calendar_week}
            >
              {item.days.map((itemDays) =>
                itemDays == "" ? (
                  <div key={tempKey++}></div>
                ) : (
                  <button
                    key={year + "-" + month + "-" + itemDays}
                    onClick={() =>
                      onDateSelect(
                        new Date(year + "-" + month + "-" + itemDays)
                      )
                    }
                  >
                    <span
                      className={
                        selected > 0 && selected == itemDays
                          ? styles.datepicker_selected
                          : styles.datepicker_normal
                      }
                    >
                      <span
                        className={
                          year == today.getFullYear() &&
                          month == today.getMonth() + 1 &&
                          itemDays == today.getDate() &&
                          itemDays != selected
                            ? styles.datepicker_today
                            : null
                        }
                      >
                        {itemDays}
                      </span>
                    </span>
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DatePicker;
