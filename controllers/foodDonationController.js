import FoodDonation from "../models/foodDonationModel.js";


export const donateFood = async (req, res) => {
    try {
        const userId = req.user.id;
        const { foodType, weight, expiryDate, pickupLocation, foodImages, notes } = req.body;
        if(!foodType || !weight || !expiryDate || !pickupLocation) {
            return res.status(400).json({ message: "All fields are required" , success: false});
        }
        
        await FoodDonation.create({ donarId: userId, foodType, weight, expiryDate, 
            pickupLocation, foodImages, donationStatus: 'AVAILABLE' });

        return res.status(201).json({ message: "Food donated successfully" , success: true});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }

}


export const getAllDonations = async (req, res) => {
    try {
        const userId = req.user.id;
        const donations = await FoodDonation.find({ donarId: userId });
        return res.status(200).json({ donations, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


export const getDonationDetails = async (req, res) => {
    try {
        const donationId = req.params.id;
        const donation = await FoodDonation.findById(donationId);
        if(!donation) {
            return res.status(400).json({ message: "Donation not found" , success: false});
        }
        return res.status(200).json({ donation, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }}


