document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle navigation
        navLinks.classList.toggle('nav-active');
        
        // Animate links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Hamburger animation
        hamburger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Close mobile menu if open
                if (navLinks.classList.contains('nav-active')) {
                    hamburger.click();
                }

                // Smooth scroll to target
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.menu-item, .about-text p');
    
    const reveal = () => {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check on load

    // Chatbot functionality
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Sample responses for the dummy chatbot
    const botResponses = {
        'hi': 'Hello! How can I assist you today?',
        'hello': 'Hi there! What can I help you with?',
        'menu': 'You can find our menu items in the Menu section above. We have delicious meals and refreshing beverages!',
        'hours': 'We are open Monday to Saturday, 11:00 AM to 10:00 PM.',
        'location': 'We are located in NSG IT Park, Aundh, Pune.',
        'delivery': 'Yes, we offer delivery services! You can place your order through our website or call us.',
        'contact': 'You can reach us at +91 1234567890 or email us at info@themealhouse.com',
        'default': 'I apologize, but I\'m not sure about that. Would you like to speak with our staff? You can call us at +91 1234567890.'
    };

    // Toggle chat window
    chatButton.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message.toLowerCase());
            addMessage(response, 'bot');
        }, 1000);
    }

    // Add message to chat
    function addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response
    function getBotResponse(message) {
        // Check for keywords in the message
        for (const [key, response] of Object.entries(botResponses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        return botResponses.default;
    }

    // Send message on button click
    sendButton.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}); 