import {
  Bot,
  GrammyError,
  HttpError,
  InputFile,
  Context as BaseContext,
} from "grammy";
import { Menu, MenuFlavor } from "@grammyjs/menu";
import { WELCOME_TEXT } from "./TEXTS";
import { MAIN_MENU } from "./Menus/Main";
import { BACK_TO_MAIN_BUTTON } from "./Buttons/BACK_TO_MAIN";
import { CITIES_BUTTONS } from "./Buttons/CITIES";

export type MyContext = BaseContext & MenuFlavor;

export const bot = new Bot<MyContext>(
  "6995981183:AAG8q5JMSr5moPUjxAu1lvc2FWurPqYAFrQ"
);

const dynamicMenu = new Menu("dynamic-menu").dynamic((ctx, range) => {
  range.text("Всегда здесь", (ctx) => ctx.reply("Эта кнопка всегда доступна."));
  if (ctx.from?.id) {
    // Проверяем, соответствует ли пользователь определенному условию
    range.text("Специальная кнопка", (ctx) =>
      ctx.reply("Вы видите эту кнопку, потому что ваш ID 123456.")
    );
  }
});

bot.use(dynamicMenu);

bot.command("menu2", async (ctx) => {
  await ctx.reply("Открываю динамическое меню:", { reply_markup: dynamicMenu });
});

const MAIN_IMAGE = new InputFile("./main.png");

// Make it interactive.
bot.use(CITIES_BUTTONS);
bot.use(MAIN_MENU);

// Handle the /start command.
bot.command("start", async (ctx) => {
  await ctx.replyWithPhoto(MAIN_IMAGE, {
    reply_markup: MAIN_MENU,
    caption: WELCOME_TEXT,
    parse_mode: "HTML",
  });
});

bot.on("callback_query", async (ctx) => {
  const callbackData = ctx.update.callback_query.data;

  if (callbackData === "main_page") {
    await ctx.editMessageCaption({
      caption: WELCOME_TEXT,
      reply_markup: MAIN_MENU,
      parse_mode: "HTML",
    });
  }

  if (callbackData?.startsWith("city_")) {
    const city = callbackData?.replace("city_", "");
    await ctx.editMessageCaption({
      caption: `Вы выбрали город <strong>${city}</strong>`,
      reply_markup: BACK_TO_MAIN_BUTTON,
      parse_mode: "HTML",
    });
  }

  await ctx.answerCallbackQuery();
});

bot.catch(async (err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }

  // await ctx.answerCallbackQuery();
});

bot.start();
