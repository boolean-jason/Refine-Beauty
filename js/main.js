const BUSINESS = {
    name: "Refine Beauty",
    address: "Enschedepad 21, 1324 JC Almere",
    phoneDisplay: "06 87697816",
    phoneTel: "+31687697816",
    mapsLink: "https://maps.app.goo.gl/mPojqS2BMEVW1k4p7"
};

function waUrl(message) {
    // WhatsApp wa.me werkt het best met internationaal nummer zonder +
    const waNumber = BUSINESS.phoneTel.replace("+", "");
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message.trim())}`;
}

document.addEventListener("DOMContentLoaded", () => {
    // Year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Phone text placeholders
    const phoneText = document.getElementById("phoneText");
    const phoneText2 = document.getElementById("phoneText2");
    const phoneText3 = document.getElementById("phoneText3");
    if (phoneText) phoneText.textContent = BUSINESS.phoneDisplay;
    if (phoneText2) phoneText2.textContent = BUSINESS.phoneDisplay;
    if (phoneText3) phoneText3.textContent = BUSINESS.phoneDisplay;

    // Call links
    const callHref = `tel:${BUSINESS.phoneTel}`;
    const callChip = document.getElementById("callChip");
    const callSecondary = document.getElementById("callSecondary");
    const callButton = document.getElementById("callButton");
    const callLink = document.getElementById("callLink");
    [callChip, callSecondary, callButton, callLink].forEach(a => {
        if (a) a.href = callHref;
    });

    // Maps links
    const mapsChip = document.getElementById("mapsChip");
    const mapsButton = document.getElementById("mapsButton");
    const addressLink = document.getElementById("addressLink");
    [mapsChip, mapsButton, addressLink].forEach(a => {
        if (a) a.href = BUSINESS.mapsLink;
    });

    renderReviews(DEMO_REVIEWS);

    // WhatsApp CTAs
    const primary = document.getElementById("ctaPrimary");
    const waBtn = document.getElementById("whatsappBtn");
    const waFab = document.getElementById("whatsappFab");

    const defaultMsg =
        `Hoi ${BUSINESS.name}, ik wil graag een afspraak maken.\n\n` +
        `Naam:\n` +
        `Behandeling:\n` +
        `Voorkeur dag/tijd:\n`;

    const defaultWa = waUrl(defaultMsg);
    [primary, waBtn, waFab].forEach(a => {
        if (a) a.href = defaultWa;
    });

    // Form -> open WhatsApp with filled message
    const form = document.getElementById("waForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const naam = String(data.get("naam") || "").trim();
            const behandeling = String(data.get("behandeling") || "").trim();
            const tijd = String(data.get("tijd") || "").trim();

            const msg =
                `Hoi ${BUSINESS.name}, ik wil graag een afspraak maken.\n\n` +
                `Naam: ${naam}\n` +
                `Behandeling: ${behandeling}\n` +
                `Voorkeur dag/tijd: ${tijd || "-"}\n`;

            window.open(waUrl(msg), "_blank", "noopener");
        });
    }

    // Map embed (privacy-vriendelijk: query embed, geen exacte place-id nodig)
    const mapFrame = document.getElementById("mapFrame");
    if (mapFrame) {
        const q = encodeURIComponent(`${BUSINESS.name}, ${BUSINESS.address}`);
        mapFrame.src = `https://www.google.com/maps?q=${q}&output=embed`;
    }

    // Mobile nav toggle
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("nav");
    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            const open = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }
});

const DEMO_REVIEWS = [
    { name: "Latoyah Alleyne", stars: 5, text: "Een zeer vriendelijke kapster waar je je gelijk welkom bij voelt en met je mee denkt/uitgebreid advies geeft! Ik kon alles vragen. Hele fijne comfortabele “huiselijke” omgeving. Er wordt hygiënisch te werk gegaan, zoals van te voren het ontsmetten van de handen etc. Zeer kundig ze heeft veel kennis over loc technieken en aandacht voor het haargezondheid. Echt een aanrader!! Ik kom zeker terug." },
    { name: "Tom Mieremet", stars: 5, text: "Wat een geweldige ervaring! Mijn vrouw is fantastisch geholpen met haar haar. Alles werd met zoveel zorg, precisie en vakmanschap gedaan. De service is echt top!! Professioneel, vriendelijk en warm. De twee zussen die de salon runnen zijn kundig, geduldig en laten je je direct op je gemak voelen. Wij zijn allebei ontzettend enthousiast en meer dan tevreden. Absoluut een aanrader! Was de rit meer dan waard!" },
    { name: "Anchi Haratog", stars: 5, text: "Eerste keer cornrows gezet en ben super blij met het eindresultaat. Zo lief ontvangen! Ik heb me laten verassen en weet zeker dat k de volgende keer weer terug kom om nieuwe te laten zetten. Vriendelijke, gezellige, warme en huiselijke sfeer. Thanks voor je hulp" }
];

function renderReviews(reviews) {
    const grid = document.getElementById("reviewGrid");
    if (!grid) return;
    grid.innerHTML = reviews.map(r => `
    <article class="review">
      <div class="stars" aria-label="${r.stars} van 5 sterren">${"★★★★★".slice(0, r.stars)}${"☆☆☆☆☆".slice(0, 5 - r.stars)}</div>
      <p>${r.text}</p>
      <div class="who">${r.name}</div>
      <div class="meta">Google review</div>
    </article>
  `).join("");
}

// Service filtering
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".price-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const category = tab.dataset.category;

    cards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
