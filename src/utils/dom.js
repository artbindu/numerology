const getElement = function (selector, root = document) {
  return root.querySelector(selector);
};

const getAllElements = function (selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
};

module.exports = {
  getElement,
  getAllElements
};