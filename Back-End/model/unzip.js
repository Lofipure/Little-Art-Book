const StreamZip = require("node-stream-zip");
const fs = require('fs');

const unzip = (filePath) => {
    let abstractFilePath = filePath.replace(/\\/g, "\\\\");
    console.log(abstractFilePath);
    const zip = new StreamZip({
        file: abstractFilePath,
        storeEntries: true
    });
    let dirName = /^([\s\S]*[\\][\\]data[\\][\s\S][\s\S]*)[\\][\s\S]*$/g.exec(abstractFilePath)[1];
    console.log(dirName);
    zip.on("ready", () => {
        zip.extract(null, dirName, (err, count) => {
            console.log(err ? 'Extract error' : `Extracted ${count} entries`);
            zip.close();

            fs.unlink(abstractFilePath, (err) => {
                if(!err) {
                    console.log("删除成功")
                }
            })
        });
    })
}

module.exports = {unzip};