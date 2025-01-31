import Delivery from '../models/deliveryModel.js';


export const scheduleDelivery = async (req, res) => {
    try {
        const { pickupId, deliveryLocation, deliveryTime } = req.body;
        if(!pickupId || !deliveryLocation || !deliveryTime) {
            return res.status(400).json({ message: "All fields are required" , success: false});
        }
        await Delivery.create({ pickupId, deliveryLocation, deliveryTime });
        return res.status(201).json({ message: "Delivery scheduled successfully" , success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


export const getDeliveryDetails = async (req, res) => {
    try {
        const deliveryId = req.params.id;
        const delivery = await Delivery.findById(deliveryId);
        if(!delivery) {
            return res.status(400).json({ message: "Delivery not found" , success: false});
        }
        return res.status(200).json({ delivery, success: true});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


export const updateDeliveryStatus = async (req, res) => {
    try {
        const deliveryId = req.params.id;
        const status = req.body.status;
        const delivery = await Delivery.findById(deliveryId);
        if(!delivery) {
            return res.status(400).json({ message: "Delivery not found" , success: false});
        }
        delivery.deliveryStatus = status;
        await delivery.save();
        return res.status(200).json({ message: "Delivery status updated successfully" , success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


 