import React from "react";
import { Status } from "./StatusEnum"; // Import your enum
import "./Stepper.css"; // Import CSS for styling
import { StatusColor } from "./StatusColors";

type StepperProps = {
  status: Status;
};

const Stepper: React.FC<StepperProps> = ({ status }) => {
  // Define a mapping from statuses to the index of the item to highlight
  const statusMap: { [key in Status]: number } = {
    [Status.Accepted]: 0,
    [Status.InProgress]: 1,
    [Status.Completed]: 3,
    [Status.Pending]: 2,
  };

  // Define a mapping from index to colors
  const colorMap: { [key: number]: string } = {
    0: StatusColor('Accepted'),
    1: StatusColor('In Progress'),
    3: StatusColor('Completed'),
    2: StatusColor('Pending'),
  };

  // Get the index to highlight based on the status
  const currentStep = statusMap[status];

  return (
    <ol className="flex items-center w-full">
      {Array.from({ length: 4 }, (_, index) => (
        <li
          key={index}
          className={`flex w-full items-center ${
            index <= currentStep
              ? "text-blue-600 dark:text-blue-500 after:border-blue-100 dark:after:border-blue-800"
              : "after:border-gray-100 dark:after:border-gray-700"
          } ${
            index < 3
              ? `after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block`
              : ""
          } `}
        >
          <span
            className={`flex items-center justify-center ${
              index <= currentStep
                ? colorMap[index]
                : "bg-gray-100 dark:bg-gray-700"
            } rounded-full lg:h-12 lg:w-12 shrink-0`}
            style={{ width: "1rem", height: "1rem" }}
          ></span>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
