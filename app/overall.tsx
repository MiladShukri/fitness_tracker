import React from "react";

interface Props {
  allUsersTotals: any;
}
const Overall = ({ allUsersTotals }: Props) => {
  return (
    <div className="flex flex-row justify-center h-full">
      <div className="flex flex-col text-3xl mt-10 w-full">
        <div className="flex justify-center">Total Scores!</div>
        <div className="flex flex-row mt-10">
          <div
            className="flex w-1/3 h-12 justify-center items-center"
            style={{ backgroundColor: "#C0C0C0" }}
          >
            {allUsersTotals[1].name}:{allUsersTotals[1].total}
          </div>
          <div
            className="flex w-1/3 h-12 justify-center items-center"
            style={{ backgroundColor: "#FFD700" }}
          >
            {allUsersTotals[0].name}:{allUsersTotals[0].total}
          </div>
          <div
            className="flex w-1/3 h-12 justify-center items-center"
            style={{ backgroundColor: "#CD7F32" }}
          >
            {allUsersTotals[2].name}:{allUsersTotals[2].total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overall;
