export const formatPrice = (value: number): string => {
  if (value >= 10000000) {
    const cr = (value / 10000000).toFixed(1).replace(/\.0$/, "");
    return `₹${cr}Cr`;
  }
  if (value >= 100000) {
    const l = (value / 100000).toFixed(1).replace(/\.0$/, "");
    return `₹${l}L`;
  }
  return `₹${value.toLocaleString()}`;
};

export function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning 👋";
  if (hour < 18) return "Good Afternoon 👋";
  return "Good Evening 👋";
}