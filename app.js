let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
const coords = { x: 0, y: 0 };
const circlesContainer = document.getElementById("circles-container");
const circles = document.querySelectorAll(".circle");
const downloadBtn = document.getElementById('download-resume-btn');

    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = 'resume.pdf'; 
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click(); 
        document.body.removeChild(link);
    });

const colors = ["#4fc3dc", "#04c1ea", "#00befa", "#00b9ff", "#00b3ff", "#00acff", "#00a2ff", "#4f96ff", "#8785ff", "#b470ff", "#dc51ff", "#ff00ff"];

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y + window.scrollY;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}
animateCircles();

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href* = ' + id + ' ]').classList.add('active')
            })
        }
    })
}
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}