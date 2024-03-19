import SingleOrder from "@/app/components/profile/orders/single-order/SingleOrder";

const SingleOrderPage = ({ params }) => {
  const { id } = params;
  return <SingleOrder id={id} />;
};

export default SingleOrderPage;
