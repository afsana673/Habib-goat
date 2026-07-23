module.exports = {
  config: {
    name: "habib",
    version: "1.4.1",
    author: "Habib",
    countDown: 5,
    role: 0,
    shortDescription: "Multi Mention Detector",
    longDescription: "Habib + Aashik + Mentions",
    category: "fun",
    guide: "Mention users"
  },

  habibCount: 0,

  onStart: async function ({ message }) {
    message.reply(`✅ **All Detectors Active!**\n\n` +
      `• habib / habib vai\n` +
      `• @KB Aashik\n` +
      `• 100042200207408\n` +
      `• 100079043707149\n\nBot ready 🔥`, (err, info) => {
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
    if (global.habibLastTime && now - global.habibLastTime < 8000) return;

    // 1. Habib Detector
    const habibTriggers = ["habib", "হাবিব", "habib vai", "habib bhai", "habib bro"];
    if (habibTriggers.some(trigger => text.includes(trigger))) {
      global.habibLastTime = now;
      this.habibCount++;

      const replies = [
        "bos akon besto ache 😌",
        "habib vai besto re bhai 😂",
        "bos ektu rest nite dao 😤",
        "habib er phone busy 🔥",
        "ar koto bar bolba vai? 😅"
      ];

      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      message.reply(`${randomReply}\n\n(Count: ${this.habibCount})`);
      return;
    }

    // 2. Aashik Detector
    if (text.includes("@kb aashik") || text.includes("@kb aashik call")) {
      global.habibLastTime = now;
      message.reply("kb bukaxuda 🙂");
      return;
    }

    // 3. First Mention
    const targetID1 = "100042200207408";
    if (event.mentions?.[targetID1] || 
        event.body.includes(targetID1) || 
        text.includes(targetID1)) {
      global.habibLastTime = now;
      message.reply("O akon bf er sate kota bolte besto 😌");
      return;
    }

    // 4. Second Mention 
    const targetID2 = "100079043707149";
    if (event.mentions?.[targetID2] || 
        event.body.includes(targetID2) || 
        text.includes(targetID2)) {
      global.habibLastTime = now;
      message.reply("Habib akon besto ache ki bolben amk bolun 😌");
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
