const calculateTime = (distance, speed) => distance / speed;

const getSubArrays = (arr) => {
    if (arr.length === 1) return [arr];
    else {
        subArr = getSubArrays(arr.slice(1));
        return subArr.concat(subArr.map(e => e.concat(arr[0])), [[arr[0]]]);
    }
};

const getBatchWeight = packages => packages.reduce((sum, package) => package.weight + sum, 0);

const sortByDeliveryTime = arr => arr.sort((a, b) => b.distance - a.distance);

const getBatchForDelivery = (packages, max_carriable_weight) => {

    const allPossibleBatches = getSubArrays(packages);

    return allPossibleBatches.reduce((selectedBatch, batch) => {
        if (batch.length < selectedBatch.length) return selectedBatch;
        const batchWeight = getBatchWeight(batch);
        if (batchWeight > max_carriable_weight) return selectedBatch;
        const selectedBatchWeight = getBatchWeight(selectedBatch);
        if (batchWeight < selectedBatchWeight) return selectedBatch;
        selectedBatch = batch;
        return selectedBatch;
    }, []);
}

const calculateDeliveryTime = ({ basePrice, packages, no_of_vehicles, max_speed, max_carriable_weight }) => {

    const output = {
        waitingToBeDelivered: packages.filter(package => package.weight < max_carriable_weight),
        vehiclesAvailability: new Array(no_of_vehicles).fill(0),
        delivered: [],
        vehiclesNextAvailableAt: new Array(no_of_vehicles).fill(0)
    }

    while (output.waitingToBeDelivered.length !== 0) {

        while (output.vehiclesAvailability.indexOf(0) != -1 && output.waitingToBeDelivered.length) {
            const index = output.vehiclesAvailability.indexOf(0);
            const selectedBatch = getBatchForDelivery([...output.waitingToBeDelivered], max_carriable_weight);
            selectedBatch.forEach(selectedPackage => {
                const deliveryTime = output.vehiclesNextAvailableAt[index] + calculateTime(selectedPackage.distance, max_speed);
                selectedPackage.deliveryTime = deliveryTime.toFixed(2);
                output.delivered.push(selectedPackage);
                output.waitingToBeDelivered.splice(output.waitingToBeDelivered.findIndex(package => package.pkg_id === selectedPackage.pkg_id), 1);
            });

            const [longerDistancePackage, ...otherPackages] = sortByDeliveryTime(selectedBatch);
            const roundTripTime = longerDistancePackage && (2 * longerDistancePackage.deliveryTime);
            output.vehiclesNextAvailableAt[index] = roundTripTime;
            output.vehiclesAvailability[index] = roundTripTime || 0;
        }

        const smallerTravelTime = Math.min(...output.vehiclesAvailability);
        output.vehiclesAvailability[output.vehiclesAvailability.indexOf(smallerTravelTime)] = 0;
    }

    return output;
}

module.exports = {
    calculateDeliveryTime
}