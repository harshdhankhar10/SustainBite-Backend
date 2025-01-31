import NGO from "../models/ngoModel.js";


export const registerNewNgo = async (req, res) => {
    try {
        const { name, contactPerson, email, phone, address, donationCapacity } = req.body;
        const id = req.user.id;
        if(!name || !contactPerson || !email || !phone || !address || !donationCapacity) {
            return res.status(400).json({ message: "All fields are required" , success: false});
        }
        const ngo = await NGO.create({ name, contactPerson, email, phone, address, donationCapacity, userId: id });

        return res.status(201).json({ message: "Ngo registered successfully" , success: true});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}



export const getNgoDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const ngo = await NGO.findOne({ userId: id });
        if(!ngo) {
            return res.status(400).json({ message: "Ngo not found" , success: false});
        }
        return res.status(200).json({ ngo, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}   


export const updateNgoDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const ngo = await NGO.findOne({ userId: id });
        if(!ngo) {
            return res.status(400).json({ message: "Ngo not found" , success: false});
        }
        const { name, contactPerson, email, phone, address, donationCapacity } = req.body;
        if(!name || !contactPerson || !email || !phone || !address || !donationCapacity) {
            return res.status(400).json({ message: "All fields are required" , success: false});
        }
        ngo.name = name;
        ngo.contactPerson = contactPerson;
        ngo.email = email;
        ngo.phone = phone;
        ngo.address = address;
        ngo.donationCapacity = donationCapacity;
        await ngo.save();
        return res.status(200).json({ message: "Ngo updated successfully" , success: true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


export const removeNgo = async (req, res) => {
    try {
        const id = req.user.id;
        const ngo = await NGO.findOne({ userId: id });
        if(!ngo) {
            return res.status(400).json({ message: "Ngo not found" , success: false});
        }
        await ngo.remove();
        return res.status(200).json({ message: "Ngo removed successfully" , success: true});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


export const getAllNgos = async (req, res) => {
    try {
        const userId = req.user.id;
        const ngos = await NGO.find({userId: {$ne: userId}});

        return res.status(200).json({ ngos, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}


export const getNgoById = async (req, res) => {
    try {
        const id = req.params.id;
        const ngo = await NGO.findById(id);
        if(!ngo) {
            return res.status(400).json({ message: "Ngo not found" , success: false});
        }
        return res.status(200).json({ ngo, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}

export const verifyNgo = async (req, res) => {
    try {
        const id = req.params.id;
        const ngo = await NGO.findById(id);
        if(!ngo) {
            return res.status(400).json({ message: "Ngo not found" , success: false});
        }
        ngo.isVerified = true;
        await ngo.save();
        return res.status(200).json({ message: "Ngo verified successfully" , success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" , success: false});
    }
}

