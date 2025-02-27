document.addEventListener("DOMContentLoaded", function() {
    const chatbot = document.getElementById("chatbot");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    const initialMessages = [
        {
            profileImg: "ia.jpg",
            content: `<h1><span class="titulo-azul">¡Hola Bienvenido!</span> Este es el equipo Winipini y te enseñaremos sobre <strong>TU HUELLA DIGITAL</strong></h1>`,
        },
        {
            profileImg: "ia.jpg",
            content: `<p><span class="texto-azul">¿Cuál es tu nombre? Chiquill@</span></p>`,
        }
    ];

    let isMenuStep = false; // Variable para controlar si estamos en el paso del menú
    let isNameStep = true; // Variable para controlar si estamos en el paso de pedir el nombre
    let isOptionStep = false; // Variable para controlar si estamos en el paso de esperar una opción del menú

    function createChatBubble(profileImg, content, isUser = false) {
        const bubble = document.createElement("div");
        bubble.classList.add("chat-bubble");
        if (isUser) bubble.classList.add("user-bubble");

        const img = document.createElement("img");
        img.src = profileImg;
        img.alt = "Perfil";
        img.classList.add("profile-pic");

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("bubble-content");
        contentDiv.innerHTML = content;

        bubble.appendChild(img);
        bubble.appendChild(contentDiv);

        return bubble;
    }

    function displayInitialMessages() {
        initialMessages.forEach(msg => {
            chatbot.appendChild(createChatBubble(msg.profileImg, msg.content));
        });
    }

    function handleUserInput(userMessage) {
        const lowerCaseMessage = userMessage.trim().toLowerCase();
        const normalizedMessage = lowerCaseMessage.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (isNameStep) {
            isNameStep = false; // Salimos del paso de pedir el nombre
            const response = {
                profileImg: "ia.jpg",
                content: `
                    <p class="texto-azul">Mucho gusto "${userMessage}", ¿Qué quieres saber de tu huella digital? Ya que todos tenemos una.</p>
                    <p>A continuación te enviaré el menú para que puedas ser un/a ciudadan@ informad@.</p>
                    <p>Envía <span class="texto-morado">"MENU"</span></p>
                `,
            };
            chatbot.appendChild(createChatBubble(response.profileImg, response.content));
            isMenuStep = true; // Esperando respuesta para mostrar el menú
        } else if (isMenuStep) {
            if (normalizedMessage === "menu" || normalizedMessage === "menú") {
                displayMenu();
                isMenuStep = false; // Salimos del paso del menú
                isOptionStep = true; // Ahora estamos esperando una opción del menú
            } else {
                chatbot.appendChild(createChatBubble("ia.jpg", `<p>Por favor, envía "MENU" para continuar.</p>`));
            }
        } else if (isOptionStep) {
            if (["1", "2", "3", "4", "5"].includes(normalizedMessage)) {
                handleMenuOption(normalizedMessage);
            } else if (normalizedMessage === "menu" || normalizedMessage === "menú") {
                displayMenu();
            } else {
                chatbot.appendChild(createChatBubble("ia.jpg", `<p>Por favor, envía un número entre 1 y 5, o "MENU" para volver a ver el menú.</p>`));
            }
        }
    }

    function displayMenu() {
        const menu = {
            profileImg: "ia.jpg",
            content: `
                <p>MENÚ:</p>
                <p class="menu-azulito">Envía: "1" - Para saber ¿QUÉ ES LA HUELLA DIGITAL?</p>
                <p class="menu-azulito">Envía: "2" - Cómo controlar tu huella digital</p>
                <p class="menu-azulito">Envía: "3" - Qué hacer en el caso de que suban algo incorrecto o sin tu permiso</p>
                <p class="menu-azulito">Envía: "4" - Importancia de la huella digital en el área laboral y académica</p>
                <p class="menu-azulito">Envía: "5" - Fuentes, artículos y videos para saber más</p>
            `,
        };
        chatbot.appendChild(createChatBubble(menu.profileImg, menu.content));
    }

    function handleMenuOption(option) {
        switch (option) {
            case "1":
                handleOption1();
                break;
            case "2":
                handleOption2();
                break;
            case "3":
                handleOption3();
                break;
            case "4":
                handleOption4();
                break;
            case "5":
                handleOption5();
                break;
            default:
                chatbot.appendChild(createChatBubble("ia.jpg", `<p>Por favor, envía un número entre 1 y 5, o "MENU" para volver a ver el menú.</p>`));
        }
        isOptionStep = true; // Volvemos a esperar otra opción del menú
    }

    function handleOption1() {
        chatbot.appendChild(createChatBubble("ia.jpg", `
            <h2>¿Qué es la huella digital?</h2>
            <p>La huella digital es el rastro que dejamos en internet al interactuar en redes sociales, navegar por sitios web, hacer compras en línea, y más. Incluye datos como nuestras publicaciones, comentarios, búsquedas y compras.</p>
            <p>Envía otro número para conocer más sobre algo, o "MENU" para volver a ver el menú.</p>
        `));
    }

    function handleOption2() {
        chatbot.appendChild(createChatBubble("ia.jpg", `
            <h2>Cómo controlar tu huella digital</h2>
            <p>Revisa regularmente la configuración de privacidad de tus cuentas, utiliza contraseñas seguras, piensa antes de publicar, y mantén actualizado tu software de seguridad.</p>
            <p>Envía otro número para conocer más sobre algo, o "MENU" para volver a ver el menú.</p>
        `));
    }

    function handleOption3() {
        chatbot.appendChild(createChatBubble("ia.jpg", `
            <h2>Qué hacer si alguien sube algo incorrecto o sin tu permiso</h2>
            <p>Contacta al administrador de la plataforma para solicitar la eliminación del contenido. También puedes informar a las autoridades si es necesario y tomar medidas legales si corresponde.</p>
            <p>Envía otro número para conocer más sobre algo, o "MENU" para volver a ver el menú.</p>
        `));
    }

    function handleOption4() {
        chatbot.appendChild(createChatBubble("ia.jpg", `
            <h2>Importancia de la huella digital en el área laboral y académica</h2>
            <p>Los empleadores y las instituciones académicas pueden revisar tu huella digital para evaluar tu reputación y comportamiento. Mantén una presencia en línea positiva y profesional.</p>
            <p>Envía otro número para conocer más sobre algo, o "MENU" para volver a ver el menú.</p>
        `));
    }

    function handleOption5() {
        chatbot.appendChild(createChatBubble("ia.jpg", `
            <h2>Fuentes, artículos y videos para saber más</h2>
            <p>Aquí tienes algunas fuentes útiles para profundizar en el tema de la huella digital:</p>
            <ul>
                <li><a href="https://www.ibm.com/mx-es/topics/digital-footprint">IBM - Huella digital</a></li>
                <li><a href="https://liec.dgb.unam.mx/index.php/investiga/huella-digital">UNAM - Huella digital</a></li>
                <li><a href="https://youtu.be/xMaajB6WXrA?si=iQ7pu1hBVEqdnDm4">YouTube - Huella Digital y Privacidad</a></li>
            </ul>
            <p>Envía otro número para conocer más sobre algo, o "MENU" para volver a ver el menú.</p>
        `));
    }

    sendBtn.addEventListener("click", function() {
        const userMessage = userInput.value;
        if (userMessage.trim() !== "") {
            userInput.value = ""; // Clear input field
            chatbot.appendChild(createChatBubble("usuario.jpg", `<p>${userMessage}</p>`, true));
            handleUserInput(userMessage);
        }
    });

    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendBtn.click();
        }
    });

    displayInitialMessages();
});