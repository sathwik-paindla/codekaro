const fs = require('fs');
const path = require('path');

const {exec}=require("child_process");


const outputPath = path.join(__dirname, 'outputs');
//here _dirname ->....\backend
//outputPath->...\backend\outputs
//here only path is created but not directory

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
    //here directory is created
}
//format is language and content is code
const executeCpp = async (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    console.log(jobId);
    const outPath = path.join(outputPath, `${jobId}.exe`);
    console.log(outPath);

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeCpp,
};


