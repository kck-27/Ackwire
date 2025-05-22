import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Publish = ({ sellerToken, userEmail, userBusinessScale }) => {
  const [currentState, setCurrentState] = useState("product");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([]);
  const [modes, setModes] = useState([]);
  const [features1, setFeatures1] = useState("");
  const [features2, setFeatures2] = useState("");
  const [features3, setFeatures3] = useState("");
  const [features4, setFeatures4] = useState("");
  const [features5, setFeatures5] = useState("");
  const [features6, setFeatures6] = useState("");
  const [additionalInformation1, setAdditionalInformation1] = useState("");
  const [additionalInformation2, setAdditionalInformation2] = useState("");
  const [additionalInformation3, setAdditionalInformation3] = useState("");
  const [additionalInformation4, setAdditionalInformation4] = useState("");
  const [additionalInformation5, setAdditionalInformation5] = useState("");
  const [additionalInformation6, setAdditionalInformation6] = useState("");
  const [terms1, setTerms1] = useState("");
  const [terms2, setTerms2] = useState("");
  const [terms3, setTerms3] = useState("");
  const [terms4, setTerms4] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [bestseller, setBestseller] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image1) {
      alert("Please attach at least one image.");
      return;
    }

    try {
      const features = [
        features1,
        features2,
        features3,
        features4,
        features5,
        features6,
      ].filter((f) => f.trim() !== "");
      const additionalInformation = [
        additionalInformation1,
        additionalInformation2,
        additionalInformation3,
        additionalInformation4,
        additionalInformation5,
        additionalInformation6,
      ].filter((a) => a.trim() !== "");
      const terms = [terms1, terms2, terms3, terms4].filter(
        (t) => t.trim() !== ""
      );

      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("category", category);
      formdata.append("subCategory", subCategory);
      formdata.append("companyScale", userBusinessScale);
      formdata.append("rating", 75);
      formdata.append("terms", JSON.stringify(terms));
      formdata.append("features", JSON.stringify(features));
      formdata.append("more_info", JSON.stringify(additionalInformation));
      if (currentState === "product") {
        formdata.append("color", JSON.stringify(colors));
      }
      if (currentState === "service") {
        formdata.append("mode", JSON.stringify(modes));
      }
      formdata.append("bestseller", bestseller);
      image1 && formdata.append("image1", image1);
      image2 && formdata.append("image2", image2);
      image3 && formdata.append("image3", image3);
      image4 && formdata.append("image4", image4);
      formdata.append("userEmail", userEmail);

      const res = await axios.post(
        `${backendURL}/api/${currentState}s/create`,
        formdata,
        { headers: { sellerToken } }
      );
      if (res.data.status === "successful") {
        toast.success(`The ${currentState} has been published successfully!`);
        setName("");
        setDescription("");
        setColors([]);
        setFeatures1("");
        setFeatures2("");
        setFeatures3("");
        setFeatures4("");
        setFeatures5("");
        setFeatures6("");
        setAdditionalInformation1("");
        setAdditionalInformation2("");
        setAdditionalInformation3("");
        setAdditionalInformation4("");
        setAdditionalInformation5("");
        setAdditionalInformation6("");
        setTerms1("");
        setTerms2("");
        setTerms3("");
        setTerms4("");
        setCategory("");
        setSubCategory("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setBestseller(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-4 w-full text-[14px] font-medium"
    >
      <div className="w-full">
        <p className="mb-3">Product or Service? </p>
        <select
          onChange={(e) => setCurrentState(e.target.value)}
          value={currentState}
          name="currentState"
          className=" px-3 py-2 border border-gray-300 rounded-xl"
          required
        >
          <option value="" disabled hidden>
            Publish a Product or a Service?
          </option>
          <option value="product">Product</option>
          <option value="service">Service</option>
        </select>
      </div>

      <div className="w-full">
        {currentState === "product" ? (
          <p className="mb-3">Product Name: </p>
        ) : (
          <p className="mb-3">Service Name: </p>
        )}

        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
          type="text"
          placeholder={`Enter ${currentState} name`}
          required
        />
      </div>

      <div className="w-full">
        {currentState === "product" ? (
          <p className="mb-3">Product Description: </p>
        ) : (
          <p className="mb-3">Service Description: </p>
        )}

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
          type="text"
          placeholder={`Describe your ${currentState} briefly`}
          required
        />
      </div>

      <div>
        {currentState === "product" ? (
          <p className="mb-3">Available Colors: </p>
        ) : (
          <p className="mb-3">Available Modes: </p>
        )}

        {currentState === "product" ? (
          <div className="grid sm:flex gap-4">
            <div
              onClick={() =>
                setColors((previous) =>
                  previous.includes("Black")
                    ? previous.filter((color) => color !== "Black")
                    : [...previous, "Black"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  colors.includes("Black")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                Black
              </p>
            </div>

            <div
              onClick={() =>
                setColors((previous) =>
                  previous.includes("White")
                    ? previous.filter((color) => color !== "White")
                    : [...previous, "White"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  colors.includes("White")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                White
              </p>
            </div>

            <div
              onClick={() =>
                setColors((previous) =>
                  previous.includes("Gray")
                    ? previous.filter((color) => color !== "Gray")
                    : [...previous, "Gray"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  colors.includes("Gray")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                Gray
              </p>
            </div>

            <div
              onClick={() =>
                setColors((previous) =>
                  previous.includes("Red")
                    ? previous.filter((color) => color !== "Red")
                    : [...previous, "Red"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  colors.includes("Red")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                Red
              </p>
            </div>

            <div
              onClick={() =>
                setColors((previous) =>
                  previous.includes("Blue")
                    ? previous.filter((color) => color !== "Blue")
                    : [...previous, "Blue"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  colors.includes("Blue")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                Blue
              </p>
            </div>

            <div
              onClick={() =>
                setColors((previous) =>
                  previous.includes("Green")
                    ? previous.filter((color) => color !== "Green")
                    : [...previous, "Green"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  colors.includes("Green")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                Green
              </p>
            </div>

            <div
              onClick={() =>
                setColors((previous) =>
                  previous.includes("Yellow")
                    ? previous.filter((color) => color !== "Yellow")
                    : [...previous, "Yellow"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  colors.includes("Yellow")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                Yellow
              </p>
            </div>

            <div
              onClick={() =>
                setColors((previous) =>
                  previous.includes("Pink")
                    ? previous.filter((color) => color !== "Pink")
                    : [...previous, "Pink"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  colors.includes("Pink")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                Pink
              </p>
            </div>

            <div
              onClick={() =>
                setColors((previous) =>
                  previous.includes("Orange")
                    ? previous.filter((color) => color !== "Orange")
                    : [...previous, "Orange"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  colors.includes("Orange")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                Orange
              </p>
            </div>
          </div>
        ) : (
          <div className="grid sm:flex gap-4">
            <div
              onClick={() =>
                setModes((previous) =>
                  previous.includes("Remote")
                    ? previous.filter((mode) => mode !== "Remote")
                    : [...previous, "Remote"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  modes.includes("Remote")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                Remote
              </p>
            </div>

            <div
              onClick={() =>
                setModes((previous) =>
                  previous.includes("Physical")
                    ? previous.filter((mode) => mode !== "Physical")
                    : [...previous, "Physical"]
                )
              }
            >
              <p
                className={`bg-gray-200 py-2 px-4 border cursor-pointer ${
                  modes.includes("Physical")
                    ? "border-gray-400"
                    : "border-transparent"
                }`}
              >
                Physical
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        <p className="mb-3">Features: </p>
        <div className="flex flex-col gap-2">
          <input
            onChange={(e) => setFeatures1(e.target.value)}
            value={features1}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="1:"
            required
          />
          <input
            onChange={(e) => setFeatures2(e.target.value)}
            value={features2}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="2:"
            required
          />
          <input
            onChange={(e) => setFeatures3(e.target.value)}
            value={features3}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="3:"
            required
          />
          <input
            onChange={(e) => setFeatures4(e.target.value)}
            value={features4}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="4:"
          />
          <input
            onChange={(e) => setFeatures5(e.target.value)}
            value={features5}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="5:"
          />
          <input
            onChange={(e) => setFeatures6(e.target.value)}
            value={features6}
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
            onChange={(e) => setAdditionalInformation1(e.target.value)}
            value={additionalInformation1}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="1:"
            required
          />
          <input
            onChange={(e) => setAdditionalInformation2(e.target.value)}
            value={additionalInformation2}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="2:"
            required
          />
          <input
            onChange={(e) => setAdditionalInformation3(e.target.value)}
            value={additionalInformation3}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="3:"
            required
          />
          <input
            onChange={(e) => setAdditionalInformation4(e.target.value)}
            value={additionalInformation4}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="4:"
          />
          <input
            onChange={(e) => setAdditionalInformation5(e.target.value)}
            value={additionalInformation5}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="5:"
          />
          <input
            onChange={(e) => setAdditionalInformation6(e.target.value)}
            value={additionalInformation6}
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
            onChange={(e) => setTerms1(e.target.value)}
            value={terms1}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="1:"
            required
          />
          <input
            onChange={(e) => setTerms2(e.target.value)}
            value={terms2}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="2:"
            required
          />
          <input
            onChange={(e) => setTerms3(e.target.value)}
            value={terms3}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="3:"
          />
          <input
            onChange={(e) => setTerms4(e.target.value)}
            value={terms4}
            className="w-full max-w-[550px] py-1.5 px-3.5 rounded border border-gray-300"
            type="text"
            placeholder="4:"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-6">
        <div className="w-full">
          {currentState === "product" ? (
            <p className="mb-3">Product Category: </p>
          ) : (
            <p className="mb-3">Service Category: </p>
          )}

          {currentState === "product" ? (
            <select
              onChange={(e) => setCategory(e.target.value)} value={category}
              className="rounded border border-gray-300" required
            >
              <option value="" disabled hidden>Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Home Appliances">Home Appliances</option>
              <option value="Sports">Sports</option>
              <option value="Beauty">Beauty</option>
              <option value="Fashion">Fashion</option>
              <option value="Accessories">Accessories</option>
            </select>
          ) : (
            <select
              onChange={(e) => setCategory(e.target.value)} value={category}
              className="rounded border border-gray-300" required
            >
              <option value="" disabled hidden>Select Category</option>
              <option value="Administrative Services">
                Administrative Services
              </option>
              <option value="Cleaning Services">Cleaning Services</option>
              <option value="IT Services">IT Services</option>
              <option value="Training & Education">Training & Education</option>
              <option value="Consulting Services">Consulting Services</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Legal Services">Legal Services</option>
              <option value="Professional Services">
                Professional Services
              </option>
              <option value="Fitness Services">Fitness Services</option>
              <option value="Event Services">Event Services</option>
              <option value="Design Services">Design Services</option>
              <option value="Photography Services">Photography Services</option>
              <option value="Marketing Services">Marketing Services</option>
              <option value="Home Services">Home Services</option>
            </select>
          )}
        </div>

        <div className="w-full">
          {currentState === "product" ? (
            <p className="mb-3">Product Sub-Category: </p>
          ) : (
            <p className="mb-3">Service Sub-Category: </p>
          )}

          {currentState === "product" ? (
            <select
              onChange={(e) => setSubCategory(e.target.value)} value={subCategory}
              className="rounded border border-gray-300" required
            >
              <option value="" disabled hidden>Select Sub-Category</option>
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
          ) : (
            <select
              onChange={(e) => setSubCategory(e.target.value)} value={subCategory}
              className="rounded border border-gray-300" required
            >
              <option value="" disabled hidden>Select Sub-Category</option>
              <option value="App Development">App Development</option>
              <option value="Branding">Branding</option>
              <option value="Consulting">Consulting</option>
              <option value="Corporate Training">Corporate Training</option>
              <option value="Event Photography">Event Photography</option>
              <option value="Event Planning">Event Planning</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Home Cleaning">Home Cleaning</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Personal Training">Personal Training</option>
              <option value="Pest Control">Pest Control</option>
              <option value="SEO">SEO</option>
              <option value="Social Media Management">
                Social Media Management
              </option>
              <option value="Tax Services">Tax Services</option>
              <option value="Translation">Translation</option>
              <option value="Virtual Assistance">Virtual Assistance</option>
              <option value="Web Development">Web Development</option>
            </select>
          )}
        </div>

        <div className="w-full">
          {currentState === "product" ? (
            <p className="mb-3">Product Price: </p>
          ) : (
            <p className="mb-3">Service Price: </p>
          )}
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="00"
            className="rounded border border-gray-300" required
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
                src={image1 ? URL.createObjectURL(image1) : assets.attach_icon}
                alt=""
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>

            <label htmlFor="image2">
              <img
                className="w-15 border border-gray-300 rounded-lg p-2 cursor-pointer"
                src={image2 ? URL.createObjectURL(image2) : assets.attach_icon}
                alt=""
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>

            <label htmlFor="image3">
              <img
                className="w-15 border border-gray-300 rounded-lg p-2 cursor-pointer"
                src={image3 ? URL.createObjectURL(image3) : assets.attach_icon}
                alt=""
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>

            <label htmlFor="image4">
              <img
                className="w-15 border border-gray-300 rounded-lg p-2 cursor-pointer"
                src={image4 ? URL.createObjectURL(image4) : assets.attach_icon}
                alt=""
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>

        <div className="flex gap-2 mt-10">
          {currentState === "product" ? (
            <label className="cursor-pointer mt-4" htmlFor="bestseller">
              Bestseller Product?
            </label>
          ) : (
            <label className="cursor-pointer mt-4" htmlFor="bestseller">
              Bestseller Service?
            </label>
          )}

          <input
            onChange={() => setBestseller((previous) => !previous)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
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

export default Publish;
