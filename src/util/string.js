export const getDecimalRatingValue = (rating) => {
    return Number(rating) / 10;
};

export const setFixedNumberOfDecimals = (data, numberOfDecimals = 1) => {
    if (!data) {
        return null;
    }

    return Number(data).toFixed(numberOfDecimals);
};

export const extractYearFromReleaseDate = (date) => {
    if (!date) {
        return null;
    }

    return date.split('-')[0];
};

export const extractMonthFromReleaseDate = (date) => {
    if (!date) {
        return null;
    }

    return date.split('-')[1];
};

export const extractDayFromReleaseDate = (date) => {
    if (!date) {
        return null;
    }

    return date.split('-')[2];
};

export const sortObjectsByProperty = (property) => {
    return function(a, b) {
        if (a[property] > b[property]) {
            return -1;
        } else if (a[property] < b[property]) {
            return 1;
        }
        return 0;
    };
};

export const formatPrice = (price, currency = 'USD') => {
    if (!price) {
        return null;
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    });

    return formatter.format(price);
};

const getTextMonth = (month) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return months[month - 1];
};

export const getStyledDate = (date) => {
    if (!date) {
        return null;
    }

    const day = extractDayFromReleaseDate(date);
    const month = extractMonthFromReleaseDate(date);
    const year = extractYearFromReleaseDate(date);
    const textMonth = getTextMonth(month);

    return `${textMonth} ${day}, ${year}`;
};

export const splitCamelCase = (data) => {
    return data.split(/(?=[A-Z])/).join(' ');
};