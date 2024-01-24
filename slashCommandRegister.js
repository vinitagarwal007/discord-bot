const { REST, Routes } = require("discord.js");

const rest = new REST().setToken(process.env.CLIENT_TOKEN);
const slashRegister = async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.APP_ID,
        process.env.SERVER_ID
      ),
      {
        body: [
          {
            name: "ping",
            description: "Ping the server",
          },
          {
            name: "assign",
            description: "Assign Roles",
            options: [
              {
                name: "identity",
                description: "Enter Your KIIT Roll Number",
                type: 3,
                required: true,
              },
            ],
          },
        ],
      }
    );
  } catch (err) {
    console.error(err);
  }
};
module.exports = slashRegister;
