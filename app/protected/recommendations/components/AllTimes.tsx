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
    <div className="flex flex-col justify-center items-center w-full h-fit p-2 border-l-2 border-solid border-white mt-4">
      <div className="w-full h-fit flex justify-between items-center">
				{`All Times`}
				<button className="w-fit h-fit flex justify-center items-center text-amber-400" onClick={()=>setOpen(!open)}>
					{open ? <span className="w-fit h-fit flex justify-center items-center gap-2">{'Hide '}<FaChevronUp size={20} /></span> : <span className="w-fit h-fit flex justify-center items-center gap-2">{'Show '}<FaChevronDown size={20} /></span>}
				</button>
			</div>

      <div className={`rec-list py-3 ${!open && 'hidden'}`}>
        {allTimes.map((time, i) => {
          return <div key={time.end_time+i*2} className="rec-list-item text-xs">{time.start_time}</div>;
        })}
      </div>
    </div>
  );
};

export default AllTimes;
