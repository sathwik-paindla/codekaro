const fs = require('fs');
const path = require('path');

const {exec}=require("child_process");


const outputPath = path.join(__dirname, 'outputs');
//here _dirname ->....\backend\utils
//outputPath->...\backend\utils\outputs
//here only path is created but not directory

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
    //here directory is created
}
//format is language and content is code
const executeCpp = async (filepath,input) => {
    const jobId = path.basename(filepath).split(".")[0];
    console.log(jobId);//2cfeb1c2-bb98-4571-bc20-656b0e4dd401
    const outPath = path.join(outputPath, `${jobId}.exe`);
    console.log(outPath);//D:\codekaro\backend\utils\outputs\2cfeb1c2-bb98-4571-bc20-656b0e4dd401.exe
    //outpath is just an path exe file is not yet created
    //It is created after code is compiled 

    const compileCommand=`g++ "${filepath}" -o "${outPath}"`;
    
    return new Promise((resolve, reject) => {
        //g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`   
        //->Initial command to execute without custom input
        exec(
            compileCommand,
            (error, stdout, stderr) => {
                if (error) {
                    return reject({ error, stderr });
                }
                if (stderr) {
                    return reject(stderr);
                }

                //run the code
                const runCommand=`${outPath}`;
                const runProcess=exec(
                    runCommand,(error,stdout,stderr)=>{
                        if (error) {
                        return reject({ error, stderr });
                        }
                        if (stderr) {
                        return reject(stderr);
                        }
                        resolve(stdout);
                    }
                )
                
                // Pass input to the program’s stdin
                if (input) {
                runProcess.stdin.write(input);
                runProcess.stdin.end();
                }
                //resolve(stdout);
    });
});
}

module.exports = {
    executeCpp,
};


