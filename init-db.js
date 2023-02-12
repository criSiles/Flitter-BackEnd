// Initialize the database with the minimum data to work

const readline = require("readline");

// Upload the model
const Fleet = require("./models/Fleet");
const User = require("./models/User");

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

  // Initialize the collection
  await initData();

  // Disconnect to the database
  connection.close();
}

main().catch((err) => console.log("There was an error", err));

async function initData() {
  // Delete all the documents of the previous collection
  const result = await Fleet.deleteMany();
  const result2 = await User.deleteMany();
  console.log(`Deleted ${result.deletedCount} fleets.`);
  console.log(`Deleted ${result2.deletedCount} users.`);

  // Open a JSON file with the initial data
  const fleets = require("./fleets.json");
  const users = require("./users.json");

  // Create initial data
  const inserted = await Fleet.insertMany(fleets);
  const inserted2 = await User.insertMany(users);

  console.log(`Created ${inserted.length} fleets.`);
  console.log(`Created ${inserted2.length} users.`);
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
