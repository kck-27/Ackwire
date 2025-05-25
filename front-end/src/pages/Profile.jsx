import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendURL } from "../App";
import { assets } from "../assets/assets";
import Spinner from "../components/Spinner";

// const Section = ({ title, children, onEdit }) => (
//   <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//     <div className="flex justify-between items-center mb-4">
//       <h2 className="font-semibold text-lg">{title}</h2>
//       <button className="flex items-center gap-1 px-4 py-1 border rounded-full text-sm hover:bg-gray-100">
//         <span role="img" aria-label="edit">✏️</span> Edit
//       </button>
//     </div>
//     {children}
//   </div>
// );

const Profile = ({token}) => {

    const {loading, setLoading} = useContext(ShopContext);
    const [profile, setProfile] = useState({});

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${backendURL}/api/user/get-by-id`, {}, {headers: {token}});
            if (res.data.status === "successful") {
                setProfile(res.data.userObject);
            } else {
console.log(res.data)
        toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
                  toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

// const profile = {

//   name: "Musharof Chowdhury",
//   title: "Team Manager",
//   location: "Arizona, United States.",
//   avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with your image
//   socials: [
//     { icon: "🌐", url: "#" }, // Replace with real icons and links
//     { icon: "X", url: "#" },
//     { icon: "in", url: "#" },
//     { icon: "📸", url: "#" },
//   ],
//   personal: {
//     firstName: "Chowdhury",
//     lastName: "Musharof",
//     email: "randomuser@pimjo.com",
//     phone: "+09 363 398 46",
//     bio: "Team Manager",
//   },
//   address: {
//     country: "United States",
//     city: "Arizona, United States.",
//     postal: "ERT 2489",
//     taxId: "AS4568384",
//   },
// };

if (loading) {
  return (
        <Spinner />  
  );
}
return (
    <div className='border-t border-gray-300 pt-14 pb-14'>
        <div className="max-w-4xl mx-auto p-4">


    <div className="bg-white rounded-xl shadow-sm border  border-gray-400  p-6 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-semibold text-lg">Profile</h2>
      <button className="flex items-center gap-1 px-4 py-1 border rounded-full text-sm active:bg-gray-800 cursor-pointer  bg-black text-white">
        Edit
      </button>
    </div>
    <div className="flex flex-col md:items-center gap-4">
  <img
    src={assets.person_icon}
    alt=""
    className="w-25 h-full border border-gray-400 rounded-full object-cover object-center"
  />
        <div className="flex-1">
          <div className="font-semibold text-xl">{profile.name}</div>
          
        </div>
        
      </div>
  </div>





    <div className="bg-white rounded-xl shadow-sm border  border-gray-400  p-6 mb-6">
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-semibold text-lg">Personal Information</h2>
      <button className="flex items-center gap-1 px-4 py-1 border rounded-full text-sm active:bg-gray-800 cursor-pointer  bg-black text-white">
      Edit
    </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500">Full name</div>
          <div className="font-medium">{profile.name}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Email address</div>
          <div className="font-medium">{profile.email}</div>
        </div>
        <div className="md:col-span-2">
          <div className="text-xs text-gray-500">User type</div>
          <div className="font-medium">{profile.userType ? profile.userType.toUpperCase() : ""}</div>
        </div>
        {profile.userType === "seller" ? <div className="md:col-span-2">
          <div className="text-xs text-gray-500">Scale of business</div>
          <div className="font-medium">{profile.businessScale.toUpperCase()}</div>
        </div> : ""}
        <div>
          <div className="text-xs text-gray-500">Phone</div>
          <div className="font-medium">{profile.phone ? profile.phone : "Not set"}</div>
        </div>
        
      </div>
</div>
    


    <div className="bg-white rounded-xl shadow-sm border border-gray-400  p-6 mb-6">
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-semibold text-lg">Address</h2>
      <button className="flex items-center gap-1 px-4 py-1 border rounded-full text-sm active:bg-gray-800 cursor-pointer  bg-black text-white">
      Edit
    </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <div className="text-xs text-gray-500">Address line 1</div>
          <div className="font-medium">{profile.address?.addressLine1 ? profile.address.addressLine1 : "Not set"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Address line 2</div>
          <div className="font-medium">{profile.address?.addressLine2 ? profile.address.addressLine2 : "Not set"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Street</div>
          <div className="font-medium">{profile.address?.street ? profile.address.street : "Not set"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">City</div>
          <div className="font-medium">{profile.address?.city ? profile.address.city : "Not set"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">State/Province</div>
          <div className="font-medium">{profile.address?.stateProvince ? profile.address.stateProvince : "Not set"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Country</div>
          <div className="font-medium">{profile.address?.country ? profile.address.country : "Not set"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Zip Code</div>
          <div className="font-medium">{profile.address?.zipCode ? profile.address.zipCode : "Not set"}</div>
        </div>
      </div>
</div>
    
  </div>
    </div>
    
)
  
};

export default Profile;