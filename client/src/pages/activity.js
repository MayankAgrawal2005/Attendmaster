// utils/activity.js
export const addActivity = (message) => {
  const newActivity = {
    message,
    time: new Date().toLocaleString(),
  };

  const prev = JSON.parse(localStorage.getItem("activities")) || [];

  const updated = [newActivity, ...prev];

  localStorage.setItem("activities", JSON.stringify(updated));
};