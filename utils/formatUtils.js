// utils/formatUtils.js
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`; // Formats date as 'MM/DD'
};

export const formatPriceHistory = (priceHistory) => {
    // Assuming priceHistory is an array of objects with 'price' and 'date'
    return priceHistory.map(entry =>
        `$${entry.price} on ${formatDate(entry.date)}`
    ).join('\n');
};
