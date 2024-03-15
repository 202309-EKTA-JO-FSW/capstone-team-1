import SideBar from "../components/my-restaurant/sidebar/SideBar";

const MyRestaurantLayout = ({ children }) => {
  return (
    <section className="flex flex-col md:flex-row">
      <SideBar />
      {children}
    </section>
  );
};

export default MyRestaurantLayout;
