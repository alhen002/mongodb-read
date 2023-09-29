import dbConnect from "@/db/connect";
import Review from "@/db/models/Review";
import Product from "@/db/models/Product";

export default async function handler(req, res) {
  await dbConnect();
  const { title, text, rating, product } = await req.body;

  if (req.method === "POST") {
    try {
      //create a new Review
      await Review.create({ title, text, rating });
      const product = await Product.findById(product);
      //push the review to the product

      return res.status(201).json({
        message: `Review ${productData.title} was successfully created.`,
      });
    } catch (error) {
      console.error(`Error creating review", ${error.message}`);
      return res.status(500).json({ status: "error", error: error.message });
    }
  }
  return res.status(405).json({ status: "Method Not Allowed" });
}
