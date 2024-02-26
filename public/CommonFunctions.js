/**
 * This file stores general functions, please refer to the corresponding functions as needed
 */

//Calculate Position Function
export function convertPosition2(position, levels, componentWidth) {
  const menuHeight = levels * 38;

  var newtop = position.height + 2;
  var newleft = -componentWidth * 0.5 + position.width / 2 + 3;

  const windowsWidth = window.innerWidth;
  if (windowsWidth < 768) {
    if (window.innerHeight - position.top < menuHeight) {
      newtop = -menuHeight;
    }
  } else {
    if (window.innerHeight - position.top < menuHeight) {
      newtop = -menuHeight;
    }

    if (window.innerWidth - position.right < componentWidth / 2) {
      if (window.innerHeight - position.top < menuHeight / 2) {
        newtop = -menuHeight + window.innerHeight - position.bottom - 10;
        newleft = -componentWidth - 2;
      } else {
        newtop = -menuHeight / 2;
        newleft = -componentWidth - 2;
      }
    }
  }

  return {
    ...position,
    pX: newleft,
    pY: newtop,
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
    return new NextResponse(error, {
      status: 500,
    });
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
    return new NextResponse(error, {
      status: 500,
    });
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
    return new NextResponse(error, {
      status: 500,
    });
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
    return new NextResponse(error, {
      status: 500,
    });
  }
}
