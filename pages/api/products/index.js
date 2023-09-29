import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const products = await Product.find({});
    return response.status(200).json(products);
  }

  if (request.method === "POST") {
    try {
      const productData = await request.body;
      await Product.create(productData);
      return response.status(201).json({
        message: `Product ${productData.name} was successfully created.`,
      });
    } catch (error) {
      console.error(`Error creating product", ${error.message}`);
      return response
        .status(500)
        .json({ status: "error", error: error.message });
    }
  }
  return response.status(405).json({ status: "Method Not Allowed" });
}
