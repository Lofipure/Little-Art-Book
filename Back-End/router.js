const router = require("koa-router")();
const user = require("./model/User")
const works = require("./model/Works")

const fs = require("fs")
const path = require("path");
const {unzip} = require('./model/unzip')
const koaBody = require('koa-body')({
    multipart: true
})

router.post('/user/login', async (ctx) => {
    let {
        email,
        password
    } = ctx.request.body;
    if (await user.checkPassword(email, password) == "NOUSER") {
        ctx.body = "NOUSER"
    } else if (await user.checkPassword(email, password) == "YES") {
        ctx.body = "YES"
    } else {
        ctx.body = "NO"
    }
})

router.post('/user/createUser', async (ctx) => {
    let postData = ctx.request.body
    let insertResult = await user.createUser(postData)
    if (insertResult == "ALREADYHAVE") {
        ctx.body = "ALREADYHAVE"
    } else {
        ctx.body = "OK"
    }
})

router.get('/user/getInfo', async (ctx) => {
    ctx.body = await user.getUserInfo(ctx.query.email)
})

router.post('/user/changePassword', async (ctx) => {
    let postObj = ctx.request.body
    ctx.body = await user.changePassword(postObj)
})

router.get('/works/getAll', async (ctx) => {
    ctx.body = await works.getAll()
})

router.post('/works/addStaticFile', async (ctx) => {
    const {
        image,
        data
    } = ctx.request.files;
    const imageReader = fs.createReadStream(image._writeStream.path);
    let filePath = path.join(__dirname, './public/image' + `/${ctx.query.name}_${ctx.query.email}_${image.name}`);
    const imageUpStream = fs.createWriteStream(filePath);
    imageReader.pipe(imageUpStream);

    const dataReader = fs.createReadStream(data._writeStream.path);
    const dirName = await new Promise((resolve, reject) => {
        fs.mkdir(path.join(__dirname, './public/data' + `/${ctx.query.name}_${ctx.query.email}_${data.name.substr(0, data.name.length-4)}`), (err) => {
            if (!err) {
                resolve('./public/data' + `/${ctx.query.name}_${ctx.query.email}_${data.name.substr(0, data.name.length - 4)}`);
            }
        })
    })
    filePath = path.join(__dirname, dirName + `/${ctx.query.name}_${ctx.query.email}_${data.name}`);
    const dataUpStream = fs.createWriteStream(filePath);
    dataReader.pipe(dataUpStream);
    setTimeout(() => {
        unzip(filePath);
    }, 3000);
    ctx.body = {
        data: "http://localhost:18081/data" + `/${ctx.query.name}_${ctx.query.email}_${data.name.substr(0, data.name.length - 4)}/scene.gltf`,
        image: "http://localhost:18081/image" + `/${ctx.query.name}_${ctx.query.email}_${image.name}`
    };
})

router.post('/works/addNewWorks', async (ctx) => {
    let postData = ctx.request.body;
    ctx.body = await works.addNew(postData);
})

router.get('/works/getUserWorks', async (ctx) => {
    let userEmail = ctx.query.email;
    ctx.body = await works.getUserWorks(userEmail);
})

router.get('/works/getWorksInfo', async (ctx) => {
    ctx.body = await works.getWorksInfo(ctx.query.id);
})

module.exports = router;