const { questions } = require('./questions');
const { promptQuestions } = require('../../promptQuestion')
const { offers, addOffer } = require('./offers')

const init = async () => {
    const { offer, addOfferQues } = questions;
    const response = await promptQuestions({ questions: [offer] });
    let output = [];
    switch (response.offer) {
        case 'list': {
            output = offers;
            break;
        }
        case 'add': {
            const { minDistance, maxDistance, minWeight, maxWeight, ...otherFields } = await promptQuestions({ questions: addOfferQues });
            output = { ...otherFields, weightRangeInKgs: [minWeight, maxWeight], distanceRangeInKMs: [minDistance, maxDistance] };
            addOffer(output);
        }
    }
    console.table(offers);
    return output;
}


module.exports = {
    init
}