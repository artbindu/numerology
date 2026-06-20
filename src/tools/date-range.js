const generateDateRange = function (start, end) {
    const result = [];
    const current = new Date(start.getTime());

    while (current <= end) {
        result.push(new Date(current.getTime()));
        current.setDate(current.getDate() + 1);
    }

    return result;
};

module.exports = {
    generateDateRange
};
