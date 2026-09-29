const fs = require("fs");
const path = require("path");

const workspacePython = path.resolve(
  __dirname,
  "../../.venv",
  process.platform === "win32" ? "Scripts/python.exe" : "bin/python"
);

function getPythonExecutable() {
  if (process.env.PYTHON_EXECUTABLE) {
    return process.env.PYTHON_EXECUTABLE;
  }

  if (fs.existsSync(workspacePython)) {
    return workspacePython;
  }

  return process.platform === "win32" ? "python" : "python3";
}

module.exports = getPythonExecutable;