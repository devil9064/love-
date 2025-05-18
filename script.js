const messages = [
    "Happy birthday Cute Girl Tasmia \u2764\ufe0f", // heart emoji
    "I have to say you something...",
    "I Love You."
];

let currentPage = 0;
const animatedText = document.getElementById('animated-text');
const nextBtn = document.getElementById('next-btn');
const mainImg = document.getElementById('main-img');
const loveSection = document.getElementById('love-section');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

function typeWriter(text, i, cb) {
    if (i < text.length) {
        animatedText.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        setTimeout(() => typeWriter(text, i + 1, cb), 40);
    } else {
        animatedText.innerHTML = text;
        if (cb) cb();
    }
}

function showPage(page) {
    if (page === 0) {
        mainImg.style.display = 'block';
        loveSection.style.display = 'none';
    } else if (page === 1) {
        mainImg.style.display = 'none';
        loveSection.style.display = 'none';
    } else if (page === 2) {
        mainImg.style.display = 'none';
        nextBtn.style.display = 'none';
        typeWriter(messages[page], 0, () => {
            // Add a cute heart animation
            animatedText.innerHTML = '<span class="heart">&#10084;&#65039;</span><br>' + messages[page];
            loveSection.style.display = 'flex';
        });
        return;
    }
    typeWriter(messages[page], 0);
    if (page < 2) {
        nextBtn.style.display = 'inline-block';
    }
}

nextBtn.addEventListener('click', () => {
    if (currentPage < messages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
});

// No button moves to a random position within the love-buttons div
noBtn.addEventListener('mouseover', () => {
    const parent = noBtn.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    // Calculate max left/top so button stays in parent
    const maxLeft = parent.offsetWidth - btnRect.width;
    const maxTop = parent.offsetHeight - btnRect.height;
    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;
    noBtn.style.position = 'absolute';
    noBtn.style.left = left + 'px';
    noBtn.style.top = top + 'px';
});

// Yes button sends a log to Discord webhook
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1373762178070479090/2HSRBFyyG_wRCXd1mGId-_6FTo01y_2YXIGRQoueszt8ZY_-frrRYMonm8YLLsMO2bjO'; // <-- Replace with your webhook

yesBtn.addEventListener('click', () => {
    yesBtn.innerText = 'Sent!';
    yesBtn.disabled = true;
    fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: 'She said YES! 💖' })
    });
    animatedText.innerHTML = '<span class="heart">&#10084;&#65039;</span><br>Love you too!';
});

// Initial load
showPage(currentPage); 
