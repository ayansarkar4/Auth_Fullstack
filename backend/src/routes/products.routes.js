import { Router } from "express";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/p").get(authMiddleware, (req, res) => {
  console.log("User:", req.user);

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality noise-cancelling over-ear headphones.",
      price: 129.99,
      category: "Electronics",
      inStock: true,
    },
    {
      id: 2,
      name: "Yoga Mat",
      description: "Eco-friendly non-slip yoga mat for all practices.",
      price: 39.95,
      category: "Fitness",
      inStock: true,
    },
    {
      id: 3,
      name: "Smart Watch",
      description: "Water-resistant smartwatch with heart rate tracking.",
      price: 249.5,
      category: "Wearables",
      inStock: false,
    },
    {
      id: 4,
      name: "Gaming Mouse",
      description: "Ergonomic RGB gaming mouse with 7 customizable buttons.",
      price: 59.99,
      category: "Gaming",
      inStock: true,
    },
    {
      id: 5,
      name: "Desk Lamp",
      description: "LED desk lamp with brightness control and USB charging.",
      price: 22.49,
      category: "Home Office",
      inStock: true,
    },
  ];

  res.status(200).json(products);
});

export default router;
