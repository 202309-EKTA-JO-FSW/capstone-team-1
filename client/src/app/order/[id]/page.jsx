import SingleOrder from "@/app/components/single-order/SingleOrder";

const SingleOrderPage = ({ params }) => {
  const { id } = params;
  return <SingleOrder id={id} />;
};

export default SingleOrderPage;
