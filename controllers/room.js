import Room from '../models/Room.js';

export const getRooms = async (req, res, next) => {
    try{
        const rooms = await Room.find();
        if(rooms.length > 0 ) return res.status(200).json({ success: true, message: "fetched Successfully", data: rooms});
        
        return res.status(404).json({ success: false, message: "No Data Found", data: []});
    }catch(err){
        next(err)
    }
}

export const getRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id);
        if(room ) return res.status(200).json({ success: true, message: "fetched Successfully", data: room});
        
        return res.status(404).json({ success: false, message: "No Data Found", data: []});
    }catch(err){
        next(err)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try{
        const rooms = await Room.find({ hotelId : req.params.hotelid});
        if(rooms.length > 0 ) return res.status(200).json({ success: true, message: "fetched Successfully", data: rooms});
        
        return res.status(404).json({ success: false, message: "No Data Found", data: []});
    }catch(err){
        next(err)
    }
}

export const createRoom = async (req, res, next) => {
    try{
        const newRoom = new Room({ ...req.body, hotelId: req.params.hotelid, author: req.user.id})
        const savedRoom = await newRoom.save();
        return res.status(200).json({ success: true, message: "saved Successfully", data: savedRoom});
    }catch(err){
        next(err)
    }
}

export const updateRoomDates = async (req, res, next) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {unAvailabilityDates:req.body.unavailaibleDates },{ new: true})
        return res.status(200).json({ success: true, message: "updated Successfully", data: updatedRoom});
    }catch(err){
        next(err)
    }
}

export const updateRoom = async (req, res, next) => {
    try{    
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body,{ new: true});
        return res.status(200).json({ success: true, message: "updated Successfully", data: updatedRoom});
    }catch(err){
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    try{
        await Room.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: "deleted Successfully", data: []});
    }catch(err){
        next(err)
    }
}
