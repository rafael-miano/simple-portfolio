document.addEventListener('alpine:init', () => {
    Alpine.data('skillsCircle', () => ({
        skills: [
            { img: "./assets/html.svg", label: "HTML" },
            { img: "./assets/css.svg", label: "CSS" },
            { img: "./assets/js.svg", label: "JavaScript" },
            { img: "./assets/php.svg", label: "PHP" },
            { img: "./assets/laravel.svg", label: "Laravel" },
            { img: "./assets/pgsql.svg", label: "PostgreSQL" },
            { img: "./assets/mysql.svg", label: "MySQL" },
            { img: "./assets/git.svg", label: "Git" },
            { img: "./assets/vuejs.svg", label: "VueJS" },
            { img: "./assets/flutter.svg", label: "Flutter" },
            { img: "./assets/postman.svg", label: "Postman" },
            { img: "./assets/sqlite.svg", label: "SQLite" }
        ],
        pos: 0,
        rotation: 0,
        N: 0,
        radius: 0,
        width: 0,
        height: 0,
        timer: null,

        init() {
            this.N = this.skills.length;
            this.resize();
            this.timer = setInterval(() => {
                this.next();
            }, 3500);
        },

        resize() {
            this.width = this.$refs.container.offsetWidth;
            this.height = this.$refs.container.offsetHeight;
            // Slightly bigger circle (radius increased)
            this.radius = (Math.min(this.width, this.height) / 2) - 55;
        },

        dotStyle(idx) {
            const stepAngle = 360 / this.N;
            const angle = (2 * Math.PI * idx) / this.N;
            const x = (this.width / 2) + this.radius * Math.cos(angle);
            const y = (this.height / 2) + this.radius * Math.sin(angle);

            const currentCircleRotation = this.rotation;
            const totalRotation = stepAngle * idx + currentCircleRotation;
            return `
                left:${x}px;
                top:${y}px;
                transform:
                    translate(-50%,-50%)
                    rotate(${stepAngle * idx}deg)
                    rotate(${-totalRotation}deg)
                    perspective(600px)
                    rotateY(${(idx === this.pos ? 15 : 0)}deg)
                    scale(${(idx === this.pos ? 1.13 : 1)});
                transition:
                    transform 1s cubic-bezier(.4,0,.2,1),
                    box-shadow .35s;
                z-index:${idx === this.pos ? 10 : 3};
            `;
        },

        setActive(idx) {
            this.pos = idx;
            this.rotation = -360 * this.pos / this.N;
        },

        next() {
            this.pos = (this.pos + 1) % this.N;
            this.rotation = -360 * this.pos / this.N;
        }
    }));
    Alpine.data('navbarActive', function () {
        return {
            activeSection: 'hi',
            sections: ['hi', 'skills', 'projects', 'experience', 'education', 'contact'],
            observers: [],
            clickLock: false,
            clickTimeout: null,
            init() {
                this.sections.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting && !this.clickLock) {
                                    this.activeSection = id;
                                }
                            });
                        }, { root: null, rootMargin: '0px', threshold: 0.3 });
                        observer.observe(el);
                        this.observers.push(observer);
                    }
                });
            },
            onNavClick(id) {
                this.activeSection = id;
                this.clickLock = true;
                clearTimeout(this.clickTimeout);
                this.clickTimeout = setTimeout(() => {
                    this.clickLock = false;
                }, 800);
            }
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        var yearSpan = document.getElementById('footer-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    });
});

AOS.init({ once: true, duration: 700, easing: 'cubic-bezier(.4,0,.2,1)' });