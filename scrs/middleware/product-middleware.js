export const validateProduct = async (req, res, next) => {
  const { id, role, productName, quantity, price, amount } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }
  if (!role) {
    return res.status(400).json({ message: "role is required" });
  }

  if (!productName) {
    return res.status(400).json({ message: "Produc name is required" });
  }

  if (!quantity) {
    return res.status(400).json({ message: "quantity is required" });
  }

  if (!price) {
    return res.status(400).json({ message: "price is required" });
  }

  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (req.role === "admin") {
      next();
    } else {
      return res.status(402).json({ message: "You are not allowed" });
    }
    console.log(req.role);
  } catch (error) {
    console.log(error.message);
  }
};
