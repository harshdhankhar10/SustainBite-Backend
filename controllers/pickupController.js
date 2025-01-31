import Pickup from "../models/pickupModel.js";


export const schedulePickup = async (req, res) => {
    try {
        const { pickupTime, pickupLocation, foodType } = req.body;
        const foodDonorId = req.user.id;
        if(!pickupTime || !pickupLocation || !foodType) {
            return res.status(400).json({ message: "All fields are required" , success: false});
        }
        await Pickup.create({ foodDonorId, pickupTime, pickupLocation, foodType });
        return res.status(201).json({ message: "Pickup scheduled successfully" , success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


export const getPickupDetails = async (req, res) => {
    try {
        const pickupId = req.params.id;
        const pickup = await Pickup.findById(pickupId);
        if(!pickup) {
            return res.status(400).json({ message: "Pickup not found" , success: false});
        }
        return res.status(200).json({ pickup, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


export const getPickupList = async (req, res) => {
    try {
        const userId = req.user.id;
        const pickups = await Pickup.find({ foodDonorId: userId });
        return res.status(200).json({ pickups, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


export const updatePickupStatus = async (req, res) => {
    try {
        const pickupId = req.params.id;
        const status = req.body.status;
        const pickup = await Pickup.findById(pickupId);
        if(!pickup) {
            return res.status(400).json({ message: "Pickup not found" , success: false});
        }
        pickup.status = status;
        await pickup.save();
        return res.status(200).json({ message: "Pickup status updated successfully" , success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}



export const assignVolunteer = async (req, res) => {
    try {
        const pickupId = req.params.id;
        const volunteerEmail = req.body.volunteerEmail;
        const volunteerId = req.body.volunteerId;
        const pickup = await Pickup.findById(pickupId);
        if(!pickup) {
            return res.status(400).json({ message: "Pickup not found" , success: false});
        }
        pickup.volunteerId = volunteerId;
        await pickup.save();
        return res.status(200).json({ message: "Volunteer assigned successfully" , success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }}


export const getPickupListForVolunteer = async (req, res) => {
    try {
        const userId = req.user.id;
        const pickups = await Pickup.find({ volunteerId: userId });
        return res.status(200).json({ pickups, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


