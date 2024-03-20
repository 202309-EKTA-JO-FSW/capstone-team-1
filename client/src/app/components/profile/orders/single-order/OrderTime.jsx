import moment from "moment";

const OrderTime = ({ order }) => {
  const created = moment(order.createdAt).format("dddd, h:mm a - MMMM Do YYYY");
  const placed = moment(order.updatedAt).format("dddd, h:mm a - MMMM Do YYYY");
  return (
    <div className="w-full text-base font-bold text-main-green mb-8 bg-gray-50 rounded-md border p-3 text-center">
      <p>
        Create Order: <span className="text-gray-500">{created}</span>
      </p>
      {order.status && (
        <p>
          Order Placed: <span className="text-gray-500">{placed}</span>
        </p>
      )}
    </div>
  );
};

export default OrderTime;
