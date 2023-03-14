import User from '../models/User.js';

export const getUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        if(users.length > 0)  return res.status(200).json({ message: "fetched Successfully", success:true, data:users})

        return res.status(404).json({ message: "No Data", success:false, data:[]}) 
    }catch(err){
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        if(user){
            return res.status(200).json({ message: "fetched Successfully", success:true, data:user})
        }else{
            return res.status(404).json({ message: "No Data", success:false, data:[]}) 
        }
    }catch(err){
        next(err);
    }
}

export const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ message: "updated Successfully", success:true, data:updatedUser})
    }catch(err){
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Deleted Successfully", success:true, data:[]}) 
    }catch(err){
        next(err);
    }
}