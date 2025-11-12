const { executeCpp } = require("../utils/executeCpp");
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
        const output = await executeCpp(filePath,input);
        //console.log(output);
        res.status(200).json({output});
    }catch(error){
        res.status(500).json({ error: error });
    }

    //res.status(200).json({language,data});
};