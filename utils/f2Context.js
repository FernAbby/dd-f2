const CAPITALIZED_ATTRS_MAP = {
  fillStyle: 'FillStyle',
  fontSize: 'FontSize',
  globalAlpha: 'GlobalAlpha',
  opacity: 'GlobalAlpha',
  lineCap: 'LineCap',
  lineJoin: 'LineJoin',
  lineWidth: 'LineWidth',
  miterLimit: 'MiterLimit',
  strokeStyle: 'StrokeStyle',
  textAlign: 'TextAlign',
  textBaseline: 'TextBaseline',
  shadow: 'Shadow',
  font: 'Font'
};

function strLen(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}

export default (ctx) => {
  Object.keys(CAPITALIZED_ATTRS_MAP).map(key => {
    Object.defineProperty(ctx, key, {
      set(value) {
        // 记录最新设置的值
        ctx[`__${key}`] = value;
        if (key === 'shadow' && ctx.setShadow && Array.isArray(value)) {
          ctx.setShadow(value[0], value[1], value[2], value[3]);
          return;
        }
        const name = 'set' + CAPITALIZED_ATTRS_MAP[key];
        if (!ctx[name]) {
          return;
        }
        ctx[name](value);
      }
    });
    return key;
  });

  // 钉钉小程序框架不支持 measureText 方法，用此方法 mock
  if (!ctx.measureText) {
    ctx.measureText = (text) => {
      let fontSize = 12;
      const font = ctx.__font;
      if (font) {
        fontSize = parseInt(font.split(' ')[3], 10);
      }
      fontSize /= 2;
      return {
        width: strLen(text) * fontSize
      };
    }
  }
  return ctx;
}
