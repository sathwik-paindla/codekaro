const fs = require('fs');
const path = require('path');

let uuidv4; // Intial declaration

(async () => {
  const { v4 } = await import('uuid');
  uuidv4 = v4;
})();


const dirCodes = path.join(__dirname, 'codes');
//here _dirname ->....\backend
//dirCodes->...\backend\codes
//here only path is created but not directory

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
    //here directory is created
}
//format is language and content is code
const generateFile = (format, content) => {
    const jobID = uuidv4();
    console.log(jobID);
    const filename = `${jobID}.${format}`;
    console.log(filename);
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, content);
    //code injected to filepath file 
    console.log(filePath);
    return filePath;
};

module.exports = {
    generateFile,
};


//Logic Overview
/**
 * Utility responsible for creating unique temporary source-code files on disk.
 *
 * Why do we need this?
 * 1. The online compiler receives raw code text from the client.
 * 2. In order to compile / execute the program we must first write that text
 *    into a real file so that tools like `g++` can read it.
 * 3. We keep things tidy by placing every generated file inside a dedicated
 *    `codes` folder (created automatically if it does not yet exist).
 * 4. A UUID (universally-unique identifier) is used to ensure file names never
 *    clash when several users hit the endpoint at the same time.
 *
 * The main export is `generateFile(extension, code)` which returns **the full
 * path** of the freshly-created file so that the caller can pass it to the
 * next build / run step.
 */