function removerAcentosECaracteresEspeciais(str) {
    const acentos = [
        { base: 'A', letras: /[ÀÁÂÃÄ]/g },
        { base: 'E', letras: /[ÈÉÊË]/g },
        { base: 'I', letras: /[ÌÍÎÏ]/g },
        { base: 'O', letras: /[ÒÓÔÕÖ]/g },
        { base: 'U', letras: /[ÙÚÛÜ]/g },
        { base: 'C', letras: /[Ç]/g },
        { base: 'N', letras: /[Ñ]/g },
        { base: 'a', letras: /[àáâãä]/g },
        { base: 'e', letras: /[èéêë]/g },
        { base: 'i', letras: /[ìíîï]/g },
        { base: 'o', letras: /[òóôõö]/g },
        { base: 'u', letras: /[ùúûü]/g },
        { base: 'c', letras: /[ç]/g },
        { base: 'n', letras: /[ñ]/g }
    ];

    acentos.forEach(acento => {
        str = str.replace(acento.letras, acento.base);
    });

    return str;
}

function gerarChamado() {
    const periodo = document.getElementById('periodo').value.toUpperCase();
    const caFtta = document.getElementById('ca-ftta').value.toUpperCase();
    const caFttaText = removerAcentosECaracteresEspeciais(document.getElementById('ca-ftta-text').value.toUpperCase());
    const id = removerAcentosECaracteresEspeciais(document.getElementById('id').value.toUpperCase());
    const pppoe = document.getElementById('pppoe').value;
    const nome_cliente = removerAcentosECaracteresEspeciais(document.getElementById('nome_cliente').value.toUpperCase());
    const endereco = removerAcentosECaracteresEspeciais(document.getElementById('endereco').value.toUpperCase());
    const referencia = removerAcentosECaracteresEspeciais(document.getElementById('referencia').value.toUpperCase());
    const telefone = removerAcentosECaracteresEspeciais(document.getElementById('telefone').value);
    const potencia = removerAcentosECaracteresEspeciais(document.getElementById('potencia').value.toUpperCase());
    const descricao = removerAcentosECaracteresEspeciais(document.getElementById('descricao').value.toUpperCase());
    const prazo = document.getElementById('prazo').value;

    const trocaEndereco = document.getElementById('trocaEndereco').checked;

    // Mensagem padrão para todas as opções de prazo
    const custoTexto = `CLIENTE CIENTE DO PRAZO MÁXIMO DE ${prazo} E CUSTOS DA VISITA TÉCNICA DE R$50,00 A HORA TÉCNICA E MATERIAIS SE NECESSÁRIO`;

    let chamado = `
PERIODO: ${periodo} _____
${caFtta}: ${caFttaText} _____
ID: ${id} _____
PPPOE: ${pppoe} _____
NOME CLIENTE: ${nome_cliente} _____
ENDEREÇO: ${endereco} _____
PONTO DE REFERÊNCIA: ${referencia} _____
TELEFONE PARA CONTATO: ${telefone} _____
POTÊNCIA: ${potencia} _____

DESCRIÇÃO: ${descricao} _____
`;

    // Verificação se a troca de endereço está selecionada
    if (!trocaEndereco) {
        chamado += `____${custoTexto}____\n`;
    }

    if (trocaEndereco) {
        chamado += `
O CONTRATANTE DECLARA PARA TODOS OS FINS DE DIREITO QUE OS
SERVIÇOS SOLICITADOS FORAM ATIVADOS/INSTALADOS NA PRESENTE DATA,
ESTANDO EM PERFEITO FUNCIONAMENTO. O CONTRATANTE DECLARA TAMBÉM
QUE TESTOU E APROVOU OS SERVIÇOS CONTRATADOS E DIANTE DISSO O
CONTRATANTE RENUNCIA O DIREITO DE ARREPENDIMENTO, PREVISTO NO ART. 49
DA LEI 8078
`;
    }

    const resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = chamado;

    // Copiar para a área de transferência
    navigator.clipboard.writeText(chamado).then(() => {
        alert('Chamado gerado e copiado para a área de transferência!');
    }, () => {
        alert('Falha ao copiar para a área de transferência.');
    });
}

function limparFormulario() {
    document.getElementById('chamadoForm').reset();
    document.getElementById('resultado').textContent = '';
}
