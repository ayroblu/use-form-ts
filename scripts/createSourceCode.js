const fs = require("fs");

const files = [
  {
    filePath: "src/components/forms/ExampleForm.tsx",
    variable: "exampleForm",
  },
  {
    filePath: "src/components/forms/DeclarativeForm.tsx",
    variable: "declarativeForm",
  },
  {
    filePath: "src/components/forms/MaterialForm.tsx",
    variable: "materialForm",
  },
];

files.forEach(({ filePath, variable }) => {
  const file = fs.readFileSync(filePath, "utf-8");
  const updatedFile = file.replace(/`/g, "\\`").replace(/\${/g, "\\${");
  const newPath = filePath.replace(/(\.tsx?)$/, ".txt.ts");
  const newFile = `export const ${variable} = \`${updatedFile}\``;
  fs.writeFileSync(newPath, newFile);
  console.log(`${filePath}: done! Written to ${newPath}`);
});
