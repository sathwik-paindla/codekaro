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
const executeCpp = async (filepath,input="") => {
    const jobId = path.basename(filepath).split(".")[0];
    console.log(jobId);//2cfeb1c2-bb98-4571-bc20-656b0e4dd401
    const outPath = path.join(outputPath, `${jobId}.exe`);
    console.log(outPath);//D:\codekaro\backend\outputs\2cfeb1c2-bb98-4571-bc20-656b0e4dd401.exe
    //outpath is just an path exe file is not yet created
    //It is created after code is compiled 

    return new Promise((resolve, reject) => {
        //g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`   
        //->Initially command to execute without custom input
        exec(
            `g++ ${filepath} -o ${outPath}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }

                const runCommand =
                    input.trim() === ""
                    ? `"${outPath}"` // no input case
                    : `echo "${input}" | "${outPath}"`; 

                exec(runCommand, (runErr, runStdout, runStderr) => {
                    /*try {
                        fs.unlinkSync(outPath);
                     } catch (e) {
                        console.error("Cleanup error:", e);
                    }
                        */
                if (runErr) 
                    return reject({ error: runErr, stderr: runStderr });
                resolve(runStdout.trim());
                
                //resolve(stdout);
            }
        );
    });
});
}

module.exports = {
    executeCpp,
};


