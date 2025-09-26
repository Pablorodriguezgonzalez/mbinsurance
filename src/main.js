document.addEventListener('DOMContentLoaded', function () {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (question) {
        question.addEventListener('click', function () {
            const answer = question.nextElementSibling;
            const toggle = question.querySelector('.faq-toggle');

            if (answer && toggle) {
                // Close all other answers
                document.querySelectorAll('.faq-answer.active').forEach(function (activeAnswer) {
                    if (activeAnswer !== answer) {
                        activeAnswer.classList.remove('active');
                        const otherQuestion = activeAnswer.previousElementSibling;
                        if (otherQuestion) {
                            const otherToggle = otherQuestion.querySelector('.faq-toggle');
                            if (otherToggle) {
                                otherToggle.textContent = '+';
                            }
                        }
                    }
                });

                // Toggle the clicked answer
                answer.classList.toggle('active');
                toggle.textContent = answer.classList.contains('active') ? '−' : '+';
            }
        });
    });

    // Testimonials Carousel
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const indicators = document.querySelectorAll('.indicator');

    function showTestimonial(index) {
        testimonialItems.forEach(function (item, i) {
            item.classList.toggle('active', i === index);
        });
        indicators.forEach(function (indicator, i) {
            indicator.classList.toggle('active', i === index);
        });
    }

    indicators.forEach(function (indicator, index) {
        indicator.addEventListener('click', function () {
            showTestimonial(index);
        });
    });

    // Expose the function to the global scope so it can be called from the HTML
    window.showTestimonial = showTestimonial;

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const message = document.getElementById('message').value;

            // Validar el número de teléfono
            const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (!phoneRegex.test(telefono)) {
                alert('Por favor, ingresa un número de teléfono válido con formato de Estados Unidos.');
                return;
            }

            // Enviar correo electrónico
            const templateParams = {
                from_name: name,
                from_email: email,
                from_phone: telefono,
                message: message,
                to_email: 'healthinsurance@mitziblanco.com'
            };

            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.');
                });
        });
    }
});
