// Game state variables
let currentRound = 1;
let totalRounds = 5;
let score = 0;
let timeLeft = 30;
let gameTimer = null;
let currentScenario = null;
let selectedEmail = null;
let gameActive = false;

// Email scenarios data - Original themes with increased difficulty
const emailScenarios = [
  {
    title: "Comunicado Oficial PUCE",
    legitimate: {
      from: "Secretaría General-Unificada",
      email: "anuncios@puce.edu.ec",
      subject: "Información de Horarios - Ceremonia de Incorporación",
      body: "Estimada comunidad universitaria:<br><br>La Secretaría General-Unificada informa que hoy 17 de junio de 2025 atenderá hasta las 14h00, debido a que en horas de la tarde se iniciarán los preparativos para la ceremonia de incorporación programada.<br><br>Agradecemos su comprensión y solicitamos tomar en cuenta esta información para la planificación de cualquier trámite.",
      footer: "Secretaría General-Unificada | Pontificia Universidad Católica del Ecuador",
      timestamp: "Hoy 9:30 AM"
    },
    phishing: {
      from: "Secretaría General-Unificada",
      email: "anuncios@puce.edu.ec.updates.net",
      subject: "Actualización - Horarios Ceremonia de Incorporación",
      body: "Estimada comunidad universitaria:<br><br>La Secretaría General-Unificada informa sobre cambios en los horarios para la ceremonia del 17 de junio de 2025. Para garantizar su participación, favor confirme su asistencia.<br><br><a href='#' class='suspicious-link'>Confirmar asistencia</a><br><br>Es necesario completar este registro para asegurar su lugar en el evento.",
      footer: "Secretaría General-Unificada | Pontificia Universidad Católica del Ecuador",
      timestamp: "Hoy 9:33 AM"
    },
    correctAnswer: 'A',
    explanation: {
      legitimate: [
        "Dominio oficial de PUCE: anuncios@puce.edu.ec",
        "Información institucional clara y específica",
        "Tono profesional y formal apropiado",
        "Sin urgencia ni amenazas innecesarias",
        "Comunicado normal de horarios administrativos"
      ],
      phishing: [
        "Dominio falso: anuncios@puce.edu.ec.updates.net (no es el dominio oficial)",
        "Solicita confirmación de asistencia innecesaria",
        "Incluye enlace sospechoso para 'confirmar asistencia'",
        "Crea presión para completar un registro no oficial"
      ]
    }
  },
  {
    title: "Promoción FEUCE - Fiestas de Quito",
    legitimate: {
      from: "FEUCE - Federación de Estudiantes",
      email: "comunicadosfeuce@puce.edu.ec",
      subject: "¡2x1 en Tierra Canela y Don Medardo por fiestas de Quito!",
      body: "Hola, del 29 de noviembre al 1 de diciembre, prepárate para vivir 3 días de música, farra y pura buena vibra celebrando las Fiestas de Quito. 🎸✨<br><br>Usa el código FEUCE y aprovecha el 2x1. ¡Paga solo $15 por las dos entradas!",
      footer: "FEUCE - Federación de Estudiantes | Pontificia Universidad Católica del Ecuador",
      timestamp: "Hoy 11:20 AM"
    },
    phishing: {
      from: "FEUCE - Federación de Estudiantes",
      email: "comunicados@feuce.puce.edu.ec",
      subject: "¡Oferta 2x1 Fiestas de Quito - Confirmación Pendiente!",
      body: "¡Hola estudiante!<br><br>Tu solicitud para la oferta 2x1 del 29 de noviembre al 1 de diciembre está pendiente de confirmación. 3 días de música y diversión en las Fiestas de Quito.<br><br>Para activar tu descuento FEUCE, confirma aquí: <a href='#' class='suspicious-link'>Activar oferta 2x1</a><br><br>Solo tienes hasta mañana para confirmar tu código.",
      footer: "FEUCE - Federación de Estudiantes | PUCE",
      timestamp: "Hoy 11:25 AM"
    },
    correctAnswer: 'A',
    explanation: {
      legitimate: [
        "Dominio oficial FEUCE: comunicadosfeuce@puce.edu.ec",
        "Información clara sin presión de tiempo artificial",
        "Nombre oficial completo: Federación de Estudiantes",
        "Tono informal apropiado para comunicación estudiantil",
        "No incluye enlaces sospechosos o urgencia falsa"
      ],
      phishing: [
        "Dominio falso: comunicados@feuce.puce.edu.ec (subdominio no oficial)",
        "Crea urgencia falsa con 'hasta mañana para confirmar'",
        "Solicita activar descuento a través de enlace sospechoso",
        "Sugiere que hay una 'solicitud pendiente' inexistente"
      ]
    }
  },
  {
    title: "Compra Apple Store",
    legitimate: {
      from: "Apple Store",
      email: "noreply@email.apple.com",
      subject: "Tu recibo de Apple Store - AirPods Pro",
      body: "Hola,<br><br>Gracias por tu compra en Apple Store.<br><br><strong>Resumen del pedido:</strong><br>• AirPods Pro (2da generación) - $249.00<br>• Método de pago: •••• 1234<br>• Número de pedido: W987654321<br><br>Tu pedido será enviado a la dirección registrada en tu cuenta. Puedes rastrear el envío en tu cuenta de Apple o visitando apple.com/support.",
      footer: "Apple Inc. | Cupertino, CA | apple.com/support",
      timestamp: "Hace 2 horas"
    },
    phishing: {
      from: "Apple Store",
      email: "orders@apple.email-notifications.com",
      subject: "Confirmación Requerida - Compra AirPods Pro",
      body: "Hola,<br><br>Recibimos tu orden para AirPods Pro por $249.00. Para procesar el envío, necesitamos verificar algunos detalles.<br><br><strong>Verificación pendiente:</strong><br>• AirPods Pro (2da generación) - $249.00<br>• <a href='#' class='suspicious-link'>Confirmar información de envío</a><br>• Número de pedido: W987654321<br><br>Por favor confirma en las próximas 24 horas para evitar cancelación.",
      footer: "Apple Store | Departamento de Pedidos",
      timestamp: "Hace 2 horas"
    },
    correctAnswer: 'A',
    explanation: {
      legitimate: [
        "Dominio oficial de Apple: noreply@email.apple.com",
        "Recibo de compra con información detallada",
        "Información clara de productos y precios",
        "Dirige a canales oficiales de soporte",
        "No solicita verificación de datos personales"
      ],
      phishing: [
        "Dominio falso: orders@apple.email-notifications.com (no es dominio oficial de Apple)",
        "Solicita verificación innecesaria de información de envío",
        "Crea urgencia con plazo de 24 horas para evitar cancelación",
        "Incluye enlace sospechoso para 'confirmar información'"
      ]
    }
  },
  {
    title: "Banco del Pichincha - Estado de Cuenta",
    legitimate: {
      from: "Banco Pichincha",
      email: "notificaciones@pichincha.com",
      subject: "Su estado de cuenta de enero ya está disponible",
      body: "Estimado cliente,<br><br>Su estado de cuenta correspondiente al mes de enero 2025 ya se encuentra disponible en nuestros canales digitales.<br><br><strong>Resumen:</strong><br>• Cuenta: •••• 5678<br>• Saldo disponible: $2,847.92<br>• Movimientos del mes: 12 transacciones<br><br>Puede consultar el detalle completo en Banca Web o la aplicación móvil del Banco Pichincha.",
      footer: "Banco Pichincha | 1700-PICHINCHA (742446242) | pichincha.com",
      timestamp: "Ayer 8:15 AM"
    },
    phishing: {
      from: "Banco Pichincha",
      email: "notificaciones@pichincha.com.ec",
      subject: "Estado de Cuenta Enero - Verificación Pendiente",
      body: "Estimado cliente,<br><br>Su estado de cuenta de enero 2025 requiere verificación antes de estar disponible en los canales digitales.<br><br><strong>Resumen pendiente:</strong><br>• Cuenta: •••• 5678<br>• Saldo disponible: $2,847.92<br>• <a href='#' class='suspicious-link'>Verificar para acceder al estado completo</a><br><br>Complete la verificación para consultar sus movimientos en Banca Web.",
      footer: "Banco Pichincha | Centro de Verificación Digital",
      timestamp: "Ayer 8:20 AM"
    },
    correctAnswer: 'A',
    explanation: {
      legitimate: [
        "Dominio oficial: notificaciones@pichincha.com",
        "Información normal de estado de cuenta mensual",
        "No crea urgencia ni solicita datos personales",
        "Dirige a canales oficiales conocidos (Banca Web)",
        "Número de contacto oficial incluido"
      ],
      phishing: [
        "Dominio falso: notificaciones@pichincha.com.ec (extensión adicional sospechosa)",
        "Solicita verificación innecesaria para acceder al estado de cuenta",
        "Incluye enlace sospechoso para 'verificar y acceder'",
        "Sugiere que la cuenta requiere verificación antes de mostrar información"
      ]
    }
  },
  {
    title: "AMT Quito - Citación de Tránsito",
    legitimate: {
      from: "AMT Quito",
      email: "notificaciones@amt.gob.ec",
      subject: "Citación de Tránsito No. CT-2025-045123",
      body: "Estimado conductor,<br><br>Se le notifica la citación de tránsito registrada a su vehículo de placas ABC-1234.<br><br><strong>Detalles:</strong><br>• Fecha: 15 de enero de 2025, 14:30<br>• Ubicación: Av. Amazonas y Naciones Unidas<br>• Infracción: Exceso de velocidad<br>• Valor: $95.20<br><br>Puede realizar el pago en nuestras oficinas o a través del portal web oficial amt.gob.ec",
      footer: "AMT - Agencia Metropolitana de Tránsito | Municipio de Quito | amt.gob.ec",
      timestamp: "Hace 4 horas"
    },
    phishing: {
      from: "AMT Quito",
      email: "citaciones@amt.quito.gob.ec",
      subject: "Citación de Tránsito CT-2025-045123 - Confirmación Requerida",
      body: "Estimado conductor,<br><br>Se registró una citación para su vehículo ABC-1234. Para evitar procesamiento adicional, confirme la recepción de esta notificación.<br><br><strong>Detalles:</strong><br>• Fecha: 15 de enero de 2025, 14:30<br>• Infracción: Exceso de velocidad<br>• <a href='#' class='suspicious-link'>Confirmar recepción de citación</a><br><br>La confirmación debe realizarse dentro de 48 horas.",
      footer: "AMT - Sistema de Notificaciones | Municipio de Quito",
      timestamp: "Hace 4 horas"
    },
    correctAnswer: 'A',
    explanation: {
      legitimate: [
        "Dominio oficial del gobierno: notificaciones@amt.gob.ec",
        "Información completa y específica de la citación",
        "Menciona opciones legales de pago (oficinas y portal web)",
        "Número de citación oficial incluido",
        "No presiona para pago inmediato con descuentos"
      ],
      phishing: [
        "Dominio falso: citaciones@amt.quito.gob.ec (subdominio no oficial)",
        "Solicita confirmación innecesaria de recepción de citación",
        "Incluye enlace sospechoso para 'confirmar recepción'",
        "Crea presión con plazo de 48 horas para confirmación"
      ]
    }
  }
];

// Game initialization
function initializeGame() {
    console.log('Inicializando juego...');
    updateDisplay();
    showScreen('instructions');
}

// Start game function
function startGame() {
    console.log('Iniciando juego...');
    currentRound = 1;
    score = 0;
    selectedEmail = null;
    gameActive = false;
    
    // Shuffle scenarios at the start of each game
    shuffledScenarios = shuffleArray(emailScenarios);
    
    showScreen('game');
    loadRound();
}

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize shuffled scenarios at game start
let shuffledScenarios = [];

// Load current round
function loadRound() {
    console.log('Cargando ronda:', currentRound);
    
    // Use shuffled scenarios if available, otherwise use original order
    if (shuffledScenarios.length === 0) {
        shuffledScenarios = shuffleArray(emailScenarios);
    }
    
    currentScenario = shuffledScenarios[currentRound - 1];
    
    // Randomly assign emails to sides
    let emailA, emailB, correctSide;
    if (Math.random() < 0.5) {
        emailA = currentScenario.legitimate;
        emailB = currentScenario.phishing;
        correctSide = 'A';
    } else {
        emailA = currentScenario.phishing;
        emailB = currentScenario.legitimate;
        correctSide = 'B';
    }
    
    currentScenario.currentCorrectAnswer = correctSide;
    
    // Update round title
    document.getElementById('round-title').textContent = `Ronda ${currentRound}: ${currentScenario.title}`;
    
    // Populate emails
    populateEmail('a', emailA);
    populateEmail('b', emailB);
    
    // Reset email styles
    resetEmailStyles();
    
    // Start timer
    startTimer();
    
    updateDisplay();
}

// Populate email content
function populateEmail(side, emailData) {
    document.getElementById(`from-${side}`).textContent = emailData.from;
    document.getElementById(`time-${side}`).textContent = emailData.timestamp;
    document.getElementById(`sender-${side}`).textContent = emailData.email;
    document.getElementById(`subject-${side}`).textContent = emailData.subject;
    document.getElementById(`body-${side}`).innerHTML = emailData.body;
    document.getElementById(`footer-${side}`).textContent = emailData.footer;
}

// Reset email card styles
function resetEmailStyles() {
    document.getElementById('email-a').className = 'email-card';
    document.getElementById('email-b').className = 'email-card';
    selectedEmail = null;
    gameActive = true;
}

// Start timer for round
function startTimer() {
    timeLeft = 30;
    updateTimerDisplay();
    
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    
    gameTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            timeUp();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = timeLeft;
    }
}

// Handle time up scenario
function timeUp() {
    if (!gameActive) return;
    
    clearInterval(gameTimer);
    gameActive = false;
    
    // Auto-select wrong answer for time up
    const wrongSide = currentScenario.currentCorrectAnswer === 'A' ? 'B' : 'A';
    selectEmail(wrongSide, true);
}

// Handle email selection
function selectEmail(side, isTimeUp = false) {
    if (!gameActive || selectedEmail) return; // Prevent multiple selections
    
    console.log('Email seleccionado:', side);
    clearInterval(gameTimer);
    selectedEmail = side;
    gameActive = false;
    
    const isCorrect = side === currentScenario.currentCorrectAnswer;
    
    // Update email card styles
    document.getElementById(`email-${side.toLowerCase()}`).classList.add('selected');
    
    if (isCorrect) {
        document.getElementById(`email-${side.toLowerCase()}`).classList.add('correct');
        if (!isTimeUp) score++;
    } else {
        document.getElementById(`email-${side.toLowerCase()}`).classList.add('incorrect');
        const correctSide = currentScenario.currentCorrectAnswer.toLowerCase();
        document.getElementById(`email-${correctSide}`).classList.add('correct');
    }
    
    updateDisplay();
    
    // Show result after a brief delay
    setTimeout(() => {
        showResult(isCorrect, side, isTimeUp);
    }, 1500);
}

// Show result screen
function showResult(isCorrect, selectedSide, timeUp) {
    showScreen('result');
    
    // Show result message
    const resultMessage = document.getElementById('result-message');
    resultMessage.className = `result-message ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (timeUp) {
        resultMessage.textContent = '⏰ ¡Se acabó el tiempo! La respuesta correcta era el otro correo.';
    } else {
        resultMessage.textContent = isCorrect ? 
            '✅ ¡Correcto! Has identificado el correo legítimo' : 
            '❌ Incorrecto. Has seleccionado el correo de phishing';
    }
    
    // Show explanation
    showExplanation(currentScenario);
    
    // Update next button
    const nextButton = document.getElementById('next-button');
    if (currentRound < totalRounds) {
        nextButton.style.display = 'inline-block';
        nextButton.innerHTML = '<i class="fas fa-arrow-right"></i> Siguiente Ronda';
        nextButton.onclick = () => nextRound();
    } else {
        nextButton.style.display = 'inline-block';
        nextButton.innerHTML = '<i class="fas fa-trophy"></i> Ver Resultados Finales';
        nextButton.onclick = () => showFinalResults();
    }
}

// Show explanation for current scenario
function showExplanation(scenario) {
    const explanationTitle = document.getElementById('explanation-title');
    const explanationList = document.getElementById('explanation-list');
    
    // Determine if user selected correctly
    const userSelectedCorrectly = selectedEmail === scenario.currentCorrectAnswer;
    
    if (userSelectedCorrectly) {
        // Show why the legitimate email is correct
        explanationTitle.textContent = 'Por qué el Correo es Legítimo:';
        explanationList.innerHTML = '';
        
        scenario.explanation.legitimate.forEach(point => {
            const li = document.createElement('li');
            li.innerHTML = `✅ ${point}`;
            li.style.color = '#4ade80';
            explanationList.appendChild(li);
        });
    } else {
        // Show why the phishing email is incorrect
        explanationTitle.textContent = 'Por qué el Correo es Phishing:';
        explanationList.innerHTML = '';
        
        scenario.explanation.phishing.forEach(point => {
            const li = document.createElement('li');
            li.innerHTML = `❌ ${point}`;
            li.style.color = '#ef4444';
            explanationList.appendChild(li);
        });
        
        // Add separator and legitimate reasons
        const separator = document.createElement('div');
        separator.style.margin = '20px 0';
        separator.style.borderTop = '2px solid rgba(59, 130, 246, 0.3)';
        explanationList.appendChild(separator);
        
        const legitimateTitle = document.createElement('h4');
        legitimateTitle.textContent = 'El Correo Legítimo era:';
        legitimateTitle.style.color = '#4ade80';
        legitimateTitle.style.marginBottom = '10px';
        explanationList.appendChild(legitimateTitle);
        
        scenario.explanation.legitimate.forEach(point => {
            const li = document.createElement('li');
            li.innerHTML = `✅ ${point}`;
            li.style.color = '#4ade80';
            explanationList.appendChild(li);
        });
    }
}

// Move to next round
function nextRound() {
    currentRound++;
    if (currentRound <= totalRounds) {
        showScreen('game');
        loadRound();
    } else {
        showFinalResults();
    }
}

// Show final results
function showFinalResults() {
    showScreen('final');
    
    document.getElementById('final-score').textContent = score;
    
    const finalMessage = document.getElementById('final-message');
    let messageClass = '';
    let messageText = '';
    
    if (score === 5) {
        messageClass = 'perfect';
        messageText = '🏆 ¡Perfecto! Eres un experto en detectar phishing. Has identificado correctamente los 5 correos legítimos.';
    } else if (score === 4) {
        messageClass = 'excellent';
        messageText = '🎯 ¡Excelente! Tienes muy buenas habilidades de detección. 4 de 5 respuestas correctas.';
    } else if (score === 3) {
        messageClass = 'good';
        messageText = '👍 ¡Bien hecho! Tienes buenos conocimientos sobre seguridad de correo. 3 de 5 respuestas correctas.';
    } else if (score === 2) {
        messageClass = 'needs-practice';
        messageText = '📚 Buen intento. Sigue practicando para mejorar tu capacidad de detectar phishing. 2 de 5 respuestas correctas.';
    } else if (score === 1) {
        messageClass = 'poor';
        messageText = '⚠️ Necesitas mejorar tus habilidades de detección. ¡Practica más! 1 de 5 respuestas correctas.';
    } else {
        messageClass = 'poor';
        messageText = '🚨 Necesitas estudiar más sobre phishing. ¡No te desanimes y vuelve a intentarlo! 0 de 5 respuestas correctas.';
    }
    
    finalMessage.className = `final-message ${messageClass}`;
    finalMessage.textContent = messageText;
}

// Restart game
function restartGame() {
    currentRound = 1;
    score = 0;
    selectedEmail = null;
    gameActive = false;
    
    // Shuffle scenarios again for restart
    shuffledScenarios = shuffleArray(emailScenarios);
    
    clearInterval(gameTimer);
    showScreen('instructions');
    updateDisplay();
}

// Update display elements
function updateDisplay() {
    const currentRoundElement = document.getElementById('current-round');
    const totalRoundsElement = document.getElementById('total-rounds');
    const scoreElement = document.getElementById('score');
    
    if (currentRoundElement) currentRoundElement.textContent = currentRound;
    if (totalRoundsElement) totalRoundsElement.textContent = totalRounds;
    if (scoreElement) scoreElement.textContent = score;
}

// Show specific screen
function showScreen(screenName) {
    // Hide all screens
    const screens = ['instructions', 'game', 'result', 'final'];
    screens.forEach(screen => {
        const screenElement = document.getElementById(`${screen}-screen`);
        if (screenElement) {
            screenElement.classList.add('hidden');
        }
    });
    
    // Show selected screen
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando juego...');
    initializeGame();
});

// Make functions globally available for HTML onclick handlers
window.startGame = startGame;
window.selectEmail = selectEmail;
window.nextRound = nextRound;
window.restartGame = restartGame;