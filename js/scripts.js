//#region funcões 
function formatDate(date) {
    const formatted = date.split('-')
    return `${formatted[1]}-${formatted[2]}-${formatted[0]}`
}

function clearData(a) {
    a.innerHTML = ``
}

async function select(a) {

    const response = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json&%24orderby=simbolo`)
    const myJson = await response.json();

    for (var i = 0; i < myJson.value.length; i++) {
        const option = document.createElement('option')
        option.innerHTML = myJson.value[i].nomeFormatado
        option.value = myJson.value[i].simbolo

        document.getElementById(a).appendChild(option);
    }
}
//#endregion

//#region Lista de Moedas
let div = document.getElementById('div-content');
let table = document.getElementById('tbody-dados');

listaMoedas = () => {

    fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json")
        .then(response => {
            response.json().then(
                data => {
                    data.value.forEach((e, i) => table.innerHTML = table.innerHTML +
                        `<tr>
                            <td>${e.simbolo}</td>
                            <td>${e.nomeFormatado}</td>
                            <td>${e.tipoMoeda}</td>
                        </tr>`)
                }
            ).catch(() => {})
        }).catch(error => console.log(errors))
};
//#endregion

//#region Page Dolar

//#region Pesquisa do Dolar
let pesquisaDolar = document.getElementById('btn-dolar');
let divD = document.getElementById('div-content-dolar');
let tableD = document.getElementById('tbody-dados-dolar');
let dataCotacao = document.getElementById('dt-Dolar');

pesquisaDolar && pesquisaDolar.addEventListener('click', () => {

    clearData(tableD);
    var a = dataCotacao.value;
    var b = formatDate(a);

    fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao='${b}')?%40dataCotacao=10-08-2021&%24format=json`)
        .then(response => {
            response.json().then(
                data => {
                    if (data.value.length == 0) {
                        alert("Não foi encontrado dados dessa data!!")
                        return "error";
                    } else {
                        data.value.forEach((e) => tableD.innerHTML = tableD.innerHTML +
                            `<tr>
                                <td>R$ ${e.cotacaoCompra}</td>
                                <td>R$ ${e.cotacaoVenda}</td>
                                <td>${e.dataHoraCotacao}</td>
                            </tr>`)
                    }
                }
            ).catch(() => {})
        }).catch(error => console.log(errors))
});
//#endregion

//#region Pesquisa Dolar por Período

let pesquisaDolarP = document.getElementById('btn-dolar-periodo');
let divP = document.getElementById('div-content-dolarP');
let tableP = document.getElementById('tbody-dados-dolarP');
let dataCotacaoIni = document.getElementById('dt-Ini');
let dataCotacaoFim = document.getElementById('dt-Fim');

pesquisaDolarP && pesquisaDolarP.addEventListener('click', () => {

    clearData(tableP);
    var a = dataCotacaoIni.value;
    var b = formatDate(a);
    var c = dataCotacaoFim.value;
    var d = formatDate(c);

    fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial='${b}',dataFinalCotacao='${d}')?%40dataInicial='10-10-2010'&%40dataFinalCotacao='10-10-2011'&%24format=json`)
        .then(response => {
            response.json().then(
                data => {
                    if (data.value.length == 0) {
                        alert("Não foi encontrado dados dessa data!!")
                        return "error";
                    } else {
                        data.value.forEach((e) => tableP.innerHTML = tableP.innerHTML +
                            `<tr>
                            <td>R$ ${e.cotacaoCompra}</td>
                            <td>R$ ${e.cotacaoVenda}</td>
                            <td>${e.dataHoraCotacao}</td>
                        </tr>`)
                    }
                }
            ).catch(() => {})
        }).catch(error => console.log(errors))
});
//#endregion

//#endregion

//#region Page Index
let pesquisaIndex = document.getElementById('btn-index');
let tableIndex = document.getElementById('tbody-dados-Index');
let moeda = document.getElementById('moeda');
let dtIndex = document.getElementById('dt-index');

pesquisaIndex && pesquisaIndex.addEventListener('click', () => {

    var a = dtIndex.value;
    var b = formatDate(a);

    fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda='${moeda.value}',dataCotacao='${b}')?%40moeda='EUR'&%40dataCotacao='10-10-2018'&%24format=json`)
        .then(response => {
            response.json().then(
                data => {
                    if (data.value.length == 0) {
                        alert("Não foi encontrado dados dessa data!!")
                        return "error";
                    } else {
                        data.value.forEach((e) => tableIndex.innerHTML =
                            `
                            <a >${(e.cotacaoCompra).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        `
                        )
                    }
                }
            ).catch(() => {})
        }).catch(error => console.log(errors))
});
//#endregion

//#region Page Boletim

//#region Pesquisa Moeda
let pesquisaMoeda = document.getElementById('btn-moedas');
let tableMoedas = document.getElementById('tbody-dados-Moeda');
let moedas = document.getElementById('select-cot-moeda');
let dtMoedas = document.getElementById('dt-moedas');

pesquisaMoeda && pesquisaMoeda.addEventListener('click', () => {

    var a = dtMoedas.value;
    var b = formatDate(a);

    fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda='${moedas.value}',dataCotacao='${b}')?%40moeda='EUR'&%40dataCotacao='10-10-2018'&%24format=json`)
        .then(response => {
            response.json().then(
                data => {
                    if (data.value.length == 0) {
                        alert("Não foi encontrado dados dessa data!!")
                        return "error";
                    } else {
                        data.value.forEach((e) => tableMoedas.innerHTML =
                            `<tr>
                            <td>R$ ${e.paridadeCompra}</td>
                            <td>R$ ${e.paridadeVenda}</td>
                            <td>R$ ${e.cotacaoCompra}</td>
                            <td>R$ ${e.cotacaoVenda}</td>
                            <td>${e.dataHoraCotacao}</td>
                            <td>${e.tipoBoletim}</td>
                        </tr>`
                        )
                    }
                }
            ).catch(() => {})
        }).catch(error => console.log(errors))
});
//#endregion

//#region Pesquisa Moeda por Período

let pesquisaMoedaP = document.getElementById('btn-moedasP');
let tableMoedasP = document.getElementById('tbody-dados-MoedaP');
let moedasP = document.getElementById('select-cot-moedaP');
let dtMoedasIni = document.getElementById('dt-moedas-ini');
let dtMoedasFim = document.getElementById('dt-moedas-fim');

pesquisaMoedaP && pesquisaMoedaP.addEventListener('click', () => {

    clearData(tableMoedasP);
    var a = dtMoedasIni.value;
    var b = formatDate(a);
    var c = dtMoedasFim.value;
    var d = formatDate(c);

    fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda='${moedasP.value}',dataInicial='${b}',dataFinalCotacao='${d}')?%40moeda='EUR'&%40dataInicial='10-10-2020'&%40dataFinalCotacao='10-10-2021'&%24format=json`)
        .then(response => {
            response.json().then(
                data => {
                    if (data.value.length == 0) {
                        alert("Não foi encontrado dados dessa data!!")
                        return "error";
                    } else {
                        data.value.forEach((e) => tableMoedasP.innerHTML = tableMoedasP.innerHTML +
                            `<tr>
                            <td>R$ ${e.paridadeCompra}</td>
                            <td>R$ ${e.paridadeVenda}</td>
                            <td>R$ ${e.cotacaoCompra}</td>
                            <td>R$ ${e.cotacaoVenda}</td>
                            <td>${e.dataHoraCotacao}</td>
                            <td>${e.tipoBoletim}</td>
                        </tr>`
                        )
                    }
                }
            ).catch(() => {})
        }).catch(error => console.log(errors))
});
//#endregion

//#endregion

//#region Page Outras Cotações

//#region Pesquisa Cotacao

let pesquisaCotac = document.getElementById('btn-cotac');
let tableCotac = document.getElementById('tbody-dados-cotac');
let moedasCotac = document.getElementById('select-cot-moedas-cotac');
let dtMoedasCotac = document.getElementById('dt-moedas-cotac');

pesquisaCotac && pesquisaCotac.addEventListener('click', () => {

    clearData(tableCotac);
    var a = dtMoedasCotac.value;
    var b = formatDate(a);

    fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaAberturaOuIntermediario(codigoMoeda='${moedasCotac.value}',dataCotacao='${b}')?%40codigoMoeda='EUR'&%40dataCotacao='10-10-2002'&%24format=json`)
        .then(response => {
            response.json().then(
                data => {
                    if (data.value.length == 0) {
                        alert("Não foi encontrado dados dessa data!!")
                        return "error";
                    } else {
                        data.value.forEach((e) => tableCotac.innerHTML = tableCotac.innerHTML +
                            `<tr>
                            <td>R$ ${e.cotacaoCompra}</td>
                            <td>R$ ${e.cotacaoVenda}</td>
                            <td>${e.dataHoraCotacao}</td>
                            <td>${e.tipoBoletim}</td>
                        </tr>`
                        )
                    }
                }
            ).catch(() => {})
        }).catch(error => console.log(errors))
});
//#endregion

//#region Pesquisa Cotacao por Período  

let pesquisaCotacP = document.getElementById('btn-cotacP');
let tableCotacP = document.getElementById('tbody-dados-CotacP');
let moedasCotacP = document.getElementById('select-cot-cotacP');
let dtMoedasCotIni = document.getElementById('dt-moedas-cotac-ini');
let dtMoedasCotFim = document.getElementById('dt-moedas-cotac-fim');

pesquisaCotacP && pesquisaCotacP.addEventListener('click', () => {

    clearData(tableCotacP);
    var a = dtMoedasCotIni.value;
    var b = formatDate(a);
    var c = dtMoedasCotFim.value;
    var d = formatDate(c);

    fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodoFechamento(codigoMoeda='${moedasCotacP.value}',dataInicialCotacao='${b}',dataFinalCotacao='${d}')?%40codigoMoeda='EUR'&%40dataInicialCotacao='10-10-2020'&%40dataFinalCotacao='10-10-2021'&%24format=json`)
        .then(response => {
            response.json().then(
                data => {
                    if (data.value.length == 0) {
                        alert("Não foi encontrado dados dessa data!!")
                        return "error";
                    } else {
                        data.value.forEach((e) => tableCotacP.innerHTML = tableCotacP.innerHTML +
                            `<tr>
                            <td>R$ ${e.cotacaoCompra}</td>
                            <td>R$ ${e.cotacaoVenda}</td>
                            <td>${e.dataHoraCotacao}</td>
                            <td>${e.tipoBoletim}</td>
                        </tr>`
                        )
                    }
                }
            ).catch(() => {})
        }).catch(error => console.log(errors))
});
//#endregion

//#endregion

//#region Grafico

let grafico = document.getElementById('btn-grafico');
let dtMoedasGrafIni = document.getElementById('dt-moedas-graf-ini');
let dtMoedasGrafFim = document.getElementById('dt-moedas-graf-fim');

async function CriaGrafico() {

    var a = document.getElementById("grafico");

    clearData(a);

    var a = dtMoedasGrafIni.value;
    var b = formatDate(a);
    var c = dtMoedasGrafFim.value;
    var d = formatDate(c);

    var ctx = document.getElementsByClassName('line-chart');
    const moedasGrafico = document.getElementById("select-moeda-grafico");
    const response = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda='${moedasGrafico.value}',dataInicial='${b}',dataFinalCotacao='${d}')?%40moeda='EUR'&%40dataInicial='10-10-2020'&%40dataFinalCotacao='10-10-2021'&%24format=json`)
    const json = await response.json();

    console.log(json);

    let dadosGraph = [], labelX = [];

    for (let i = 0; i < json.value.length; i++) {
        labelX.push(json.value[i].dataHoraCotacao)
        dadosGraph.push(json.value[i].cotacaoCompra)
    }

    var chartGraph = new Chart(ctx, {

        type: 'line',

        data: {

            labels: labelX,

            datasets: [{
                label: "Cotação de Compra " + moedasGrafico.value,
                data: dadosGraph,
                borderColor: "rgba(8,84,0,1)",
                borderWidth: 1,
                backgroundColor: "transparent"
            }]
        }
    })

}


grafico && grafico.addEventListener('click', () => {
    CriaGrafico();
});

//#endregion