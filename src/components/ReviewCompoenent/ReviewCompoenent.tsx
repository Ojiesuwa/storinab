import useReview from "../../hooks/useReview";
import { formatDate } from "../../utils/formatDate";
import LoadingBar from "../LoadingBar/LoadingBar";
import "./ReviewCompoenent.css";
import ProfileImage from "../../assets/unknown.jpg";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import StarReview from "../StarReview/StarReview";

const ReviewCompoenent: React.FC<{
  productId: string;
  onRefreshProductView: any;
}> = ({ productId, onRefreshProductView }) => {
  const { reviews, isLoading, makeReview } = useReview(productId);
  const { userCredential, setIsAuthVisible } = useAuth();
  const [isVisble, setIsVisible] = useState(false);
  return (
    <div className="review-component">
      <div className="title flex items-center justify-between">
        <h3>Reviews({reviews?.length || 0})</h3>
        <i
          className="fa-light fa-circle-plus"
          onClick={() => {
            if (!userCredential) {
              toast.error("Log in to use this feature");
              setIsAuthVisible(true);
            }
            setIsVisible(true);
          }}
        ></i>
      </div>
      <div className="review-list">
        {reviews?.map((data, index) => (
          <div className="review-item" key={index}>
            <img
              src={data?.profileImage || ProfileImage}
              alt=""
              className="review-image"
            />
            <div className="review-text-wrapper">
              <p className="review-name">{data.fullname}</p>
              <p className="review-date">{formatDate(data.date.seconds)}</p>
              <p className="review-text mb-4">{data.review}</p>
              <StarReview rating={data?.rating} />
            </div>
          </div>
        ))}
      </div>
      <LoadingBar isVisible={isLoading} />
      {isVisble && (
        <MakeReviewContainer
          onSubmit={(data: any) => {
            makeReview(data);
            onRefreshProductView();
          }}
          onHide={() => setIsVisible(false)}
        />
      )}
    </div>
  );
};

export default ReviewCompoenent;

const MakeReviewContainer: React.FC<{ onSubmit: any; onHide: any }> = ({
  onSubmit,
  onHide,
}) => {
  const [response, setResponse] = useState({ review: "", rating: 1 });
  return (
    <div className="make-review">
      <div className="main-container">
        <div className="header-wrapper">
          <h4>Make a review</h4>
          <i className="fa-light fa-xmark" onClick={onHide}></i>
        </div>
        <div className="fill-container">
          <h5>Enter Review</h5>
          <textarea
            name=""
            id=""
            placeholder="Type here"
            value={response.review}
            onChange={(e) =>
              setResponse((p) => ({ ...p, review: e.target.value }))
            }
          ></textarea>

          <h5 className="mt-3 mb-2">Select Rating</h5>
          <select
            name=""
            id=""
            value={response.rating}
            onChange={(e) =>
              setResponse((p) => ({ ...p, rating: e.target.value } as any))
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="btn-container">
          <button
            className="button-blue"
            disabled={!response.review}
            onClick={() => {
              onSubmit(response);
              setResponse({ rating: 1, review: "" });
              onHide();
            }}
          >
            Save Review
          </button>
        </div>
      </div>
    </div>
  );
};
