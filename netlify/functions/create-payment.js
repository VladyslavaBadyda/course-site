// netlify/functions/create-payment.js

exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: JSON.stringify({ error: "Метод не дозволено" }) };
    }

    try {
        const { course, honeypot } = JSON.parse(event.body);

        // Захист від ботів
        if (honeypot) {
            console.log("Бот спробував відправити форму");
            return { statusCode: 400, body: JSON.stringify({ error: "Помилка" }) };
        }

        if (!course) {
            return { statusCode: 400, body: JSON.stringify({ error: "Оберіть курс" }) };
        }

        // Платіжні посилання — тільки тут!
        const paymentLinks = {
            "Назва курсу": "https://send.monobank.ua/jar/AAAA",
            "Назва курсу 2": "https://send.monobank.ua/jar/BBBB",
            "Назва курсу 3": "https://send.monobank.ua/jar/CCCC",
            // Додавай нові курси сюди
        };

        const paymentUrl = paymentLinks[course];

        if (!paymentUrl) {
            return { statusCode: 400, body: JSON.stringify({ error: "Невідомий курс" }) };
        }

        // Логування (буде видно в Netlify dashboard)
        console.log(`✅ Нова заявка: ${course} | IP: ${event.headers['client-ip'] || 'unknown'}`);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                paymentUrl,
                message: "Ок"
            })
        };

    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ error: "Помилка сервера" }) };
    }
};