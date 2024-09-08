const format_date = (date) => {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  } else if (typeof date === "string" || typeof date === "number") {
    return new Date(date).toLocaleDateString();
  } else {
    return "Invalid Date";
  }
};

module.exports = { format_date };
