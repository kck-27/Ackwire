import React from "react";

const NewsletterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center py-20">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe to our newsletter to stay in the loop!
      </p>
      <div className="w-full">
      <p className="text-gray-400 pt-3 max-w-1/2 mx-auto">
      Stay updated with the latest trends, exclusive offers, and new arrivals by subscribing to our newsletter! Get the inside scoop on everything happening at Ackwire, directly in your inbox. Don’t miss out—join our community today!
      </p>
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex mx-auto gap-3 my-6 border border-gray-200 pl-4"
      >
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full sm:flex-1 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-10 py-4 cursor-pointer"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
