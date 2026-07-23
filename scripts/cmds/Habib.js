module.exports = {
  config: {
    name: "habib",
    version: "1.2.0",
    author: "Habib",
    countDown: 5,
    role: 0,
    shortDescription: "Habib + Aashik Detector",
    longDescription: "Habib & Aashik call detector",
    category: "fun",
    guide: "Type: habib or @KB Aashik"
  },

  habibCount: 0,

  onStart: async function ({ message }) {
    message.reply(`✅ **Advanced Detector Activated!**\n\n` +
      `Features:\n` +
      `• habib, habib vai\n` +
      `• @KB Aashik / @KB Aashik call\n` +
      `• Random funny replies\n` +
      `• Anti-spam\n\nReady! 🔥`, (err, info) => {
      if (err) return;
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        author: message.senderID,
        type: "habib"
      });
    });
  },

  onChat: async function ({ event, message }) {
    if (!event.body) return;

    const text = event.body.toLowerCase().trim();
    const now = Date.now();

    // Anti-spam
    if (global.habibLastTime && now - global.habibLastTime < 8000) {
      return;
    }

    // Habib Detector
    const habibTriggers = ["habib", "হাবিব", "habib vai", "habib bhai", "habib bro"];
    if (habibTriggers.some(trigger => text.includes(trigger))) {
      global.habibLastTime = now;
      this.habibCount++;

      const replies = [
        "bos akon besto ache 😌",
        "habib vai besto re bhai 😂",
        "bos ektu rest nite dao 😤",
        "habib er phone busy 🔥",
        "ar koto bar bolba vai? 😅",
        "bos ektu por e reply dibo 😉"
      ];

      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      message.reply(`${randomReply}\n\n(Count: ${this.habibCount})`);
      return;
    }

    // New Aashik Detector
    if (text.includes("@kb aashik") || text.includes("@kb aashik call e aso")) {
      global.habibLastTime = now;
      message.reply("kb bukaxuda 🙂");
      return;
    }
  },

  onReply: async function ({ event, Reply, message }) {
    if (event.senderID !== Reply.author) return;
    message.reply(`You replied: ${event.body}`);
  },

  onReaction: async function ({ event, Reaction, message }) {
    if (event.userID !== Reaction.author) return;
    message.reply(`You reacted with: ${event.reaction} 👍`);
  },

  onEvent: async function ({ event, message }) {
    if (event.logMessageType === "log:subscribe") {
      message.reply("Welcome to the group! 🎉");
    }
  }
};
