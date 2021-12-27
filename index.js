const { questions } = require('./baseQuestions');
const { promptQuestions } = require('./promptQuestion');
const chalk = require('chalk');

const main = async () => {

    console.log(chalk.yellowBright(`Welcome to Ravinder's Package Delivery Command Line Application.`))
    console.log(chalk.cyan(``))

    const onSubmit = async (prompt, answer) => {
        try {
            const module = require(`./modules/${answer}`);
            await module.init();
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    await promptQuestions({ questions, onSubmit });
}

main().catch(console.error);