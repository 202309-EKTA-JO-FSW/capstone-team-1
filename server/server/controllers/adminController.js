const Restaurant=require("../models/restaurantModel");
const getAdminRestaurant=async(req,res)=>
{
    const adminId=req.userId;
    try {
        const restaurant = await Restaurant.findOne({ owner: adminId });
        if (!restaurant)
        {
            return res.status(404).json({ message: "Restaurant not found" }); 
        }
        return res.status(200).json({restaurant});

        
    }
     catch (error) {

        return res.status(500).json({ message: error.message });
    }


}

const updateAdminRestaurant=async(req,res)=>
{
    try {
        const restaurantId=req.params.resId;

        const updatedRestaurant=await Restaurant.findByIdAndUpdate(
            restaurantId,
            {$set:req.body},
            {new:true}
            );
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
          }
          res.status(200).json({restaurant:updatedRestaurant});
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports={getAdminRestaurant,updateAdminRestaurant};