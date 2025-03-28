import "./StarReview.css";

const StarReview: React.FC<{ rating?: number | null, productId?:any }> = ({ rating , productId}) => {
  return (
    <div className="star-review">
      {new Array(Math.floor(rating || 0)).fill(2).map((data) => (
        <i className="fa-solid fa-star g"></i>
      ))}
      {new Array(5 - Math.floor(rating || 0)).fill(2).map((data) => (
        <i className="fa-solid fa-star b"></i>
      ))}
    </div>
  );
};

export default StarReview;
