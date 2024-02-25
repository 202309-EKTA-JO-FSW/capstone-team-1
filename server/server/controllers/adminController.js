const Restaurant=require("../models/restaurantModel");
const User=require('../models/userModel');
const getAdminRestaurant=async(req,res)=>
{
    const adminId=req.userId;
    try {
        const user = await User.findById(adminId);
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

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
    const adminId=req.userId;
    try {
        const user = await User.findById(adminId);
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
        const restaurantId=user.restaurant;
if (!restaurantId)
{
    return res.status(404).json({ message: "Restaurant not found" });
}
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

const createRestaurant=async(req,res)=>
{
   
    const adminId=req.userId;
    const {name,description,cuisine,contact,profile_image,address}=req.body;
    try {
        const user = await User.findById(adminId);
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!name || !description || !cuisine || !address.country || !address.city || !address.street || !address.zipcode) {
        return res.status(400).json({ message: "Missing required fields" });
      }
    const newRestaurant=await Restaurant.create({
        name,
        description,
        cuisine,
        contact,
        profile_image,
        address,
        owner:adminId

    })
    return res.status(201).json({ restaurant: newRestaurant });

   

}
catch (error) {
    return res.status(500).json({ message: error.message });
}
}
module.exports={getAdminRestaurant,updateAdminRestaurant,createRestaurant};