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
import AddIcon from "../../../public/icon/add.svg";
import CalenderBigIcon from "../../../public/icon/big_calender.svg";
import CalenderIcon from "../../../public/icon/calender.svg";
import CloseIcon from "../../../public/icon/close.svg";
import DeleteIcon from "../../../public/icon/delete.svg";
import DragIcon from "../../../public/icon/drag.svg";
import DownArrowIcon from "../../../public/icon/down_arrow.svg";
import DownArrowSmallIcon from "../../../public/icon/down_arrow_small.svg";
import EditIcon from "../../../public/icon/edit.svg";
import FilterIcon from "../../../public/icon/filter.svg";
import FilterSelected from "../../../public/icon/filter_selected.svg";
import FlagIcon from "../../../public/icon/flag.svg";
import FlagBigIcon from "../../../public/icon/flag_big.svg";
import FlagFilledIcon from "../../../public/icon/flag_filled.svg";
import HashtagIcon from "../../../public/icon/hashtag.svg";
import HashtagBigIcon from "../../../public/icon/hashtag_big.svg";
import HashtagSmallIcon from "../../../public/icon/hashtag_small.svg";
import HomeIcon from "../../../public/icon/home.svg";

import InboxIcon from "../../../public/icon/inbox.svg";
import InboxSelected from "../../../public/icon/inbox_selected.svg";
import ListIcon from "../../../public/icon/list.svg";
import MenuIcon from "../../../public/icon/three_point.svg";
import MenuUnfillIcon from "../../../public/icon/three_point_unfill.svg";
import MoveListIcon from "../../../public/icon/move_list.svg";

import SearchIcon from "../../../public/icon/search.svg";
import SettingIcon from "../../../public/icon/setting.svg";
import SmallTagIcon from "../../../public/icon/small_tag.svg";
import SmallCalenderIcon from "../../../public/icon/small_calender.svg";
import TodayIcon from "../../../public/icon/today";
import TodayIconSelected from "../../../public/icon/today_selected";
import TopMenuIcon from "../../../public/icon/menu.svg";
import UpcomingIcon from "../../../public/icon/upcoming.svg";
import UpcomingSelected from "../../../public/icon/upcoming_selected.svg";
import UnCheckButton from "../../../public/icon/uncheck_grey_button.svg";
import UpArrowIcon from "../../../public/icon/up_arrow.svg";
import CheckIcon from "../../../public/icon/check_mark.svg";
import CheckSmallIcon from "../../../public/icon/check_small.svg";

const Icon = ({ type, ...props }) => {
  const getIconByType = () => {
    switch (type) {
      case "add":
        return <AddIcon {...props} />;
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
      case "top_menu":
        return <TopMenuIcon {...props} />;
      case "search":
        return <SearchIcon {...props} />;
      case "calender":
        return <CalenderIcon {...props} />;
      case "flag":
        return <FlagIcon {...props} />;
      case "close":
        return <CloseIcon {...props} />;
      case "up_arrow":
        return <UpArrowIcon {...props} />;
      case "down_arrow":
        return <DownArrowIcon {...props} />;
      case "down_arrow_small":
        return <DownArrowSmallIcon {...props} />;
      case "home":
        return <HomeIcon {...props} />;
      case "check":
        return <CheckIcon {...props} />;
      case "check_small":
        return <CheckSmallIcon {...props} />;
      case "hashtag_big":
        return <HashtagBigIcon {...props} />;
      case "hashtag_small":
        return <HashtagSmallIcon {...props} />;
      case "setting":
        return <SettingIcon {...props} />;

      default:
        return null;
    }
  };

  return getIconByType();
};

export default Icon;
