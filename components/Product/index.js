import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const reviewData = { ...Object.fromEntries(formData), product: id };
    console.log(reviewData);
    // await fetch(`/api/products/review`, {
    //   method: "POST",
    //   body: JSON.stringify(reviewData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      {data.reviews &&
        data.reviews.map((review) => {
          return (
            <div key={review._id}>
              <h3>{review.title}</h3>
              <p>{review.text}</p>
              <p>Rating: {review.rating}</p>
            </div>
          );
        })}
      <form onSubmit={handleSubmit}>
        <label htmlFor="ratingTitle">Title</label>
        <input type="text" id="ratingTitle" name="title" />
        <label htmlFor="rating">Review</label>
        <input type="number" id="rating" name="rating" min="1" max="5" />
        <label htmlFor="ratingText">Review</label>
        <textarea id="ratingText" name="text" />
        <button type="submit">Submit</button>
      </form>
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
