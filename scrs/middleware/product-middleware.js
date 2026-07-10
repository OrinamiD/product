export const validateProduct = async (req, res, next) => {
  const { productName, quantity, price, amount, id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
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
  const { role } = req;

  if (req.role === "Admin") {
    next();
  }
  return res.status(402).json({ message: "You are not allowed" });
};
