import type React from "react";

// -------------------- Types --------------------
type IndicatorPanelProps = {
  totalTasks: number;
}

type TextIndicatorProps = {
    textIndicator: string,
    totalItems: number,
    iconIndicator: string,
}

type RadialIndicatorProps = {
    textIndicator: string,
    totalTasks: number,
    completedTasks: number,
}
// -------------------- Main Panel Component --------------------
export function IndicatorPanels({totalTasks}: IndicatorPanelProps){
    return (
        <section className="flex items-center flex-wrap justify-center p-6 gap-8 rounded-lg w-full mx-auto">
          <RadialIndicator textIndicator="Tasks Completed" totalTasks={totalTasks} completedTasks={totalTasks}/>
          <TextIndicator textIndicator="Reminder" totalItems={3} iconIndicator="fa-solid fa-clock"/>
          <TextIndicator textIndicator="Archived Tasks" totalItems={3} iconIndicator="fa-solid fa-archive"/>
        </section>
    );
}

// -------------------- Card Wrapper Component --------------------
function IndicatorCard({children}: {children: React.ReactNode}){
  return(
    <div className="flex flex-col flex-1 items-center justify-center bg-amber-100 rounded-2xl shadow-md 
    w-44 h-44 xsm:p-8 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60">
      {children}
    </div>
  )
}

// -------------------- Text Indicator Component --------------------
function TextIndicator({textIndicator, totalItems, iconIndicator}: TextIndicatorProps){
    return(
      <IndicatorCard>
        <div className="relative flex items-center justify-center bg-white xsm:p-4 md:p-6 lg:p-8  rounded-full">
          <i className={`${iconIndicator} sm:text-xl md:text-2xl lg:text-3xl`} aria-hidden:true></i>
        </div>

        <h2 className="mt-4 mb-2 text-center text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800">
          {textIndicator}
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-orange font-bold">
          {totalItems}
        </p>
      </IndicatorCard>
    );
}

// -------------------- Radial Indicator Component --------------------
export function RadialIndicator({textIndicator, totalTasks, completedTasks}:RadialIndicatorProps) {
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0; //Safeguard in case totaltask equals 0

  // Circle math
  const radius = 45;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <IndicatorCard>
      {/* Radial Progress (SVG) */}
      <div className="relative flex items-center justify-center">
        <svg
          className="rotate-[-90deg] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
          viewBox="0 0 100 100"
        >
          {/* Background Circle */}
          <circle
            className="text-gray-300"
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          {/* Progress Circle */}
          <circle
            className="text-orange"
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        {/* Text inside circle */}
        <span className="absolute text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black">
          {completedTasks}/{totalTasks}
        </span>
      </div>

      {/* Labels */}
      <h2 className="m-2 text-sm text-center sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800">
        {textIndicator}
      </h2>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
        {percentage}%
      </p>
    </IndicatorCard>
  );
}