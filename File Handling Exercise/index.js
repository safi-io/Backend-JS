import fs from "fs/promises";
import fsn from "fs";
import path from "path";

const basePath = "D:\\GIthub Repo's\\Backend-JS\\File Handling Exercise";

let files = await fs.readdir(basePath); //  Getting All Files

for (const file of files) {
  let extension = file.split(".")[1]; // Getting Extension of a specific file
  if (extension != "json" && extension != "js" && file.split(".".length > 1)) {
    if (fsn.existsSync(path.join(basePath, extension))) {
      // Move files to the respected folder
      fs.rename(
        path.join(basePath, file),
        path.join(basePath, extension, file)
      );
    } else {
        fs.mkdir(extension); // Make Directory If not exists
        fs.rename(
          path.join(basePath, file),
          path.join(basePath, extension, file)
        );
    }
  }
}
