import bookingModel from "../model/bookingModel.js";

//Booking Creation
const createBooking = async (req, res) => {
  const id = req.user._id;
  const { name, phone, numberOfGuests, date, time, note } = req.body;
  try {
    if (!name || !phone || !numberOfGuests || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingBoooking = await bookingModel.findOne({
      date,
      time,
      status: { $ne: "cancelled" },
    });
    if (existingBoooking) {
      return res.status(400).json({ message: "Booking already exists" });
    }
    const booking = new bookingModel({
      user: id,
      name,
      phone,
      numberOfGuests,
      date,
      time,
      note,
    });
    await booking.save();
    return res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get User Bookings
const getUserBookings = async (req, res) => {
    const id = req.user._id
    try {
        const bookings = await bookingModel.find({user:id}).populate("user")
        if(!bookings){
            return res.status(404).json({message:"Bookings not found"});
        }
        return res.status(200).json({bookings:bookings});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//Get All Bookings 
const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find().populate("user")
        if(!bookings){
            return res.status(404).json({message:"Bookings not found"});
        }
        return res.status(200).json({bookings:bookings});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

//Update Booking Status 
const updateBookingStatus = async (req, res) => {
    const id = req.user._id
    const {bookingId} = req.params
    const {status} = req.body

    try {
        const booking = await bookingModel.findOne({_id:bookingId})
        if(!booking){
            return res.status(404).json({message:"Booking not found"});
        }
        if(status){
            booking.status = status
        }
        await booking.save()
        return res.status(200).json({message:"Booking status updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { createBooking, getUserBookings, getAllBookings, updateBookingStatus };
