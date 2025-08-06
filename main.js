document.addEventListener('DOMContentLoaded', function() {
            // --- Element Selectors ---
            const header = document.getElementById('header');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const scrollToTopBtn = document.getElementById('scrollToTopBtn');

            // --- Particle Animation Setup ---
            const canvas = document.getElementById('particles-canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            let particlesArray;

            // Particle class
            class Particle {
                constructor(x, y, directionX, directionY, size, color) {
                    this.x = x;
                    this.y = y;
                    this.directionX = directionX;
                    this.directionY = directionY;
                    this.size = size;
                    this.color = color;
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
                update() {
                    if (this.x > canvas.width || this.x < 0) {
                        this.directionX = -this.directionX;
                    }
                    if (this.y > canvas.height || this.y < 0) {
                        this.directionY = -this.directionY;
                    }
                    this.x += this.directionX;
                    this.y += this.directionY;
                    this.draw();
                }
            }

            // Create particle array
            function initParticles() {
                particlesArray = [];
                let numberOfParticles = (canvas.height * canvas.width) / 9000;
                for (let i = 0; i < numberOfParticles; i++) {
                    let size = (Math.random() * 2) + 1;
                    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                    let directionX = (Math.random() * .4) - .2;
                    let directionY = (Math.random() * .4) - .2;
                    let color = 'rgba(165, 180, 252, 0.5)';
                    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
                }
            }

            // Animation loop
            function animateParticles() {
                requestAnimationFrame(animateParticles);
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                }
            }
            
            initParticles();
            animateParticles();

            window.addEventListener('resize', () => {
                canvas.width = innerWidth;
                canvas.height = innerHeight;
                initParticles();
            });


            // --- Basic UI Interactivity ---
            window.addEventListener('scroll', () => {
                header.classList.toggle('bg-slate-900/80', window.scrollY > 50);
                header.classList.toggle('backdrop-blur-sm', window.scrollY > 50);
                header.classList.toggle('shadow-lg', window.scrollY > 50);
            });

            mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
            });

            window.addEventListener('scroll', () => scrollToTopBtn.classList.toggle('hidden', window.pageYOffset <= 300));
            scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

            const revealElements = document.querySelectorAll('.reveal');
            const revealOnScroll = () => {
                const windowHeight = window.innerHeight;
                revealElements.forEach(el => {
                    if (el.getBoundingClientRect().top < windowHeight - 100) {
                        el.classList.add('active');
                    }
                });
            };
            window.addEventListener('scroll', revealOnScroll);
            revealOnScroll();
        });