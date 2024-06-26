import { avatarClasses } from "@mui/material";
import React from "react";
import avatar from "../../../Assets/profile.png";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const realEstateAgent = ({ agentDetails }) => {
  //console.log(agentDetails, "agentDetails");
  const Id = agentDetails.uid;
  //console.log(Id, "Id");
  return (
    <div className="w-[65rem] ml-80 pb-10 pt-7" name="realEstate">
      <div className="h-[32rem] rounded-[1rem] border-2 border-gray-400">
        <div className="flex justify-center gap-4 items-center rounded-t-[1rem] bg-gray-100 py-3">
          <p className="text-[25px] font-bold">Real Estate Agent Information</p>
        </div>

        <div className="flex justify-between border-b-2 px-7 py-9">
          <div className="flex gap-5">
            <img
              src={agentDetails.profilePicture || avatar}
              className="h-[4rem] flex object-cover border rounded-[50rem] w-[4.3rem]"
            />

            <p className="mb-3 text-2xl">{agentDetails.userName}</p>
          </div>
          <div className="flex gap-7 items-center h-auto">
            <div className="flex gap-2 items-center">
              <p className="text-[20px]">5</p>
              <BsStarFill />
            </div>

            <Link to={`/viewReviewsPage/${Id}`}>
              <div className="text-gray-900 underline hover:no-underline duration-200 py-1 px-3 rounded-full text-[19px]">
                <p>Reviews</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="border-b-2 px-7 py-7">
          <p className="text-[17px] mb-4">Phone Number</p>
          <p className="text-[25px] font-bold">
            {agentDetails.phone ? agentDetails.phone : "+65 "}
          </p>
        </div>
        <div className="px-7 py-7">
          <p className="text-[17px] mb-4">Email address</p>
          <p className="text-[25px] font-bold">{agentDetails.email}</p>
        </div>
      </div>
    </div>
  );
};

export default realEstateAgent;
