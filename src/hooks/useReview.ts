import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDocumentById, updateDocumentById } from "../firebase/firebaseTools";
import { ProductType } from "../types/product_type";
import { getAccountNameAndImage } from "../controllers/account";
import { increment, Timestamp } from "firebase/firestore";
import useAuth from "./useAuth";

interface Review {
  profileImage: string;
  fullname: string;
  accountId: string;
  date: Date | Timestamp | any;
  rating: number;
  review: string;
}

const useReview = (productId: string) => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const { accountDetail } = useAuth();

  const makeReview = async (response: any) => {
    try {
      if (!accountDetail || !productId || !product) return;
      setIsLoading(true);

      let accountPreviousReview = reviews?.find(
        (review) => review.accountId === accountDetail?.accountId
      );

      await updateDocumentById("Product", productId, {
        totalRatingCount: increment(accountPreviousReview ? 0 : 1),
        totalRating: increment(
          response.rating -
            (parseInt(accountPreviousReview?.rating as any) || 0)
        ),
      });

      const newReviewList = accountPreviousReview
        ? reviews?.map((data) =>
            data.accountId === accountDetail?.accountId
              ? { ...data, ...response }
              : data
          )
        : [
            ...(reviews || []),
            {
              accountId: accountDetail?.accountId,
              date: new Date(),
              ...response,
            },
          ];

      await updateDocumentById("Review", product?.reviewId as string, {
        reviews: newReviewList,
      });

      fetchReviews();
      toast.success("Review successfully submitted");
    } catch (error) {
      console.error(error);
      toast.error("Error saving review");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      if (!productId) return;

      const productData = await getDocumentById("Product", productId);
      const reviewData = await getDocumentById("Review", productData.reviewId);

      const dbReviews: Review[] = reviewData.reviews;

      const dbFullReviews = (await Promise.all(
        dbReviews?.map(async (data) => {
          const { fullname, profileImage } = await getAccountNameAndImage(
            data.accountId
          );
          return {
            ...data,
            fullname,
            profileImage,
          };
        })
      )) as Review[];

      console.log(dbFullReviews);

      dbFullReviews.reverse();

      setReviews(dbFullReviews);
      setProduct(productData as any);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching reviews");
    } finally {
    }
  };

  useEffect(() => {
    if (productId) {
      setReviews(null);
      setProduct(null);
      fetchReviews();
    }
  }, [productId]);

  return { reviews, isLoading, makeReview };
};

export default useReview;
