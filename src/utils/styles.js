/**
 * Common reusable style classes across the application
 */

// Input styling
export const INPUT_STYLE = "w-full p-md bg-bg-secondary border-none text-content-primary text-base outline-none box-border placeholder:text-content-tertiary";

// Results container styling
export const RESULTS_CONTAINER = "max-h-[400px] overflow-y-auto scrollbar scrollbar-track scrollbar-thumb scrollbar-rounded";

// Status message styling (loading, error, empty)
export const STATUS_MESSAGE = "p-md text-center";
export const LOADING_MESSAGE = `${STATUS_MESSAGE} text-content-secondary bg-bg-primary`;
export const ERROR_MESSAGE = `${STATUS_MESSAGE} text-feedback-error bg-bg-primary`;

// Error notification styling
export const ERROR_NOTIFICATION = "bg-feedback-errorBg text-content-primary p-sm mx-md my-xs rounded-md flex justify-between items-center text-xs";
export const ERROR_CLOSE_BUTTON = "bg-transparent border-none text-content-primary cursor-pointer text-base ml-sm py-0 px-xs"; 