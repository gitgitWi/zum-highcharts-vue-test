/** @type {import("vls").VeturConfig} */
const veturConfig = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    // "vetur.experimental.templateInterpolationService": true,
  },
  projects: ["./client"],
};

module.exports = veturConfig;
