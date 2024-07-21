import userMapper  from "../Utils/Maps.js";
import Users from "../Models/UserModel.js";
import AppError from "../Utils/AppError.js";
import AsyncWrapper from "../utils/AsyncWrapper.js";
import bcrypt from 'bcrypt';
import GenerateToken from "../Utils/GenerateToken.js";
import Roles from "../Utils/MagicStrings.js"
import nodemailer from 'nodemailer';
import Event from "../Models/EventModel.js";

const GetAllUsers = AsyncWrapper(
    async (req, res,next) => {
        const limit = +req.query.limit || 10;
        const page = +req.query.page || 1;
        const skip = (page - 1) * limit;       
        return next(new AppError(200, 'Users Found', 
            userMapper.mapUser(await Users.find().skip(skip).limit(limit)),
            'success'));
});
const Login = AsyncWrapper(
    async (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            const error = new AppError(400, 'Email and Password are required', null, 'failed');
            return next(error);
        }
        const foundUser = await Users.findOne({ email });
        if (!foundUser || await !bcrypt.compareSync(req.body.password, foundUser.password)) {
            const error = new AppError(404, 'Email or Password is incorrect', null, 'failed');
            return next(error);
        }
        return next(new AppError(200, 'Logged In Successful', 
            await GenerateToken(userMapper.mapUser(foundUser)),
            'success'));
    }
);
const Register = AsyncWrapper(
    async (req, res,next) => {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            const error = new AppError(400, 'Email and Password are required', null, 'failed');
            return next(error);
        }
        const foundUser = await Users.findOne({ email });
        if(foundUser){
            const error = new AppError(400, 'User Already Exists', null, 'failed');
            return next(error);
        }
        const user = new Users (
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                role: req.body.role|| Roles.Roles.USER  
            }
        );
        await user.save();
        return next(new AppError(201, 'Registered Successfully', 
            await GenerateToken(userMapper.mapUser(user)),
            'success'));
    }
);
const DeleteUser = AsyncWrapper(
    async (req, res, next) => {
    const result = await Users.deleteOne({ _id: req.params.userid });
    if (result.deletedCount === 0) {
        return next(new AppError(404, 'User Not Found', null, 'failed'));
    }
    return next(new AppError(200, 'User Deleted', result, 'success'));
});
const UpdateUser = AsyncWrapper(
    async (req, res ,next) => {
        const updatedUser = await Users.findOneAndUpdate({_id:req.params.userid},{$set:{...req.body}});
        if (!updatedUser) {
            return next(new AppError(404, 'User Not Found', null, 'failed'));
        }
        return next(new AppError(200, 'User Updated',null, 'success'));
    }
);
const GetUserEvents = AsyncWrapper(
    async (req, res, next) => {
        const userId = req.user.id;
        const userBookedEvents = await Event.find({ "bookings.userid": userId });
        if (userBookedEvents.length === 0) {
            return next(new AppError(404, 'No Events Found for this User', null, 'failed'));
        }
        return next(new AppError(200, 'Events Found', userBookedEvents, 'success'));
    }
);
export default { GetAllUsers, Login, Register, DeleteUser, UpdateUser , GetUserEvents};
