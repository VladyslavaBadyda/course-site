form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedCourse = courseSelect.value.trim();
    const honeypot = document.querySelector("#honeypot").value; // приховане поле

    if (!selectedCourse) {
        alert("Будь ласка, оберіть курс");
        return;
    }

    // Показуємо успіх
    form.querySelector(".form-success").classList.add("visible");

    try {
        const response = await fetch("/.netlify/functions/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                course: selectedCourse,
                honeypot: honeypot   // для перевірки ботів
            })
        });

        const data = await response.json();

        if (response.ok && data.paymentUrl) {
            setTimeout(() => {
                window.open(data.paymentUrl, "_blank");
            }, 1300);
        } else {
            alert(data.error || "Щось пішло не так");
        }
    } catch (error) {
        console.error(error);
        alert("Помилка з'єднання. Спробуйте пізніше.");
    }
});