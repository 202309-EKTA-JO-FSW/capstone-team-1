import MenuItemCard from './MenuItemCard';

const RestaurantMenu = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
