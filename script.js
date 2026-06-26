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

    document.querySelector("#apply").scrollIntoView({
      behavior: "smooth",
    });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
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
  {
    threshold: 0.12,
  }
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

/* ===========================
        PAYMENT MODAL
=========================== */

const payButton = document.getElementById("pay-button");

const modal = document.getElementById("payment-modal");

const closeButton = document.querySelector(".payment-close");

const paymentCourse = document.querySelector(".payment-course");

const telegramLink = document.getElementById("telegram-link");

if (payButton) {
  payButton.addEventListener("click", () => {

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    const name = data.get("name");
    const course = data.get("course");

    const message =
      `Добрий день!

Я оплатив(ла) курс.

👤 Ім'я: ${name}

📚 Курс: ${course}

Зараз надішлю чек.`;

    telegramLink.href =
      `https://t.me/+380969453376?text=${encodeURIComponent(message)}`;

    paymentCourse.innerHTML = `
📚 <strong>${course}</strong>
`;

    modal.classList.add("show");
  });
}

if (closeButton) {
  closeButton.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.remove("show");
  }
});