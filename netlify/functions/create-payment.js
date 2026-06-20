exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { course } = JSON.parse(event.body || "{}");

        const paymentLinks = {
            "Назва курсу": "https://send.monobank.ua/jar/ТВОЄ_ПОСИЛАННЯ1",
            "Назва курсу 2": "https://send.monobank.ua/jar/ТВОЄ_ПОСИЛАННЯ2",
            // додай свої
        };

        const paymentUrl = paymentLinks[course];

        if (!paymentUrl) {
            return { statusCode: 400, body: JSON.stringify({ error: "Невідомий курс" }) };
        }

        console.log(`Оплата: ${course}`);

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentUrl })
        };
    } catch (e) {
        return { statusCode: 500, body: "Server Error" };
    }
};