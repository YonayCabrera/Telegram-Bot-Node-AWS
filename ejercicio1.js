var axios = require('axios');
const cheerio = require('cheerio')

for (var i = 1; i <= 10; i++) {
    obtenerPagina(i).then(resolve => console.log("llega"));
}

function obtenerPagina(index) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (false) {
                reject('No te envío nada');
            } else {
                var urlWeb = 'https://tiendas.mediamarkt.es/smartphones-libres/pagina' + index;
                resolve(extraerDatos(urlWeb).then(response => console.log(response)));
            }
        }, 1000 * index);
    });
}

function extraerDatos(urlWeb) {
    return axios.get(urlWeb).then(response => {
        const $ = cheerio.load(response.data);
        return urlWeb;
    })
        .catch(error => console.log(error));
};