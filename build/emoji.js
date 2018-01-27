const emojione = require('emojione-assets/emoji.json');

export default function emoji(emojiId) {
  function makeEmoji() {
    const emoji = {};
    Object.keys(emojione).forEach((unicode) => {
      const image = `${unicode}.png`;
      emoji[emojione[unicode].shortname.slice(1, -1)] = image;
      emojione[unicode].shortname_alternates.forEach((alias) => {
        emoji[alias.slice(1, -1)] = image;
      });
    });
    return emoji;
  }

  function resolveEmoji(id) {
    return id === emojiId ? id : null
  }
  function loadEmoji(id) {
    if (id === emojiId) {
      return { code: 'export default ' + JSON.stringify(makeEmoji(), null, 2) }
    }
  }

  return { resolveId: resolveEmoji, load: loadEmoji }
}
