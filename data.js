window.JIANGHU_DATA = {
  stats: {
    po: { name: "魄", glyph: "山", desc: "筋骨、耐力、威勢與正面破局" },
    shen: { name: "身", glyph: "風", desc: "身法、兵刃、潛行與先發制人" },
    xin: { name: "心", glyph: "水", desc: "內功、定力、療傷與抵禦心魔" },
    shi: { name: "識", glyph: "目", desc: "洞察、追跡、學問與拆解機關" },
    qing: { name: "情", glyph: "火", desc: "交涉、共情、聲望與牽動人心" }
  },

  origins: [
    { id: "frontier", name: "邊關遺民", stat: "po", gift: "風沙骨", desc: "你從兵災與饑年裡活下來，知道人能失去多少仍不倒下。" },
    { id: "escort", name: "鏢局少東", stat: "shen", gift: "百里識途", desc: "你認得十三州的水陸暗號，也認得笑臉後藏刀的生意人。" },
    { id: "temple", name: "山寺雜役", stat: "xin", gift: "鐘下定息", desc: "你沒學過經卷，卻在晨鐘暮鼓間聽懂了呼吸與寂靜。" },
    { id: "constable", name: "退役捕快", stat: "shi", gift: "案牘眼", desc: "一樁被迫結案的舊案，使你脫下官服，帶走了不肯閉上的眼。" },
    { id: "storyteller", name: "說書浪客", stat: "qing", gift: "滿座風生", desc: "你把別人的江湖說成故事，也把自己的真名藏在每個故事之後。" },
    { id: "fallen", name: "破落世家", stat: "shi", gift: "舊譜殘頁", desc: "祖宅換了酒錢，族譜撕去半卷；你只留下讀懂古譜的本事。" }
  ],

  vows: [
    { id: "justice", mark: "俠", name: "替陌路人討一個公道", edge: "護人時第一次失手可改為兩難", desc: "天下的事若都等有權者開口，江湖便只剩沉默。" },
    { id: "truth", mark: "謎", name: "查清滅門雨夜的真相", edge: "調查線索時，陰骰較高可額外得一條真相", desc: "你記不起兇手的臉，只記得雨裡有九種不同的腳步聲。" },
    { id: "glory", mark: "名", name: "讓天下記住我的名字", edge: "挑戰強敵獲勝時多得一點名望", desc: "籍籍無名也是一種死法，而你還不打算死。" },
    { id: "debt", mark: "恩", name: "還一筆救命之恩", edge: "為同伴承擔代價時回復一點內息", desc: "那人只說『活下去』。你活了，這句話便成了債。" },
    { id: "freedom", mark: "雲", name: "不再任誰替我決定去處", edge: "逃脫、拒絕或破除束縛時獲得一點氣勢", desc: "師命、王法、血親與舊約，都不能再替你走下一步。" }
  ],

  sects: [
    {
      id: "qixia", order: "壹", mark: "劍 · 正", name: "棲霞劍閣", short: "棲霞",
      motto: "劍先問心，再問不平。", stat: "xin", weapon: "長劍", home: "停雲嶺",
      allies: "青川書院", rivals: "寒星宮", debt: "不得向求救者背身",
      color: "#a64030",
      description: "守著十三州最古老的盟劍。門人相信出劍不是為勝，而是替無力開口的人留一句話。",
      techniques: [
        { id: "qixia-heart", name: "問心式", branch: "劍法", rank: 1, attr: "xin", cost: 1, damage: 2, kind: "control", text: "劍鋒不搶先，先逼對手回答他不願面對的問題。", effect: "得手時獲得 1 氣勢。" },
        { id: "qixia-cloud", name: "流霞十三劍", branch: "快劍", rank: 1, attr: "shen", cost: 2, damage: 3, kind: "attack", text: "十三道殘光同至，真劍藏在最後一抹暮色裡。", effect: "傳奇時傷害再 +1。" },
        { id: "qixia-shadow", name: "孤峰照影", branch: "守劍", rank: 2, attr: "shi", cost: 1, damage: 1, kind: "guard", text: "以不動映萬動，從影子裡看見下一招的去處。", effect: "得手時本回合免受反擊。" },
        { id: "qixia-goose", name: "天外歸鴻", branch: "絕學", rank: 3, attr: "xin", cost: 3, damage: 5, kind: "attack", text: "收盡滿天劍意於一線，落處如鴻歸舊山。", effect: "只有立誓護人時才能使出全部威力。" }
      ]
    },
    {
      id: "tieyi", order: "貳", mark: "拳 · 守", name: "鐵衣門", short: "鐵衣",
      motto: "身是最後一道城牆。", stat: "po", weapon: "拳甲", home: "鎮岳關",
      allies: "逐浪幫", rivals: "赤鷂堂", debt: "不得棄同伴於身後",
      color: "#77533f",
      description: "源自邊軍傷卒的外家門派。門人以傷痕記輩分，以替人擋過多少刀論英雄。",
      techniques: [
        { id: "tieyi-stake", name: "沉樁開碑", branch: "拳法", rank: 1, attr: "po", cost: 0, damage: 2, kind: "attack", text: "腳下生根，拳勁穿甲而不散。", effect: "不耗內息，兩難時少受 1 傷。" },
        { id: "tieyi-mail", name: "百鍊鐵衣功", branch: "硬功", rank: 1, attr: "po", cost: 1, damage: 1, kind: "guard", text: "運氣於皮骨，把迎面而來的力道鎖進筋肉。", effect: "得手時回復 1 體力。" },
        { id: "tieyi-mountain", name: "震嶽靠", branch: "近身", rank: 2, attr: "po", cost: 2, damage: 4, kind: "attack", text: "以肩背撞入中門，像山門忽然向前走了一步。", effect: "傳奇時敵人下一回合攻勢 -1。" },
        { id: "tieyi-bell", name: "金鐘不壞", branch: "絕學", rank: 3, attr: "xin", cost: 3, damage: 2, kind: "heal", text: "一口真氣遍走周身，鐘鳴般震開百般暗勁。", effect: "得手時回復 3 體力。" }
      ]
    },
    {
      id: "tingyu", order: "參", mark: "器 · 詭", name: "聽雨樓", short: "聽雨",
      motto: "天下沒有無聲的秘密。", stat: "shi", weapon: "暗器", home: "千檐城",
      allies: "百草谷", rivals: "天機坊", debt: "每個秘密都有應付的價錢",
      color: "#435f67",
      description: "茶樓、驛站與青樓裡都有他們的耳目。門人以雨聲傳訊，也用比雨更細的暗器收尾。",
      techniques: [
        { id: "tingyu-listen", name: "聽雨辨位", branch: "耳功", rank: 1, attr: "shi", cost: 0, damage: 1, kind: "control", text: "閉眼聽衣袂、呼吸與落塵，讓埋伏自己報上方位。", effect: "得手時獲得 1 氣勢。" },
        { id: "tingyu-needles", name: "驟雨無聲針", branch: "暗器", rank: 1, attr: "shen", cost: 2, damage: 3, kind: "attack", text: "袖口一抖，細針先於雨點封住退路。", effect: "敵人受傷後攻勢 -1，持續一回合。" },
        { id: "tingyu-echo", name: "千門留影", branch: "幻術", rank: 2, attr: "qing", cost: 1, damage: 2, kind: "guard", text: "話音、腳步與身影各往不同方向，真假只在一息之間。", effect: "得手時免受反擊並回復 1 內息。" },
        { id: "tingyu-net", name: "一夜天羅", branch: "絕學", rank: 3, attr: "shi", cost: 3, damage: 4, kind: "control", text: "把早已埋下的線索、暗器與人情同時收網。", effect: "傳奇時直接取得場景主導權。" }
      ]
    },
    {
      id: "baicao", order: "肆", mark: "醫 · 變", name: "百草谷", short: "百草",
      motto: "藥與毒，只差誰來命名。", stat: "shi", weapon: "銀針", home: "回春澗",
      allies: "聽雨樓", rivals: "無相禪院", debt: "見死不救者須記其姓名",
      color: "#52705a",
      description: "山谷收留被正道除名的醫者與毒師。他們不問一味藥善惡，只問開方的人願付何種代價。",
      techniques: [
        { id: "baicao-seal", name: "銀針封穴", branch: "點穴", rank: 1, attr: "shi", cost: 1, damage: 2, kind: "control", text: "以三寸銀光截斷氣路，使強招未發先散。", effect: "得手時敵人攻勢 -1。" },
        { id: "baicao-revive", name: "逆脈回春手", branch: "醫術", rank: 1, attr: "xin", cost: 2, damage: 0, kind: "heal", text: "借自身真氣替傷者越過最險的一段經脈。", effect: "得手時回復 4 體力。" },
        { id: "baicao-dream", name: "三更醉骨香", branch: "毒術", rank: 2, attr: "shi", cost: 2, damage: 3, kind: "attack", text: "香氣入骨不入鼻，待聽見三更才知中毒。", effect: "傳奇時額外造成 1 傷。" },
        { id: "baicao-line", name: "生死一線", branch: "絕學", rank: 3, attr: "qing", cost: 3, damage: 3, kind: "heal", text: "同一指既能續命，也能把借來的命討回。", effect: "回復 3 體力，並對敵造成同量傷害。" }
      ]
    },
    {
      id: "zhulang", order: "伍", mark: "刀 · 行", name: "逐浪幫", short: "逐浪",
      motto: "水路無王，義字掌舵。", stat: "shen", weapon: "短刀", home: "九曲河港",
      allies: "鐵衣門", rivals: "漕運總局", debt: "同舟者必須同岸",
      color: "#33636a",
      description: "由船戶、纖夫與私鹽販子結成的水上大幫。規矩不寫在紙上，寫在每一次同舟共命裡。",
      techniques: [
        { id: "zhulang-rope", name: "斷纜刀", branch: "短刀", rank: 1, attr: "shen", cost: 0, damage: 2, kind: "attack", text: "刀走低處，專斷兵刃、繫索與人的退路。", effect: "不耗內息；先手時傷害 +1。" },
        { id: "zhulang-step", name: "九折潮生步", branch: "身法", rank: 1, attr: "shen", cost: 1, damage: 1, kind: "guard", text: "踏地如踏浪，重心永遠在下一道水勢上。", effect: "得手時免受反擊並獲得 1 氣勢。" },
        { id: "zhulang-river", name: "橫江斬", branch: "重刀", rank: 2, attr: "po", cost: 2, damage: 4, kind: "attack", text: "刀勢如橫江鐵索，逼萬舟都停在一線之前。", effect: "對攻勢 2 以上的敵人傷害 +1。" },
        { id: "zhulang-sea", name: "萬川歸海", branch: "絕學", rank: 3, attr: "xin", cost: 3, damage: 4, kind: "control", text: "借盡場中每一道力，最後一併送回敵人胸口。", effect: "本回合受過多少傷，便追加多少傷害。" }
      ]
    },
    {
      id: "wuxiang", order: "陸", mark: "掌 · 空", name: "無相禪院", short: "無相",
      motto: "不執於招，方見萬招。", stat: "xin", weapon: "禪杖", home: "空明峰",
      allies: "棲霞劍閣", rivals: "百草谷", debt: "殺意一起，先問三息",
      color: "#8a6b3f",
      description: "禪院不禁俗家弟子，也不問來歷。門人修的不是慈悲表象，而是在出掌前留給眾生的三息。",
      techniques: [
        { id: "wuxiang-empty", name: "空掌", branch: "掌法", rank: 1, attr: "xin", cost: 0, damage: 2, kind: "control", text: "掌未至，氣先空去對手落力之處。", effect: "陰骰較高時回復 1 內息。" },
        { id: "wuxiang-reed", name: "一葦渡影", branch: "輕功", rank: 1, attr: "shen", cost: 1, damage: 1, kind: "guard", text: "不是身輕，而是不把重量留在任何一處。", effect: "得手時免受反擊。" },
        { id: "wuxiang-seal", name: "無相印", branch: "內功", rank: 2, attr: "xin", cost: 2, damage: 3, kind: "control", text: "以對手最熟悉的勁路，封住他最依賴的一招。", effect: "敵人下一擊難度提高。" },
        { id: "wuxiang-silence", name: "獅子寂滅", branch: "絕學", rank: 3, attr: "po", cost: 3, damage: 5, kind: "attack", text: "一聲無聲之喝，震散妄念，也震斷護身真氣。", effect: "傳奇時對手無法反擊。" }
      ]
    },
    {
      id: "hanxing", order: "柒", mark: "柔 · 寒", name: "寒星宮", short: "寒星",
      motto: "情深如雪，落地無痕。", stat: "shen", weapon: "軟劍", home: "朔月湖",
      allies: "北地商盟", rivals: "棲霞劍閣", debt: "不可在外人前示弱",
      color: "#59637b",
      description: "立宮於終年結冰的朔月湖。外人只見冷峻，門人卻知道每一門寒功都要用一段最熾熱的記憶來養。",
      techniques: [
        { id: "hanxing-silk", name: "冷月纏絲", branch: "軟劍", rank: 1, attr: "shen", cost: 1, damage: 2, kind: "control", text: "劍身繞兵而行，像月光纏住一縷將斷的絲。", effect: "得手時敵人攻勢 -1。" },
        { id: "hanxing-heart", name: "冰心訣", branch: "內功", rank: 1, attr: "xin", cost: 1, damage: 1, kind: "guard", text: "暫封一念，使痛與懼都晚一息抵達。", effect: "得手時回復 2 內息。" },
        { id: "hanxing-fall", name: "星墜十三點", branch: "點穴", rank: 2, attr: "shi", cost: 2, damage: 3, kind: "attack", text: "十三點寒芒落在經脈交會處，次序如星圖。", effect: "傳奇時傷害 +1。" },
        { id: "hanxing-winter", name: "冬盡無聲", branch: "絕學", rank: 3, attr: "xin", cost: 3, damage: 5, kind: "attack", text: "把那段養功的記憶放手，換來一瞬寂靜長冬。", effect: "使用後失去 1 氣勢。" }
      ]
    },
    {
      id: "tianji", order: "捌", mark: "奇 · 機", name: "天機坊", short: "天機",
      motto: "世間無巧合，只有未見的機括。", stat: "shi", weapon: "機關匣", home: "懸輪城",
      allies: "工部匠監", rivals: "聽雨樓", debt: "所造之器不可交給昏主",
      color: "#6f5638",
      description: "匠人、陣師與被朝廷逐出的火器官聚於懸輪城。比起天命，他們更相信榫卯、繩索與精確計算。",
      techniques: [
        { id: "tianji-sleeve", name: "袖裡乾坤", branch: "奇門", rank: 1, attr: "shi", cost: 1, damage: 2, kind: "control", text: "一只袖囊藏鉤索、煙丸、鐵蒺藜與三種退路。", effect: "得手時獲得 1 氣勢。" },
        { id: "tianji-chain", name: "七巧連環", branch: "機關", rank: 1, attr: "shen", cost: 1, damage: 2, kind: "attack", text: "七枚機括首尾相催，第一聲響起時最後一枚已在身後。", effect: "和合時傷害 +2。" },
        { id: "tianji-array", name: "借勢成陣", branch: "陣法", rank: 2, attr: "shi", cost: 2, damage: 1, kind: "guard", text: "桌椅、門窗、繩影皆能在三步內成一座小陣。", effect: "得手時免受反擊，並回復 1 內息。" },
        { id: "tianji-dragon", name: "天機鎖龍", branch: "絕學", rank: 3, attr: "shi", cost: 3, damage: 4, kind: "control", text: "把人、地與時機鎖成唯一結果，再請對手走進答案。", effect: "傳奇時追加一次 2 傷害。" }
      ]
    }
  ],

  styles: [
    { id: "sword", mark: "劍", name: "劍脈", stat: "shen", weapon: "長劍／短劍", doctrine: "以線破面，以意領鋒。", desc: "重視節奏、距離與出手理由，擅長單點決勝。", technique: { id: "style-sword", name: "青鋒三問", branch: "劍脈", rank: 1, attr: "shen", cost: 1, damage: 3, kind: "attack", text: "一問來路、二問退處、三問是否仍要出手。", effect: "氣勢為 2 以上時傷害 +1。" } },
    { id: "saber", mark: "刀", name: "刀宗", stat: "po", weapon: "環首刀／苗刀", doctrine: "刀勢一起，不留半句。", desc: "以決斷換威力，擅長正面壓迫與破甲。", technique: { id: "style-saber", name: "迎風一斬", branch: "刀宗", rank: 1, attr: "po", cost: 1, damage: 3, kind: "attack", text: "迎著攻勢踏進一尺，用更短的路截斷來招。", effect: "兩難時仍造成完整傷害。" } },
    { id: "fist", mark: "拳", name: "拳掌", stat: "po", weapon: "拳腳／護腕", doctrine: "寸內有山河。", desc: "貼身、化勁與爆發兼備，越近越難防。", technique: { id: "style-fist", name: "貼山靠", branch: "拳掌", rank: 1, attr: "po", cost: 1, damage: 3, kind: "attack", text: "以肩胯合力在方寸間放出整座山。", effect: "體力低於一半時傷害 +1。" } },
    { id: "movement", mark: "輕", name: "身法", stat: "shen", weapon: "飛索／短兵", doctrine: "不在來處，不落去處。", desc: "換位、潛行與奪先，能把不利地形變成舞台。", technique: { id: "style-movement", name: "燕穿簾", branch: "身法", rank: 1, attr: "shen", cost: 1, damage: 1, kind: "guard", text: "從攻勢最密處穿身而過，衣角不沾一線。", effect: "得手時免受反擊並獲得 1 氣勢。" } },
    { id: "inner", mark: "氣", name: "內家", stat: "xin", weapon: "掌／拂塵", doctrine: "先治一息，再動百骸。", desc: "調息、護體與隔空勁力，續戰能力最強。", technique: { id: "style-inner", name: "小周天", branch: "內家", rank: 1, attr: "xin", cost: 0, damage: 0, kind: "heal", text: "引氣走過一輪經脈，把散亂的呼吸重新接起。", effect: "得手時回復 2 內息與 2 體力。" } },
    { id: "trick", mark: "奇", name: "奇門", stat: "shi", weapon: "傘／扇／機括", doctrine: "勝負早在入局之前。", desc: "利用環境、道具與陣勢控制局面，專解難纏強敵。", technique: { id: "style-trick", name: "四兩機關局", branch: "奇門", rank: 1, attr: "shi", cost: 1, damage: 2, kind: "control", text: "借一根線、一枚錢與對手自己的力，關上唯一出口。", effect: "得手時敵人攻勢 -1。" } },
    { id: "medicine", mark: "針", name: "醫毒", stat: "shi", weapon: "銀針／藥囊", doctrine: "識生路，亦識死穴。", desc: "能救能制，擅長回復、削弱與讀懂人體破綻。", technique: { id: "style-medicine", name: "銀針渡穴", branch: "醫毒", rank: 1, attr: "shi", cost: 1, damage: 1, kind: "heal", text: "以針引氣，先封痛楚，再把命從關口拉回來。", effect: "得手時回復 3 體力。" } }
  ],

  universalTechniques: [
    { id: "basic-probe", name: "江湖探招", branch: "基本", rank: 0, attr: "shen", cost: 0, damage: 2, kind: "attack", text: "用最穩妥的一招試出對手深淺。", effect: "陽骰較高時獲得 1 氣勢。" },
    { id: "basic-breathe", name: "守中抱一", branch: "基本", rank: 0, attr: "xin", cost: 0, damage: 0, kind: "heal", text: "守住中線調勻呼吸，在亂局裡找回自己。", effect: "得手時回復 2 內息；傳奇時另回復 2 體力。" },
    { id: "basic-read", name: "觀隙借勢", branch: "基本", rank: 0, attr: "shi", cost: 0, damage: 1, kind: "guard", text: "不急著贏，先看清對手以為安全的空隙。", effect: "得手時免受反擊並獲得 1 氣勢。" }
  ],

  enemies: [
    { id: "salt", name: "黑旗鹽梟", epithet: "江風裡的快刀", hp: 7, attack: 2, danger: 0, reward: 2, desc: "鹽袋裡藏刀，刀背刻著官印。" },
    { id: "rider", name: "雁翎司緝騎", epithet: "奉旨捉拿不存在的人", hp: 8, attack: 2, danger: 0, reward: 2, desc: "馬快，弩更快；腰牌卻少了一角。" },
    { id: "redkite", name: "赤鷂堂殺手", epithet: "收錢，也收臨終遺言", hp: 9, attack: 2, danger: 1, reward: 3, desc: "雙鉤沾著紅沙，從不在同一處出現第二次。" },
    { id: "poisoner", name: "笑面毒婆", epithet: "先請茶，再問姓名", hp: 8, attack: 3, danger: 1, reward: 3, desc: "她杯裡沒有毒；有毒的是你方才碰過的桌沿。" },
    { id: "monk", name: "無燈行者", epithet: "被逐出山門的第四十九人", hp: 10, attack: 3, danger: 1, reward: 3, desc: "戒疤被火燙平，一雙空掌仍留佛門舊勁。" },
    { id: "sword", name: "斷劍客沈孤鴻", epithet: "半截劍，從未出過半招", hp: 11, attack: 3, danger: 2, reward: 4, desc: "他找的不是勝負，是一個值得接完的招。" },
    { id: "blackseal", name: "黑印使 · 無咎", epithet: "替死人蓋章的人", hp: 12, attack: 3, danger: 1, reward: 5, desc: "面具上沒有五官，只有一方漆黑掌印。" },
    { id: "oathbreaker", name: "斷盟宗師 · 祁北辰", epithet: "八門都欠他一句解釋", hp: 15, attack: 4, danger: 2, reward: 7, desc: "他使得出八門武學，卻不肯承認自己出身任何一門。" },
    { id: "ninth", name: "無名國師 · 第九印", epithet: "要把江湖寫進律法的人", hp: 19, attack: 4, danger: 2, reward: 10, desc: "他不拔兵刃；整座城的門、橋與人心都是他的兵刃。" }
  ],

  encounters: [
    {
      id: "borrowed-name", act: 1, kicker: "雨夜 · 白蘆渡", title: "借你名字殺的人", location: "白蘆渡口",
      text: "渡船靠岸時，屍體才從桅杆落下。死者袖裡有一封血書，落款是你的姓名；岸上三十雙眼睛已把你認成兇手。",
      stakes: "洗清嫌疑，找出真正寄信的人。", enemy: "salt",
      choices: [
        { label: "先救活唯一的目擊者", detail: "以內息護住船童將斷的心脈。", stat: "xin", success: "船童醒來，說兇手沒有影子，鞋底卻沾著宮牆才有的金砂。", mixed: "你救回船童，也把自己的氣息暴露給藏在人群裡的高手。", failure: "船童只來得及握住你的手，掌心留下一個倒寫的『九』。" },
        { label: "當眾拆穿血書破綻", detail: "讓每個圍觀者都看見墨色與筆勢的矛盾。", stat: "shi", success: "人群轉而懷疑領頭指認你的鹽商，他袖口正藏著第二封信。", mixed: "你證明信是偽造的，但官差仍要押你回衙門『慢慢說明』。", failure: "你的推論少了一環；真正的兇手趁爭執悄悄割斷渡船纜繩。" },
        { label: "拔劍壓住全場", detail: "先用威勢換來一刻安靜，再問誰第一個認出你。", stat: "po", success: "第一個喊出你名字的人腿先軟了；他是收錢辦事的鹽梟。", mixed: "眾人退開，鹽梟也拔出了藏在鹽袋裡的刀。", failure: "恐懼使人群更加躁動，有人趁亂高喊你要滅口。" }
      ]
    },
    {
      id: "empty-coffin", act: 1, kicker: "官道 · 子時", title: "會變重的空棺", location: "青川驛道",
      text: "一隊鏢師請你護送空棺。每走十里，棺木便重一分；入夜後，裡面傳來規律的叩指聲，恰是八門議事暗號。",
      stakes: "決定是否開棺，並保住鏢隊。", enemy: null,
      choices: [
        { label: "依暗號回敲", detail: "先問棺中人還是不是人。", stat: "shi", success: "叩聲回出一份名單：八門各有一位已死之人的名字。", mixed: "棺中回應正確，最後卻多敲了第九聲。", failure: "你敲錯一節，整隊人的影子同時向棺木靠近。" },
        { label: "當著鏢頭開棺", detail: "規矩若不容真相，先破規矩。", stat: "po", success: "棺中沒有屍體，只有一塊不斷吸水的黑石與半張盟誓。", mixed: "黑石見風裂開，放出被封多年的殺意。", failure: "鏢師一半拔刀護棺，一半拔刀要開棺；你站在兩邊中間。" },
        { label: "說服眾人改走水路", detail: "避開設伏的十里亭，也試試棺木是否仍會變重。", stat: "qing", success: "棺木一上船便輕了，水下卻有另一口棺一路同行。", mixed: "眾人同意改道，但你欠下鏢頭一筆不小的人情。", failure: "鏢師不肯壞祖規，天亮前十里亭已亮起九盞迎客燈。" }
      ]
    },
    {
      id: "ruined-temple", act: 1, kicker: "荒寺 · 大雨", title: "神像背後的第十個人", location: "無名山寺",
      text: "九名避雨者都說自己獨行，灶邊卻有十雙濕鞋。破廟神像背後，每隔一刻便換一種呼吸聲。",
      stakes: "找出藏起來的人，以及眾人為何都在說謊。", enemy: "redkite",
      choices: [
        { label: "熄燈聽息", detail: "讓黑暗替你分開九種心跳。", stat: "shi", success: "第十人是負傷密使；真正埋伏者反而坐在火邊。", mixed: "你找到密使，也讓殺手知道你聽得見他。", failure: "燈滅之後先響起的不是呼吸，是雙鉤出鞘。" },
        { label: "講一段只有兇手會糾正的故事", detail: "把線索藏進錯誤，等知情者自己開口。", stat: "qing", success: "賣傘婦人脫口糾正死者時辰，臉色隨即變了。", mixed: "有人上鉤，但密使誤以為你也是局中人。", failure: "故事說到一半，神像背後的人替你接出了結局。" },
        { label: "守在唯一出口", detail: "不猜。等第一個沉不住氣的人。", stat: "po", success: "雨停之前，殺手果然先動；你早已站在他必經的一步。", mixed: "你擋住殺手，卻沒擋住密使從屋頂逃走。", failure: "沒有人逃。因為門外那匹馬，早把你們的行蹤送了出去。" }
      ]
    },
    {
      id: "blind-qin", act: 1, kicker: "茶棚 · 午後", title: "只彈錯一音的盲琴客", location: "回雁坡",
      text: "盲琴客每日彈同一曲，今日卻故意錯了一音。茶棚裡七名客人同時停杯，只有你不知道那是誰的死訊。",
      stakes: "讀懂暗訊，選擇要救的人。", enemy: null,
      choices: [
        { label: "照旋律補回正音", detail: "用桌上瓷杯敲出回信。", stat: "qing", success: "琴客笑了：你剛替一位素未謀面的掌門拒絕了刺殺令。", mixed: "暗訊送出，但七人裡至少有一人讀出了你的門派。", failure: "你補的音在另一套暗碼裡，意思恰好是『動手』。" },
        { label: "觀察誰先停杯", detail: "身體總比訓練過的表情誠實。", stat: "shi", success: "靠窗書生慢了半拍，他不是收訊者，而是等收訊者露餡的人。", mixed: "你看出兩名知情者，卻無法判斷哪一位想救人。", failure: "所有人停杯的時間分毫不差——除了盲琴客。" },
        { label: "帶琴客離開茶棚", detail: "不解暗號，先保住傳訊的人。", stat: "shen", success: "你們從後窗踏雨而去，七枚暗器只釘中一張空凳。", mixed: "你帶走琴客，也把整個追殺局一起帶上官道。", failure: "琴客不肯走。他說真正需要被救的人，是你。" }
      ]
    },
    {
      id: "salt-song", act: 2, kicker: "鹽道 · 黃昏", title: "孩子們不懂的童謠", location: "鹽骨村",
      text: "村童唱著新童謠：『一印買官，八印買山，第九印來買人間。』每唱一遍，村裡便少一戶人。",
      stakes: "找出失蹤者去處，切斷人口買賣。", enemy: "rider",
      choices: [
        { label: "跟著童謠的步數走", detail: "歌詞也許是一張只有孩子看得懂的地圖。", stat: "shi", success: "步數停在廢鹽井，井下有通往官倉的車轍。", mixed: "你找到入口，也踩響了藏在井沿的銅鈴。", failure: "童謠走到最後一步，孩子們齊聲問你：『第十個是誰？』" },
        { label: "召集村民守住祠堂", detail: "讓下一次擄人變成全村都看得見的事。", stat: "qing", success: "沉默終於裂開；老族長交出一疊被迫按印的賣身契。", mixed: "村民願意站出來，但要你先承諾能擋住官軍。", failure: "沒有一戶敢來。天黑後，你門外整齊放著九雙草鞋。" },
        { label: "扮成下一批買家", detail: "拿自己的名字作餌，直接走進交易。", stat: "shen", success: "接頭人領你進官倉，腰間正掛著雁翎司的半塊腰牌。", mixed: "你混進去了，但對方要你當場驗一個『貨』。", failure: "暗語已換。對方笑著請你先交出代表第九印的手。" }
      ]
    },
    {
      id: "flower-poison", act: 2, kicker: "宴席 · 百花", title: "每個人都沒中的毒", location: "聞香別院",
      text: "百花宴上，八位掌門同時倒下，銀針、茶水與菜餚都驗不出毒。你是唯一站著的人，也因此成了唯一嫌犯。",
      stakes: "在一炷香內找出毒路。", enemy: "poisoner",
      choices: [
        { label: "從自己沒中毒反推", detail: "你與八位掌門唯一不同之處，就是破局起點。", stat: "shi", success: "毒不在入口，而在眾人剛按過的盟印泥；你沒資格按印所以倖免。", mixed: "你找出毒路，解藥卻只夠先救四人。", failure: "你終於感到指尖發麻：不是沒中，只是毒發得最晚。" },
        { label: "以內息替眾人逼毒", detail: "先搶時間，再問代價。", stat: "xin", success: "八道毒氣被你引至一處，凝成極細的黑色掌紋。", mixed: "你保住眾人性命，自己卻要承受一段逆行真氣。", failure: "毒性遇真氣反而加速，一名掌門突然抓住你的腕脈。" },
        { label: "逼宴主封鎖別院", detail: "兇手仍在場，先讓每扇門都記住出入者。", stat: "qing", success: "賓客同意自證；只有送花老婦的席位從來沒有人坐過。", mixed: "院門封住了，但一位掌門弟子拒絕交出貼身藥盒。", failure: "眾人認為你在拖延，第一柄劍已架上你的肩。" }
      ]
    },
    {
      id: "masterless-sword", act: 2, kicker: "古橋 · 霜晨", title: "不肯認主的劍", location: "斷雁橋",
      text: "一柄古劍插在橋心，已有十七名高手試圖拔劍而亡。劍旁新刻一行字：『第九人至，橋下開門。』",
      stakes: "決定拔劍、毀劍，或看見真正的門。", enemy: "sword",
      choices: [
        { label: "不碰劍，先看十七具屍體", detail: "死人留下的姿勢比碑文更可靠。", stat: "shi", success: "他們不是被劍殺，而是同時望見橋下某物後自行斷脈。", mixed: "你找到共同傷勢，也感到橋下有目光循你的經脈上移。", failure: "第十七具屍體忽然睜眼，問你為何來得這麼慢。" },
        { label: "以自己的劍與它對話", detail: "不拔，只遞出一道劍意。", stat: "xin", success: "古劍回鳴，橋板露出一枚與你所得殘印完全吻合的凹槽。", mixed: "劍接受了你的問候，也把十七人的最後恐懼送進你心裡。", failure: "你的劍先斷了；斷口卻指向橋欄外的一條無形小徑。" },
        { label: "以蠻力震斷橋心", detail: "門若藏在橋下，就讓整座橋把它交出來。", stat: "po", success: "石橋裂而不塌，一道向下的階梯從水霧裡顯出。", mixed: "入口出現了，古劍也從石中自行飛起。", failure: "橋沒有裂。河面倒映裡的你，卻正把劍拔出。" }
      ]
    },
    {
      id: "grain-tax", act: 2, kicker: "河堤 · 秋收", title: "奉旨徵收明年的糧", location: "洛水長堤",
      text: "巡河司拿著真聖旨，徵收一座剛淹過水的村子『明年』糧稅。字是真的，年號卻是三年後。",
      stakes: "保住村糧，查清未來聖旨從何而來。", enemy: "rider",
      choices: [
        { label: "依律逐字駁回", detail: "真聖旨也有不能越過的舊例。", stat: "shi", success: "你找出先帝水患免賦條款，帶隊官不得不當眾停手。", mixed: "你拖住徵糧，卻被記下『曲解聖意』的罪名。", failure: "對方拿出另一道聖旨，恰好廢止你引用的舊例。" },
        { label: "讓村民把糧變成宴席", detail: "既已煮熟，便不是可徵的糧。", stat: "qing", success: "全村開席，連士卒都坐下吃了；官命第一次輸給飢餓。", mixed: "糧保住一半，但你得承擔煽動抗命的名聲。", failure: "官兵封鎖灶房，村民的怒氣先燒了起來。" },
        { label: "夜裡搬空官船", detail: "跟不講理的文書，不必只講文書。", stat: "shen", success: "官船清晨只剩一枚刻著三年後日期的銅漏。", mixed: "糧運走了，你的一件隨身物卻落在船艙。", failure: "那是一艘空船；真正的糧早已從另一條河運走。" }
      ]
    },
    {
      id: "snow-sutra", act: 3, kicker: "雪寺 · 封山", title: "寫在活人背上的經", location: "北嶺雪寺",
      text: "雪崩封山後，老僧承認失竊的不是經書，而是背上刺滿盟誓原文的啞僕。追兵已從三條山徑同時逼近。",
      stakes: "護送啞僕，判斷經文是否值得流血。", enemy: "monk",
      choices: [
        { label: "先問啞僕自己的意願", detail: "他是人，不是裝經文的匣子。", stat: "qing", success: "啞僕寫下：盟誓最後一條是八門合力抹去第九門。", mixed: "他願意走，但要求你先燒掉背上一半經文。", failure: "他在雪地寫出你的名字——筆跡與白蘆渡血書一模一樣。" },
        { label: "造三組相反足跡", detail: "讓追兵在雪裡追逐彼此。", stat: "shen", success: "三路追兵誤認對方劫人，山谷先響起他們自己的兵刃聲。", mixed: "你引開兩路，最後一路由一名被逐僧領頭。", failure: "雪在你身後立即覆平，只留下啞僕一人的腳印。" },
        { label: "讀完經文再決定", detail: "真相若不完整，任何犧牲都可能替謊言開路。", stat: "shi", success: "盟誓不是和平條約，而是一套把江湖勢力互相牽制的精密機關。", mixed: "你讀懂了條文，也被其中一道禁制鎖住內息。", failure: "經文首尾倒置；你讀到最後，才發現第一句是在召來追兵。" }
      ]
    },
    {
      id: "red-lantern", act: 3, kicker: "戲樓 · 無觀眾", title: "只演給死人看的戲", location: "長安紅燈樓",
      text: "戲班每夜演出八門結盟舊事，台下空無一人，包廂卻總傳來掌聲。今夜扮演你的伶人沒有照劇本死去。",
      stakes: "阻止劇本決定現實，追到寫戲的人。", enemy: "redkite",
      choices: [
        { label: "登台改戲", detail: "既然劇本能殺人，就用另一個結局救人。", stat: "qing", success: "你讓台上八門第一次說出真話，包廂掌聲驟停。", mixed: "伶人活了，觀眾席卻坐滿了戴著你面具的人。", failure: "你念出的新台詞早已寫在下一頁，而且字跡是你的。" },
        { label: "沿掌聲找空包廂", detail: "聲音也有來處，除非來處被人借走。", stat: "shi", success: "掌聲來自埋在牆裡的機關，機簧上纏著宮中才用的黃絲。", mixed: "你拆掉機關，卻放出其中封存的一段臨終口供。", failure: "你推開包廂門，看見十三年後的自己獨自鼓掌。" },
        { label: "斬斷吊幕與燈架", detail: "先讓舞台失去控制人的形狀。", stat: "po", success: "戲台垮塌，地板下露出通往國師府的舊地道。", mixed: "你破了局，也讓整座戲樓開始著火。", failure: "吊幕落下後沒有地板，只有一條早等著你的長街。" }
      ]
    },
    {
      id: "two-letters", act: 3, kicker: "盟亭 · 月蝕", title: "兩封都是真的盟書", location: "八角盟亭",
      text: "你同時拿到兩封八門盟書：一封命你誅殺叛徒祁北辰，一封命你護送他入京。印、紙、暗記全部為真。",
      stakes: "判斷誰有能力讓矛盾命令同時成立。", enemy: null,
      choices: [
        { label: "把兩封信疊在月光下", detail: "同一批紙，也許本來就是同一張圖。", stat: "shi", success: "字縫重合成第三道命令：『帶第九印來見我。』", mixed: "第三道命令出現，落款卻是十三年前已死的盟主。", failure: "兩封信的影子沒有文字，只有八個正在移動的人形。" },
        { label: "公開兩封信", detail: "把不能私下解決的矛盾丟回江湖。", stat: "qing", success: "八門使者彼此質問，第一個拔劍的人暴露了真正效忠者。", mixed: "真相開始流傳，也讓各派同時向你索要原件。", failure: "所有使者都說另一封是偽造；亭外已站滿各派弟子。" },
        { label: "兩道命令都不接", detail: "讓發令者必須親自來找你。", stat: "xin", success: "月蝕最深時，祁北辰本人從亭頂落下，問你敢不敢聽第三個選擇。", mixed: "你守住本心，卻被八門共同列為抗命者。", failure: "你剛燒掉信，灰燼便在掌中重組成一枚黑印。" }
      ]
    },
    {
      id: "dry-well", act: 3, kicker: "皇城 · 枯井", title: "井底傳來明日的鐘", location: "國師府後巷",
      text: "廢井每到午夜便提前響起明日宮鐘。今夜它響了九次，照律代表天子駕崩；宮中真正的鐘仍沉默。",
      stakes: "在預言成真前進入國師府。", enemy: "monk",
      choices: [
        { label: "沿鐘聲的回音下井", detail: "聲音既從未來來，出口或許也不在今日。", stat: "xin", success: "井底不是水，而是一座把全城氣脈聚向皇宮的銅陣。", mixed: "你找到陣心，也在銅壁上看見自己的死亡時辰。", failure: "第十聲鐘在你心口響起，井口上方已換了一輪月。" },
        { label: "比對歷代喪鐘記錄", detail: "預言最怕被拿去與舊帳逐條核對。", stat: "shi", success: "九聲不是天子駕崩，而是三百年前『廢國師』的古制。", mixed: "你解出真正含義，記錄最後一頁卻剛被人撕走。", failure: "所有記錄的墨跡同時滲開，只留下今日日期。" },
        { label: "敲響全城更鼓蓋過它", detail: "用萬人聽得見的今日，壓住一口井裡的明日。", stat: "qing", success: "更夫、商戶與守夜人一同響應，國師府的銅陣第一次失去同調。", mixed: "城醒了，禁軍也循聲封鎖整條街。", failure: "無人回應；你這才發現附近百姓今夜全被提前遷走。" }
      ]
    }
  ],

  bosses: {
    4: {
      id: "boss-blackseal", act: 1, kicker: "第一折 · 黑印", title: "替死人蓋章的人", location: "九曲河倉",
      text: "所有線索都指向同一座廢糧倉。黑印使無咎坐在九口空棺之間，替每個仍活著的人寫好死期。",
      stakes: "奪下第一片盟誓，逼無咎說出第九印的來歷。", enemy: "blackseal",
      choices: [
        { label: "指出他名冊中的錯名", detail: "一份完美名冊，最怕一個不該存在的人。", stat: "shi", success: "無咎第一次停筆；那個錯名正是失蹤十三年的舊盟主。", mixed: "他承認名冊有錯，並說錯的人其實是你。", failure: "名冊沒有錯。你翻到最後一頁，看見方才才取的化名。" },
        { label: "以門派戒律質問", detail: "黑印使曾屬八門之一，他的招式仍記得。", stat: "qing", success: "他下意識回了舊禮，暴露自己出自你門派的失傳旁支。", mixed: "他承認出身，卻把一樁你門派不願提的舊罪說了出來。", failure: "他用你門派最正統的禮數回應，反問誰才是叛徒。" },
        { label: "一招掀翻九口空棺", detail: "讓所有安排好的死法都失去位置。", stat: "po", success: "棺底拼出一張河洛暗圖，直指八門盟誓被焚之地。", mixed: "暗圖出現，九具紙人也同時從棺後站起。", failure: "棺木紋絲不動；原來每一口都釘在你的影子上。" }
      ]
    },
    8: {
      id: "boss-oathbreaker", act: 2, kicker: "第二折 · 斷盟", title: "會八門武學的叛徒", location: "沉劍湖心亭",
      text: "祁北辰在湖心等你。他說八門從不是為了守護江湖而結盟，而是為了聯手抹去一個比朝廷更早存在的第九門。",
      stakes: "勝過祁北辰，判斷他的真相值不值得相信。", enemy: "oathbreaker",
      choices: [
        { label: "請他使出你的本門絕學", detail: "招式會替說謊的人留下破綻。", stat: "shi", success: "他使得完美，最後收式卻是只有掌門才知的『謝罪禮』。", mixed: "招式無可挑剔，但你看見他每用一門功夫便舊傷復發。", failure: "他不只會，還指出你所學版本被掌門刻意刪去一招。" },
        { label: "先交出一半殘印", detail: "信任不是投降，而是逼彼此都承擔風險。", stat: "qing", success: "他交出另一半：兩片合起來不是掌印，而是一張進皇城的水道圖。", mixed: "殘印相合，湖底也隨之亮起早埋好的陣紋。", failure: "他沒有接。殘印停在半空，被另一道無形真氣奪走。" },
        { label: "不聽故事，先問一場勝負", detail: "江湖人的真話，有時只肯在招式裡說。", stat: "po", success: "你接住他八門合一的第一擊，也看見其中刻意留下的生門。", mixed: "你逼他退了一步，自己也被八種勁路同時封住。", failure: "他只用你的武功派系出了一招，你便知道差距有多遠。" }
      ]
    },
    13: {
      id: "boss-ninth", act: 3, kicker: "終折 · 山河", title: "要替江湖寫下結局的人", location: "皇城萬民臺",
      text: "無名國師在萬民臺展開新律：從今以後，所有門派、武學與恩仇都要登記、定價、受朝廷裁決。第九印不是門派之印，而是能讓天下人共同拒絕這道命令的盟印。",
      stakes: "決定江湖應由誰定義，並承擔答案。", enemy: "ninth",
      choices: [
        { label: "讓八門把舊罪公諸天下", detail: "沒有被承認的真相，結不成新的盟。", stat: "qing", success: "八位掌門當眾交出象徵權位的門印，萬民臺下第一次有人高聲反對新律。", mixed: "五門願意認罪，三門拔劍離席；新盟尚未開始便先有裂痕。", failure: "掌門們沉默。國師只問了一句：『這便是你要保的江湖？』" },
        { label: "以第九印逆轉萬民臺大陣", detail: "讓每個被記名的人取回自己的名字。", stat: "shi", success: "銅陣把新律送往全城，也把每一條反對之聲送回臺上。", mixed: "大陣逆轉，但你必須留下自己的名字作最後一道陣眼。", failure: "第九印嵌入陣心後沒有反應——還缺最後一筆活人的選擇。" },
        { label: "當眾向國師問武", detail: "不是替八門守舊，而是證明江湖仍能自行承擔代價。", stat: "po", success: "你的一招未必勝過國師，卻讓臺下每個人看見他也會退。", mixed: "你逼他拔出從未示人的兵刃，代價是自己先跪下一膝。", failure: "國師沒有動。萬民臺、城門與人群同時成陣，向你壓下一步。" }
      ]
    }
  },

  locations: ["白蘆渡", "沉劍湖", "千檐城", "回春澗", "長安雨巷", "北嶺雪寺", "九曲河港", "懸輪舊城", "斷雁橋", "鹽骨村"],
  npc: {
    surnames: ["沈", "裴", "柳", "顧", "燕", "蘇", "霍", "白", "祁", "孟", "楚", "葉"],
    names: ["照川", "無憂", "聽瀾", "七弦", "既白", "懷瑾", "長風", "問渠", "疏影", "青梧", "不言", "見微"],
    epithets: ["不留客", "半盞燈", "回頭雁", "紙上刀", "笑春風", "三更雨", "無鞘劍", "借月人", "一線生", "枯木先生"],
    faces: ["說話前總先擦一次杯沿", "右手穩得不像活人", "笑時只牽動左邊嘴角", "每句話都像在替另一個人轉述", "衣上永遠帶著新鮮雨味", "記得所有人的鞋，記不得臉"],
    wants: ["替一個已死之人洗清罪名", "找回被師父刪掉的最後一招", "讓兩個敵對門派不得不合作", "證明自己才是某樁舊案的兇手", "在日出前把一封信交給錯的人", "買下主角的一次公開失敗"],
    secrets: ["其真名出現在十三年前的死亡名冊", "每月都把情報送給自己的宿敵", "所使武功來自不存在的第九門", "身上的重傷其實是刻意保留的封印", "正被兩份互相矛盾的誓言約束", "從沒見過主角，卻能說出主角童年細節"]
  },
  rumors: {
    starts: ["有人在夜裡看見", "三日前，渡口撈起", "聽說八門之中", "城南說書人忽然改口，說", "官府重金封鎖的消息是", "每逢月蝕就有人聽見"],
    middles: ["一位已死掌門", "刻著第九印的兵刃", "沒有影子的鏢隊", "會自己改字的盟書", "從未存在的皇子", "能使出八門絕學的孩子"],
    ends: ["正在替人寫新的死期。", "要在下一場英雄會公開選主。", "其實一直藏在主角所屬門派。", "每到一處便少一個人的名字。", "只肯與欠過人情的人說話。", "知道山河盟誓真正被焚的原因。"],
    truths: ["全真，但關鍵人物認錯了。", "半真；事件是真的，原因是假的。", "是敵人刻意放出的餌。", "目前是假話，若無人阻止便會成真。", "真相比傳聞更糟。", "完全錯誤，卻指向另一條真線索。"]
  },
  hooks: {
    needs: ["護送一口不能打開的棺", "替仇人完成最後一樁委託", "從八位掌門手中偷走同一件東西", "在英雄會前證明一個死人仍活著", "守住一座官府聲稱不存在的村", "找出誰在借主角的名字行俠"],
    pressures: ["禁軍將在三日後封山", "兩個門派已各自派出追兵", "每失敗一次就有一條盟誓被改寫", "委託人只能在夢裡說話", "真正的酬勞正被拿去懸賞主角", "一場百年洪水正逆流而來"],
    twists: ["被救者才是整個局的設局人", "兩方敵人都在履行同一個善意承諾", "所謂秘笈其實是一份認罪書", "主角的門派早已做過同樣的惡事", "唯一的證人只能記住謊話", "不動手才會觸發真正的殺局"],
    costs: ["交出本門一式絕學", "公開一段師門醜聞", "欠宿敵一個不能拒絕的人情", "放棄唾手可得的江湖名望", "讓一位無辜者知道殘酷真相", "在誓言與門規之間選一邊"]
  }
};
