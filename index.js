const puppeteer = require("puppeteer");

//Cria o bot que vai entrar no hotel
createStalker = async () => {
    const spider = await puppeteer.launch({headless: false});
    const stalker = await spider.newPage();
    await stalker.setViewport({width: 1200, height: 720});
}

createStalker();