const getFinalCostDetails = require("../modules/deliveryCost/controller");
const { getOffersList, offers } = require("../modules/offer/offers");

describe('Delivery App', () => {
    test('should calculate the delivery cost', () => {
        const result = getFinalCostDetails({
            basePrice: 100,
            distance: 5,
            weight: 5,
            offerCode: 'getFinalCostDetails'
        });

        expect(result).toBeDefined();
        expect(result).toStrictEqual(
            {
                deliveryCostBeforeDiscount: 175,
                discount: 0,
                offerApplicable: false,
                deliveryCostAfterDiscount: 175
            }
        );
    });

    test('should list offers', () => {
        const offersResult = getOffersList();
        expect(offersResult).toBeDefined();
        expect(offersResult.length).toBe(4);
    });
})

