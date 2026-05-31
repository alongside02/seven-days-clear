const STORAGE_KEY = "seven-days-clear-save-v2";

const phases = {
  morning: "早晨",
  day: "白天",
  night: "夜晚",
};

const dayNames = ["", "第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天"];

const baseline = {
  day: 1,
  phase: "morning",
  clarity: 5,
  echo: 2,
  room: 5,
  steps: 0,
  wording: 0,
  bag: ["钥匙", "零钱"],
  note: "空白",
  lastAction: null,
  flags: {},
  review: [],
};

let state = loadSave() || structuredClone(baseline);

const $ = (id) => document.getElementById(id);
const elements = {
  startScreen: $("startScreen"),
  gameScreen: $("gameScreen"),
  endingScreen: $("endingScreen"),
  systemLine: $("systemLine"),
  story: $("story"),
  choices: $("choices"),
  countdownLabel: $("countdownLabel"),
  dayLabel: $("dayLabel"),
  phaseLabel: $("phaseLabel"),
  bagLabel: $("bagLabel"),
  noteLabel: $("noteLabel"),
  stateReadout: $("stateReadout"),
  phaseTrack: $("phaseTrack"),
  meters: $("meters"),
  lastAction: $("lastAction"),
  continueButton: $("continueButton"),
  endingTitle: $("endingTitle"),
  endingStats: $("endingStats"),
  endingBody: $("endingBody"),
  reviewDialog: $("reviewDialog"),
  reviewList: $("reviewList"),
};

const scenes = {
  1: {
    morning: scene(
      "系统提示：不要盯着伤口看太久，它会开始盯你。",
      [
        "手机还热着。热榜像一排审讯灯，白得没有温度。",
        "她看见标题里那些熟悉的词：女孩、房间、监控、邻居、没人听见。每个词都很短，短得像被剪掉了后半截。",
        "窗帘外有人拖箱子下楼。轮子压过瓷砖，声音干脆，像某种判决已经执行。",
      ],
      [
        choice("把整条时间线看完", "知道每一处细节，把它们塞进自己脑子里。", { echo: 3, room: 2, clarity: -1 }, "她把整条时间线看完，像吞下一串生锈的钥匙。", "danger", { deepRead: true }),
        choice("把手机扣死", "屏幕贴住床单，光被闷住。", { echo: -1, clarity: 1 }, "她把手机扣死，房间里突然只剩自己的呼吸。", "", { phoneDown: true }),
        choice("洗头，换衣服", "先把身体从昨晚的页面里拽出来。", { steps: 1, room: -1, clarity: 1 }, "她洗头，换衣服，像从一张湿纸里撕开自己。", "", { washedHair: true }),
      ],
    ),
    day: scene(
      "房东清单已生成：钥匙、门禁、押金、水电、别留下痕迹。",
      [
        "桌上的退租清单非常礼貌，礼貌得像一把塑料刀。",
        "她翻出公交卡，卡面磨白了。原来这东西一直在，安静地躺在半袋盐下面，像一个低配出口。",
      ],
      [
        choice("照清单把东西排成一线", "把生活摆成证物。", { clarity: 1, bag: ["押金单"] }, "她把押金单夹进包里，像夹住一张迟到的通行证。"),
        choice("查最近的公交站", "六个方向，至少不是一个方向。", { steps: 1, room: -1, clarity: 1 }, "她查到最近的站叫槐北路，名字像没见过面的亲戚。", "", { knowsBus: true }),
        choice("把清单揉成团", "纸团很轻，扔出去也弹回来。", { room: 1, wording: -1 }, "她把清单揉成团，又摊开。皱纹比字更诚实。"),
      ],
    ),
    night: scene(
      "夜间记录会改写明天。不是命运，是你递给自己的台词。",
      [
        "隔壁电视声从墙里渗出来。她打开日记本，白纸像一张没有表情的脸。",
      ],
      [
        choice("写：我又废掉一天", "这句很熟，像旧锁。", { wording: -2, room: 1, echo: 1 }, "夜里写下：我又废掉一天。", "danger", { note: "自判" }),
        choice("写：窗外有风", "不解释，不求证。", { wording: 1, clarity: 1 }, "夜里写下：窗外有风。", "", { note: "风" }),
        choice("写：明天我下楼", "先把命令写给腿。", { wording: 2, steps: 1, room: -1 }, "夜里写下：明天我下楼。", "", { note: "下楼" }),
      ],
    ),
  },
  2: {
    morning: scene(
      "推送刷新：同类样本 +17。你的胃部响应很快。",
      [
        "三个人转来同一条链接，标题换了皮，里面还是那具被反复拖出来给人看的身体。",
        "她的拇指停在屏幕上。只要继续滑，就会有更多证词、更多慢放、更多人教她如何害怕。",
      ],
      [
        choice("继续滑，滑到手指发麻", "把别人的惨状训练成自己的条件反射。", { echo: 3, room: 2, clarity: -1 }, "她滑到手指发麻，胃里像塞了一只坏掉的闹钟。", "danger", { doomscroll: true }),
        choice("只看时间地点，然后退出", "知道发生过，到此为止。", { echo: 1, clarity: 1 }, "她只看时间和地点，然后退出。屏幕还想说话，她没听完。"),
        choice("静音三个群", "不是闭眼，是关掉喇叭。", { echo: -2, clarity: 1 }, "她把三个群静音，房间里第一次没有人代替她尖叫。", "", { muted: true }),
      ],
    ),
    day: scene(
      "便利店开放。货架不是自由，但比床沿大。",
      [
        "楼下便利店亮得粗暴。老板娘拆纸箱，胶带被撕开，发出一声很长的裂响。",
        "她站在盐和面包中间，突然意识到自己不是只有观看这一种姿势。",
      ],
      [
        choice("买盐，再买面包", "手上有重量，脑子会闭嘴几秒。", { steps: 2, room: -1, clarity: 1, bag: ["盐", "面包"] }, "她买了盐和面包。袋子撞着膝盖，像一个小小的现实。", "", { boughtSalt: true }),
        choice("绕到公交站", "去看那些不属于房间的站名。", { steps: 2, room: -2, clarity: 1 }, "她绕到公交站，看见六个方向，六个都没有问她配不配。", "", { sawBusStop: true }),
        choice("站在冷柜前继续刷", "冷光照着脸，像临时停尸间。", { echo: 2, room: 1, clarity: -1 }, "她站在冷柜前继续刷手机，玻璃门映出一张被喂饱的空脸。", "danger"),
      ],
    ),
    night: scene(
      "楼上短促争吵。身体自动屏息。系统记录：旧程序仍在运行。",
      [
        "窗外有人吵架，很快停了。她等了一会儿才发现，自己一直没敢呼吸。",
      ],
      [
        choice("写：我不该乱想", "把鞭子递回自己手里。", { wording: -2, room: 1 }, "夜里写下：我不该乱想。", "danger", { note: "规训" }),
        choice("写：便利店门铃很响", "具体的声音，比判断更硬。", { wording: 2, clarity: 1 }, "夜里写下：便利店门铃很响。", "", { note: "门铃" }),
        choice("不写，把公交卡放进包里", "有些回答不需要句号。", { steps: 1, room: -1, bag: ["公交卡"] }, "夜里她没写，把公交卡塞进包里。", "", { note: "空页", packedCard: true }),
      ],
    ),
  },
  3: {
    morning: scene(
      "房间开始露馅：它不是世界，只是租来的水泥盒。",
      [
        "纸箱一展开，地板突然宽了一点。她讨厌这种证据：原来空间一直有，只是被旧东西占着。",
        "旧耳机缠住一张明信片。背面没有地址，只有一句没寄出的问候，像一枚失效但没爆的雷。",
      ],
      [
        choice("撕掉明信片", "碎纸很听话。", { clarity: -1, room: 1, wording: -1 }, "她撕掉明信片，碎纸像一群被驯服的小白旗。", "danger"),
        choice("把明信片夹进书里", "不供奉，不处决。", { clarity: 1, bag: ["明信片"] }, "她把明信片夹进书里，暂缓宣判。"),
        choice("给旧同学发一个句号", "一句话都没有，但线路接通了。", { steps: 1, clarity: 1, room: -1 }, "她给旧同学发了一个句号。那一点黑，像门缝。", "", { pingedFriend: true }),
      ],
    ),
    day: scene(
      "外部连接请求。你可以拒绝，但拒绝也是一种点击。",
      [
        "旧同学回了一个问号。不是救生艇，甚至不算船，只是一块浮着的木板。",
        "她的手搭在门把上。门把很冷，像在提醒她：冷不等于锁。",
      ],
      [
        choice("回复：我在收拾东西", "真话很短，够用。", { steps: 1, clarity: 2, room: -1 }, "她回复：我在收拾东西。发送成功，世界没有爆炸。", "", { friendKnows: true }),
        choice("预约上门回收", "让陌生人把旧架子抬走。", { steps: 2, room: -2, clarity: 1 }, "她预约回收，旧架子第一次变成可以被拿走的东西。", "", { recycling: true }),
        choice("搜索更多相似故事", "关键词自动补全，像嘴里长出别人的牙。", { echo: 3, room: 1, clarity: -2 }, "她搜索更多相似故事，页面乖乖交出一整排伤口。", "danger"),
      ],
    ),
    night: scene(
      "冰箱停机。房间安静得像刚审完一个人。",
      [
        "她躺在床沿，没有睡。天花板没做什么，却看起来很有权威。",
      ],
      [
        choice("写：我总是这样", "一锤子打进自己的名字里。", { wording: -2, room: 1, clarity: -1 }, "夜里写下：我总是这样。", "danger", { note: "总是" }),
        choice("写：纸箱展开了", "纸箱没有安慰你，纸箱只是展开。", { wording: 2, room: -1, clarity: 1 }, "夜里写下：纸箱展开了。", "", { note: "纸箱" }),
        choice("把门打开一条缝", "楼道有洗衣粉味，不神圣，但是真的。", { steps: 1, room: -1, echo: -1 }, "夜里她把门打开一条缝，闻到洗衣粉味。", "", { note: "门缝", openedDoor: true }),
      ],
    ),
  },
  4: {
    morning: scene(
      "暴雨。系统建议：不要把天气误认为判决书。",
      [
        "雨把窗户打得很响。手机信号也很好，好得像一根插进脑子的管子。",
        "她用旧毛巾压住渗水的窗台。毛巾很丑，但它在工作。",
      ],
      [
        choice("看热榜看到雨停", "雨不会停，热榜也不会。", { echo: 3, room: 2, clarity: -2 }, "她看热榜看到雨声变小，眼睛却更吵了。", "danger"),
        choice("洗旧毛巾，晾起来", "把脏东西从手里搓出去。", { clarity: 1, room: -1 }, "她洗了旧毛巾，拧水时手腕发酸。"),
        choice("查新房路线", "换乘一次，步行九百米。听起来像活人的麻烦。", { steps: 2, room: -1, clarity: 1 }, "她查了一间新房的路线。地图上蓝线冷静得可恨。", "", { routeChecked: true }),
      ],
    ),
    day: scene(
      "雨伞骨架损坏 1/8。仍可展开。",
      [
        "下午雨更大。路面积水翻着灰白的泡，像城市在吐。",
        "她把伞撑开。弯掉的那根伞骨没有断，反而显得很凶。",
      ],
      [
        choice("撑伞去看房", "鞋会湿，路线会变成记忆。", { steps: 3, room: -3, clarity: 2 }, "她撑伞去看房，袜子湿透，但门牌号是真的。", "", { sawRoom: true }),
        choice("改到明天，不取消", "推迟，不投降。", { steps: 1, clarity: 1 }, "她给中介发消息改到明天。不是取消。", "", { rescheduled: true }),
        choice("坐在门边听雨", "至少不是屏幕。", { room: 1, echo: -1 }, "她坐在门边听雨，听到楼下有人骂了一句，又笑了。"),
      ],
    ),
    night: scene(
      "墙面反光。屋内无异常。异常的是你还把它当边界。",
      [
        "车灯一格一格爬过墙。她忽然觉得墙很忙，忙着假装自己重要。",
      ],
      [
        choice("写：外面太麻烦了", "这句很好用，好用得危险。", { wording: -1, room: 2 }, "夜里写下：外面太麻烦了。", "danger", { note: "麻烦" }),
        choice("写：伞还能撑开", "损坏不是报废。", { wording: 2, clarity: 1 }, "夜里写下：伞还能撑开。", "", { note: "雨伞" }),
        choice("把湿鞋放到门外", "让门外处理一点你的重量。", { steps: 1, room: -1 }, "夜里她把湿鞋放到门外，楼道风吹过鞋面。", "", { note: "湿鞋" }),
      ],
    ),
  },
  5: {
    morning: scene(
      "来电。外部世界正在敲壳。",
      [
        "电话响。来电名只有一个姓。她看了三秒，想起那个人曾经见过她没那么糟的样子。",
        "铃声停下，又响。它不像命运，比较像一个不懂礼貌的人。",
      ],
      [
        choice("接起来，说：我在", "先报坐标，不交代罪名。", { clarity: 2, steps: 1, room: -1 }, "她接起来，说：我在。两个字从喉咙里滚出来，没有死。", "", { answeredCall: true }),
        choice("等它自己停", "它会停。很多东西都会。", { room: 1, wording: -1 }, "她等电话自己停。安静回来得很快，快得像撤退。", "danger"),
        choice("回短信：晚点说", "给未来留一个窄口。", { clarity: 1, steps: 1 }, "她回短信：晚点说。晚点突然有了形状。", "", { textedBack: true }),
      ],
    ),
    day: scene(
      "事件堆叠：回收、看房、吃面、未读消息。请选择你要喂哪一个。",
      [
        "今天的事情挤在一起，像抽屉里没卷好的数据线。",
        "旧架子靠着墙，像一副已经认输的骨头。",
      ],
      [
        choice("让回收的人进门", "把骨头抬出去。", { steps: 2, room: -3, clarity: 1 }, "回收的人把旧架子抬走，墙上露出浅印，像摘掉绷带。", "", { shelfGone: true }),
        choice("出去吃一碗面", "热汤会粗暴地证明你还在。", { steps: 3, echo: -2, room: -2, clarity: 1 }, "她出去吃了一碗面。汤烫得蛮横，她差点掉眼泪。", "", { ateNoodles: true }),
        choice("把所有消息标成未读", "让红点排队，等你跪下。", { echo: 1, room: 2, clarity: -1 }, "她把消息全标成未读，红点密密麻麻，像一群睁着的眼。", "danger"),
      ],
    ),
    night: scene(
      "桌面已空出 37%。系统不承认奇迹，只承认面积。",
      [
        "桌面空出一块。她把手放上去，摸到灰，摸到一个很小但很硬的事实。",
      ],
      [
        choice("写：我没有地方可去", "这句会把地图烧掉。", { wording: -2, room: 2, clarity: -1 }, "夜里写下：我没有地方可去。", "danger", { note: "无处" }),
        choice("写：桌面空出来了", "空不是没有，空是可用。", { wording: 2, room: -1, clarity: 1 }, "夜里写下：桌面空出来了。", "", { note: "桌面" }),
        choice("把明天要带的东西放门口", "让明天堵住门。", { steps: 2, room: -1, bag: ["换洗衣服"] }, "夜里她把明天要带的东西放在门口。", "", { note: "门口", packedBag: true }),
      ],
    ),
  },
  6: {
    morning: scene(
      "第六天。房间有回音，因为它已经空得藏不住了。",
      [
        "押金单、公交卡、钥匙排成一行。它们看起来不像希望，更像工具。工具比希望可靠。",
        "她说了一声喂。声音撞墙回来，没带回任何命令。",
      ],
      [
        choice("拍照发给房东确认", "手续也可以是刀。", { steps: 2, clarity: 1, room: -1 }, "她拍照发给房东。对方回：收到。两个字砸得很实。", "", { landlordOk: true }),
        choice("订去邻城的车票", "不是远走高飞，只是离开这一站。", { steps: 3, room: -2, clarity: 1, bag: ["车票"] }, "她订了车票。付款成功的提示音短得很不浪漫。", "", { ticket: true }),
        choice("重新下载被静音的消息", "把针头插回去。", { echo: 3, room: 2, clarity: -2 }, "她重新下载那些消息，进度条快得像背叛。", "danger"),
      ],
    ),
    day: scene(
      "空墙暴露。旧家具阴影已退场。",
      [
        "午后，阳光晒在空墙上。旧架子留下的长方形浅印很丑，但它证明某些东西真的可以被搬走。",
        "她在屋里转了一圈，没有碰到任何东西。这种顺畅让她有点生气。",
      ],
      [
        choice("把钥匙交到楼下信箱", "金属落下去，声音很短。", { steps: 3, room: -3, clarity: 2 }, "她把钥匙交到信箱。啪嗒一声，像某种小型爆破。", "", { keyReturned: true }),
        choice("最后拖一遍地", "不告别，清场。", { clarity: 1, room: -1 }, "她最后拖了一遍地。水桶比以前轻。"),
        choice("躺在地板上等天黑", "天花板不会给你新证据。", { room: 2, echo: 1 }, "她躺在地板上等天黑，天花板保持沉默。", "danger"),
      ],
    ),
    night: scene(
      "包重 3.2kg。可携带。可离场。",
      [
        "夜里她没有开顶灯。包在门边，轮廓黑得很清楚，像一块从房间里切下来的影子。",
        "日记本还剩很多页。空页没有催她悔过。",
      ],
      [
        choice("写：明天再说", "明天已经站到门口了。", { wording: -1, room: 1 }, "夜里写下：明天再说。", "danger", { note: "拖延" }),
        choice("写：包很轻", "轻到可以拎起来。", { wording: 2, clarity: 1, steps: 1 }, "夜里写下：包很轻。", "", { note: "轻" }),
        choice("不写，把本子塞进包里", "让叙述跟着走，不让它坐镇。", { steps: 2, room: -1, bag: ["日记本"] }, "夜里她合上日记本，把它塞进包里。", "", { note: "合上", packedNotebook: true }),
      ],
    ),
  },
  7: {
    morning: scene(
      "D-0。天气晴。系统没有权限解释这件事。",
      [
        "第七天晴得很不客气。窗框在地上投下四条线，像有人画了一个失败的笼子。",
        "房东发来消息：今天几点方便？她看见鞋在门口，鞋面干了，像已经替她等烦了。",
      ],
      [
        choice("回复：现在方便", "让今天立刻开始。", { steps: 3, clarity: 2, room: -2 }, "她回复：现在方便。发送键按下去，像按住一枚起爆器。", "", { finalReady: true }),
        choice("问能不能再续七天", "房间会很乐意继续扮演世界。", { room: 3, wording: -1 }, "她问能不能再续七天。消息发出去，屋里像多了一层塑料膜。", "danger", { askedRenew: true }),
        choice("删掉几个收藏夹", "不是忘记，是停止供血。", { echo: -2, clarity: 1 }, "她删掉几个收藏夹。标题消失，空位整齐得刺眼。", "", { deletedBookmarks: true }),
      ],
    ),
    day: scene(
      "押金待退。钥匙待交。人已可移动。",
      [
        "中午，房东看了一圈，说墙面没问题。她听见这句话，突然很想笑。",
        "她站在楼下，风把塑料袋吹到路沿，又松开。连塑料袋都没有一直贴在那里。",
      ],
      [
        choice("坐上去邻城的车", "车会开。你不需要先变成新人。", { steps: 4, room: -3, clarity: 1 }, "她坐上去邻城的车。车门合上时，城市没有发表意见。", "", { boardedTrain: true }),
        choice("去吃那碗面", "自己点单，自己加辣。", { steps: 2, echo: -1, clarity: 1, room: -1 }, "她去吃那碗面，这次自己点单，自己加辣。", "", { finalNoodles: true }),
        choice("拎着包在楼下站很久", "站着也是一种没回去。", { room: 1, clarity: -1 }, "她拎着包在楼下站很久，影子从左边挪到右边。"),
      ],
    ),
    night: scene(
      "最终记录。你可以总结，也可以拒绝被总结。",
      [
        "夜里，她有一张床，或一张硬座车票，或便利店窗边的高脚凳。",
        "日记本摊开。笔帽滚到桌边，停住。它等她给这七天判刑。",
      ],
      [
        choice("写：第八天", "只写三个字，像把墙打穿一个孔。", { wording: 2, clarity: 1 }, "夜里只写下：第八天。", "", { note: "第八天", eighthDay: true }),
        choice("写：我终于离开了", "这句太圆，可能会滚回旧故事里。", { wording: 0, clarity: 1 }, "夜里写下：我终于离开了。", "", { note: "命名", namedLeaving: true }),
        choice("不写，合上本子", "拒绝给伤口做标题。", { wording: 3, echo: -1, clarity: 1 }, "夜里她没有写日记。", "", { note: "未写", noFinalDiary: true }),
      ],
    ),
  },
};

function scene(system, text, choices) {
  return { system, text, choices };
}

function choice(label, hint, effects, memory, className = "", extra = {}) {
  const { note, ...flags } = extra;
  return { label, hint, effects, memory, className, note, flags };
}

function clampStats() {
  state.clarity = clamp(state.clarity, 0, 12);
  state.echo = clamp(state.echo, 0, 12);
  state.room = clamp(state.room, 0, 12);
  state.steps = clamp(state.steps, 0, 20);
  state.wording = clamp(state.wording, -10, 10);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function show(screen) {
  elements.startScreen.classList.toggle("hidden", screen !== "start");
  elements.gameScreen.classList.toggle("hidden", screen !== "game");
  elements.endingScreen.classList.toggle("hidden", screen !== "ending");
}

function render() {
  if (state.ending) {
    renderEnding(state.ending);
    return;
  }

  if (!isValidState(state) || !localStorage.getItem(STORAGE_KEY)) {
    show("start");
    elements.continueButton.disabled = true;
    return;
  }

  show("game");
  elements.continueButton.disabled = false;
  elements.countdownLabel.textContent = `D-${8 - state.day}`;
  elements.dayLabel.textContent = dayNames[state.day];
  elements.phaseLabel.textContent = phases[state.phase];
  elements.bagLabel.textContent = state.bag.length ? state.bag.join("、") : "空";
  elements.noteLabel.textContent = state.note || "空白";
  elements.stateReadout.textContent = getStateReadout();

  renderPhaseTrack();
  renderMeters();
  renderLastAction();

  const current = scenes[state.day][state.phase];
  elements.systemLine.textContent = current.system;
  elements.story.innerHTML = current.text.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  elements.choices.innerHTML = "";

  current.choices.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice ${item.className || ""}`.trim();
    button.innerHTML = `${index + 1}. ${escapeHtml(item.label)}<small>${escapeHtml(item.hint)}</small>`;
    button.addEventListener("click", () => choose(item));
    elements.choices.appendChild(button);
  });
}

function renderMeters() {
  const meterData = [
    ["噪声", state.echo, 12, "red"],
    ["墙感", state.room, 12, "red"],
    ["动作", state.steps, 20, "lime"],
    ["清醒", state.clarity, 12, "cyan"],
  ];

  elements.meters.innerHTML = meterData
    .map(([label, value, max, color]) => {
      const percent = Math.round((value / max) * 100);
      return `
        <div class="meter">
          <div class="meter-label"><span>${label}</span><span>${value}/${max}</span></div>
          <div class="meter-track"><div class="meter-fill ${color}" style="width:${percent}%"></div></div>
        </div>
      `;
    })
    .join("");
}

function renderPhaseTrack() {
  const total = 21;
  const phaseOffset = { morning: 1, day: 2, night: 3 }[state.phase] || 1;
  const currentStep = Math.min(total, (state.day - 1) * 3 + phaseOffset);

  elements.phaseTrack.innerHTML = Array.from({ length: total }, (_, index) => {
    const step = index + 1;
    const className = step < currentStep ? "done" : step === currentStep ? "current" : "";
    return `<span class="${className}" title="进度 ${step}/${total}"></span>`;
  }).join("");
}

function renderLastAction() {
  if (!state.lastAction) {
    elements.lastAction.classList.add("hidden");
    elements.lastAction.textContent = "";
    return;
  }

  elements.lastAction.classList.remove("hidden");
  elements.lastAction.innerHTML = `
    <span>刚刚：</span>${escapeHtml(state.lastAction.text)}
    <small>${escapeHtml(state.lastAction.delta || "没有明显读数变化")}</small>
  `;
}

function choose(item) {
  const before = snapshotStats();
  applyChoice(item);
  const after = snapshotStats();
  state.lastAction = {
    text: item.memory,
    delta: describeDelta(before, after),
  };
  state.review.push({
    day: dayNames[state.day],
    phase: phases[state.phase],
    text: item.memory,
  });

  advance();
  clampStats();

  if (state.day > 7) {
    state.ending = decideEnding();
  }

  save();
  render();
}

function snapshotStats() {
  return {
    clarity: state.clarity,
    echo: state.echo,
    room: state.room,
    steps: state.steps,
    wording: state.wording,
  };
}

function describeDelta(before, after) {
  const labels = {
    clarity: "清醒",
    echo: "噪声",
    room: "墙感",
    steps: "动作",
    wording: "措辞",
  };

  return Object.keys(labels)
    .map((key) => {
      const delta = after[key] - before[key];
      if (!delta) {
        return "";
      }
      return `${labels[key]} ${delta > 0 ? "+" : ""}${delta}`;
    })
    .filter(Boolean)
    .join(" / ");
}

function getStateReadout() {
  if (state.echo >= 9) {
    return "屏幕正在反咬";
  }
  if (state.room >= 9) {
    return "房间感过载";
  }
  if (state.steps >= 13 && state.room <= 4) {
    return "出口已成形";
  }
  if (state.clarity >= 9) {
    return "清醒占上风";
  }
  if (state.steps >= 7) {
    return "身体开始记路";
  }
  if (state.wording <= -4) {
    return "叙述正在收紧";
  }
  return "临界稳定";
}

function applyChoice(item) {
  Object.entries(item.effects || {}).forEach(([key, value]) => {
    if (key === "bag") {
      value.forEach(addToBag);
      return;
    }
    state[key] += value;
  });

  if (item.flags) {
    Object.assign(state.flags, item.flags);
  }

  if (item.note) {
    state.note = item.note;
  }
}

function addToBag(item) {
  if (!state.bag.includes(item)) {
    state.bag.push(item);
  }
}

function advance() {
  if (state.phase === "morning") {
    state.phase = "day";
    return;
  }
  if (state.phase === "day") {
    state.phase = "night";
    return;
  }
  state.day += 1;
  state.phase = "morning";
}

function decideEnding() {
  const moved = state.flags.boardedTrain || state.flags.keyReturned || state.flags.finalReady;
  const hardExit =
    state.flags.noFinalDiary &&
    state.steps >= 13 &&
    state.room <= 4 &&
    state.echo <= 5 &&
    state.wording >= 4;

  if (hardExit) {
    return ending("未命名", [
      "第八天。",
      "她没有写日记。没有总结，没有感谢苦难，没有把自己装订成案例。",
      "早餐摊老板问她要不要加蛋。她说要。声音很稳，像一枚钉子钉进木头。",
    ]);
  }

  if (state.flags.askedRenew || state.room >= 9) {
    return ending("续租", [
      "房东说可以再住七天。价钱照旧。",
      "她把包放回墙边。房间没有赢，它只是很擅长让人误会自己输了。",
      "夜里手机又亮起来。她看了一会儿，把脸照得惨白。",
    ]);
  }

  if (state.echo >= 9 && state.steps <= 8) {
    return ending("同温层", [
      "她把收藏夹重新分组：证据、提醒、绝不忘记、以后小心。",
      "那些页面排成队，每一页都把下一页推进她眼睛里。",
      "窗外天色很好。她没有打开窗。她有很多解释，暂时没有生活。",
    ]);
  }

  if (moved && state.steps >= 12) {
    return ending("晴天误差", [
      "车开出去十五分钟后，她发现自己坐反了方向。",
      "她没有马上下车。错方向也是方向，至少轮子在转。",
      "下一站到了。她拎起包，跟着人群往外走，像一颗终于松动的螺丝。",
    ]);
  }

  if (state.steps >= 10 || state.room <= 5) {
    return ending("空包", [
      "她拎着包出了楼门。包轻得冒犯，好像在嘲笑她以前把什么都想重了。",
      "街口早餐摊还没收。蒸汽扑到脸上，她眨了眨眼。",
      "零钱还在。胃还在。路也还在。",
    ]);
  }

  return ending("楼下", [
    "她下了楼，又上来。钥匙在掌心里压出一道印。",
    "房间已经没什么可整理的，只有窗帘还挂着，像最后一块借口。",
    "她站了一会儿，决定先把窗帘扯下来。",
  ]);
}

function ending(title, body) {
  return { title, body };
}

function renderEnding(endingData) {
  show("ending");
  elements.continueButton.disabled = false;
  elements.endingTitle.textContent = endingData.title;
  elements.endingStats.innerHTML = [
    ["噪声", state.echo],
    ["墙感", state.room],
    ["动作", state.steps],
    ["清醒", state.clarity],
    ["措辞", state.wording],
  ]
    .map(([label, value]) => `<span>${label}<strong>${value}</strong></span>`)
    .join("");
  elements.endingBody.innerHTML = endingData.body.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function isValidState(candidate) {
  return Boolean(candidate && scenes[candidate.day] && scenes[candidate.day][candidate.phase]);
}

function resetGame(startNow = false) {
  state = structuredClone(baseline);
  localStorage.removeItem(STORAGE_KEY);
  if (startNow) {
    save();
  }
  render();
}

function renderReview() {
  elements.reviewList.innerHTML = "";
  if (!state.review.length) {
    const item = document.createElement("li");
    item.textContent = "还没有口供。";
    elements.reviewList.appendChild(item);
    return;
  }

  state.review.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = `${entry.day} ${entry.phase}：${entry.text}`;
    elements.reviewList.appendChild(item);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

$("startButton").addEventListener("click", () => resetGame(true));
$("restartButton").addEventListener("click", () => resetGame(false));
$("playAgainButton").addEventListener("click", () => resetGame(true));
$("continueButton").addEventListener("click", () => {
  state = loadSave() || structuredClone(baseline);
  render();
});
$("reviewButton").addEventListener("click", () => {
  renderReview();
  elements.reviewDialog.showModal();
});

document.addEventListener("keydown", (event) => {
  if (elements.gameScreen.classList.contains("hidden")) {
    return;
  }
  const number = Number(event.key);
  if (!Number.isInteger(number) || number < 1 || number > 3) {
    return;
  }
  const buttons = [...elements.choices.querySelectorAll("button")];
  buttons[number - 1]?.click();
});

render();
