const { executeCpp } = require("../utils/executeCpp");
const {executeC}=require("../utils/executeC");
const {executeJava}=require("../utils/executeJava");
const {executePython}=require("../utils/executePython");
const { generateFile } = require("../utils/generateFile");


exports.runCode=async(req,res)=>{
    const {code,language='cpp',input=''}=req.body;
    //default language is cpp if user not selected any language

    if(code===undefined){
        return res.status(400).json({error:"Please provide code"});
    }

    try{
        const filePath = generateFile(language, code);
        //console.log(filePath);
        let output;
        if(language==='cpp')
        output = await executeCpp(filePath,input);
        if(language==='c')
        output = await executeC(filePath,input);
        if(language==='java')
        output = await executeJava(filePath,input);
        if(language==='python')
        output = await executePython(filePath,input);
        //console.log(output);
        res.status(200).json({output});
    }catch(error){
        res.status(500).json({ error: error });
    }

    //res.status(200).json({language,data});
};