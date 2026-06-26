const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav");
const form = document.querySelector("#course-form");
const courseSelect = document.querySelector("#course-select");

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

document.querySelectorAll(".course-select").forEach((button) => {
    button.addEventListener("click", () => {
        courseSelect.value = button.dataset.course;
        document.querySelector("#apply").scrollIntoView({ behavior: "smooth" });
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Форма тепер не відправляється, бо оплата через кнопку
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));