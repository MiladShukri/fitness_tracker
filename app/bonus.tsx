import React, { useState, useEffect } from "react";
import Select from "react-select";
import { cloneDeep } from "lodash";

interface Props {
  setBonusPoints: any;
  bonusPoints: any;
  bonusPointsOriginal: any;
  userOptions: any;
  handleSaveBonusPoints: any;
}

const Bonus = ({
  setBonusPoints,
  bonusPoints,
  bonusPointsOriginal,
  userOptions,
  handleSaveBonusPoints,
}: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(
      JSON.stringify(bonusPoints) === JSON.stringify(bonusPointsOriginal)
    );
  }, [bonusPoints, bonusPointsOriginal]);

  const updateBonusPoints = (weekIndex, colIndex, newValues) => {
    let column = "";
    if (colIndex === 0) {
      column = "perfect_week";
    } else if (colIndex === 1) {
      column = "most_steps";
    } else if (colIndex === 2) {
      column = "longest_plank";
    }
    const updatedBonusPoints = cloneDeep(bonusPoints);
    updatedBonusPoints[weekIndex][column] = newValues.length ? newValues : null;
    setBonusPoints(updatedBonusPoints);
  };

  const columns = [
    "Perfect Week (at least 3 workouts)",
    "Most Steps In a Week",
    "Longest Plank of the Week",
  ];

  return (
    <div className="overflow-x-auto h-full">
      <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Bonus Points Breakdown
        </h2>
        <p className="text-gray-700 mt-2">
          - Perfect Week (at least 3 workouts): <strong>30 points</strong>
          <br />- Most Steps In a Week: <strong>25 points</strong>
          <br />- Longest Plank of the Week: <strong>20 points</strong>
        </p>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">
              Weeks
            </th>
            {columns.map((column, index) => (
              <th
                key={index}
                className="border border-gray-200 px-4 py-2 text-left"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bonusPoints.map((week, weekIndex) => (
            <tr key={weekIndex} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">
                Week {week.week}
              </td>
              {columns.map((column, colIndex) => {
                let dbColumn = "";
                if (colIndex === 0) {
                  dbColumn = "perfect_week";
                } else if (colIndex === 1) {
                  dbColumn = "most_steps";
                } else if (colIndex === 2) {
                  dbColumn = "longest_plank";
                }
                return (
                  <td
                    key={colIndex}
                    className="border border-gray-200 px-4 py-2"
                  >
                    <Select
                      defaultValue={bonusPoints[weekIndex][dbColumn]}
                      isMulti
                      name="colors"
                      options={userOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(element) => {
                        updateBonusPoints(weekIndex, colIndex, element);
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-center mx-8 p-4">
        {isDisabled ? null : (
          <div className="flex self-center mr-8 text-xl text-red-500">
            Unsaved changes, please submit
          </div>
        )}
        <button
          disabled={isDisabled}
          onClick={() => handleSaveBonusPoints()}
          className={`w-32 py-2 self-center text-white ${
            isDisabled ? "bg-gray-600" : "bg-blue-600"
          } rounded-md hover:${
            isDisabled ? "bg-gray-700" : "bg-blue-700"
          } focus:outline-none focus:ring focus:ring-blue-300 transition duration-200`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Bonus;
