const offers = [
    {
        title: 'OFR001',
        discountPercentage: 10,
        weightRangeInKgs: [70, 200],
        distanceRangeInKMs: [0, 200],
        description: 'Flat 10% Discount'
    },
    {
        title: 'OFR002',
        discountPercentage: 7,
        weightRangeInKgs: [100, 250],
        distanceRangeInKMs: [50, 150],
        description: 'Flat 7% Discount'
    },
    {
        title: 'OFR003',
        discountPercentage: 5,
        weightRangeInKgs: [10, 150],
        distanceRangeInKMs: [50, 250],
        description: 'Flat 5% Discount'
    },
    {
        title: 'N/A',
        discountPercentage: 0,
        weightRangeInKgs: [-1, -1],
        distanceRangeInKMs: [-1, -1],
        description: 'N/A'
    }
];

const addOffer = offer => offers.push(offer);

const getOffersList = () => offers.map(offer => {
    const { title, description } = offer;
    return { title, description, value: title };
});

const findOffer = (offerCode) => typeof offerCode === 'string' && offers.find(offer => offer.title.toLowerCase() === offerCode.toLowerCase());

module.exports = { getOffersList, findOffer, addOffer, offers };