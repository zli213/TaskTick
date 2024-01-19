/**
 * This file stores general functions, please refer to the corresponding functions as needed
 */

//Calculate Position Function
export function convertPosition(position, levels, componentWidth) {
  console.log(position);
  var buttonGap = 0;

  if (position.height < 20) {
    buttonGap = 5;
  }
  if (position.height < 10) {
    buttonGap = 13;
  }
  const menuHeight = levels * 39 + 8;
  var newtop = position.top;
  var newleft = position.left;

  if (window.innerHeight - position.bottom < menuHeight) {
    newtop = position.bottom - menuHeight - buttonGap * 2;
  }

  if (window.innerWidth - position.right < 130) {
    if (window.innerHeight - position.top < menuHeight / 2) {
      newtop = window.innerHeight - menuHeight - buttonGap * 5;
      newleft = position.left - componentWidth / 2 - 20;
    } else {
      newtop = position.bottom - menuHeight / 2 + 12;
      newleft = position.left - componentWidth / 2 - 20;
    }
  }

  if (newtop < 0) {
    newtop = 10;
  }

  return {
    ...position,
    left: newleft - componentWidth / 2 + position.width / 2,
    top: newtop + buttonGap,
  };
}


export async function DeleteTag(tag) {
  try {
    const res = await fetch("/api/deleteTag", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag }),
    });

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error occured: ", error);
  }
}

export async function DeleteProject(projectId) {
  try {
    const res = await fetch("/api/deleteProject", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    });

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error occured: ", error);
  }
}

export async function ArchiveProject(projectId) {
  try {
    const res = await fetch("/api/archiveProject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    });

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error occured: ", error);
  }
}

export async function UnarchiveProject(projectId) {
  try {
    const res = await fetch("/api/unarchiveProject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    });

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error occured: ", error);
  }
}