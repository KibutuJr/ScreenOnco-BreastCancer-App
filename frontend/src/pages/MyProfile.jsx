// src/pages/MyProfile.jsx
import React, { useState } from "react";
import assets from "../assets";

export default function MyProfile() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    image: assets.profile_pic,
    email: "kibutujr@gmail.com",
    phone: "+254 736 421 150",
    address: { line1: "Muthangari Drive", line2: "Westlands, Nairobi" },
    gender: "Male",
    dob: "1994-02-27",
  });
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col items-center">
        <img
          src={userData.image}
          alt={userData.name}
          className="w-36 h-36 object-cover rounded-full"
        />
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((p) => ({ ...p, name: e.target.value }))
            }
            className="mt-4 text-3xl font-medium text-center border-b pb-1 w-full max-w-xs"
          />
        ) : (
          <p className="mt-4 text-3xl font-medium text-neutral-800">
            {userData.name}
          </p>
        )}
      </div>

      <hr className="my-6 border-zinc-300" />

      {/* Contact Info */}
      <div>
        <p className="text-neutral-500 underline mb-3">CONTACT INFO</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
          <span className="font-medium">Email:</span>
          <span className="text-blue-500">{userData.email}</span>

          <span className="font-medium">Phone:</span>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((p) => ({ ...p, phone: e.target.value }))
              }
              className="bg-gray-100 rounded px-2 py-1"
            />
          ) : (
            <span className="text-blue-500">{userData.phone}</span>
          )}

          <span className="font-medium">Address:</span>
          {isEdit ? (
            <div>
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((p) => ({
                    ...p,
                    address: { ...p.address, line1: e.target.value },
                  }))
                }
                className="bg-gray-100 rounded px-2 py-1 mb-1 w-full"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((p) => ({
                    ...p,
                    address: { ...p.address, line2: e.target.value },
                  }))
                }
                className="bg-gray-100 rounded px-2 py-1 w-full"
              />
            </div>
          ) : (
            <div className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-neutral-500 underline mb-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
          <span className="font-medium">Gender:</span>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((p) => ({ ...p, gender: e.target.value }))
              }
              className="bg-gray-100 rounded px-2 py-1"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <span className="text-gray-500">{userData.gender}</span>
          )}

          <span className="font-medium">Date of Birth:</span>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((p) => ({ ...p, dob: e.target.value }))
              }
              className="bg-gray-100 rounded px-2 py-1"
            />
          ) : (
            <span className="text-gray-500">{userData.dob}</span>
          )}
        </div>
      </div>

      <div className="mt-10 text-center">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
