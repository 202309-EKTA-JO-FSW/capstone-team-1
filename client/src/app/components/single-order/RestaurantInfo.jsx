import { GrPhone } from "react-icons/gr";

const RestaurantInfo = ({ restaurant }) => {
  return (
    <div className="flex flex-col pl-[10%] mb-5 p-3 capitalize w-full text-lg text-gray-500">
      <div>
        <h1 className="text-xl font-bold text-main-green mb-2">Restaurant</h1>
        <div className="flex mb-2">
          <p className="mr-5">
            Country:{" "}
            <span className="text-black font-bold">
              {restaurant.address.country || "--"}
            </span>
          </p>
          <p>
            City:{" "}
            <span className="text-black font-bold">
              {restaurant.address.city || "--"}
            </span>
          </p>
        </div>
        <p className="mb-2">
          street:{" "}
          <span className="text-black font-bold">
            {restaurant.address.street || "--"}
          </span>
        </p>
        <div></div>
        <a
          href={`tel:${restaurant.contact.phoneNumber || ""}`}
          className="flex items-center mb-2 cursor-pointer hover:text-main-green"
        >
          <GrPhone />{" "}
          <span className="text-black font-bold ml-1 hover:text-main-green">
            {restaurant.contact.phoneNumber || "--"}
          </span>
        </a>
      </div>
    </div>
  );
};

export default RestaurantInfo;
