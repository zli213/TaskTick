// (component/pages/About/GalleryComponent.js)
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import teamMembers from "../../../public/images/members.js";
import galleryStyles from "../../../styles/scss/gallery.module.scss";

function GalleryComponent() {
  // Todo: add hover effect
  const [hoveredBox, setHoveredBox] = useState(null);

  return (
    <>
      <div
        className={`${galleryStyles.gallery} ${
          hoveredBox ? galleryStyles[`hovered-${hoveredBox}`] : ""
        }`}
      >
        {teamMembers.map((member) => (
          <div key={member.id} className={galleryStyles.box}>
            <Link key={member.id} href={`/about/teammembers/${member.id}`}>
              <Image
                alt={member.name}
                src={member.imageUrl}
                height={500}
                width={500}
                className={galleryStyles.image}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default GalleryComponent;
