// Menu for the public phone demo: "Golden Lotus Kitchen", a fictional restaurant. The data is
// synthetic. This module is the only source of items, prices, and choices: the voice model never
// supplies them. Money is integer cents; totals are before tax.

export type MenuOption = { id: string; name: string; nameZh: string };
export type MenuSlot = {
  id: string;
  name: string;
  nameZh: string;
  options: MenuOption[];
  /** If set, this choice is only asked for when an earlier choice has one of these option ids. */
  onlyWhen?: { slot: string; in: string[] };
};
export type MenuItem = {
  id: string;
  name: string;
  nameZh: string;
  note?: string;
  section: string;
  priceCents: number;
  aliases: string[];
  /** Every slot listed here is a required choice (subject to onlyWhen). */
  slots: MenuSlot[];
};

export const RESTAURANT = { name: "Golden Lotus Kitchen" };

const spice: MenuSlot = {
  id: "spice",
  name: "Spice level",
  nameZh: "辣度",
  options: [
    { id: "mild", name: "Mild", nameZh: "微辣" },
    { id: "medium", name: "Medium", nameZh: "中辣" },
    { id: "spicy", name: "Spicy", nameZh: "辣" },
  ],
};

const SPICY_MAINS = ["kung-pao-chicken", "mapo-tofu"];

export const MENU: MenuItem[] = [
  { id: "spring-rolls", name: "Spring Rolls", nameZh: "春卷", note: "2 pieces", section: "Appetizers", priceCents: 595, aliases: ["spring roll", "egg rolls"], slots: [] },
  {
    id: "pork-dumplings",
    name: "Pork Dumplings",
    nameZh: "猪肉饺子",
    note: "6 pieces",
    section: "Appetizers",
    priceCents: 895,
    aliases: ["dumplings", "potstickers", "饺子", "水饺"],
    slots: [
      {
        id: "cooking",
        name: "Cooking style",
        nameZh: "做法",
        options: [
          { id: "steamed", name: "Steamed", nameZh: "蒸" },
          { id: "pan-fried", name: "Pan-fried", nameZh: "煎" },
        ],
      },
    ],
  },
  { id: "hot-and-sour-soup", name: "Hot and Sour Soup", nameZh: "酸辣汤", section: "Appetizers", priceCents: 495, aliases: ["hot sour soup"], slots: [] },
  { id: "kung-pao-chicken", name: "Kung Pao Chicken", nameZh: "宫保鸡丁", note: "with steamed rice", section: "Mains", priceCents: 1495, aliases: ["kung pao", "gong bao chicken"], slots: [spice] },
  { id: "mapo-tofu", name: "Mapo Tofu", nameZh: "麻婆豆腐", note: "with steamed rice", section: "Mains", priceCents: 1295, aliases: ["ma po tofu", "mapo"], slots: [spice] },
  { id: "beef-with-broccoli", name: "Beef with Broccoli", nameZh: "西兰花牛肉", note: "with steamed rice", section: "Mains", priceCents: 1595, aliases: ["beef broccoli", "broccoli beef"], slots: [] },
  { id: "sweet-and-sour-pork", name: "Sweet and Sour Pork", nameZh: "糖醋里脊", note: "with steamed rice", section: "Mains", priceCents: 1495, aliases: ["sweet sour pork"], slots: [] },
  { id: "beef-chow-mein", name: "Beef Chow Mein", nameZh: "牛肉炒面", section: "Noodles and rice", priceCents: 1395, aliases: ["chow mein", "炒面"], slots: [] },
  { id: "yangzhou-fried-rice", name: "Yangzhou Fried Rice", nameZh: "扬州炒饭", section: "Noodles and rice", priceCents: 1295, aliases: ["fried rice", "yang chow fried rice", "炒饭"], slots: [] },
  {
    id: "lunch-combo",
    name: "Lunch Combo",
    nameZh: "午餐套餐",
    note: "one main plus Spring Rolls and Hot and Sour Soup",
    section: "Combos",
    priceCents: 1795,
    aliases: ["combo", "lunch special", "套餐"],
    slots: [
      {
        id: "main",
        name: "Main",
        nameZh: "主菜",
        options: [
          { id: "kung-pao-chicken", name: "Kung Pao Chicken", nameZh: "宫保鸡丁" },
          { id: "mapo-tofu", name: "Mapo Tofu", nameZh: "麻婆豆腐" },
          { id: "beef-with-broccoli", name: "Beef with Broccoli", nameZh: "西兰花牛肉" },
          { id: "sweet-and-sour-pork", name: "Sweet and Sour Pork", nameZh: "糖醋里脊" },
        ],
      },
      { ...spice, onlyWhen: { slot: "main", in: SPICY_MAINS } },
    ],
  },
  {
    id: "soft-drink",
    name: "Soft Drink",
    nameZh: "汽水",
    section: "Drinks",
    priceCents: 250,
    aliases: ["soda", "pop", "coke", "sprite", "diet coke"],
    slots: [
      {
        id: "drink",
        name: "Drink",
        nameZh: "饮料",
        options: [
          { id: "coke", name: "Coke", nameZh: "可乐" },
          { id: "sprite", name: "Sprite", nameZh: "雪碧" },
          { id: "diet-coke", name: "Diet Coke", nameZh: "健怡可乐" },
        ],
      },
    ],
  },
  { id: "hot-jasmine-tea", name: "Hot Jasmine Tea", nameZh: "茉莉花茶", section: "Drinks", priceCents: 295, aliases: ["jasmine tea", "tea", "茶", "花茶"], slots: [] },
];

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
