import React from 'react';
import RestaurantMenu from '@/app/components/singlepage/RestaurantMenu';

  const RestaurantPage = () => {
    return (
      <div>
        <RestaurantMenu />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          </div>
        </div>
      </div>
    );
  };
  
  export default RestaurantPage;
