import Hotel from '../models/Hotel.js';

  export const getHotels = async (req, res, next) => {
    try{
        const hotels = await Hotel.find();
        if( hotels.length > 0 ) return res.status(200).json({ success: true, message: "data fetched Successfully", data: hotels});
        return res.status(404).json({ message: "No Data Found", success: false, data: []});
    }catch(err){
        next(err)
    }
  }
  export const getHotel = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        if(hotel) return res.status(200).json({ success: true, message: "data fetched Successfully", data: hotel});
        return res.status(404).json({ message: "no Data Found", success: false, data: []});
    }catch(err){
        next(err)
    }
  }
  export const createHotel = async (req, res, next) => {
    try{
        const newHotel = new Hotel({...req.body, author: req.user.id});
        const savedHotel = await newHotel.save();
        if(savedHotel) return res.status(200).json({ success: true, message: "data save Successfully", data: savedHotel});
        return res.status(404).json({ success: false, message: "Something Went Wrong", data: []});
    }catch(err){
        next(err)
    }
  }
  export const updateHotel = async (req, res, next) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        return res.status(200).json({ success: true, message: "data Updated Successfully", data: updatedHotel});
    }catch(err){
        next(err)
    }
  }
  export const deleteHotel = async (req, res, next) => {
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: "data Deleted Successfully", data: []});
    }catch(err){
        next(err)
    }
  }