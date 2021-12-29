const questions = {
    "offer": {
        type: 'select',
        name: 'offer',
        message: 'Select an option',
        hint: 'Use up/down to navigate. Use tab to cycle the List.',
        choices: [
            { title: 'List all Offers', description: 'List Offers', value: 'list' },
            { title: 'Add New Offer', description: 'Add new Offer', value: 'add' },
        ],
        initial: 0
    },
    "addOfferQues": [
        {
            type: 'text',
            name: 'title',
            message: 'Offer Code ?'
        },
        {
            type: 'text',
            name: 'description',
            message: 'Description ?'
        },
        {
            type: 'number',
            name: 'discountPercentage',
            message: 'Discount Percentage ?'
        },
        {
            type: 'number',
            name: 'minWeight',
            message: 'Minimum Weight ?'
        },
        {
            type: 'number',
            name: 'maxWeight',
            message: 'Maximum Weight ?'
        },
        {
            type: 'number',
            name: 'minDistance',
            message: 'Min Distance ?'
        },
        {
            type: 'number',
            name: 'maxDistance',
            message: 'Max Distance ?'
        }
    ]
}

module.exports = { questions }