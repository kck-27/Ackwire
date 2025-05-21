import React from "react";
import { assets } from "../assets/assets";

const Add = ({ sellerToken }) => {
  return (
    <form className="flex flex-col items-start gap-4 w-full text-[14px] font-medium">
      <div className="w-full">
        <p className="mb-3">Product Name: </p>
        <input
          className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
          type="text"
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-3">Product Description: </p>
        <textarea
          className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
          type="text"
          placeholder="Describe your product briefly"
          required
        />
      </div>

      <div>
        <p className="mb-3">Available Colors: </p>
        <div className="flex gap-4">
          <div>
            <p className="bg-gray-200 py-2 px-4 cursor-pointer">Black</p>
          </div>

          <div>
            <p className="bg-gray-200 py-2 px-4 cursor-pointer">White</p>
          </div>

          <div>
            <p className="bg-gray-200 py-2 px-4 cursor-pointer">Gray</p>
          </div>

          <div>
            <p className="bg-gray-200 py-2 px-4 cursor-pointer">Red</p>
          </div>

          <div>
            <p className="bg-gray-200 py-2 px-4 cursor-pointer">Blue</p>
          </div>

          <div>
            <p className="bg-gray-200 py-2 px-4 cursor-pointer">Green</p>
          </div>

          <div>
            <p className="bg-gray-200 py-2 px-4 cursor-pointer">Yellow</p>
          </div>

          <div>
            <p className="bg-gray-200 py-2 px-4 cursor-pointer">Pink</p>
          </div>

          <div>
            <p className="bg-gray-200 py-2 px-4 cursor-pointer">Orange</p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-3">Features: </p>
        <div className="flex flex-col gap-2">
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="1:"
            required
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="2:"
            required
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="3:"
            required
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="4:"
            
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="5:"
            
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="6:"
            
          />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-3">Additional Information: </p>
        <div className="flex flex-col gap-2">
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="1:"
            required
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="2:"
            required
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="3:"
            required
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="4:"
            
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="5:"
            
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="6:"
            
          />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-3">Terms and Conditions: </p>
        <div className="flex flex-col gap-2">
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="1:"
            required
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="2:"
            required
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="3:"
            
          />
          <input
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="4:"
            
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-6">
        <div className="w-full">
          <p className="mb-3">Product Category: </p>
          <select className="rounded border border-gray-300">
            <option value="Electronics">Electronics</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Sports">Sports</option>
            <option value="Beauty">Beauty</option>
            <option value="Fashion">Fashion</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="w-full">
          <p className="mb-3">Product Sub-Category: </p>
          <select className="rounded border border-gray-300">
            <option value="Accessories">Accessories</option>
            <option value="Audio">Audio</option>
            <option value="Bags">Bags</option>
            <option value="Bedding">Bedding</option>
            <option value="Bottles">Bottles</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Decor">Decor</option>
            <option value="Dresses">Dresses</option>
            <option value="Fitness">Fitness</option>
            <option value="Footwear">Footwear</option>
            <option value="Grooming">Grooming</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Monitors">Monitors</option>
            <option value="Security">Security</option>
            <option value="Sweaters">Sweaters</option>
            <option value="Tables">Tables</option>
            <option value="TVs">TVs</option>
            <option value="Wallets">Wallets</option>
            <option value="Wearables">Wearables</option>
          </select>
        </div>

        <div className="w-full">
          <p className="mb-3">Product Price: </p>
          <input
            type="number"
            placeholder="00"
            className="rounded border border-gray-300"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-62">
        <div>
          <p className="mb-3">Attach Images: </p>
          <div className="flex gap-4">
            <label htmlFor="image1">
              <img
                className="w-15 border border-gray-300 rounded-lg p-2 cursor-pointer"
                src={assets.attach_icon}
                alt=""
              />
              <input type="file" id="image1" hidden />
            </label>

            <label htmlFor="image2">
              <img
                className="w-15 border border-gray-300 rounded-lg p-2 cursor-pointer"
                src={assets.attach_icon}
                alt=""
              />
              <input type="file" id="image2" hidden />
            </label>

            <label htmlFor="image3">
              <img
                className="w-15 border border-gray-300 rounded-lg p-2 cursor-pointer"
                src={assets.attach_icon}
                alt=""
              />
              <input type="file" id="image3" hidden />
            </label>

            <label htmlFor="image4">
              <img
                className="w-15 border border-gray-300 rounded-lg p-2 cursor-pointer"
                src={assets.attach_icon}
                alt=""
              />
              <input type="file" id="image4" hidden />
            </label>
          </div>
        </div>

        <div className="flex gap-2 mt-10">
          <label className="cursor-pointer mt-4" htmlFor="bestseller">
            Bestseller Product?
          </label>
          <input type="checkbox" id="bestseller" />
        </div>
      </div>

      <button
        type="submit"
        className="text-sm bg-black text-white mt-5 mb-5 px-8 py-3 active:bg-gray-800 cursor-pointer"
      >
        Publish
      </button>
    </form>
  );
};

export default Add;
