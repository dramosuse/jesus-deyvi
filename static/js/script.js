/* ================= PARTICULAS ================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + .5;

        this.speedX =
            (Math.random() - .5) * .5;

        this.speedY =
            (Math.random() - .5) * .5;

    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(0,255,136,.7)";

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const amount =
        Math.min(
            100,
            Math.floor(
                window.innerWidth / 10
            )
        );

    for (let i = 0; i < amount; i++) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();


function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 120) {

                const opacity =
                    1 - distance / 120;

                ctx.strokeStyle =
                    `rgba(0,255,136,${opacity * .15})`;

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );

    connectParticles();

    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* ================= CURSOR ================= */

const cursor =
    document.querySelector(".cursor");


document.addEventListener(
    "mousemove",
    (event) => {

        cursor.style.left =
            event.clientX + "px";

        cursor.style.top =
            event.clientY + "px";

    }
);


document.querySelectorAll("a, button")
.forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => {

            cursor.style.width = "40px";

            cursor.style.height = "40px";

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            cursor.style.width = "20px";

            cursor.style.height = "20px";

        }
    );

});


/* ================= MENU ================= */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.querySelector(".navbar nav");


menuBtn.addEventListener(
    "click",
    () => {

        nav.classList.toggle("active");

    }
);


document.querySelectorAll(
    ".navbar nav a"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            nav.classList.remove(
                "active"
            );

        }
    );

});