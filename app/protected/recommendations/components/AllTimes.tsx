"use client";

import { ShowingTime } from "@/utils/constants";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


interface Props {
    allTimes: ShowingTime[];
}
const AllTimes = ({allTimes}:Props) => {
	const [open, setOpen] = useState(false);


  return (
    <div className="flex flex-col justify-center items-center w-full h-fit p-2">
      <div className="w-full h-fit flex justify-between items-center">
				{`All Times`}
				<button className="w-fit h-fit flex justify-center items-center text-amber-400" onClick={()=>setOpen(!open)}>
					{open ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
				</button>
			</div>

      <div className={`rec-list py-3 ${!open && 'hidden'}`}>
        {allTimes.map((time) => {
          return <div className="rec-list-item text-xs">{time.start_time}</div>;
        })}
      </div>
    </div>
  );
};

export default AllTimes;
