import React, { useState } from "react";
import Select from "react-select";

const Contender = () => {
  const [positiveOptions] = useState([
    { label: "Workout Completed", value: "Workout Completed - (10 points)" },
    { label: "Extra Workout", value: "Extra Workout - (5 points)" },
    {
      label: "Steps Goal Met (10,000 steps)",
      value: "Steps Goal Met (10,000 steps) - (10 points)",
    },
    {
      label: "Beating a Personal Best",
      value: "Beating a Personal Best - (15 points)",
    },
    { label: "Skipping Junk Food", value: "Skipping Junk Food - (5 points)" },
    {
      label: "Hydration Goal Met (2L Water)",
      value: "Hydration Goal Met (2L Water) - (5 points)",
    },
  ]);

  const [selectedPositveOption, setSelectedPositveOption] = useState(null);
  const [negativeOptions] = useState([
    { label: "Missed Workout", value: "Missed Workout - (-5 points)" },
    { label: "Too Much Junk Food", value: "Too Much Junk Food - (-5 points)" },
    {
      label: "Skipping Hydration Goal",
      value: "Skipping Hydration Goal - (-5 points)",
    },
  ]);

  const [selectedNegatveOption, setSelectedNegatveOption] = useState(null);
  console.log("selectedPositveOption", selectedPositveOption);
  console.log("selectedNegatveOption", selectedNegatveOption);
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
            isMulti
            name="colors"
            options={positiveOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setSelectedPositveOption}
          />
        </div>
        <div className="text-6xl self-center">-</div>
        <div className="flex flex-col mx-8 p-4 rounded-xl border-4 border-red-500 w-1/3">
          <div className="mb-4">Negatives</div>
          <Select
            isMulti
            name="colors"
            options={negativeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={setSelectedNegatveOption}
          />
        </div>
        <div className="text-6xl self-center">=</div>
        <div className="flex flex-col mx-8 p-4 rounded-xl border-4 border-blue-500 w-1/3">
          <div className="mb-4">Total</div>
        </div>
      </div>
    </div>
  );
};

export default Contender;
