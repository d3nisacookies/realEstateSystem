import { Sell } from "@mui/icons-material";
import React from "react";

import { BsStarFill } from "react-icons/bs";

{
  /* NAME, PROFILEPIC, COMPANYLOGO, COMPANYNAME, LICENSE, RATING, PHONENUM, EMAIL */
}

const SellerDetails = ({ agentDetails }) => {
  return (
    <div className="w-[65rem] ml-80 pb-10 pt-7" name="realEstate">
      <div className="h-[32rem] rounded-[1rem] border-2 border-gray-400">
        <div className="flex justify-center gap-4 items-center rounded-t-[1rem] bg-gray-100 py-3">
          <p className="text-[25px] font-bold">Seller Information</p>
        </div>

        <div className="flex justify-between border-b-2 px-7 py-9">
          <div className="flex gap-5">
            <img
              src={agentDetails.profilePicture}
              className="h-[4rem] flex object-cover border rounded-[50rem] w-[4.3rem]"
            />

            <p className="mb-3 text-2xl">{agentDetails.userName}</p>
          </div>
        </div>
        <div className="border-b-2 px-7 py-7">
          <p className="text-[17px] mb-4">Phone Number</p>
          <p className="text-[25px] font-bold">+65 some number here</p>
        </div>
        <div className="px-7 py-7">
          <p className="text-[17px] mb-4">Email address</p>
          <p className="text-[25px] font-bold">{agentDetails.email}</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
