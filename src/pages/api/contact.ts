import type { APIRoute } from 'astro';

export const prerender = false; // Отключаем статику для этого эндпоинта

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, contact_info, message } = data;

    // Считываем токены из файла .env
    const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return new Response(
        JSON.stringify({ message: 'Telegram configuration is missing' }),
        { status: 500 }
      );
    }

    // Форматируем сообщение
    const text = `
🔥 <b>New Lead from Be Mako Website!</b>

👤 <b>Name:</b> ${name}
📩 <b>Contact:</b> ${contact_info}
💬 <b>Message:</b>
${message}
    `;

    // Отправляем запрос в Telegram API
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (response.ok) {
      return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
    } else {
      const errData = await response.json();
      return new Response(
        JSON.stringify({ message: errData.description || 'Telegram API Error' }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
};