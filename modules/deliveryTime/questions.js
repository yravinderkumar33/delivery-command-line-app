const { getOffersList } = require("../../offers")

const questions = {
    "base_delivery_cost": {
        type: 'number',
        name: 'base_delivery_cost',
        message: 'Base Delivery Cost ?',
        validate: value => value > 0 ? true : 'Invalid Input'
    },
    "no_of_packages": {
        type: 'number',
        name: 'no_of_packages',
        message: 'Number of packages ?',
        validate: value => value > 0 ? true : 'Invalid Input'
    },
    "pkg_id": {
        type: 'text',
        name: 'pkg_id',
        message: 'Package Id ?'
    },
    "weight": {
        type: 'number',
        name: 'weight',
        message: 'Weight in Kgs ?',
        validate: value => value > 0 ? true : 'Invalid Input'
    },
    "distance": {
        type: 'number',
        name: 'distance',
        message: 'Distance in Kms ?',
        validate: value => value > 0 ? true : 'Invalid Input'
    },
    "offerCode": {
        type: 'select',
        name: 'offerCode',
        message: 'Select offer from the list',
        choices: getOffersList(),
        initial: 0
    },
    "no_of_vehicles": {
        type: 'number',
        name: 'no_of_vehicles',
        message: 'Number of Vehicles ?',
        validate: value => value > 0 ? true : 'Invalid Input'
    },
    "max_speed": {
        type: 'number',
        name: 'max_speed',
        message: 'Max Speed ?',
        validate: value => value > 0 ? true : 'Invalid Input'
    },
    "max_carriable_weight": {
        type: 'number',
        name: 'max_carriable_weight',
        message: 'Maximum Carriable Weight ?',
        validate: value => value > 0 ? true : 'Invalid Input'
    }
}

module.exports = {
    questions
}