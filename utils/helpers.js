module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  },
  get_date: () => {
    let date = new Date();
    return date.setDate(date.getDate() + 1);
  },
};
