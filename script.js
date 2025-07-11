function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

function enviarFormulario() {
    const nome = document.getElementById("nome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const rua = document.getElementById("rua").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const canal = document.getElementById("canal").value.trim();
    const plano = document.getElementById("plano").value;
    const email = document.getElementById("email").value.trim();
    const vencimento = document.getElementById("vencimento").value;
    const pagamento = document.getElementById("pagamento").value;
    const cep = document.getElementById("cep").value.trim();

    // Validação
    if (!nome || !nascimento || !rua || !numero || !bairro || !cidade || !canal || !plano || !email || !vencimento || !pagamento) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (calcularIdade(nascimento) < 18) {
        alert("Cliente deve ser maior de idade.");
        return;
    }

    const planos = {
        "100mb": "R$111,00",
        "400mb": "R$122,11",
        "600mb": "R$144,32",
        "800mb": "R$166,55",
        "1000mb": "R$221,11"
    };

    const mensagem = `*Formulário de Adesão:*
      
*Nome:* ${nome}
*Data de Nascimento:* ${nascimento}
*Endereço:* ${rua}, ${numero}, ${bairro}, ${cidade}${cep ? ` - CEP: ${cep}` : ""}
*Canal de Venda:* ${canal}
*Plano Escolhido:* ${plano} - ${planos[plano]}
*E-mail:* ${email}
*Data de Vencimento:* Dia ${vencimento}
*Forma de Pagamento da Adesão:* ${pagamento}`;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const telefone = "5551989045720";
    const url = `https://wa.me/${telefone}?text=${mensagemCodificada}`;
    window.open(url, "_blank");
}