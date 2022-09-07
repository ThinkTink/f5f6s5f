const fs = require("fs");
const simpleGit = require("simple-git");

const watch = () => {
  const git = simpleGit();

  fs.watch("./src", async (eventType: string, fileName: string) => {
    console.log(`File Changed, ${eventType}, ${fileName}`);
    await git.add(`src/${fileName}`);
    await git.commit(`[hatchways-commit ${(new Date()).toDateString()}] - ${eventType} src/${fileName}`);
    await git.push("origin");
  });
};

export default watch;