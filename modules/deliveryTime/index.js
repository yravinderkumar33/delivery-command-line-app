const { promptQuestions } = require("../../promptQuestion");
const { calculateDeliveryTime } = require("./controller");
const { questions } = require('./questions');

const init = async () => {
    const { base_delivery_cost, no_of_packages, no_of_vehicles, max_speed, max_carriable_weight, ...otherQuestions } = questions;
    const packages = [];
    const baseResponse = await promptQuestions({ questions: [base_delivery_cost, no_of_packages] });

    for (let index = 0; index < baseResponse.no_of_packages; index++) {
        const packageResponse = await promptQuestions({ questions: Object.values(otherQuestions) });
        packages.push(packageResponse);
    }

    const vehicleResponse = await promptQuestions({ questions: [no_of_vehicles, max_carriable_weight, max_speed] });
    const result = calculateDeliveryTime({ packages, no_of_vehicles: vehicleResponse.no_of_vehicles, max_speed: vehicleResponse.max_speed, max_carriable_weight: vehicleResponse.max_carriable_weight });
    console.table(result.delivered);
}


module.exports = {
    init
}