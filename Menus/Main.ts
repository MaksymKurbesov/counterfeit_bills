import { Menu } from "@grammyjs/menu";
import { BUY_TEXT, FEATURES_TEXT } from "../TEXTS";
import { CITIES_BUTTONS } from "../Buttons/CITIES";
import { BACK_TO_MAIN_BUTTON } from "../Buttons/BACK_TO_MAIN";
import { MyContext } from "../index";

export const MAIN_MENU = new Menu<MyContext>("main_menu")
  .text("💶 Купить", async (ctx) => {
    await ctx.editMessageCaption({
      caption: BUY_TEXT,
      reply_markup: CITIES_BUTTONS,
      parse_mode: "HTML",
    });
  })
  .row()
  .text(`✅ Преимущества`, async (ctx) => {
    await ctx.editMessageCaption({
      caption: FEATURES_TEXT,
      reply_markup: BACK_TO_MAIN_BUTTON,
      parse_mode: "HTML",
    });
  })
  .text(`🤔 Почему мы?`, (ctx) => {
    console.log("Why us?");
  })
  .row()
  .text("🗂 Отзывы", (ctx) => {
    console.log("Reviews");
  })
  .text("🆘 Support", (ctx) => {
    console.log("Support");
  })
  .row();
