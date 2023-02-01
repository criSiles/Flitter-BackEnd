// Initialize the database with the minimum data to work

const readline = require("readline");

// Upload the model
const User = require("./models/User");

async function main() {
  // Ask the user if is sure
  const carryOn = await askingYN(
    "Are you sure to want to delete the database? [yes/no] \n"
  );
  if (!carryOn) {
    console.log("Cancelling");
    process.exit();
  }

  console.log("Conect to the database");
  const connection = require("./lib/connectMongoose");

  // Initialize the advertisements collection
  await initUSer();

  // Disconnect to the database
  connection.close();
}

main().catch((err) => console.log("There was an error", err));

async function initUSer() {
  // Delete all the documents of the previous user collection
  const result = await User.deleteMany();
  console.log(`Deleted ${result.deletedCount} user.`);

  // Open a JSON file with the user
  const user = require("./user.json");

  // Create initial user
  const inserted = await User.insertMany(user);

  console.log(`Created ${inserted.length} user.`);
}

function askingYN(text) {
  return new Promise((resolve) => {
    const interfaceYN = readline.createInterfaceYN({
      input: process.stdin,
      output: process.stdout,
    });
    interfaceYN.question(text, (myResponse) => {
      interfaceYN.close();
      if (myResponse.toLowerCase() === "yes") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
