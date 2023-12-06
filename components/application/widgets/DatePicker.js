/**
 *
 * @param {data} param0
 * {year:2023,month:12,selected:0}
 * @returns
 */

import styles from "../../../styles/scss/components/application/widgets/scheduler.module.scss";

function DatePicker({ onDateSelect, data }) {
  const month = data.month;
  const year = data.year;
  const selected = data.selected;

  // Get today: "Fri Dec 01 2023 00:02:55 GMT+1300 (新西兰夏令时间)"
  const today = new Date();
  const renderdate = new Date(year.toString() + "-" + month.toString());
  const monthString = renderdate.toLocaleString("En", { month: "long" });

  //Day of first day
  const firstDay = renderdate.getDay();

  // Date of last day of the month: get first day of next month, then minus 1 and get date.
  const lastday = new Date(
    new Date(
      `${month < 12 ? year : year + 1}-${month == 12 ? 1 : month + 1} 00:00`
    ).getTime() - 1
  ).getDate();

  // Structure of calendar for render.
  let calendarList = [{ id: 0, days: [] }];
  // How many days to be pushed to the list.
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

  // Using map to render list, every item need a key. 'tempKey' is used for the blanks of beginning and end of the calendar.
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
