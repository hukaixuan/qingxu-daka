/* 今日情绪抽签 — static H5, no third-party libs */
"use strict";

var C = {
  ink: "#1a120c",
  paper: "#f6e6c8",
  paper2: "#efe0b8",
  cream: "#fff8ea",
  red: "#e23b2e",
  redDeep: "#b81f1a",
  yellow: "#ffd43b",
  gold: "#f0b429",
  cyan: "#2aa7b8",
  navy: "#243a6b",
  green: "#2f8f62",
  greenDeep: "#1f6a48",
  brown: "#7a4a24",
  brown2: "#5a3216",
  stick: "#e8c07a",
  wood: "#c9843e"
};

var FONT_STACK = '"Noto Sans CJK SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Heiti SC","Source Han Sans SC",sans-serif';
var WEEK = "日一二三四五六";
var CARD_W = 1080;
var CARD_H = 1480;

var MOODS = [
  { name: "摸鱼冠军", icon: "fish", accent: "#2aa7b8",
    yi: "把待办改成「明日再议」",
    ji: "主动问「还有什么要我做的」",
    line: "今天的 KPI，就是别被 KPI 找到。" },
  { name: "咖啡续命", icon: "mug", accent: "#c9843e",
    yi: "给自己续一杯热的",
    ji: "发誓「从今天开始戒咖啡」",
    line: "人是铁，咖啡是钢，单据是棉花糖。" },
  { name: "周一缓冲", icon: "calendar", accent: "#243a6b",
    yi: "先发呆三分钟再打开邮箱",
    ji: "一进门就拉人开早会",
    line: "周一不是用来赢的，是用来热身的。" },
  { name: "灵感爆发", icon: "bulb", accent: "#f0b429",
    yi: "马上记下来，写在外卖袋上也行",
    ji: "先刷十分钟短视频「找感觉」",
    line: "灵感像外卖，热乎的时候最香。" },
  { name: "社恐低电", icon: "battery", accent: "#e23b2e",
    yi: "用表情包完成一切社交",
    ji: "打开摄像头开会",
    line: "今天的社交电量，只够点一个「收到」。" },
  { name: "准时下班", icon: "clock", accent: "#2f8f62",
    yi: "倒计时一到就关电脑",
    ji: "说「我再看一眼就走」",
    line: "下班是一种信仰，不是一种商量。" },
  { name: "会议吸魂", icon: "meeting", accent: "#243a6b",
    yi: "默默把待办写成「在听」",
    ji: "问「我们能再对齐一下吗」",
    line: "这个会本来可以是一封邮件，现在它是三个会。" },
  { name: "周末预支", icon: "moon", accent: "#243a6b",
    yi: "今晚早点睡，把觉存进账户",
    ji: "再补一季，理由是「就一集」",
    line: "周末的快乐可以按揭，觉也得按时还。" },
  { name: "高效爆发", icon: "bolt", accent: "#ffd43b",
    yi: "趁热把最难的那件办掉",
    ji: "先整理桌面「进入状态」一小时",
    line: "今天你不是人，你是会走路的待办清单。" },
  { name: "轻微摆烂", icon: "sofa", accent: "#2aa7b8",
    yi: "只做必须做的那一件",
    ji: "制定「人生翻盘一百天计划」",
    line: "有时候躺平，是为了明天还能站起来。" },
  { name: "消息爆炸", icon: "bell", accent: "#e23b2e",
    yi: "批量回复，设个免打扰",
    ji: "每个红点都立刻点开",
    line: "群里的「在吗」，可以晚点再「在」。" },
  { name: "照顾自己", icon: "plant", accent: "#2f8f62",
    yi: "喝口水，站起来走两圈",
    ji: "把午饭再次改成「等会儿再说」",
    line: "你不是永动机，是需要插电的人类。" },
  { name: "学习欲旺", icon: "book", accent: "#243a6b",
    yi: "看完一小节就合上",
    ji: "同时打开五个教程页签",
    line: "今天适合学一点，不适合变成收藏家。" },
  { name: "收拾心情", icon: "broom", accent: "#7a4a24",
    yi: "把桌面和大脑一起清一下",
    ji: "翻旧聊天记录找情绪",
    line: "垃圾文件可以删，坏心情也可以归档。" },
  { name: "好运偏爱", icon: "star", accent: "#ffd43b",
    yi: "主动迈出一小步",
    ji: "把好运消耗在「再随机一次」上",
    line: "好运已经到站，请不要让它空等。" },
  { name: "下雨心情", icon: "rain", accent: "#2aa7b8",
    yi: "热饮、慢走、听点软的",
    ji: "硬逼自己热情满格",
    line: "天可以阴，人可以慢，事可以往后排一排。" },
  { name: "清爽整理", icon: "box", accent: "#7a4a24",
    yi: "清理一个抽屉或一个文件夹",
    ji: "新开一个「最终整理计划 v7」",
    line: "乱，是因为东西都还想被你需要。" },
  { name: "夜猫回魂", icon: "night", accent: "#243a6b",
    yi: "把重要的事放到上午",
    ji: "凌晨还跟待办死磕",
    line: "灵感可以熬夜，身体记得申请加班费。" },
  { name: "干饭第一", icon: "bowl", accent: "#c9843e",
    yi: "好好吃一顿热的",
    ji: "用会议挤掉午饭",
    line: "先把胃安顿好，世界才会变清楚。" },
  { name: "专注结界", icon: "focus", accent: "#243a6b",
    yi: "静音手机，只做一件事",
    ji: "边开会边回消息边「听着」",
    line: "今天的超能力是：把一个窗口开到最大。" },
  { name: "认输休息", icon: "bed", accent: "#2aa7b8",
    yi: "允许自己什么都不增产",
    ji: "用「我还能再撑」自我加戏",
    line: "休息不是摆烂的亲戚，是生产力的发小。" },
  { name: "热情满格", icon: "sun", accent: "#e23b2e",
    yi: "把想做的事排在最前面",
    ji: "把热情全分给别人的需求",
    line: "电量拉满的日子，别浪费在空转上。" },
  { name: "选择困难", icon: "signs", accent: "#f0b429",
    yi: "两分钟内做个够用的决定",
    ji: "再开一张对比表格",
    line: "选错还能改，卡住会过期。" },
  { name: "小胜一把", icon: "medal", accent: "#ffd43b",
    yi: "把小成果记下来",
    ji: "立刻用「不过如此」泼冷水",
    line: "今天适合小小庆祝，不必等大结局。" },
  { name: "社交满格", icon: "chat", accent: "#2f8f62",
    yi: "主动问候一位好久没聊的人",
    ji: "连续赴约到电池耗尽",
    line: "今天适合见面，也适合见好就收。" },
  { name: "预算警觉", icon: "wallet", accent: "#f0b429",
    yi: "先喝自带的水再看外卖",
    ji: "用「就这一次」连续下单",
    line: "钱包也有情绪，请温柔对待。" },
  { name: "路况平静", icon: "bus", accent: "#2aa7b8",
    yi: "提前出门，把余量留给自己",
    ji: "卡着点冲刺，再抱怨路况",
    line: "今天适合慢半拍，不适合跟时间赛跑。" },
  { name: "创意卡壳", icon: "page", accent: "#243a6b",
    yi: "换个房间、换杯水再试",
    ji: "盯着空白页进行自我批评",
    line: "卡壳不是没才气，是脑子在加载。" },
  { name: "被夸预备", icon: "stamp", accent: "#e23b2e",
    yi: "把做好的东西发出去",
    ji: "在草稿箱里反复打磨到消失",
    line: "完成，比完美更值得被看见。" },
  { name: "家庭暖场", icon: "house", accent: "#c9843e",
    yi: "给亲近的人发一条没目的的消息",
    ji: "把所有耐心都留给工作群",
    line: "今天适合把好语气，先留给家里。" },
  { name: "迟到边缘", icon: "alarm", accent: "#e23b2e",
    yi: "把出发时间提前十五分钟",
    ji: "再刷一个「最后一条」",
    line: "今天的敌人不是路况，是「再躺一分钟」。" },
  { name: "备份人生", icon: "disk", accent: "#243a6b",
    yi: "把重要文件随手存一份",
    ji: "相信「我记得在哪个文件夹」",
    line: "记忆是会搬家的，备份不会。" },
  { name: "散步解药", icon: "walk", accent: "#2f8f62",
    yi: "下楼走十分钟，不带耳机也行",
    ji: "用刷信息代替走动",
    line: "很多想不通的事，是椅子想不通。" },
  { name: "邮件兵法", icon: "plane", accent: "#2aa7b8",
    yi: "先写重点，再写礼貌",
    ji: "写一封能开三场会的长信",
    line: "今天适合短讯，不适合论文体回复。" },
  { name: "冷静开机", icon: "cool", accent: "#2aa7b8",
    yi: "遇到事先深呼吸再回",
    ji: "在情绪最高点按下发送",
    line: "撤回键不是超能力，沉默才是。" },
  { name: "普通超神", icon: "tea", accent: "#c9843e",
    yi: "把日常过得有一点仪式感",
    ji: "非要等特别的日子才对自己好",
    line: "今天没有节日，但可以有热茶和晚霞。" }
];

function font(weight, size) {
  return weight + " " + size + "px " + FONT_STACK;
}

function formatDate(d) {
  return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 星期" + WEEK[d.getDay()];
}

function dateStamp(d) {
  var m = String(d.getMonth() + 1);
  var day = String(d.getDate());
  if (m.length < 2) m = "0" + m;
  if (day.length < 2) day = "0" + day;
  return "" + d.getFullYear() + m + day;
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateSeed(d) {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function pickToday(d) {
  d = d || new Date();
  var rng = mulberry32(dateSeed(d) ^ 0x51C0DE);
  return Math.floor(rng() * MOODS.length);
}

function pickRandomExcept(except) {
  if (MOODS.length <= 1) return 0;
  var i;
  do {
    i = Math.floor(Math.random() * MOODS.length);
  } while (i === except);
  return i;
}

function wrapChars(ctx, text, maxWidth) {
  var lines = [];
  var line = "";
  var i, ch, t;
  var punct = "。！？，、；：….,!?;:”’』」）)]";
  for (i = 0; i < text.length; i++) {
    ch = text.charAt(i);
    t = line + ch;
    if (line && ctx.measureText(t).width > maxWidth && punct.indexOf(ch) === -1) {
      lines.push(line);
      line = ch;
    } else {
      line = t;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function roundedRect(ctx, x, y, w, h, r) {
  var rr = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

function burstPath(ctx, cx, cy, rInner, rOuter, spikes, rot) {
  var i, a1, a2;
  rot = rot || 0;
  ctx.moveTo(cx + Math.cos(rot) * rOuter, cy + Math.sin(rot) * rOuter);
  for (i = 0; i < spikes; i++) {
    a1 = rot + ((i + 0.5) / spikes) * Math.PI * 2;
    a2 = rot + ((i + 1) / spikes) * Math.PI * 2;
    ctx.lineTo(cx + Math.cos(a1) * rInner, cy + Math.sin(a1) * rInner);
    ctx.lineTo(cx + Math.cos(a2) * rOuter, cy + Math.sin(a2) * rOuter);
  }
  ctx.closePath();
}

function fillHalftone(ctx, x, y, w, h, color, spacing, radius, angle) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(angle || Math.PI / 7);
  ctx.fillStyle = color;
  var xx, yy;
  var reachX = w + h;
  var reachY = w + h;
  for (yy = -reachY; yy < reachY; yy += spacing) {
    for (xx = -reachX; xx < reachX; xx += spacing) {
      ctx.beginPath();
      ctx.arc(xx, yy, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawComicText(ctx, text, x, y, opt) {
  opt = opt || {};
  ctx.save();
  ctx.font = opt.font;
  ctx.textAlign = opt.align || "center";
  ctx.textBaseline = opt.baseline || "middle";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  if (opt.shadow) {
    ctx.fillStyle = opt.shadow;
    ctx.fillText(text, x + (opt.sx || 6), y + (opt.sy || 6));
  }
  if (opt.stroke) {
    ctx.strokeStyle = opt.stroke;
    ctx.lineWidth = opt.sw || 10;
    ctx.strokeText(text, x, y);
  }
  ctx.fillStyle = opt.fill || C.ink;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function ink(ctx, fill, lw, drawFn) {
  ctx.save();
  ctx.fillStyle = fill;
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = lw;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  drawFn(ctx);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function highlight(ctx, x, y, r, alpha) {
  ctx.save();
  ctx.fillStyle = "rgba(255,248,234," + (alpha == null ? 0.7 : alpha) + ")";
  ctx.beginPath();
  ctx.ellipse(x, y, r, r * 0.6, -0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}


/* ---------- comic icons ---------- */
var ICONS = {
  fish: function (ctx, s) {
    ink(ctx, C.cyan, s * 0.07, function (c) {
      c.ellipse(0, 0, s * 0.34, s * 0.22, 0, 0, Math.PI * 2);
    });
    ink(ctx, C.cyan, s * 0.07, function (c) {
      c.moveTo(s * 0.28, 0);
      c.lineTo(s * 0.5, -s * 0.22);
      c.lineTo(s * 0.42, 0);
      c.lineTo(s * 0.5, s * 0.22);
      c.closePath();
    });
    ctx.save();
    ctx.fillStyle = C.ink;
    ctx.beginPath();
    ctx.arc(-s * 0.12, -s * 0.04, s * 0.045, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    highlight(ctx, -s * 0.12, -s * 0.1, s * 0.08, 0.55);
  },
  mug: function (ctx, s) {
    ink(ctx, C.cream, s * 0.07, function (c) {
      c.moveTo(-s * 0.22, -s * 0.18);
      c.lineTo(s * 0.2, -s * 0.18);
      c.lineTo(s * 0.16, s * 0.28);
      c.quadraticCurveTo(0, s * 0.36, -s * 0.18, s * 0.28);
      c.closePath();
    });
    ink(ctx, "transparent", s * 0.07, function (c) {
      c.arc(s * 0.26, 0, s * 0.12, -1.2, 1.2);
    });
    ctx.save();
    ctx.strokeStyle = C.cyan;
    ctx.lineWidth = s * 0.035;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-s * 0.08, -s * 0.28);
    ctx.quadraticCurveTo(-s * 0.04, -s * 0.4, -s * 0.1, -s * 0.48);
    ctx.moveTo(s * 0.04, -s * 0.28);
    ctx.quadraticCurveTo(s * 0.08, -s * 0.4, 0.02 * s, -s * 0.48);
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = C.brown2;
    ctx.beginPath();
    ctx.rect(-s * 0.16, -s * 0.12, s * 0.3, s * 0.08);
    ctx.fill();
    ctx.restore();
  },
  calendar: function (ctx, s) {
    ink(ctx, C.cream, s * 0.07, function (c) {
      roundedRect(c, -s * 0.3, -s * 0.22, s * 0.6, s * 0.52, s * 0.06);
    });
    ink(ctx, C.red, s * 0.06, function (c) {
      roundedRect(c, -s * 0.3, -s * 0.22, s * 0.6, s * 0.16, s * 0.06);
      c.rect(-s * 0.3, -s * 0.12, s * 0.6, s * 0.06);
    });
    ink(ctx, C.ink, s * 0.06, function (c) {
      c.rect(-s * 0.16, -s * 0.36, s * 0.08, s * 0.18);
      c.rect(s * 0.08, -s * 0.36, s * 0.08, s * 0.18);
    });
    ctx.save();
    ctx.fillStyle = C.ink;
    ctx.font = font("800", s * 0.28);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("一", 0, s * 0.12);
    ctx.restore();
  },
  bulb: function (ctx, s) {
    ink(ctx, C.yellow, s * 0.07, function (c) {
      c.arc(0, -s * 0.06, s * 0.26, 0.35, Math.PI - 0.35);
      c.lineTo(-s * 0.12, s * 0.22);
      c.lineTo(s * 0.12, s * 0.22);
      c.closePath();
    });
    ink(ctx, C.cream, s * 0.06, function (c) {
      roundedRect(c, -s * 0.12, s * 0.2, s * 0.24, s * 0.16, s * 0.03);
    });
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.04;
    ctx.beginPath();
    ctx.moveTo(-s * 0.06, s * 0.26);
    ctx.lineTo(s * 0.06, s * 0.26);
    ctx.moveTo(-s * 0.06, s * 0.32);
    ctx.lineTo(s * 0.06, s * 0.32);
    ctx.stroke();
    ctx.strokeStyle = C.gold;
    ctx.lineWidth = s * 0.045;
    ctx.lineCap = "round";
    var i, a;
    for (i = 0; i < 6; i++) {
      a = -Math.PI / 2 + (i - 2.5) * 0.45;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * s * 0.34, -s * 0.06 + Math.sin(a) * s * 0.34);
      ctx.lineTo(Math.cos(a) * s * 0.46, -s * 0.06 + Math.sin(a) * s * 0.46);
      ctx.stroke();
    }
    ctx.restore();
    highlight(ctx, -s * 0.08, -s * 0.14, s * 0.08);
  },
  battery: function (ctx, s) {
    ink(ctx, C.cream, s * 0.07, function (c) {
      roundedRect(c, -s * 0.32, -s * 0.18, s * 0.56, s * 0.36, s * 0.06);
    });
    ink(ctx, C.ink, s * 0.06, function (c) {
      roundedRect(c, s * 0.24, -s * 0.08, s * 0.1, s * 0.16, s * 0.03);
    });
    ink(ctx, C.red, s * 0.05, function (c) {
      roundedRect(c, -s * 0.26, -s * 0.1, s * 0.14, s * 0.2, s * 0.03);
    });
  },
  clock: function (ctx, s) {
    ink(ctx, C.cream, s * 0.07, function (c) {
      c.arc(0, 0.02 * s, s * 0.34, 0, Math.PI * 2);
    });
    ink(ctx, C.green, s * 0.06, function (c) {
      c.arc(0, 0.02 * s, s * 0.26, 0, Math.PI * 2);
    });
    ink(ctx, C.cream, s * 0.05, function (c) {
      c.arc(0, 0.02 * s, s * 0.2, 0, Math.PI * 2);
    });
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.055;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 0.02 * s);
    ctx.lineTo(0, -s * 0.1);
    ctx.moveTo(0, 0.02 * s);
    ctx.lineTo(s * 0.12, 0.08 * s);
    ctx.stroke();
    ctx.fillStyle = C.ink;
    ctx.beginPath();
    ctx.arc(0, 0.02 * s, s * 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },
  meeting: function (ctx, s) {
    ink(ctx, C.cream, s * 0.07, function (c) {
      roundedRect(c, -s * 0.38, -s * 0.22, s * 0.5, s * 0.32, s * 0.08);
      c.moveTo(-s * 0.08, s * 0.1);
      c.lineTo(-s * 0.02, s * 0.22);
      c.lineTo(-s * 0.18, s * 0.1);
    });
    ink(ctx, C.yellow, s * 0.06, function (c) {
      roundedRect(c, 0, -s * 0.02, s * 0.38, s * 0.26, s * 0.08);
      c.moveTo(s * 0.16, s * 0.24);
      c.lineTo(s * 0.22, s * 0.36);
      c.lineTo(s * 0.06, s * 0.24);
    });
  },
  moon: function (ctx, s) {
    ink(ctx, C.yellow, s * 0.07, function (c) {
      c.arc(0, 0, s * 0.3, 0, Math.PI * 2);
    });
    ctx.save();
    ctx.fillStyle = C.cream;
    ctx.beginPath();
    ctx.arc(s * 0.14, -s * 0.08, s * 0.24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.07;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.3, 0.55, Math.PI * 1.55);
    ctx.stroke();
    ctx.restore();
    ink(ctx, C.yellow, s * 0.05, function (c) {
      starPath(c, s * 0.28, -s * 0.22, s * 0.08, 5);
    });
    ink(ctx, C.yellow, s * 0.04, function (c) {
      starPath(c, s * 0.38, 0.04 * s, s * 0.05, 5);
    });
  },
  bolt: function (ctx, s) {
    ink(ctx, C.yellow, s * 0.07, function (c) {
      c.moveTo(s * 0.08, -s * 0.42);
      c.lineTo(-s * 0.22, s * 0.02);
      c.lineTo(-s * 0.02, s * 0.02);
      c.lineTo(-s * 0.12, s * 0.42);
      c.lineTo(s * 0.26, -s * 0.06);
      c.lineTo(s * 0.04, -s * 0.06);
      c.closePath();
    });
  },
  sofa: function (ctx, s) {
    ink(ctx, C.cyan, s * 0.07, function (c) {
      roundedRect(c, -s * 0.4, -s * 0.02, s * 0.8, s * 0.28, s * 0.08);
    });
    ink(ctx, C.navy, s * 0.06, function (c) {
      roundedRect(c, -s * 0.38, -s * 0.22, s * 0.28, s * 0.24, s * 0.06);
      roundedRect(c, s * 0.1, -s * 0.22, s * 0.28, s * 0.24, s * 0.06);
    });
    ink(ctx, C.ink, s * 0.06, function (c) {
      c.rect(-s * 0.34, s * 0.24, s * 0.1, s * 0.12);
      c.rect(s * 0.24, s * 0.24, s * 0.1, s * 0.12);
    });
  },
  bell: function (ctx, s) {
    ink(ctx, C.yellow, s * 0.07, function (c) {
      c.moveTo(-s * 0.26, s * 0.1);
      c.quadraticCurveTo(-s * 0.26, -s * 0.3, 0, -s * 0.32);
      c.quadraticCurveTo(s * 0.26, -s * 0.3, s * 0.26, s * 0.1);
      c.closePath();
    });
    ink(ctx, C.ink, s * 0.06, function (c) {
      c.arc(0, s * 0.16, s * 0.08, 0, Math.PI);
      c.closePath();
    });
    ink(ctx, C.red, s * 0.05, function (c) {
      c.arc(s * 0.18, -s * 0.22, s * 0.08, 0, Math.PI * 2);
    });
  },
  plant: function (ctx, s) {
    ink(ctx, C.brown, s * 0.07, function (c) {
      c.moveTo(-s * 0.2, s * 0.08);
      c.lineTo(s * 0.2, s * 0.08);
      c.lineTo(s * 0.14, s * 0.38);
      c.lineTo(-s * 0.14, s * 0.38);
      c.closePath();
    });
    ink(ctx, C.green, s * 0.06, function (c) {
      c.ellipse(-s * 0.16, -s * 0.08, s * 0.16, s * 0.22, -0.5, 0, Math.PI * 2);
    });
    ink(ctx, C.greenDeep, s * 0.06, function (c) {
      c.ellipse(s * 0.14, -s * 0.12, s * 0.15, s * 0.24, 0.45, 0, Math.PI * 2);
    });
    ink(ctx, C.green, s * 0.06, function (c) {
      c.ellipse(0, -s * 0.22, s * 0.12, s * 0.2, 0.05, 0, Math.PI * 2);
    });
  },
  book: function (ctx, s) {
    ink(ctx, C.navy, s * 0.07, function (c) {
      roundedRect(c, -s * 0.32, -s * 0.28, s * 0.3, s * 0.56, s * 0.04);
    });
    ink(ctx, C.cream, s * 0.07, function (c) {
      roundedRect(c, -s * 0.04, -s * 0.28, s * 0.36, s * 0.56, s * 0.04);
    });
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.03;
    ctx.beginPath();
    ctx.moveTo(s * 0.02, -s * 0.12);
    ctx.lineTo(s * 0.24, -s * 0.12);
    ctx.moveTo(s * 0.02, 0);
    ctx.lineTo(s * 0.2, 0);
    ctx.moveTo(s * 0.02, s * 0.12);
    ctx.lineTo(s * 0.22, s * 0.12);
    ctx.stroke();
    ctx.restore();
  },
  broom: function (ctx, s) {
    ink(ctx, C.stick, s * 0.07, function (c) {
      c.moveTo(s * 0.16, -s * 0.4);
      c.lineTo(s * 0.24, -s * 0.36);
      c.lineTo(-s * 0.02, s * 0.16);
      c.lineTo(-s * 0.1, s * 0.12);
      c.closePath();
    });
    ink(ctx, C.brown, s * 0.07, function (c) {
      c.moveTo(-s * 0.08, s * 0.06);
      c.lineTo(s * 0.18, s * 0.2);
      c.lineTo(s * 0.02, s * 0.44);
      c.lineTo(-s * 0.28, s * 0.3);
      c.closePath();
    });
  },
  star: function (ctx, s) {
    ink(ctx, C.yellow, s * 0.07, function (c) {
      starPath(c, 0, 0, s * 0.36, 5);
    });
    highlight(ctx, -s * 0.08, -s * 0.08, s * 0.08, 0.6);
  },
  rain: function (ctx, s) {
    ink(ctx, C.navy, s * 0.07, function (c) {
      c.moveTo(-s * 0.3, s * 0.04);
      c.lineTo(s * 0.3, s * 0.04);
      c.quadraticCurveTo(s * 0.34, -s * 0.04, s * 0.2, -s * 0.12);
      c.quadraticCurveTo(s * 0.22, -s * 0.3, 0, -s * 0.28);
      c.quadraticCurveTo(-s * 0.24, -s * 0.32, -s * 0.22, -s * 0.1);
      c.quadraticCurveTo(-s * 0.36, -s * 0.04, -s * 0.3, s * 0.04);
      c.closePath();
    });
    ctx.save();
    ctx.strokeStyle = C.cyan;
    ctx.lineWidth = s * 0.055;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-s * 0.16, s * 0.16);
    ctx.lineTo(-s * 0.22, s * 0.32);
    ctx.moveTo(0, s * 0.16);
    ctx.lineTo(-s * 0.06, s * 0.34);
    ctx.moveTo(s * 0.16, s * 0.16);
    ctx.lineTo(s * 0.1, s * 0.32);
    ctx.stroke();
    ctx.restore();
  },
  box: function (ctx, s) {
    ink(ctx, C.stick, s * 0.07, function (c) {
      c.moveTo(0, -s * 0.06);
      c.lineTo(s * 0.34, s * 0.08);
      c.lineTo(s * 0.34, s * 0.36);
      c.lineTo(0, s * 0.5);
      c.lineTo(-s * 0.34, s * 0.36);
      c.lineTo(-s * 0.34, s * 0.08);
      c.closePath();
    });
    ink(ctx, C.gold, s * 0.06, function (c) {
      c.moveTo(0, -s * 0.06);
      c.lineTo(s * 0.34, s * 0.08);
      c.lineTo(0, s * 0.22);
      c.lineTo(-s * 0.34, s * 0.08);
      c.closePath();
    });
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.06;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.22);
    ctx.lineTo(0, s * 0.5);
    ctx.stroke();
    ctx.restore();
  },
  night: function (ctx, s) {
    ink(ctx, C.navy, s * 0.07, function (c) {
      c.arc(0, 0, s * 0.34, 0, Math.PI * 2);
    });
    ink(ctx, C.yellow, s * 0.05, function (c) {
      starPath(c, -s * 0.1, -s * 0.08, s * 0.1, 5);
    });
    ink(ctx, C.yellow, s * 0.04, function (c) {
      starPath(c, s * 0.14, s * 0.1, s * 0.07, 5);
    });
    ink(ctx, C.cream, s * 0.04, function (c) {
      c.arc(s * 0.12, -s * 0.16, s * 0.05, 0, Math.PI * 2);
    });
  },
  bowl: function (ctx, s) {
    ink(ctx, C.cream, s * 0.07, function (c) {
      c.moveTo(-s * 0.34, -s * 0.02);
      c.quadraticCurveTo(0, s * 0.5, s * 0.34, -s * 0.02);
      c.closePath();
    });
    ink(ctx, C.gold, s * 0.06, function (c) {
      c.ellipse(0, -s * 0.02, s * 0.34, s * 0.1, 0, 0, Math.PI * 2);
    });
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.05;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(s * 0.08, -s * 0.22);
    ctx.lineTo(s * 0.22, -s * 0.42);
    ctx.moveTo(-s * 0.04, -s * 0.18);
    ctx.lineTo(-s * 0.18, -s * 0.4);
    ctx.stroke();
    ctx.restore();
  },
  focus: function (ctx, s) {
    ink(ctx, C.cream, s * 0.07, function (c) {
      c.arc(0, 0, s * 0.28, 0, Math.PI * 2);
    });
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.07;
    ctx.lineCap = "round";
    var i, a;
    for (i = 0; i < 4; i++) {
      a = i * Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * s * 0.34, Math.sin(a) * s * 0.34);
      ctx.lineTo(Math.cos(a) * s * 0.46, Math.sin(a) * s * 0.46);
      ctx.stroke();
    }
    ctx.restore();
    ink(ctx, C.red, s * 0.05, function (c) {
      c.arc(0, 0, s * 0.07, 0, Math.PI * 2);
    });
  },
  bed: function (ctx, s) {
    ink(ctx, C.navy, s * 0.07, function (c) {
      roundedRect(c, -s * 0.4, s * 0.02, s * 0.8, s * 0.18, s * 0.04);
    });
    ink(ctx, C.cream, s * 0.06, function (c) {
      roundedRect(c, -s * 0.38, -s * 0.12, s * 0.56, s * 0.16, s * 0.05);
    });
    ink(ctx, C.cyan, s * 0.06, function (c) {
      c.arc(-s * 0.28, -s * 0.18, s * 0.1, 0, Math.PI * 2);
    });
    ink(ctx, C.ink, s * 0.06, function (c) {
      c.rect(-s * 0.38, s * 0.18, s * 0.08, s * 0.16);
      c.rect(s * 0.3, s * 0.18, s * 0.08, s * 0.16);
    });
  },
  sun: function (ctx, s) {
    ink(ctx, C.yellow, s * 0.07, function (c) {
      c.arc(0, 0, s * 0.2, 0, Math.PI * 2);
    });
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.07;
    ctx.lineCap = "round";
    var i, a;
    for (i = 0; i < 8; i++) {
      a = i * Math.PI / 4;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * s * 0.28, Math.sin(a) * s * 0.28);
      ctx.lineTo(Math.cos(a) * s * 0.42, Math.sin(a) * s * 0.42);
      ctx.stroke();
    }
    ctx.restore();
    highlight(ctx, -s * 0.06, -s * 0.06, s * 0.07);
  },
  signs: function (ctx, s) {
    ink(ctx, C.stick, s * 0.07, function (c) {
      c.rect(-s * 0.05, -s * 0.4, s * 0.1, s * 0.8);
    });
    ink(ctx, C.yellow, s * 0.06, function (c) {
      roundedRect(c, -s * 0.36, -s * 0.32, s * 0.4, s * 0.2, s * 0.04);
    });
    ink(ctx, C.cyan, s * 0.06, function (c) {
      roundedRect(c, -s * 0.04, -s * 0.06, s * 0.4, s * 0.2, s * 0.04);
    });
  },
  medal: function (ctx, s) {
    ink(ctx, C.red, s * 0.06, function (c) {
      c.moveTo(-s * 0.14, -s * 0.1);
      c.lineTo(-s * 0.22, -s * 0.42);
      c.lineTo(-s * 0.04, -s * 0.16);
      c.closePath();
    });
    ink(ctx, C.navy, s * 0.06, function (c) {
      c.moveTo(s * 0.14, -s * 0.1);
      c.lineTo(s * 0.22, -s * 0.42);
      c.lineTo(s * 0.04, -s * 0.16);
      c.closePath();
    });
    ink(ctx, C.yellow, s * 0.07, function (c) {
      c.arc(0, s * 0.08, s * 0.24, 0, Math.PI * 2);
    });
    ink(ctx, C.cream, s * 0.05, function (c) {
      starPath(c, 0, s * 0.08, s * 0.12, 5);
    });
  },
  chat: function (ctx, s) {
    ink(ctx, C.green, s * 0.07, function (c) {
      roundedRect(c, -s * 0.34, -s * 0.3, s * 0.5, s * 0.36, s * 0.1);
      c.moveTo(-s * 0.16, s * 0.06);
      c.lineTo(-s * 0.22, s * 0.24);
      c.lineTo(-s * 0.02, s * 0.06);
    });
    ink(ctx, C.cream, s * 0.06, function (c) {
      roundedRect(c, -s * 0.06, -s * 0.06, s * 0.42, s * 0.3, s * 0.1);
      c.moveTo(s * 0.16, s * 0.24);
      c.lineTo(s * 0.26, s * 0.4);
      c.lineTo(s * 0.06, s * 0.24);
    });
  },
  wallet: function (ctx, s) {
    ink(ctx, C.brown, s * 0.07, function (c) {
      roundedRect(c, -s * 0.36, -s * 0.2, s * 0.72, s * 0.42, s * 0.08);
    });
    ink(ctx, C.gold, s * 0.06, function (c) {
      roundedRect(c, s * 0.04, -s * 0.06, s * 0.26, s * 0.16, s * 0.05);
    });
    ink(ctx, C.yellow, s * 0.05, function (c) {
      c.arc(-s * 0.18, 0, s * 0.07, 0, Math.PI * 2);
    });
  },
  bus: function (ctx, s) {
    ink(ctx, C.cyan, s * 0.07, function (c) {
      roundedRect(c, -s * 0.4, -s * 0.22, s * 0.8, s * 0.4, s * 0.1);
    });
    ink(ctx, C.cream, s * 0.05, function (c) {
      roundedRect(c, -s * 0.3, -s * 0.14, s * 0.22, s * 0.14, s * 0.03);
      roundedRect(c, 0, -s * 0.14, s * 0.22, s * 0.14, s * 0.03);
    });
    ink(ctx, C.ink, s * 0.05, function (c) {
      c.arc(-s * 0.22, s * 0.22, s * 0.09, 0, Math.PI * 2);
      c.arc(s * 0.22, s * 0.22, s * 0.09, 0, Math.PI * 2);
    });
  },
  page: function (ctx, s) {
    ink(ctx, C.cream, s * 0.07, function (c) {
      c.moveTo(-s * 0.22, -s * 0.36);
      c.lineTo(s * 0.08, -s * 0.36);
      c.lineTo(s * 0.28, -s * 0.16);
      c.lineTo(s * 0.28, s * 0.36);
      c.lineTo(-s * 0.22, s * 0.36);
      c.closePath();
    });
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.035;
    ctx.beginPath();
    ctx.moveTo(-s * 0.1, -s * 0.08);
    ctx.lineTo(s * 0.14, -s * 0.08);
    ctx.moveTo(-s * 0.1, s * 0.06);
    ctx.lineTo(s * 0.1, s * 0.06);
    ctx.moveTo(-s * 0.1, s * 0.2);
    ctx.lineTo(s * 0.06, s * 0.2);
    ctx.stroke();
    ctx.restore();
  },
  stamp: function (ctx, s) {
    ink(ctx, C.red, s * 0.07, function (c) {
      roundedRect(c, -s * 0.32, -s * 0.24, s * 0.64, s * 0.48, s * 0.06);
    });
    ink(ctx, C.cream, s * 0.05, function (c) {
      roundedRect(c, -s * 0.22, -s * 0.14, s * 0.44, s * 0.28, s * 0.04);
    });
    ctx.save();
    ctx.fillStyle = C.redDeep;
    ctx.font = font("900", s * 0.22);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("赞", 0, 0.02 * s);
    ctx.restore();
  },
  house: function (ctx, s) {
    ink(ctx, C.cream, s * 0.07, function (c) {
      roundedRect(c, -s * 0.26, -s * 0.02, s * 0.52, s * 0.36, s * 0.04);
    });
    ink(ctx, C.red, s * 0.07, function (c) {
      c.moveTo(0, -s * 0.36);
      c.lineTo(s * 0.4, -s * 0.02);
      c.lineTo(-s * 0.4, -s * 0.02);
      c.closePath();
    });
    ink(ctx, C.navy, s * 0.05, function (c) {
      roundedRect(c, -s * 0.07, s * 0.1, s * 0.14, s * 0.24, s * 0.02);
    });
  },
  alarm: function (ctx, s) {
    ink(ctx, C.red, s * 0.07, function (c) {
      c.arc(0, s * 0.04, s * 0.28, 0, Math.PI * 2);
    });
    ink(ctx, C.cream, s * 0.05, function (c) {
      c.arc(0, s * 0.04, s * 0.18, 0, Math.PI * 2);
    });
    ink(ctx, C.ink, s * 0.06, function (c) {
      c.arc(-s * 0.26, -s * 0.22, s * 0.1, Math.PI * 0.9, Math.PI * 1.9);
      c.arc(s * 0.26, -s * 0.22, s * 0.1, Math.PI * 1.1, Math.PI * 0.1, true);
    });
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.05;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, s * 0.04);
    ctx.lineTo(0, -s * 0.06);
    ctx.moveTo(0, s * 0.04);
    ctx.lineTo(s * 0.1, s * 0.1);
    ctx.stroke();
    ctx.restore();
  },
  disk: function (ctx, s) {
    ink(ctx, C.navy, s * 0.07, function (c) {
      roundedRect(c, -s * 0.3, -s * 0.3, s * 0.6, s * 0.6, s * 0.06);
    });
    ink(ctx, C.cream, s * 0.05, function (c) {
      c.arc(0, s * 0.06, s * 0.14, 0, Math.PI * 2);
    });
    ink(ctx, C.cyan, s * 0.04, function (c) {
      c.arc(0, s * 0.06, s * 0.05, 0, Math.PI * 2);
    });
    ink(ctx, C.cream, s * 0.05, function (c) {
      roundedRect(c, -s * 0.16, -s * 0.28, s * 0.32, s * 0.14, s * 0.03);
    });
  },
  walk: function (ctx, s) {
    ink(ctx, C.green, s * 0.07, function (c) {
      c.arc(-s * 0.02, -s * 0.28, s * 0.1, 0, Math.PI * 2);
    });
    ctx.save();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = s * 0.08;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(-s * 0.02, -s * 0.16);
    ctx.lineTo(-s * 0.02, s * 0.08);
    ctx.lineTo(-s * 0.2, s * 0.32);
    ctx.moveTo(-s * 0.02, s * 0.08);
    ctx.lineTo(s * 0.18, s * 0.3);
    ctx.moveTo(-s * 0.02, -s * 0.08);
    ctx.lineTo(s * 0.2, s * 0.04);
    ctx.moveTo(-s * 0.02, -s * 0.08);
    ctx.lineTo(-s * 0.22, 0.02 * s);
    ctx.stroke();
    ctx.restore();
  },
  plane: function (ctx, s) {
    ink(ctx, C.cyan, s * 0.07, function (c) {
      c.moveTo(s * 0.4, 0);
      c.lineTo(-s * 0.1, s * 0.14);
      c.lineTo(-s * 0.36, s * 0.36);
      c.lineTo(-s * 0.2, s * 0.06);
      c.lineTo(-s * 0.4, -s * 0.04);
      c.lineTo(-s * 0.18, -s * 0.1);
      c.lineTo(-s * 0.08, -s * 0.34);
      c.lineTo(0.02 * s, -s * 0.08);
      c.closePath();
    });
  },
  cool: function (ctx, s) {
    ink(ctx, C.cyan, s * 0.07, function (c) {
      c.arc(0, 0, s * 0.32, 0, Math.PI * 2);
    });
    ctx.save();
    ctx.strokeStyle = C.cream;
    ctx.lineWidth = s * 0.06;
    ctx.lineCap = "round";
    var i;
    for (i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(i * Math.PI / 3) * s * 0.2, Math.sin(i * Math.PI / 3) * s * 0.2);
      ctx.stroke();
    }
    ctx.restore();
    ink(ctx, C.cream, s * 0.05, function (c) {
      c.arc(0, 0, s * 0.07, 0, Math.PI * 2);
    });
  },
  tea: function (ctx, s) {
    ink(ctx, C.cream, s * 0.07, function (c) {
      c.moveTo(-s * 0.22, -s * 0.08);
      c.lineTo(s * 0.2, -s * 0.08);
      c.quadraticCurveTo(s * 0.22, s * 0.28, 0, s * 0.3);
      c.quadraticCurveTo(-s * 0.24, s * 0.28, -s * 0.22, -s * 0.08);
      c.closePath();
    });
    ink(ctx, "transparent", s * 0.07, function (c) {
      c.arc(s * 0.28, 0.04 * s, s * 0.12, -1.3, 1.3);
    });
    ink(ctx, C.stick, s * 0.06, function (c) {
      roundedRect(c, -s * 0.16, s * 0.28, s * 0.32, s * 0.08, s * 0.03);
    });
    ctx.save();
    ctx.strokeStyle = C.cyan;
    ctx.lineWidth = s * 0.035;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-s * 0.04, -s * 0.18);
    ctx.quadraticCurveTo(0, -s * 0.32, -s * 0.08, -s * 0.4);
    ctx.moveTo(s * 0.08, -s * 0.18);
    ctx.quadraticCurveTo(s * 0.12, -s * 0.3, s * 0.04, -s * 0.4);
    ctx.stroke();
    ctx.restore();
  }
};

function starPath(ctx, cx, cy, r, n) {
  var i, a, r2;
  n = n || 5;
  ctx.moveTo(cx, cy - r);
  for (i = 0; i < n; i++) {
    a = -Math.PI / 2 + (i + 0.5) * Math.PI * 2 / n;
    r2 = r * 0.4;
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    a = -Math.PI / 2 + (i + 1) * Math.PI * 2 / n;
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
  ctx.closePath();
}

function drawIcon(ctx, name, cx, cy, size, accent) {
  ctx.save();
  ctx.translate(cx, cy);
  ink(ctx, accent || C.yellow, size * 0.045, function (c) {
    c.arc(0, 0, size * 0.5, 0, Math.PI * 2);
  });
  ink(ctx, C.cream, size * 0.03, function (c) {
    c.arc(0, 0, size * 0.42, 0, Math.PI * 2);
  });
  fillHalftone(ctx, -size * 0.42, -size * 0.42, size * 0.84, size * 0.84, "rgba(26,18,12,0.06)", 10, 1.6, Math.PI / 6);
  var fn = ICONS[name] || ICONS.star;
  fn(ctx, size * 0.72);
  ctx.restore();
}


/* ---------- shareable card ---------- */
function drawStampBox(ctx, x, y, w, h, label, text, color, rot) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(rot || 0);
  ctx.translate(-(x + w / 2), -(y + h / 2));

  ctx.beginPath();
  roundedRect(ctx, x + 6, y + 6, w, h, 18);
  ctx.fillStyle = "rgba(26,18,12,0.18)";
  ctx.fill();

  ctx.beginPath();
  roundedRect(ctx, x, y, w, h, 18);
  ctx.fillStyle = C.cream;
  ctx.fill();
  ctx.lineJoin = "round";
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  roundedRect(ctx, x + 10, y + 10, w - 20, h - 20, 12);
  ctx.stroke();

  var badgeW = 86;
  var badgeH = 86;
  var bx = x + 28;
  var by = y + (h - badgeH) / 2;
  ctx.beginPath();
  roundedRect(ctx, bx, by, badgeW, badgeH, 12);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 6;
  ctx.stroke();
  drawComicText(ctx, label, bx + badgeW / 2, by + badgeH / 2 + 2, {
    font: font("900", 52),
    fill: C.cream,
    stroke: C.ink,
    sw: 8
  });

  ctx.font = font("700", 42);
  ctx.fillStyle = C.ink;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  var lines = wrapChars(ctx, text, w - 160);
  var i;
  var lh = 54;
  var ty = y + h / 2 - ((lines.length - 1) * lh) / 2;
  for (i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x + 132, ty + i * lh);
  }
  ctx.restore();
}

function drawSpeechBubble(ctx, x, y, w, h, text) {
  ctx.save();
  ctx.beginPath();
  roundedRect(ctx, x + 7, y + 8, w, h - 18, 28);
  ctx.fillStyle = "rgba(26,18,12,0.16)";
  ctx.fill();

  ctx.beginPath();
  roundedRect(ctx, x, y, w, h - 18, 28);
  ctx.moveTo(x + 70, y + h - 18);
  ctx.lineTo(x + 48, y + h);
  ctx.lineTo(x + 108, y + h - 18);
  ctx.fillStyle = C.cream;
  ctx.fill();
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 8;
  ctx.lineJoin = "round";
  ctx.stroke();

  ctx.font = font("700", 40);
  var lines = wrapChars(ctx, text, w - 80);
  var i, lh = 52;
  var ty = y + (h - 18) / 2 - ((lines.length - 1) * lh) / 2;
  ctx.fillStyle = C.ink;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x + w / 2, ty + i * lh);
  }
  ctx.restore();
}

function renderCard(canvas, mood, date) {
  date = date || new Date();
  var ctx = canvas.getContext("2d");
  var w = CARD_W;
  var h = CARD_H;
  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, w, h);

  var rng = mulberry32(dateSeed(date) * 33 + (mood.name.charCodeAt(0) * 131 + mood.name.length));

  /* paper */
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, w, h);
  fillHalftone(ctx, 0, 0, w, h, "rgba(226,59,46,0.10)", 18, 2.2, Math.PI / 7);
  fillHalftone(ctx, 0, 0, w, h, "rgba(42,167,184,0.08)", 22, 1.6, -Math.PI / 9);

  /* speckles */
  var i, sx, sy, sr;
  ctx.fillStyle = "rgba(26,18,12,0.16)";
  for (i = 0; i < 40; i++) {
    sx = 40 + rng() * (w - 80);
    sy = 40 + rng() * (h - 80);
    sr = 0.6 + rng() * 1.8;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  /* outer frame + misregistration */
  ctx.save();
  ctx.strokeStyle = C.cyan;
  ctx.lineWidth = 10;
  ctx.strokeRect(28, 32, w - 52, h - 56);
  ctx.strokeStyle = C.red;
  ctx.lineWidth = 10;
  ctx.strokeRect(36, 24, w - 52, h - 56);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 16;
  ctx.strokeRect(32, 32, w - 64, h - 64);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 4;
  ctx.strokeRect(52, 52, w - 104, h - 104);
  ctx.restore();

  /* corner bursts */
  function cornerBurst(cx, cy, rot) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.beginPath();
    burstPath(ctx, 0, 0, 18, 42, 8, 0);
    ctx.fillStyle = C.yellow;
    ctx.fill();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();
  }
  cornerBurst(78, 78, 0);
  cornerBurst(w - 78, 78, 0.4);
  function cornerBurstSmall(cx, cy, rot) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.beginPath();
    burstPath(ctx, 0, 0, 12, 28, 8, 0);
    ctx.fillStyle = C.yellow;
    ctx.fill();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
  }
  cornerBurstSmall(58, h - 58, 0.8);
  cornerBurstSmall(w - 58, h - 58, 1.2);

  /* title burst: 今日情绪 (date tape drawn on top) */
  var bx = w / 2;
  var by = 250;
  ctx.save();
  ctx.beginPath();
  burstPath(ctx, bx, by, 56, 126, 14, -0.2);
  ctx.fillStyle = C.yellow;
  ctx.fill();
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.restore();
  drawComicText(ctx, "今日情绪", bx, by + 18, {
    font: font("900", 54),
    fill: C.cream,
    stroke: C.ink,
    sw: 12,
    shadow: C.red,
    sx: 5,
    sy: 6
  });

  var dateText = formatDate(date);
  ctx.font = font("800", 34);
  var dw = ctx.measureText(dateText).width + 64;
  var dx = (w - dw) / 2;
  var dy = 86;
  ctx.save();
  ctx.translate(w / 2, dy + 24);
  ctx.rotate(-0.03);
  ctx.translate(-w / 2, -(dy + 24));
  ctx.beginPath();
  roundedRect(ctx, dx, dy, dw, 56, 6);
  ctx.fillStyle = C.cream;
  ctx.fill();
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = C.navy;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(dateText, w / 2, dy + 30);
  ctx.restore();

  /* icon */
  drawIcon(ctx, mood.icon, w / 2, 500, 280, mood.accent);

  /* mood name */
  var nameSize = mood.name.length > 4 ? 92 : 108;
  drawComicText(ctx, mood.name, w / 2, 700, {
    font: font("900", nameSize),
    fill: C.cream,
    stroke: C.ink,
    sw: 18,
    shadow: mood.accent || C.red,
    sx: 7,
    sy: 8
  });

  /* 宜 / 忌 */
  drawStampBox(ctx, 90, 770, 900, 156, "宜", mood.yi, C.green, -0.012);
  drawStampBox(ctx, 90, 950, 900, 156, "忌", mood.ji, C.red, 0.012);

  /* witty line */
  drawSpeechBubble(ctx, 90, 1128, 900, 188, mood.line);

  /* credit + serial — inset so they clear the corner bursts */
  ctx.save();
  ctx.font = font("700", 28);
  ctx.fillStyle = C.ink;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("作者 hukx", 130, 1384);
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(26,18,12,0.7)";
  ctx.font = font("700", 26);
  ctx.fillText("今日情绪抽签  NO." + dateStamp(date), w - 130, 1384);
  ctx.restore();

  return canvas;
}

/* ---------- stage background + pot ---------- */
function drawStick(ctx, x, y, rot, len, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.fillStyle = color;
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.beginPath();
  roundedRect(ctx, -5, -len, 10, len, 4);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = C.red;
  ctx.beginPath();
  ctx.arc(0, -len + 2, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawPot(ctx, cx, cy, scale, shake) {
  ctx.save();
  ctx.translate(cx + (shake && shake.x || 0), cy + (shake && shake.y || 0));
  ctx.rotate(shake && shake.rot || 0);
  ctx.scale(scale, scale);

  var sticks = [
    { x: -18, rot: -0.28, len: 86, c: C.stick },
    { x: -6, rot: -0.1, len: 96, c: "#f0d399" },
    { x: 4, rot: 0.05, len: 102, c: C.stick },
    { x: 14, rot: 0.16, len: 90, c: "#e2b56a" },
    { x: 26, rot: 0.32, len: 80, c: C.stick }
  ];
  var i;
  for (i = 0; i < sticks.length; i++) {
    drawStick(ctx, sticks[i].x, -28, sticks[i].rot, sticks[i].len + (shake && shake.rise || 0) * (i === 2 ? 1 : 0.15), sticks[i].c);
  }

  /* pot body */
  ctx.fillStyle = C.wood;
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-62, -30);
  ctx.lineTo(62, -30);
  ctx.lineTo(50, 70);
  ctx.quadraticCurveTo(0, 86, -50, 70);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  fillHalftone(ctx, -62, -30, 124, 120, "rgba(26,18,12,0.12)", 8, 1.3, 0.4);

  /* bands */
  ctx.fillStyle = C.brown2;
  ctx.beginPath();
  ctx.rect(-60, -8, 120, 14);
  ctx.fill();
  ctx.strokeRect(-60, -8, 120, 14);
  ctx.beginPath();
  ctx.moveTo(-52, 48);
  ctx.lineTo(52, 48);
  ctx.lineTo(50, 62);
  ctx.lineTo(-50, 62);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  /* label */
  ctx.fillStyle = C.red;
  ctx.beginPath();
  roundedRect(ctx, -28, 6, 56, 36, 6);
  ctx.fill();
  ctx.stroke();
  drawComicText(ctx, "签", 0, 26, {
    font: font("900", 28),
    fill: C.yellow,
    stroke: C.ink,
    sw: 5
  });

  /* tassel */
  ctx.strokeStyle = C.red;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 70);
  ctx.quadraticCurveTo(10, 90, 2, 108);
  ctx.stroke();
  ctx.fillStyle = C.red;
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-8, 108);
  ctx.lineTo(10, 108);
  ctx.lineTo(6, 128);
  ctx.lineTo(-6, 128);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawBgBurst(ctx, cx, cy, r, fill) {
  ctx.save();
  ctx.beginPath();
  burstPath(ctx, cx, cy, r * 0.55, r, 16, -0.15);
  ctx.fillStyle = fill || C.yellow;
  ctx.fill();
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.restore();
}

function paintStage(bg, mode, ts, shuffleName) {
  var rect = bg.getBoundingClientRect();
  var dpr = Math.min(3, window.devicePixelRatio || 1);
  var pw = Math.max(1, Math.round(rect.width * dpr));
  var ph = Math.max(1, Math.round(rect.height * dpr));
  if (bg.width !== pw || bg.height !== ph) {
    bg.width = pw;
    bg.height = ph;
  }
  var ctx = bg.getContext("2d");
  var scale = pw / 360;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, 360, 640);

  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, 360, 640);
  fillHalftone(ctx, 0, 0, 360, 640, "rgba(226,59,46,0.11)", 12, 1.6, Math.PI / 7);
  fillHalftone(ctx, 0, 0, 360, 640, "rgba(42,167,184,0.08)", 16, 1.2, -Math.PI / 9);

  /* decorative dots / stars around */
  ctx.save();
  var deco = [
    [36, 80, 7], [318, 96, 6], [40, 520, 8], [322, 500, 6],
    [28, 260, 5], [336, 300, 5]
  ];
  var d;
  for (d = 0; d < deco.length; d++) {
    ctx.beginPath();
    starPath(ctx, deco[d][0], deco[d][1], deco[d][2], 5);
    ctx.fillStyle = C.yellow;
    ctx.fill();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();

  if (mode === "result") {
    /* quiet background only — card sits on top */
    return;
  }

  var shake = { x: 0, y: 0, rot: 0, rise: 0 };
  if (mode === "drawing" && ts) {
    var t = ts / 1000;
    shake.x = Math.sin(t * 28) * 7;
    shake.y = Math.cos(t * 22) * 4;
    shake.rot = Math.sin(t * 26) * 0.12;
    shake.rise = 16 + Math.sin(t * 18) * 8;
    /* speed lines */
    ctx.save();
    ctx.strokeStyle = "rgba(26,18,12,0.28)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    var k;
    for (k = 0; k < 8; k++) {
      var ang = -0.6 + k * 0.18;
      ctx.beginPath();
      ctx.moveTo(180 + Math.cos(ang) * 70, 390 + Math.sin(ang) * 40);
      ctx.lineTo(180 + Math.cos(ang) * 130, 390 + Math.sin(ang) * 80);
      ctx.stroke();
    }
    ctx.restore();
  }

  /* pot sits mid-lower; title occupies the upper burst via HTML */
  drawPot(ctx, 180, mode === "drawing" ? 430 : 390, 1.15, shake);

  if (mode === "drawing") {
    drawBgBurst(ctx, 180, 210, 128, C.yellow);
  }
}

function paintLogoBurst(canvas) {
  if (!canvas) return;
  var rect = canvas.getBoundingClientRect();
  var dpr = Math.min(3, window.devicePixelRatio || 1);
  var pw = Math.max(1, Math.round(rect.width * dpr));
  var ph = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph;
  }
  var ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, pw, ph);
  var cx = pw / 2;
  var cy = ph / 2;
  var r = Math.min(pw, ph) * 0.48;
  ctx.beginPath();
  burstPath(ctx, cx, cy, r * 0.58, r, 16, -0.12);
  ctx.fillStyle = C.yellow;
  ctx.fill();
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = Math.max(6, r * 0.045);
  ctx.lineJoin = "round";
  ctx.stroke();
}


/* ---------- UI ---------- */
var els = {};
var state = {
  mode: "title", /* title | drawing | result */
  index: 0,
  first: true,
  date: new Date(),
  shuffleName: "",
  raf: 0
};

function $(id) {
  return document.getElementById(id);
}

function showScreen(mode) {
  state.mode = mode;
  els.title.hidden = mode !== "title";
  els.drawing.hidden = mode !== "drawing";
  els.result.hidden = mode !== "result";
}

function toast(msg) {
  els.toast.hidden = false;
  els.toast.textContent = msg;
  clearTimeout(toast._t);
  toast._t = setTimeout(function () {
    els.toast.hidden = true;
  }, 1600);
}

function canAutoDownload() {
  var ua = navigator.userAgent || "";
  if (/MicroMessenger/i.test(ua)) return false;
  if (/iPhone|iPad|iPod/i.test(ua)) return false;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return false;
  return true;
}

function fileNameFor(mood, date) {
  return "今日情绪-" + mood.name + "-" + dateStamp(date) + ".png";
}

function showSaveOverlay(url) {
  els.saveImg.src = url;
  els.saveOverlay.hidden = false;
}

function hideSaveOverlay() {
  els.saveOverlay.hidden = true;
  els.saveImg.removeAttribute("src");
}

function saveCard() {
  var canvas = els.card;
  var url;
  try {
    url = canvas.toDataURL("image/png");
  } catch (err) {
    toast("保存失败，请截屏试试");
    return;
  }
  if (!canAutoDownload()) {
    showSaveOverlay(url);
    return;
  }
  try {
    var a = document.createElement("a");
    a.href = url;
    a.download = fileNameFor(MOODS[state.index], state.date);
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast("已保存");
  } catch (err2) {
    showSaveOverlay(url);
  }
}

function renderCurrentCard() {
  renderCard(els.card, MOODS[state.index], state.date);
}

function tick(ts) {
  state.raf = requestAnimationFrame(tick);
  paintStage(els.bg, state.mode, ts, state.shuffleName);
}

function startDraw(index, animate) {
  state.date = new Date();
  if (index == null || index < 0 || index >= MOODS.length) {
    index = state.first ? pickToday(state.date) : pickRandomExcept(state.index);
  }
  state.index = index;
  state.first = false;
  hideSaveOverlay();

  if (animate === false) {
    renderCurrentCard();
    showScreen("result");
    return;
  }

  showScreen("drawing");
  var chosen = MOODS[index].name;
  var started = performance.now();
  var duration = 1100;
  var last = -1;
  function step(now) {
    if (state.mode !== "drawing") return;
    var t = now - started;
    if (t >= duration) {
      els.shuffleName.textContent = chosen;
      renderCurrentCard();
      showScreen("result");
      return;
    }
    var slot = Math.floor(t / 55);
    if (slot !== last) {
      last = slot;
      var r;
      do {
        r = MOODS[Math.floor(Math.random() * MOODS.length)].name;
      } while (r === chosen && MOODS.length > 1);
      state.shuffleName = r;
      els.shuffleName.textContent = r;
    }
    requestAnimationFrame(step);
  }
  els.shuffleName.textContent = "……";
  requestAnimationFrame(step);
}

function showCard(index, opt) {
  opt = opt || {};
  startDraw(index, opt.animate !== false ? true : false);
}

function onResize() {
  paintStage(els.bg, state.mode, 0, state.shuffleName);
  if (!els.title.hidden) paintLogoBurst(els.logoBurst);
}

function bind() {
  els.btnDraw.addEventListener("click", function () {
    startDraw(state.first ? pickToday() : pickRandomExcept(state.index), true);
  });
  els.btnAgain.addEventListener("click", function () {
    startDraw(pickRandomExcept(state.index), true);
  });
  els.btnSave.addEventListener("click", saveCard);
  els.btnCloseSave.addEventListener("click", hideSaveOverlay);
  els.saveOverlay.addEventListener("click", function (ev) {
    if (ev.target === els.saveOverlay) hideSaveOverlay();
  });
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", function () {
    setTimeout(onResize, 120);
  });
}

function boot() {
  els.bg = $("bg");
  els.logoBurst = $("logo-burst");
  els.card = $("card");
  els.title = $("screen-title");
  els.drawing = $("screen-drawing");
  els.result = $("screen-result");
  els.shuffleName = $("shuffle-name");
  els.btnDraw = $("btn-draw");
  els.btnAgain = $("btn-again");
  els.btnSave = $("btn-save");
  els.saveOverlay = $("save-overlay");
  els.saveImg = $("save-img");
  els.btnCloseSave = $("btn-close-save");
  els.toast = $("toast");

  var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  ready.then(function () {
    bind();
    showScreen("title");
    onResize();
    if (!state.raf) state.raf = requestAnimationFrame(tick);
  });
}

var API = {
  MOODS: MOODS,
  showCard: showCard,
  startDraw: startDraw,
  renderCard: renderCard,
  pickToday: pickToday,
  formatDate: formatDate
};

if (typeof window !== "undefined") {
  window.Qingxu = API;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
}

if (typeof module === "object" && module.exports) {
  module.exports = API;
}
