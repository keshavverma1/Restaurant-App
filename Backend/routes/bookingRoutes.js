import { createBooking, getUserBookings, getAllBookings, updateBookingStatus } from "../controller/bookingController.js";
import { protect , isAdmin } from "../middleware/authMiddleware.js";
import { Router } from "express";
const bookingRouter = Router();

bookingRouter.post("/create",protect,createBooking);
bookingRouter.get("/get",protect,getUserBookings);
bookingRouter.get("/all",protect,isAdmin,getAllBookings);
bookingRouter.put("/update/:bookingId",protect,isAdmin,updateBookingStatus);
export default bookingRouter;