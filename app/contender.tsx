import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  selectedDate: any;
  handleDateChange: any;
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
  selectedDate,
  handleDateChange,
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
    selectedDate,
  ]);

  return (
    <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="flex flex-col text-4xl self-center my-8">
        <div className="self-center text-gray-700">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="border rounded-md p-2 mb-4"
            minDate={new Date("2025-02-10")} //challenge start date
            maxDate={new Date("2025-03-10")} //challenge start date
          />
        </div>
        <div className="self-center text-gray-800 font-semibold">
          Update your progress!!
        </div>
      </div>
      <div className="flex w-full h-1/3 justify-center">
        <div className="flex flex-col mx-4 p-4 rounded-xl border-4 border-green-500 w-1/4 shadow-lg">
          <div className="mb-2 text-lg font-semibold">Positives</div>
          <Select
            value={selectedPositiveOption}
            isMulti
            name="positives"
            options={positiveOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(options) => {
              setSelectedPositiveOption([...options]);
            }}
          />
        </div>
        <div className="flex items-center justify-center text-6xl mx-4">-</div>
        <div className="flex flex-col mx-4 p-4 rounded-xl border-4 border-red-500 w-1/4 shadow-lg">
          <div className="mb-2 text-lg font-semibold">Negatives</div>
          <Select
            value={selectedNegativeOption}
            isMulti
            name="negatives"
            options={negativeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(options) => {
              setSelectedNegativeOption([...options]);
            }}
          />
        </div>
        <div className="flex items-center justify-center text-6xl mx-4">=</div>
        <div className="flex flex-col mx-4 p-4 rounded-xl border-4 border-blue-500 w-1/4 shadow-lg">
          <div className="flex self-center justify-self-center mb-2 text-2xl font-semibold">
            Daily Total: {userDailyTotal}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mx-8 p-4">
        {isDisabled ? null : (
          <div className="flex self-center mr-8 text-xl text-red-500">
            Unsaved changes, please submit
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
          } focus:outline-none focus:ring focus:ring-blue-300 transition duration-200`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contender;
