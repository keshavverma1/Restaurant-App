import orderModel from "../model/orderModel.js";
import cartModel from "../model/cartModel.js";
import { protect } from "../middleware/authMiddleware.js";
import { Router } from "express";
const orderRouter = Router();
//Place Order
const placeOrder = async (req, res) => {
  try {
    const id = req.user._id;
    const { address } = req.body;
    if (!address){
      return res.status(400).json({ message: "Address is required" ,success:false });
    }
    const cart = await cartModel
      .findOne({ user: id })
      .populate("items.menuItem");
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart not found",success:false });
    }
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.menuItem.price * item.quantity,
      0,
    );
    const order = new orderModel({
      user: id,
      items: cart.items,
      totalAmount: totalAmount,
      address: address,
    });
    await order.save();
    await cartModel.findOneAndDelete({ user: id });
    return res.status(201).json({ message: "Order placed successfully",success:true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get Order
const getUserOrder = async (req, res) => {
  const id = req.user._id;
  try {
    const order = await orderModel
      .find({ user: id })
      .populate("user")
      .populate("items.menuItem");
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    return res
      .status(200)
      .json({
        order: order,
        message: "Order found successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const order = await orderModel
      .find()
      .populate("user", "name email")
      .populate("items.menuItem");
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    return res
      .status(200)
      .json({
        order: order,
        message: "Order found successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

//Update Order
const updateOrder = async (req, res) => {
 
  const { orderId } = req.params;
  const { status, paymentMethod } = req.body;

  try {
    const order = await orderModel.findOne({
      _id: orderId,
     
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }
    if (status) {
      order.status = status;
    }
    if(!paymentMethod){
      order.paymentMethod = order.paymentMethod
    }
    else{
      order.paymentMethod = paymentMethod
    }

    await order.save();

    return res.status(200).json({
      message: "Order updated successfully",
      order,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export { placeOrder, getUserOrder, updateOrder, getAllOrders };
