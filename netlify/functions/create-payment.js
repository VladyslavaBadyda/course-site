// netlify/functions/create-payment.js
exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        const { course } = JSON.parse(event.body || "{}");

        // Твої реальні посилання (заміни на свої!)
        const paymentLinks = {
            "Назва курсу": "https://send.monobank.ua/jar/ТВОЄ_ПОСИЛАННЯ1",
            "Назва курсу 2": "https://send.monobank.ua/jar/ТВОЄ_ПОСИЛАННЯ2",
            "Назва курсу 3": "https://send.monobank.ua/jar/ТВОЄ_ПОСИЛАННЯ3",
        };

        const paymentUrl = paymentLinks[course];

        if (!paymentUrl) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Невідомий курс" })
            };
        }

        console.log(`Оплата для курсу: ${course}`);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentUrl })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};