import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const singleProduct = await Product.findById(id).populate("reviews");
    if (!singleProduct) {
      return response.status(404).json({ status: "Product was not found" });
    }
    return response.status(200).json(singleProduct);
  }
}
