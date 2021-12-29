const questions = [
    {
        type: 'select',
        name: 'baseQuestions',
        message: 'Select an option',
        hint: 'Use up/down to navigate. Use tab to cycle the List.',
        choices: [
            { title: 'Calculate Delivery Cost', description: 'Estimate the total delivery cost of each package with an offer code (if applicable)', value: 'deliveryCost' },
            { title: 'Calculate Delivery Time', description: 'Estimate Delivery time for each package by maximizing no. of packages in each shipment', value: 'deliveryTime' },
            { title: 'Offers Section', description: 'Perform Offer Related queries', value: 'offer'}
        ],
        initial: 0
    }
]

module.exports = { questions }