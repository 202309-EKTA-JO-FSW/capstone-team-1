import SingleOrder from "@/app/components/single-order/SingleOrder";
import React from "react";

const SingleOrderPage = ({ params }) => {
  const { id } = params;
  return <SingleOrder id={id} />;
};

export default SingleOrderPage;
