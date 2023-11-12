export const formatToRubles = (value) => {
    const options = {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
    };

    return value.toLocaleString('ru-RU', options);
};
export const parseFromRubles = (inputValue) => {
    const cleanValue = inputValue.replace(/\D/g, '');
    return parseFloat(cleanValue);
};
