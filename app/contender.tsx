import React, { useState, useEffect } from "react";
import Select from "react-select";

interface Props {
  userDailyTotal: number;
  selectedPositiveOption: any;
  setSelectedPositiveOption: any;
  positiveOptions: any;
  selectedNegativeOption: any;
  setSelectedNegativeOption: any;
  negativeOptions: any;
  handleSubmit: any;
  currentLog: any;
}
const Contender = ({
  userDailyTotal,
  selectedPositiveOption,
  setSelectedPositiveOption,
  positiveOptions,
  selectedNegativeOption,
  setSelectedNegativeOption,
  negativeOptions,
  handleSubmit,
  currentLog,
}: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(
      !(
        JSON.stringify(currentLog?.positives) !==
          JSON.stringify(
            selectedPositiveOption?.length ? selectedPositiveOption : null
          ) ||
        JSON.stringify(currentLog?.negatives) !==
          JSON.stringify(
            selectedNegativeOption?.length ? selectedNegativeOption : null
          ) ||
        currentLog.total !== userDailyTotal
      )
    );
  }, [
    currentLog,
    selectedPositiveOption,
    selectedNegativeOption,
    userDailyTotal,
  ]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col text-6xl self-center my-16">
        <div className="self-center">
          {new Date().toLocaleDateString("en-GB")}
        </div>
        <div className="self-center">What did you do today?</div>
      </div>
      <div className="flex w-full h-1/3">
        <div className="flex flex-col mx-8 p-4 rounded-xl border-4 border-green-500 w-1/3">
          <div className="mb-4">Postives</div>
          <Select
            defaultValue={selectedPositiveOption}
            isMulti
            name="colors"
            options={positiveOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setSelectedPositiveOption}
          />
        </div>
        <div className="text-6xl self-center">-</div>
        <div className="flex flex-col mx-8 p-4 rounded-xl border-4 border-red-500 w-1/3">
          <div className="mb-4">Negatives</div>
          <Select
            defaultValue={selectedNegativeOption}
            isMulti
            name="colors"
            options={negativeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setSelectedNegativeOption}
          />
        </div>
        <div className="text-6xl self-center">=</div>
        <div className="flex flex-col mx-8 p-4 rounded-xl border-4 border-blue-500 w-1/3">
          <div className="flex self-center justify-self-center mb-4 text-4xl">
            Daily Total: {userDailyTotal}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mx-8 p-4">
        {isDisabled ? null : (
          <div className="flex self-center mr-8 text-xl text-red-500">
            Unsaved changed please submit
          </div>
        )}
        <button
          disabled={isDisabled}
          onClick={() => {
            handleSubmit(currentLog, {
              positives: selectedPositiveOption?.length
                ? selectedPositiveOption
                : null,
              negatives: selectedNegativeOption?.length
                ? selectedNegativeOption
                : null,
              total: userDailyTotal,
            });
          }}
          className={`w-32 py-2 self-center text-white ${
            isDisabled ? "bg-gray-600" : "bg-blue-600"
          } rounded-md hover:${
            isDisabled ? "bg-gray-700" : "bg-blue-700"
          } focus:outline-none focus:ring focus:ring-blue-300`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contender;
