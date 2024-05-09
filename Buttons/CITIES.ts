import { Context, InlineKeyboard } from "grammy";
import { Menu } from "@grammyjs/menu";
import { bot, MyContext } from "../index";

// export const CITIES_BUTTONS = new InlineKeyboard()
//   .text("Москва", "city_moscow")
//   .text("Санкт-Петербург", "city_spb")
//   .text("Новосибирск", "city_novosibirsk")
//   .row()
//   .text("Екатеринбург", "city_ekb")
//   .text("Казань", "city_kazan")
//   .text("Нижний Новгород", "city_novgorod")
//   .row()
//   .text("Красноярск", "city_krasnoyarsk")
//   .text("Челябинск", "city_chelyabinsk")
//   .text("Самара", "city_samara")
//   .row()
//   .text("Уфа", "city_ufa")
//   .row()
//   .text("❌️ Отмена", "main_page");

interface ICities {
  [key: string]: string[];
}

const cities: ICities = {
  moscow: ["Центральный", "Северный", "Южный"],
  spb: ["Адмиралтейский", "Василеостровский", "Петроградский"],
  // Добавьте другие города и районы аналогично
};

export const CITIES_BUTTONS = new Menu<MyContext>("city-menu")
  .text("Москва", (ctx) => showDistricts(ctx, "moscow"))
  .row()
  .text("Санкт-Петербург", (ctx) => showDistricts(ctx, "spb"))
  .row()
  .text("Отмена", (ctx) => ctx.reply("Операция отменена"))
  .row()
  .submenu("districts", "district-menu");

const districtMenu = new Menu<MyContext>("district-menu");

CITIES_BUTTONS.register(districtMenu);

function showDistricts(ctx: MyContext, cityKey: string) {
  const districts = cities[cityKey];

  districts.forEach((district) => {
    districtMenu
      .text(district, (ctx) => ctx.reply(`Вы выбрали район: ${district}`))
      .row();
  });

  districtMenu.text("⬅️ Назад", (ctx) => ctx.menu.back()); // Возврат к меню городов

  ctx.menu.nav("district-menu-" + cityKey); // Переход к меню районов
}
