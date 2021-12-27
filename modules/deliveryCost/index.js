const { promptQuestions } = require('../../promptQuestion');
const getFinalCostDetails = require('./controller');
const { questions } = require('./questions');
const chalk = require('chalk');

const init = async () => {
    const { base_delivery_cost, no_of_packages, ...otherQuestions } = questions;
    const rootPromptAnswers = await promptQuestions({ questions: [base_delivery_cost, no_of_packages] });
    let output = { base_delivery_cost: rootPromptAnswers.base_delivery_cost, no_of_packages: rootPromptAnswers.no_of_packages, packages: [] };

    for (let index = 0; index < rootPromptAnswers.no_of_packages; index++) {
        const packagePromptAnswers = await promptQuestions({ questions: Object.values(otherQuestions) });
        const finalCostDetails = getFinalCostDetails({ basePrice: rootPromptAnswers.base_delivery_cost, distance: packagePromptAnswers.distance, offerCode: packagePromptAnswers.offerCode, weight: packagePromptAnswers.weight });
        output.packages.push({ package_id: packagePromptAnswers.pkg_id, ...finalCostDetails });
        console.log(chalk.yellow('---------------'));
    }

    console.log(chalk.yellow(`Base Delivery Cost - ${output.base_delivery_cost}`));
    console.log(chalk.yellow(`Package Details are as follows :-`));
    console.table(output.packages);
    return output;
}

module.exports = { init }