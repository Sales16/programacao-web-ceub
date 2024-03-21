const colorPicker1 = document.getElementById('colorPicker1');
const colorPicker2 = document.getElementById('colorPicker2');
const gradientBackground = document.getElementById('gradientBackground');

// Função para atualizar o gradiente de fundo quando o valor dos inputs mudar
function updateGradientBackground() {
    document.body.style.backgroundImage = `linear-gradient(to bottom right, ${colorPicker1.value}, ${colorPicker2.value})`;
}

colorPicker1.addEventListener('input', updateGradientBackground);
colorPicker2.addEventListener('input', updateGradientBackground);

// Chamada inicial para garantir que o gradiente de fundo seja atualizado ao carregar a página
updateGradientBackground();