const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    })
  })
}

const ask = async () => {
  const message = await rl.question("Enter a message > ");
  await moveCursor(0, -1);
  // clear the current line that the cursor is
  await clearLine(0);
  socket.write(message);
};

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3008 },
  async () => {
    console.log("Connected to the server!");
    ask();
  }
);

socket.on("data", async (data) => {
  await moveCursor(0, -1);
  await clearLine(0);
  console.log(data.toString("utf-8"));
  ask();
});

socket.on("end", () => {
  console.log("Connection was ended!");
});
