// Initialize the database with the minimum data to work

const readline = require("readline");

// Upload the model
const Fleet = require("./models/Fleet");

async function main() {
  // Ask the fleets if is sure
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
  // Delete all the documents of the previous fleets collection
  const result = await Fleet.deleteMany();
  console.log(`Deleted ${result.deletedCount} fleets.`);

  // Open a JSON file with the fleets
  const fleets = require("./fleets.json");

  // Create initial fleets
  const inserted = await Fleet.insertMany(fleets);

  console.log(`Created ${inserted.length} fleets.`);
}

function askingYN(text) {
  return new Promise((resolve) => {
    const interfaceYN = readline.createInterface({
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
