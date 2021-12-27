const getFinalCostDetails = require("../deliveryCost/controller");

const calculateTime = (distance, speed) => distance / speed;

const filterCallbackFn = maxSum => packagesArr => calculatePackagesWeight(packagesArr) <= maxSum;
const filterPackagesByMaxCarriableWeight = (arr, maxSum) => arr.filter(filterCallbackFn(maxSum))

const getSubArrays = (arr) => {
    if (arr.length === 1) return [arr];
    else {
        subArr = getSubArrays(arr.slice(1));
        return subArr.concat(subArr.map(e => e.concat(arr[0])), [[arr[0]]]);
    }
};

const calculatePackagesWeight = packages => packages.reduce((sum, package) => package.weight + sum, 0);
const sortByDeliveryTime = arr => arr.sort((a, b) => b.distance - a.distance);

const getBatchForDelivery = (packages, max_carriable_weight) => {
    const allPossibleBatches = getSubArrays(packages);
    const batchesWithMaxCarriableWeight = filterPackagesByMaxCarriableWeight(allPossibleBatches, max_carriable_weight);
    const maxBatchSize = Math.max(...batchesWithMaxCarriableWeight.map(batches => batches.length));
    const batchesWithMaxPackages = batchesWithMaxCarriableWeight.filter(batches => batches.length === maxBatchSize);
    const { selectedBatch } = batchesWithMaxPackages.reduce((output, batch) => {
        const sum = calculatePackagesWeight(batch);
        if (sum > output.maxSum) {
            output.selectedBatch = batch
            output.maxSum = sum;
        };
        return output
    }, { maxSum: -1, selectedBatch: null });

    return packages.reduce((output, package) => {
        if (selectedBatch.find(selectedPackage => package.pkg_id === selectedPackage.pkg_id)) {
            output.selected.push(package);
        } else {
            output.pending.push(package);
        }
        return output;
    }, { selected: [], pending: [] });
}

const calculateDeliveryTime = ({ basePrice, packages, no_of_vehicles, max_speed, max_carriable_weight }) => {

    const obj = {
        packages,
        currentTime: 0,
        vehicles: {},
        vehiclesAvailability: new Array(no_of_vehicles).fill(0),
        delivered: []
    }

    while (obj.packages.length !== 0) {

        while (obj.vehiclesAvailability.indexOf(0) != -1) {
            const index = obj.vehiclesAvailability.indexOf(0);
            const { selected, pending } = getBatchForDelivery(obj.packages, max_carriable_weight);
            selected.forEach(selectedPackage => {
                selectedPackage.discount = getFinalCostDetails({ basePrice, distance: selectedPackage.distance, weight: selectedPackage.weight, offerCode: selectedPackage.offerCode }).discount;
                selectedPackage.deliveryTime = obj.currentTime + calculateTime(selectedPackage.distance, max_speed);
                obj.delivered.push(selectedPackage);
            });
            const [longerDistancePackage,] = sortByDeliveryTime(selected);
            const roundTripTime = 2 * longerDistancePackage.deliveryTime;
            obj.vehiclesAvailability[index] = roundTripTime;
            obj.packages = pending;
        }

        const smallerTravelTime = Math.min(...obj.vehiclesAvailability);
        obj.currentTime = obj.currentTime + smallerTravelTime;
        obj.vehiclesAvailability[obj.vehiclesAvailability.indexOf(smallerTravelTime)] = 0;
    }

    return obj;
}

module.exports = {
    calculateDeliveryTime
}