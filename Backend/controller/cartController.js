import cartModel from "../model/cartModel.js";
import menuModel from "./../model/menuModel.js";

const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;

    const quantityNumber = Number(quantity);
    const id = req.user._id;
    const menuItem = await menuModel.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    const cart = await cartModel.findOne({ user: id });
    if (!cart) {
      const newCart = new cartModel({
        user: id,
        items: [{ menuItem: menuItemId, quantity: quantityNumber }],
      });
      await newCart.save();
      return res.status(201).json({
        message: "Menu item added to cart successfully",
        cart: newCart,
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.menuItem.toString() === menuItemId,
      );
      if (existingItem) {
        existingItem.quantity += quantityNumber;
      } else {
        cart.items.push({ menuItem: menuItemId, quantity: quantity });
      }
      await cart.save();
      return res
        .status(200)
        .json({ message: "Menu item added to cart successfully", cart: cart });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getuserCart = async (req, res) => {
  try {
    const cart = await cartModel
      .findOne({ user: req.user._id })
      .populate("items.menuItem");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({ cart: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const id = req.user._id;
    const { menuItemId } = req.body;

    // User की cart ढूँढो
    const cart = await cartModel.findOne({ user: id });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // Item का index ढूँढो
    const itemIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Menu item not found in cart",
      });
    }

    // Cart से item हटाओ
    cart.items.splice(itemIndex, 1);

    // अगर cart खाली हो गई तो पूरी cart delete कर दो
    if (cart.items.length === 0) {
      await cart.deleteOne();

      return res.status(200).json({
        message: "Cart is empty, cart deleted successfully",
      });
    }

    // अगर दूसरे items मौजूद हैं तो updated cart save करो
    await cart.save();

    return res.status(200).json({
      message: "Menu item removed from cart successfully",
      cart: cart,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export { addToCart, getuserCart, removeFromCart };
