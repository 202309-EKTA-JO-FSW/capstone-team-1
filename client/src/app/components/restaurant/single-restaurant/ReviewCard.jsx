import React from "react";

const mockReviews = [
  {
    rating: 4,
    username: "User011",
    review: "great food and ambience",
  },
  {
    rating: 3,
    username: "user022",
    review: "excellent taste and cooking, came super hot",
  },
  {
    rating: 4,
    username: "user033",
    review: "amazing experience",
  },
  {
    rating: 5,
    username: "user044",
    review: "wonderful",
  },
];

const ReviewCard = ({ rating, username, review }) => {
  const ratingStars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`text-yellow-400 ${
        index < rating ? "fill-current" : "text-gray-300"
      }`}
    >
      &#9733;
    </span>
  ));

  return (
    <div className="flex items-center bg-white rounded-lg p-4 shadow-md w-72">
      <div className="rounded-full bg-gray-400 h-10 w-10 flex items-center justify-center text-white mr-4">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <div>
        <div className="flex items-center">
          <span className="font-semibold mr-2">{username}</span>
          <div className="flex">{ratingStars}</div>
        </div>
        <p className="text-gray-600">{review}</p>
      </div>
    </div>
  );
};

const MyPage = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {mockReviews.map((review, index) => (
        <ReviewCard
          key={index}
          rating={review.rating}
          username={review.username}
          review={review.review}
        />
      ))}
    </div>
  );
};

export default MyPage;
