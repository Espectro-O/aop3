const informacoesPostos = {
    "Posto SB": {
        endereco: "Av. Brasília, 1360",
        gasolina: "R$6,09",
        gasolinaAditivada: "R$6,19",
        etanol: "R$4,59",
        diesel: "R$5,87"
    },
    "Posto Porto Canoa": {
        endereco: "Av. Brasília, 575",
        gasolina: "R$5,99",
        gasolinaAditivada: "R$6,09",
        etanol: "R$4,59",
        diesel: "R$5,89"
    },
    "Posto Maringá": {
        endereco: "Rod. Norte Sul, 10000",
        gasolina: "R$5,99",
        gasolinaAditivada: "R$6,34",
        etanol: "R$4,59",
        diesel: "R$5,79"
    },
    "Posto BKR": {
        endereco: "Rod. Br 101 Norte, Km 264",
        gasolina: "R$5,99",
        gasolinaAditivada: "R$6,34",
        etanol: "R$4,59",
        diesel: "R$5,79"
    },
    "Posto Natercoop": {
        endereco: "Rua Francisco Schwartz, 88",
        gasolina: "R$6,49",
        gasolinaAditivada: "R$6,79",
        etanol: "R$4,79",
        diesel: "R$6,24"
    },
    "Posto Pais e Filhos": {
        endereco: "Rod. Afonso Schwab, km 4",
        gasolina: "R$6,42",
        gasolinaAditivada: "R$6,49",
        diesel: "R$6,21"
    }
};

function filtrarTabela() {
    const bairro = document.getElementById('bairro').value.toLowerCase();
    const combustivel = document.getElementById('combustivel').value.toLowerCase();
    const tabela = document.getElementById('postosTabela');
    const linhas = tabela.getElementsByTagName('tr');

    const informacoesDiv = document.getElementById('informacoesPostos');
    informacoesDiv.innerHTML = '';

    let postoEncontrado = false;

    const bairroNaoSelecionado = bairro === "";

    for (let i = 1; i < linhas.length; i++) {
        const nomePosto = linhas[i].getElementsByTagName('td')[0].textContent.trim();
        const colunaBairro = linhas[i].getElementsByTagName('td')[2].textContent.toLowerCase();
        const precoGasolina = linhas[i].getElementsByTagName('td')[3].textContent.replace(/\s/g, '').toLowerCase();
        const precoGasolinaAditivada = linhas[i].getElementsByTagName('td')[4].textContent.replace(/\s/g, '').toLowerCase();
        const precoEtanol = linhas[i].getElementsByTagName('td')[5].textContent.replace(/\s/g, '').toLowerCase();
        const precoDiesel = linhas[i].getElementsByTagName('td')[6].textContent.replace(/\s/g, '').toLowerCase();

        let correspondeCombustivel = true;

        if (combustivel === "gasolina" && precoGasolina === "r$0,00") {
            correspondeCombustivel = false;
        } else if (combustivel === "gasolina-aditivada" && precoGasolinaAditivada === "r$0,00") {
            correspondeCombustivel = false;
        } else if (combustivel === "etanol" && precoEtanol === "r$0,00") {
            correspondeCombustivel = false;
        } else if (combustivel === "diesel" && precoDiesel === "r$0,00") {
            correspondeCombustivel = false;
        }

        if ((bairroNaoSelecionado || colunaBairro.includes(bairro)) && correspondeCombustivel) {
            linhas[i].style.display = '';
            mostrarInformacoesAdicionais(nomePosto, combustivel);
            postoEncontrado = true;
        } else {
            linhas[i].style.display = 'none';
        }
    }

    const tituloInformacoes = document.querySelector("h2#tituloInformacoes");
    if (bairroNaoSelecionado || !postoEncontrado) {
        tituloInformacoes.style.display = 'none';
        informacoesDiv.style.display = 'none';
    } else {
        tituloInformacoes.style.display = 'block';
        informacoesDiv.style.display = 'block';
    }
}

function mostrarInformacoesAdicionais(nomePosto, combustivel) {
    const informacoesDiv = document.getElementById('informacoesPostos');
    const informacoes = informacoesPostos[nomePosto];

    if (informacoes) {
        let combustivelInfo = '';

        if (combustivel === 'gasolina') {
            combustivelInfo = `<tr><td>Menor Preço Gasolina:</td><td>${informacoes.gasolina}</td></tr>`;
        } else if (combustivel === 'gasolina-aditivada') {
            combustivelInfo = `<tr><td> Menor Preço Gasolina Aditivada:</td><td>${informacoes.gasolinaAditivada}</td></tr>`;
        } else if (combustivel === 'etanol') {
            combustivelInfo = `<tr><td> Menor Preço Etanol:</td><td>${informacoes.etanol}</td></tr>`;
        } else if (combustivel === 'diesel') {
            combustivelInfo = `<tr><td> Menor Preço Diesel:</td><td>${informacoes.diesel}</td></tr>`;
        }

        const divPosto = document.createElement('div');
        divPosto.className = 'precosPorBairro2';
        divPosto.innerHTML = `
            <h3>${nomePosto}</h3>
            <table>
                <tr>
                    <td>Endereço:</td>
                    <td>${informacoes.endereco}</td>
                </tr>
                ${combustivelInfo}
            </table>
        `;

        informacoesDiv.appendChild(divPosto);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    filtrarTabela();
});