
const puppeteer = require("puppeteer");
//url do habbo hotel 
const url = `https://www.habblet.city`;
// url para entrar no hotel depois de logado na conta
const loginUrl = `https://www.habblet.city/hotelv2`;
//usuario e login da conta que vai ser utilizada
const userLogin = "PersonaCentral";
const userPass = "kkk12";

//Elemento html que representa os campos de login e senha no site
const inputLogin = `input.rounded-input.blue-active.username`;
const inputPassword = `input[name="credentials_password"]`;
const inputButton = `.rounded-button.blue.plain.submit-form.g-recaptcha.default-prevent`;

//Propagandas ao entrar no hotel
const ad1 = `#closeAd1`;
const ad2 = `#closeAd2`;


//gera uma espera de tempo aleatório 
const timer = (min, max)  => Math.floor(Math.random() * (max - min + 1)) + min;


//loga na conta
login = async (stalker) => {
    //tempo de espera para a pagina carregar
    await stalker.waitForTimeout(timer(3000, 5000));
    try {
        //Inserindo login
        const login = await stalker.$(inputLogin);
        login.type(userLogin);

        await stalker.waitForTimeout(1500, 2500);

        //Inserindo senha
        const password = await stalker.$(inputPassword);
        password.type(userPass);

        await stalker.waitForTimeout(100, 500);
        //clica no botao de logar
        stalker.click(inputButton);
        
        await stalker.waitForTimeout(2000, 3000);
    }

    catch(e) {
        //Se ele não encontrar o lugar no site que faz login ele entra denovo no hotel
        gotoHotel(stalker);
    }
}

//fecha os anuncios
closeAd = async(stalker) => {
    await stalker.waitForTimeout(200, 500)
    await stalker.click(ad1);
    await stalker.waitForTimeout(200, 500)
    await stalker.click(ad2);
} 

//Loga no hotel
enterHotel = async (stalker) => {
    await stalker.goto(loginUrl);
    await stalker.setViewport({width: 1200, height: 720});
    await closeAd(stalker);
}

//entra no hotel com a conta
gotoHotel = async (stalker) => {
    stalker.goto(url);
    stalker.setViewport({width: 1200, height: 720});
    await login(stalker);
    await enterHotel(stalker);
}


// === INICIA AQUI ===

//Cria o bot que vai entrar no hotel
createStalker = async () => {
    const spider = await puppeteer.launch({headless: false});
    const stalker = await spider.newPage();
    gotoHotel(stalker);
}

createStalker();