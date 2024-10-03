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
    const camposObrigatorios = [
        'ca-ftta-text', 'id', 'pppoe', 'nome_cliente', 
        'endereco', 'referencia', 'telefone', 'descricao'
    ];

    const trocaEndereco = document.getElementById('trocaEndereco').checked;
    // Adiciona os campos CTO próximos se a troca de endereço estiver marcada
    if (trocaEndereco) {
        camposObrigatorios.push('cto_proxima_1', 'cto_proxima_2', 'cto_proxima_3');
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    for (const campo of camposObrigatorios) {
        const valorCampo = document.getElementById(campo).value.trim();
        if (!valorCampo) {
            alert(`Não foi gerado o chamado pois o campo "${campo.replace(/_/g, ' ').toUpperCase()}" não está preenchido.`);
            return; // Não gera o chamado se algum campo obrigatório não estiver preenchido
        }
    }

    // Coleta os dados do formulário
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

    // Campos adicionais se a troca de endereço for selecionada
    const plano_cliente = removerAcentosECaracteresEspeciais(document.getElementById('plano_cliente').value.toUpperCase());
    const cto_proxima_1 = removerAcentosECaracteresEspeciais(document.getElementById('cto_proxima_1').value.toUpperCase());
    const distancia_1 = document.getElementById('distancia_1').value;
    const cto_proxima_2 = removerAcentosECaracteresEspeciais(document.getElementById('cto_proxima_2').value.toUpperCase());
    const distancia_2 = document.getElementById('distancia_2').value;
    const cto_proxima_3 = removerAcentosECaracteresEspeciais(document.getElementById('cto_proxima_3').value.toUpperCase());
    const distancia_3 = document.getElementById('distancia_3').value;
    const login = removerAcentosECaracteresEspeciais(document.getElementById('login').value.toUpperCase());
    const senha = removerAcentosECaracteresEspeciais(document.getElementById('senha').value);
    const equipamentos_comodato = document.getElementById('equipamentos_comodato').value;
    const tipo_equipamento = removerAcentosECaracteresEspeciais(document.getElementById('tipo_equipamento').value.toUpperCase());
    const taxa_instalacao = document.getElementById('taxa_instalacao').value;
    const parcelas = document.getElementById('parcelas').value;

    // Mensagem padrão para todas as opções de prazo
    const custoTexto = `CLIENTE CIENTE DO PRAZO MÁXIMO DE ${prazo} E CUSTOS DA VISITA TÉCNICA DE R$50,00 A HORA TÉCNICA E MATERIAIS SE NECESSÁRIO`;

    let chamado = `
PERÍODO: ${periodo} _____
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
    if (trocaEndereco) {
        chamado += `
PLANO CLIENTE: ${plano_cliente} MB_____
CTO PRÓXIMA 1: ${cto_proxima_1} DISTÂNCIA: ${distancia_1} METROS_____
CTO PRÓXIMA 2: ${cto_proxima_2} DISTÂNCIA: ${distancia_2} METROS_____
CTO PRÓXIMA 3: ${cto_proxima_3} DISTÂNCIA: ${distancia_3} METROS_____
LOGIN: ${login} _____
SENHA: ${senha} _____
EQUIPAMENTOS EM COMODATO: ${equipamentos_comodato} _____
${equipamentos_comodato === "SIM" ? `TIPO DE EQUIPAMENTO: ${tipo_equipamento} _____` : ""}
TAXA DE INSTALAÇÃO: R$${taxa_instalacao},00 (${parcelas}) _____

O CONTRATANTE DECLARA PARA TODOS OS FINS DE DIREITO QUE OS
SERVIÇOS SOLICITADOS FORAM ATIVADOS/INSTALADOS NA PRESENTE DATA,
ESTANDO EM PERFEITO FUNCIONAMENTO. O CONTRATANTE DECLARA TAMBÉM
QUE TESTOU E APROVOU OS SERVIÇOS CONTRATADOS E DIANTE DISSO O
CONTRATANTE RENUNCIA O DIREITO DE ARREPENDIMENTO, PREVISTO NO ART. 49
DA LEI 8078
`;
    } else {
        chamado += `____${custoTexto}____\n`;
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

function toggleOpcoesAdicionais() {
    const opcoesAdicionais = document.getElementById('opcoesAdicionais');
    opcoesAdicionais.style.display = document.getElementById('trocaEndereco').checked ? 'block' : 'none';
}

function toggleTipoEquipamento() {
    const tipoEquipamento = document.getElementById('tipo_equipamento');
    tipoEquipamento.style.display = document.getElementById('equipamentos_comodato').value === 'SIM' ? 'block' : 'none';
}
