import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try{
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            if(token){
                jwt.verify(token, process.env.jwtToken, (err, user) => {
                    if(err) return res.status(401).json({ message: "You are not authenticated", success:false, data:[]}) 
                    req.user = user;
                    next();
                })
            }else{
                return res.status(401).json({ message: "You are not authenticated", success:false, data:[]})
            }
        }else{
            return res.status(401).json({ message: "You are not authenticated", success:false, data:[]})
        }
    }catch(err){
        next(err)
    }
}


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(401).json({ message: "You are not authenticated", success:false, data:[]})
        }
    } )
}

export const verifyAdmin = ( req, res, next) => {
    verifyToken( req, res, next , () => {
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(401).json({ message: "You are not authenticated", success:false, data:[]})
        }
    })
}