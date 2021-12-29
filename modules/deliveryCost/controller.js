const { findOffer } = require("../offer/offers");

const calculateDeliveryCost = ({ basePrice, distance, weight }) => {
    return basePrice + (distance * 5) + (weight * 10);
}

const calculateDiscount = discountPercentage => price => (discountPercentage / 100 * price);

const isOfferApplicable = (offer, distance, weight) => {
    const { weightRangeInKgs, distanceRangeInKMs } = offer;
    const [minDistance = 0, maxDistance] = distanceRangeInKMs;
    const [minWeight = 0, maxWeight] = weightRangeInKgs;
    if (!(distance >= minDistance && distance <= maxDistance)) return false;
    if (!(weight >= minWeight && weight <= maxWeight)) return false;
    return true;
}

const getFinalCostDetails = ({ basePrice, distance, weight, offerCode }) => {
    const deliveryCostBeforeDiscount = calculateDeliveryCost({ basePrice, distance, weight });
    const offer = findOffer(offerCode);
    const offerApplicable = (offer && isOfferApplicable(offer, distance, weight)) || false;
    const discount = (offerApplicable && calculateDiscount(offer.discountPercentage)(deliveryCostBeforeDiscount)) || 0;
    const finalCost = deliveryCostBeforeDiscount - discount;

    return {
        deliveryCostBeforeDiscount,
        discount,
        offerApplicable,
        deliveryCostAfterDiscount: finalCost
    };
}

module.exports = getFinalCostDetails