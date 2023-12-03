// (component/pages/About/GalleryComponent.js)

"use client";
import React, { useState } from "react";
import Box from "./widgets/Box";
import MemberModal from "./widgets/Modal"; // 引入MemberModal组件
import teamMembers from "../../../public/images/members.js";
import galleryStyles from "../../../styles/scss/box.module.scss";

function GalleryComponent() {
  const [hoveredBox, setHoveredBox] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null); // 新状态

  const openModal = (member) => {
    setSelectedMember(member);
    console.log("openModal", member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <div
        className={`${galleryStyles.gallery} ${
          hoveredBox ? galleryStyles[`hovered-${hoveredBox}`] : ""
        }`}
      >
        {teamMembers.map((member) => (
          <Box
            key={member.id}
            id={member.id}
            imageUrl={member.imageUrl}
            name={member.name}
            onMouseEnter={() => setHoveredBox(member.id)}
            onMouseLeave={() => setHoveredBox(null)}
            onClick={() => openModal(member)}
          />
        ))}
      </div>
      {selectedMember && (
        <MemberModal id={selectedMember.id} onClose={closeModal} />
      )}
    </>
  );
}

export default GalleryComponent;
