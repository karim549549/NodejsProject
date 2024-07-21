import Event from "../Models/EventModel.js";
import AsyncWrapper from "../utils/AsyncWrapper.js";
import AppError from "../Utils/AppError.js";
const CreateEvent = AsyncWrapper(
    async (req, res,next) => {
    const event = await new Event({
        organizerId: req.user.id,
        title: req.body.title||"",
        description: req.body.description ||"",
        location: req.body.location||"",
        bookings: req.body.bookings||[],
    });
    if(!await event.save()){
        return next(
            new AppError(
                500,
                'DataBase Error',
                null,
                'failed'
            )
        )
    }
    return next(
        new AppError(
            201,
            'Event Created',
            event,
            'success'
        )
    );
});
const GetEvent = AsyncWrapper(async (req, res ,next) => {
    const event = await Event.findOne({_id: req.params.eventid}).populate({
        path: 'organizerId',
        model: 'User',
        select: 'firstname lastname email _id',
    }).populate({
        path: 'bookings.userid',
        model: 'User',
        select: 'firstname lastname email _id',
    });
    if (!event) {
        return next(new AppError(404, 'Event Not Found', null, 'failed'));
    }
    return next(new AppError(200, 'Event Found', event, 'success'));
});
const GetEvents = AsyncWrapper(async (req, res,next) => {
    const limit = +req.query.limit || 5;
    const page = +req.query.page || 1;
    const skip = (page - 1) * limit;    
    return next(new AppError(200, 'Events Found',
        await Event.find().skip(skip).limit(limit).populate({
            path: 'organizerId',
            model: 'User',
            select: 'firstname lastname email _id',
        }).populate({
            path: 'bookings.userid',
            model: 'User',
            select: 'firstname lastname email _id',
        }),
        'success'));
});
const UpdateEvent = AsyncWrapper(async (req, res ,next) => {
    const eventid= req.params.eventid;
    const event = await Event.findByIdAndUpdate({_id:eventid},{$set:{...req.body}});
    if (!event) {
        return next(new AppError(404, 'Event Not Found', null, 'failed'));
    }
    return next(new AppError(200, 'Event Updated', event, 'success'));
});
const DeleteEvent = AsyncWrapper(async (req, res,next) => {
    const eventid= req.params.eventid;
    const event = await Event.deleteOne({_id:eventid});
    if (!event) {
        return next(new AppError(404, 'Event Not Found', null, 'failed'));
    }
    return next(new AppError(200, 'Event Deleted', event, 'success'));
});
const BookEvent = AsyncWrapper(async (req, res,next) => {
    const eventid= req.params.eventid;
    const userid= req.user.id;

    const event = await Event.findById(eventid);
    if (!event ) {
        return next(new AppError(404, 'Event Not Found', null, 'failed'));
    }
    if(event.organizerId.toString()===userid.toString()){
        return next(new AppError(400, 'You cannot book your own event', null, 'failed'));
    }
    console.log('Booking Data:', { userid, status: req.body.status || 'pending' });
    const isUserAlreadyBooked = event.bookings.some(booking => booking.userid.toString() === userid.toString());
    if (isUserAlreadyBooked) {
        return next(new AppError(400, 'User is already booked for this event', null, 'failed'));
    }
    const updatedEvent = await Event.findByIdAndUpdate(
        {_id:eventid},
        {$push: {bookings: {userid: userid ||1, status: req.body.status || 'pending'}}},
        {new: true}
    );
    return next(new AppError(200, 'Event Booked', updatedEvent, 'success'));
})
const UnBookEvent = AsyncWrapper(async (req, res,next) => {
    const eventid= req.params.eventid;
    const userid= req.user.id;
    const event = await Event.findById(eventid);
    if (!event ) {
        return next(new AppError(404, 'Event Not Found', null, 'failed'));
    }
    const updatedEvent = await Event.findByIdAndUpdate(
        {_id:eventid},
        {$pull: {bookings: {userid: userid}}},
        {new: true}
    );
    return next(new AppError(200, 'Event UnBooked', updatedEvent, 'success'));
})
export default { CreateEvent, GetEvent, GetEvents, UpdateEvent, DeleteEvent, BookEvent ,UnBookEvent};
