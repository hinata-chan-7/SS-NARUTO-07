const axios = require("axios");

const apiList = "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "অরেক বেডারে Miss না করে xan মেয়ে হলে বস সাহু রে হাঙ্গা করো😶👻😘",
    "miss u too": "হুম আমি ও তোমাকে Miss করি... কিন্তু সাহু বস বেশি করে 😏💖",
    "kiss de": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️",
    "hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
    "bc": "SAME TO YOU😊",
    "bro": "mabye ওটা ব্র হবে 🫥""bro যখন বলেছো অধেক সোম্পিত লিখে দিও কেমন 😚""bro বলে ভাই হয়া যায় না বিকাশ no. দিচ্ছি টাকা দাও🤗",
    "good morning": "আরে ওকে good morning বলিস না ও এখন হাগু করতে যাবে 🙎🏻‍♂️""কিরে তোর তো বিয়ে হয়নি টা রাত জাগিস কেনো 🌚🙈""ছুবিনা আগে ফরজ গোসল করে এই যতো সব আকাম করেছে রাতে 😾..!""তোর আম্মু কল করে ছিল বলো আজকেও নাকী তুই বিছানায় মুতে ছিলিস 🦆..!""GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
    "good night": "Sweet Dream babu… তবে আগে সাহু বস কে GN বলে নিও 😏💤",
    "tor ball": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖",
    "@SA LA M ": "সালাম এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘""সালাম কে দেখছিস কেন তুই কিডা 😾..?""কি জানি কার ইনবক্স এ ভণ্ডামি করছে 🙎🏻‍♂️🦆""মেয়ে পটাতে গেছে 🫤",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ SALAM SHAIKH☜\https://www.facebook.com/share/19A7TXrpZV/",
    "admin": "He is সালাম তাকে সবাই Admin হিসেবে চিনে😘☺️",
    "hinata": "তুই কি নারুত তুই hinata কে ডাক দিস 🤨""সেতো সাসুকে এর সাথে পলিয়ে গেছে 🫤""এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍.",
    "chup": "এই সবাই চুপ করো আমার বাবু চুপ হতে বলছে 😤""এই সব আলবাল দের কোথা শুনে কেও চুপ হবে না তোমরা চালিয়ে যাও ...🤒😪!""তুই চুপ চুপ কর পাগল ছাগল",
    "Assalamualaikum": "Walaikumassalam❤️‍🩹",
    "fork": "https://github.com/shahadat-sahu/SHAHADAT-CHAT-BOT.git",
    "kiss me": "GF নেই বলে এখানে kiss চাচ্ছে হায়রে কস্ত 🙁😭!""তুমি পঁচা তোমাকে কিস দিবো না 🤭",
    "thanks": "thanks এর দাম নাই দোস্ট বিকাশ এর no. দেবো কি🦆"..?"কি রে ওরে এতো thanks বলিস কেন ব্যাপার কি 🤨..।""সোনা thanks বলা লাগবে না একটা GF খুঁজে দিও তাইলে হবে 😣🙏..!""এতো ধন্যবাদ না দিয়ে @tarif Islam রে পাছায় একখানা লাঠী মার ..!🐸🥵",
    "i love you": "ওর ইনবক্স চেক দে ধোরা পরে যাবে 👀😏...!""love you to সোনা 😍 but তোমার নাম কি 🫤..!""হম বুঝতে পারছি তরা দুই জনেই মরবি 🤧🤘🏻..!""আমার কি আমি তো Singal তোরা চালিয়ে যা 🤧👍🏻..!""মেয়ে হলে আমার বস সাহু এর ইনবক্সে এখুনি গুঁতা দিন🫢😻",
    "love you": "ভালোবাসা নামক আবলামী করতে চাইলে Boss সালাম এর ইনবক্সে গুতা দিন 😘",
    "bye""by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️",
    "ami Salam": "হ্যা বস কেমন আছেন..?☺️",
    "bot er baccha": "আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "tor nam ki": "MY NAME IS ─꯭─⃝‌‌𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭💖",
    "pic de": "এন থেকে সর দুরে গিয়া মর😒",
    "cudi": "এত চোদা চুদি করস কেনো..!🥱🌝🌚",
    "bal": "40 দীন হয়ে গেছে 👀🪒..!""বেস বড়ো হলে কেটে ফেল 😪👍🏻..!""রাগ করে না সোনা পাখি 🥰",
    "@Sakura Haruna""@Tarif Islam": "চিপায় আসে ডিস্ট্রাব করো না.👀..!""হাগু করছে আসলে রিপ্লাই দেবে💩..!""পাগল সাগল দের মেনশন ডিস কেন🙎🏻‍♂️",
    "🤣""😂": "তুই হাসিস না তোর পাস্ট এর ঘটনা বলবো কি 🤨..!""ভাই তুই এত হাসিস না..!🌚🤣",
    "kire ki koros": "তোমার কথা ভাবতে ছি জানু 😚",
    "ki koros": "বস সাহু এর সাথে প্রেমে ব্যস্ত আছি 😏💘",
    "kire bot": "হ্যাঁ সব কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈",
    "valo aso": "হ্যাঁ রে প্রিও, বস সাহু এর দোয়ায় ভালো আছি 😌💞",
    "pagol": "হুম পাগল, কিন্তু তোমারই পাগল 😏😂",
    "breakup": "চিন্তা করিস না… সাহু বস তো আছেই তোকে নতুন জন দিয়া দিবে 😎🔥",
    "tui ke": "আমি তোর বস সাহু এর ChatBot 😏",
    "umm": "এতো Umm কেনো জানু… কিছু বলবা? 😉",
    "hmm": "Hmmm কিসের হুমম জানু 🥵",
    "love": "Love করলে সরাসরি সাহু বস কে বল জানু 😻🔥"
  };

  if (!responses[msg]) return;

  if (!global.client.handleReply) global.client.handleReply = [];

  return api.sendMessage(
    responses[msg],
    threadID,
    (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "sahu"
      });
    },
    messageID
  );
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID !== handleReply.author) return;

  try {
    const text = event.body.trim();

    const base = await getMainAPI();
    const link = `${base}/simsimi?text=${encodeURIComponent(text)}`;

    const res = await axios.get(link);

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    if (!global.client.handleReply) global.client.handleReply = [];

    return api.sendMessage(
      reply,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "sahu"
        });
      },
      event.messageID
    );

  } catch {
    return api.sendMessage("🙂 একটু পরে আবার বলো", event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};
