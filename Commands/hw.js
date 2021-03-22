let request = require("request"); //install request ->npm install request
let cheerio = require("cheerio"); //install cheerio ->npm install cheerio
let fs = require("fs");
let path = require("path");
let str="";
let url ="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url,cb);
function cb(err, response, html) {
    let chSelector = cheerio.load(html);
    let folder=chSelector(".col .header-title.label");
    folder = chSelector(folder[0]).text().trim().split("/")[0];
    // console.log(folder.length);
    // console.log(folder);
    let pathoffolder =str+ path.join(__dirname, folder)
    createfolder(pathoffolder); //create folder->indian premier league 2020
    
    let pathoffolder1 =str + pathoffolder +"/match-results";
    createfolder(pathoffolder1); // create folder inside indian premier league 2020

    //find team name for folder
    let eachfolderforteam=chSelector(".teams .name");
    // console.log(eachfolderforteam.length);
    for(let i=0;i<eachfolderforteam.length;i++){
    let folder_name=chSelector(eachfolderforteam[i]).text().trim().split("/n")[0];
    // console.log(folder_name);
    let pathofteam = path.join(pathoffolder, folder_name); //create folder(team playing) inside ipl folder
    createfolder(pathofteam);
    // teamlink=chSelector(folder_name).attr("href");
    // console.log(teamlink);
   
    
    }
}
function createfolder(src) {
    if (fs.existsSync(src) == false) {
        fs.mkdirSync(src)
    }
}

