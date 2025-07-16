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

// Envio do formulário
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

    if (!emailValido(email)) {
        alert("E-mail inválido.");
        return;
    }

    if (!apenasNumero(telefone) || telefone.length < 10 || telefone.length > 11) {
        alert("Telefone inválido. Deve conter 10 ou 11 dígitos.");
        return;
    }

    if (!apenasNumero(cep) || cep.length !== 8) {
        alert("CEP inválido. Deve conter 8 dígitos.");
        return;
    }

    if (!opcoes.includes(canal)) {
        alert("Selecione uma opção válida do canal de venda.");
        return;
    }

    const planos = {
        "100mb": "R$111,00",
        "400mb": "R$122,11",
        "600mb": "R$144,32",
        "800mb": "R$166,55",
        "1000mb": "R$221,11"
    };

    const mensagem =
        `Tenho interesse em saber mais dos planos e serviços! Segue abaixo os dados para o atendimento inicial: \n\n` +

        `*Dados Pessoais:*\n` +
        `• Nome: ${nome}\n` +
        `• Telefone: ${telefone}\n` +
        `• Nascimento: ${nascimento}\n` +
        `• Email: ${email}\n` +
        `• Canal de venda: ${canal}\n\n` +

        `*Localização:*\n` +
        `• Rua: ${rua}, nº ${numero}\n` +
        `• Bairro: ${bairro}\n` +
        `• Cidade: ${cidade}\n` +
        `${cep ? "• CEP: " + cep + "\n" : ""}\n` +

        `*Plano e fatura:*\n` +
        `• Plano escolhido: ${plano} - ${planos[plano]}\n` +
        `• Data de vencimento: dia ${vencimento}\n` +
        `• Pagamento da adesão via: ${pagamento}\n\n` +

        `*Guarde esta mensagem! Ela será utilizada para agilizar o seu atendimento!*`;

    const contato = "5551989045720";
    const url = `https://wa.me/${contato}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

// -------------------- AUTOCOMPLETE CANAL --------------------

const opcoes = [
    "Google", "Indicação", "Site", "Redes sociais", "Feiras/ações",
    "Indicação condomínio", "Adesivo automotivo", "Outros"
];

const input = document.getElementById("canal");
const sugestoes = document.getElementById("sugestoes-canal");

function mostrarSugestoes(valorDigitado = "") {
    sugestoes.innerHTML = "";
    const valor = valorDigitado.toLowerCase().trim();
    const filtradas = valor
        ? opcoes.filter(opcao => opcao.toLowerCase().includes(valor))
        : opcoes;

    if (filtradas.length === 0) {
        sugestoes.style.display = "none";
        return;
    }

    filtradas.forEach(opcao => {
        const li = document.createElement("li");
        li.textContent = opcao;
        li.onclick = () => {
            input.value = opcao;
            sugestoes.innerHTML = "";
            sugestoes.style.display = "none";
        };
        sugestoes.appendChild(li);
    });

    sugestoes.style.display = "block";
}

input.addEventListener("input", () => mostrarSugestoes(input.value));
input.addEventListener("focus", () => mostrarSugestoes(""));
document.addEventListener("click", (e) => {
    if (!sugestoes.contains(e.target) && e.target !== input) {
        sugestoes.style.display = "none";
    }
});

// -------------------- VIACEP --------------------
document.getElementById("cep").addEventListener("blur", () => {
    const cep = document.getElementById("cep").value.trim();
    if (!/^\d{8}$/.test(cep)) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }

            document.getElementById("rua").value = data.logradouro || "";
            document.getElementById("bairro").value = data.bairro || "";
            document.getElementById("cidade").value = data.localidade || "";
        });
});

// -------------------- BLOQUEIOS DE CARACTERES --------------------

function bloquearCaracteres(campo, regexBloqueio) {
    campo.addEventListener("input", () => {
        campo.value = campo.value.replace(regexBloqueio, '');
    });
}

// Campos texto puro
bloquearCaracteres(document.getElementById("nome"), /[^A-Za-zÀ-ÿ\s]/g);
bloquearCaracteres(document.getElementById("bairro"), /[^A-Za-zÀ-ÿ\s]/g);
bloquearCaracteres(document.getElementById("cidade"), /[^A-Za-zÀ-ÿ\s]/g);

// Campos apenas número
bloquearCaracteres(document.getElementById("cep"), /[^\d]/g);
bloquearCaracteres(document.getElementById("telefone"), /[^\d]/g);
bloquearCaracteres(document.getElementById("numero"), /[^\d]/g);

// Rua: letras, números, espaços
document.getElementById("rua").addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ0-9\s]/g, '');
});

// -------------------- VALIDADORES AUXILIARES --------------------

function apenasNumero(valor) {
    return /^\d+$/.test(valor.trim());
}

function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}
