"use client";
import SingleMenuItem from "@/app/components/restaurant/single-restaurant/menuItem/SingleMenuItem";
import React from "react";

const SingleMenuItemPage = ({ params }) => {
  const resId = params.id;
  const menuItemId = params.menuItemId;

  return (
    <div>
      <SingleMenuItem resId={resId} menuItemId={menuItemId} />
    </div>
  );
};

export default SingleMenuItemPage;
