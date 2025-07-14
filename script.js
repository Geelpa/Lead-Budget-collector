function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

function enviarFormulario() {
    const nome = document.getElementById("nome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const canal = document.getElementById("canal").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const rua = document.getElementById("rua").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const cidade = document.getElementById("cidade").value.trim();

    const plano = document.querySelector('input[name="plano"]:checked')?.value;
    const vencimento = document.querySelector('input[name="vencimento"]:checked')?.value;
    const pagamento = document.querySelector('input[name="pagamento"]:checked')?.value;

    if (!nome || !telefone || !nascimento || !email || !canal || !rua || !numero || !bairro || !cidade || !plano || !vencimento || !pagamento) {
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

    const mensagem = `*DADOS PESSOAIS:*\n` +
        `• Nome: ${nome}\n` +
        `• Telefone: ${telefone}\n` +
        `• Nascimento: ${nascimento}\n` +
        `• Email: ${email}\n` +
        `• Canal de venda: ${canal}\n\n` +

        `*LOCALIZAÇÃO:*\n` +
        `• Rua: ${rua}, nº ${numero}\n` +
        `• Bairro: ${bairro}\n` +
        `• Cidade: ${cidade}\n` +
        `${cep ? "• CEP: " + cep + "\n" : ""}\n` +

        `*PLANO E FATURA:*\n` +
        `• Plano escolhido: ${plano} - ${planos[plano]}\n` +
        `• Vencimento da fatura: Dia ${vencimento}\n` +
        `• Pagamento da adesão: ${pagamento}`

            `*Guarde esta mensagem! Ela será utilizada para agilizar o seu atendimento!*"`
        ;

    const contato = "5551989045720";
    const url = `https://wa.me/${contato}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

// ViaCEP
document.getElementById("cep").addEventListener("blur", function () {
    const cep = this.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!("erro" in data)) {
                document.getElementById("rua").value = data.logradouro || "";
                document.getElementById("bairro").value = data.bairro || "";
                document.getElementById("cidade").value = data.localidade || "";
            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(() => {
            alert("Erro ao buscar o CEP.");
        });
});
