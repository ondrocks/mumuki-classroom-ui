angular
  .module('classroom')
  .filter('markdownify', function ($filter, EMOJIS) {

    const imgTag = (emoji) => `<img src="/assets/emojis/${emoji === '+1' ? 'plus1' : emoji}.png" class="emoji" title=":${emoji}:" alt=":${emoji}:" height="20" width="20">`
    const emojiRegex = (emoji) => new RegExp(`:${emoji === '+1' ? `\\${emoji}` : emoji}:`, 'g');

    const emojify = (text) => {
      let emojified = text;
      _.chain(EMOJIS)
        .map('emojis')
        .flatten()
        .forEach((emoji) => {
          emojified = emojified.replace(emojiRegex(emoji), imgTag(emoji));
        })
        .value();
      return emojified;
    }

    return function(text) {
      const markdown = $filter('markdown');
      return markdown(emojify(text));
    };
  });
