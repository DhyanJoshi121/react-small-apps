import { X } from "lucide-react";
import React, { useState } from "react";

type plan = {
  title: string;
  checked: boolean;
};

const PlannerScreen = () => {
  const [plans, setPlans] = useState<plan[]>([]);
  const [inputVal, setInputVal] = useState<string>("");

  const handleOnClickAdd = () => {
    if (!inputVal) return;

    setPlans((prev) => [...prev, { title: inputVal, checked: false }]);
    setInputVal("");
  };

  const handleOnClickDelete = (i: number) => {
    setPlans((prev) => prev.filter((str, index) => i !== index));
  };

  const handleOnClickChecked = (i: number) => {
    setPlans((prev) =>
      prev.map((plan, index) =>
        index === i ? { ...plan, checked: !plan.checked } : plan
      )
    );
  };

  return (
    <div className="w-auto border rounded-lg h-[60vh] mx-10 flex flex-col items-center py-2  overflow-scroll">
      <h1>Add your planes here</h1>
      <div className="mt-5 flex gap-4">
        <input
          type="text"
          placeholder="Enter your plan here"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="border p-2 w-[40vw] rounded-sm"
        />
        <button
          type="button"
          className="p-2  bg-blue-500 text-white rounded-sm"
          onClick={handleOnClickAdd}
        >
          Go!
        </button>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        {plans.map((plan, i) => (
          <div
            key={plan.title.slice(0, 10)}
            className="border flex justify-between p-2 min-w-[40vw]"
          >
            <span className={`${plan.checked ? "line-through" : ""}`}>
              {plan.title}
            </span>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={plan.checked}
                onChange={() => handleOnClickChecked(i)}
              />
              <X
                className="cursor-pointer"
                onClick={() => handleOnClickDelete(i)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlannerScreen;
