const prompts = require('prompts');

module.exports.promptQuestions = ({ questions, onCancel, onSubmit }) => prompts(questions, { onCancel, onSubmit });