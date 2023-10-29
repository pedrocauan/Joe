
const puppeteer = require("puppeteer");
//url do habbo hotel 
const url = `https://www.habblet.city`;
//usuario e login da conta que vai ser utilizada
const userLogin = "PersonaCentral";
const userPass = "kkk12";

//Elemento html que representa os campos de login e senha no site
const inputLogin = `input.rounded-input.blue-active.username`;
const inputPassword = `input[name="credentials_password"]`;


//gera uma espera de tempo aleatório entre 3 e 5 segundos
const timer = (min, max)  => Math.floor(Math.random() * (max - min + 1)) + min;
console.log(timer(3000, 5000));
//verifica se o login foi feito com sucesso 
validateLogin = async (stalker) => {
    //tempo de espera para a pagina carregar
    await stalker.waitForTimeout(timer(3000, 5000));
    try {
        //Inserindo login
        const login = await stalker.$(inputLogin);
        login.type(userLogin);

        //Inserindo senha
        const password = await stalker.$(inputPassword);
        password.type(userPass);
    }

    catch(e) {
        //Se ele não encontrar o lugar no site que faz login ele entra denovo no hotel
        gotoHotel(stalker);
    }
}

//entra no hotel com a conta
gotoHotel = async (stalker) => {
    stalker.goto(url);
    stalker.setViewport({width: 1200, height: 720});
    validateLogin(stalker);
}


// === INICIA AQUI ===

//Cria o bot que vai entrar no hotel
createStalker = async () => {
    const spider = await puppeteer.launch({headless: false});
    const stalker = await spider.newPage();
    gotoHotel(stalker);
}

createStalker();