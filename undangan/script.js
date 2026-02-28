// Smooth Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// Countdown Timer
const countDownDate = new Date("Dec 20, 2025 08:00:00").getTime();

const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<h3 style='color:var(--gold);'>Acara Sedang Berlangsung</h3>";
    }
}, 1000);

// RSVP Form & LocalStorage
const form = document.getElementById('rsvpForm');
const greetingList = document.getElementById('greetingList');

function loadGreetings() {
    const greetings = JSON.parse(localStorage.getItem('wedding_greetings')) || [];
    greetingList.innerHTML = '';

    if (greetings.length === 0) {
        greetingList.innerHTML = '<p style="text-align:center; color: var(--text-muted); font-size:0.9rem;">Belum ada ucapan. Jadilah yang pertama!</p>';
        return;
    }

    greetings.reverse().forEach(g => {
        const item = document.createElement('div');
        item.className = 'greeting-item';

        let badgeColor = g.attendance === 'Hadir' ? 'color:#d4af37; background:rgba(212,175,55,0.1);' : 'color:#aaa; background:rgba(170,170,170,0.1);';

        item.innerHTML = `
            <h4>${g.name}</h4>
            <span style="${badgeColor}">${g.attendance} • ${g.guests} Tamu</span>
            <p>${g.message}</p>
        `;
        greetingList.appendChild(item);
    });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const guests = document.getElementById('guests').value;
    const message = document.getElementById('message').value;

    const newGreeting = { name, attendance, guests, message, date: new Date().toISOString() };

    const greetings = JSON.parse(localStorage.getItem('wedding_greetings')) || [];
    greetings.push(newGreeting);

    localStorage.setItem('wedding_greetings', JSON.stringify(greetings));

    form.reset();
    loadGreetings();
});

// Load initially
loadGreetings();
