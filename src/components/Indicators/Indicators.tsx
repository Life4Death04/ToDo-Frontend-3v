import type React from "react";

// -------------------- Types --------------------
type IndicatorPanelProps = {
  totalTasks: number;
  completedTasks: number;
  archivedTasks: number;
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
/**
 * IndicatorPanels component for displaying task indicators
 * @param {number} totalTasks - Total number of tasks
 * @param {number} completedTasks - Number of completed tasks
 * @returns JSX.Element
 */
/**
 * IndicatorPanels
 * Panel with multiple indicators (radial + text cards) showing task metrics.
 * @param {number} totalTasks - total tasks in the current view
 * @param {number} completedTasks - number of tasks completed
 */
export function IndicatorPanels({totalTasks, completedTasks, archivedTasks}: IndicatorPanelProps){
    return (
        <section className="flex items-center flex-wrap justify-center gap-8 rounded-lg w-full mx-auto xsm:mb-3 xsm:gap-3 md:mb-6 md:gap-6">
          <RadialIndicator textIndicator="Tasks Completed" totalTasks={totalTasks} completedTasks={completedTasks}/>
          <TextIndicator textIndicator="Reminder" totalItems={3} iconIndicator="fa-solid fa-clock"/>
          <TextIndicator textIndicator="Archived Tasks" totalItems={archivedTasks} iconIndicator="fa-solid fa-archive"/>
        </section>
    );
}

// -------------------- Card Wrapper Component --------------------
/**
 * IndicatorCard component for wrapping indicator content
 * @param {React.ReactNode} children - The content to display inside the card
 * @returns JSX.Element
 */
/**
 * IndicatorCard
 * Small visual card wrapper used by indicators for consistent styling.
 */
function IndicatorCard({children}: {children: React.ReactNode}){
  return(
    <div className="flex flex-col flex-1 items-center justify-center bg-white rounded-2xl 
    w-44 h-44 xsm:p-8 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60">
      {children}
    </div>
  )
}

// -------------------- Text Indicator Component --------------------
/**
 * TextIndicator component for displaying a text-based task indicator
 * @param {string} textIndicator - The text to display for the indicator
 * @param {number} totalItems - The total number of items for the indicator
 * @param {string} iconIndicator - The icon class for the indicator
 * @returns JSX.Element
 */
/**
 * TextIndicator
 * Small card that shows a text label, an icon and a number.
 */
function TextIndicator({textIndicator, totalItems, iconIndicator}: TextIndicatorProps){
    return(
      <IndicatorCard>
        {/* Icon */}
        <div className="relative flex items-center justify-center bg-white xsm:p-4 md:p-6 lg:p-8 rounded-full">
          <i className={`${iconIndicator} sm:text-xl md:text-2xl lg:text-3xl text-gray-600 bg-gray-200 p-4 rounded-full`} aria-hidden={true}></i>
        </div>

        {/* Label */}
        <h2 className="text-center text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-600">
          {textIndicator}
        </h2>

        {/* Value */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-orange font-bold">
          {totalItems}
        </p>
      </IndicatorCard>
    );
}

// -------------------- Radial Indicator Component --------------------
/**
 * RadialIndicator component for displaying a radial progress indicator
 * @param {string} textIndicator - The text to display for the indicator
 * @param {number} totalTasks - The total number of tasks for the indicator
 * @param {number} completedTasks - The number of completed tasks for the indicator
 * @returns JSX.Element
 */
/**
 * RadialIndicator
 * Circular progress indicator showing percentage of completed tasks.
 */
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
      <h2 className="m-2 text-sm text-center sm:text-base md:text-lg lg:text-xl font-semibold text-gray-600">
        {textIndicator} 
      </h2>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
        {percentage}%
      </p>
    </IndicatorCard>
  );
}