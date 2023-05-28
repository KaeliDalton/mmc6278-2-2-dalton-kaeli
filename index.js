const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    // TODO: Pull a random quote from the quotes.txt file
    await fs.readFile(QUOTE_FILE, 'utf-8')
    .then((data) =>{
      const quoteArray = data.split("\n")
      const randomizePosition = Math.floor(Math.random() * quoteArray.length)
      const randomQuote = quoteArray[randomizePosition]
      const [quote, author] = randomQuote.split("|")
      // console log the quote and author
      // You may style the text with chalk as you wish
    console.log(chalk.cyan(quote) + " " + chalk.green(author))  
    })
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // TODO: Add the quote and author to the quotes.txt file
    // If no author is provided,
    // save the author as "Anonymous".
    
    const quoteAdded = `${quote}`
    const authorAdded = `${author || "Anonymous"}`
    const preparedEntry = `${quoteAdded}|${authorAdded} \n`
    fs.appendFile(QUOTE_FILE, preparedEntry, 'utf-8')
    // After the quote/author is saved,
    // alert the user that the quote was added.
    console.log(chalk.green('Your quote has been added!'))
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving
  });

program.parse();
