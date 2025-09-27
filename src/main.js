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
    const carousel = document.querySelector('.testimonials-carousel');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const indicators = document.querySelectorAll('.indicator');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        currentTestimonial = index;
        const offset = testimonialItems[index].offsetLeft;
        carousel.scrollLeft = offset;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentTestimonial);
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showTestimonial(index));
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
        // Snap to the nearest testimonial
        const itemWidth = testimonialItems[0].offsetWidth;
        const newIndex = Math.round(carousel.scrollLeft / itemWidth);
        showTestimonial(newIndex);
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; //scroll-fast
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Update indicators on scroll
    carousel.addEventListener('scroll', () => {
        const itemWidth = testimonialItems[0].offsetWidth;
        const newIndex = Math.round(carousel.scrollLeft / itemWidth);
        if (newIndex !== currentTestimonial) {
            currentTestimonial = newIndex;
            updateIndicators();
        }
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
