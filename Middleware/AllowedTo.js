import Role from '../Utils/MagicStrings.js';
import AsyncWrapper from '../utils/AsyncWrapper.js';
import AppError from "../Utils/AppError.js";
export default (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            
            return next(new AppError(401,"unauthorized",null,'failed'));
        }
        next();
    }
}