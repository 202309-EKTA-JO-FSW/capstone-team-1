import SingleRestaurant from "@/app/components/restaurant/single-restaurant/SingleRestaurant";

const MenuItemsPage = ({ params }) => {
  const id = params.id;
  return <SingleRestaurant id={id} />;
};

export default MenuItemsPage;
