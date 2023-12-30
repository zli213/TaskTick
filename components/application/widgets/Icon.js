/**
 * Select the corresponding icon component based on the type passed in
 *
 * @param type
 *
 * How to use:
 *   <Icon type="checkButton" />
 */

import React from "react";

// Import SVG icons
import InboxIcon from "../../../public/icon/inbox.svg";
import InboxSelected from "../../../public/icon/inbox_selected.svg";
import TodayIcon from "../../../public/icon/today";
import TodayIconSelected from "../../../public/icon/today_selected";
import HashtagIcon from "../../../public/icon/hashtag.svg";
import UpcomingIcon from "../../../public/icon/upcoming.svg";
import UpcomingSelected from "../../../public/icon/upcoming_selected.svg";
import FilterIcon from "../../../public/icon/filter.svg";
import FilterSelected from "../../../public/icon/filter_selected.svg";
import MenuIcon from "../../../public/icon/three_point.svg";
import EditIcon from "../../../public/icon/edit.svg";
import DeleteIcon from "../../../public/icon/delete.svg";
import UnCheckButton from "../../../public/icon/uncheck_grey_button.svg";
import DragIcon from "../../../public/icon/drag.svg";
import SmallTagIcon from "../../../public/icon/small_tag.svg";
import SmallCalenderIcon from "../../../public/icon/small_calender.svg";
import CalenderBigIcon from "../../../public/icon/big_calender.svg";
import MenuUnfillIcon from "../../../public/icon/three_point_unfill.svg";
import ListIcon from "../../../public/icon/list.svg";
import MoveListIcon from "../../../public/icon/move_list.svg";
import FlagFilledIcon from "../../../public/icon/flag_filled.svg";
import FlagBigIcon from "../../../public/icon/flag_big.svg";

const Icon = ({ type, ...props }) => {
  const getIconByType = () => {
    switch (type) {
      case "inbox":
        return <InboxIcon {...props} />;
      case "inbox_selected":
        return <InboxSelected {...props} />;
      case "today":
        return <TodayIcon {...props} />;
      case "today_selected":
        return <TodayIconSelected {...props} />;
      case "hashtag":
        return <HashtagIcon {...props} />;
      case "upcoming":
        return <UpcomingIcon {...props} />;
      case "upcoming_selected":
        return <UpcomingSelected {...props} />;
      case "filter":
        return <FilterIcon {...props} />;
      case "filter_selected":
        return <FilterSelected {...props} />;
      case "menu_filled":
        return <MenuIcon {...props} />;
      case "edit":
        return <EditIcon {...props} />;
      case "delete":
        return <DeleteIcon {...props} />;
      case "drag":
        return <DragIcon {...props} />;
      case "small_tag":
        return <SmallTagIcon {...props} />;
      case "calender_small":
        return <SmallCalenderIcon {...props} />;
      case "uncheck":
        return <UnCheckButton {...props} />;

      case "calender_big":
        return <CalenderBigIcon {...props} />;
      case "menu_unfill":
        return <MenuUnfillIcon {...props} />;
      case "list":
        return <ListIcon {...props} />;
      case "move_list":
        return <MoveListIcon {...props} />;
      case "flag_filled":
        return <FlagFilledIcon {...props} />;
      case "flag_big":
        return <FlagBigIcon {...props} />;

      case "move_list":
        return <MoveListIcon {...props} />;
      default:
        return null;
    }
  };

  return getIconByType();
};

export default Icon;
