(() => {
  "use strict";

  const DATA = window.JIANGHU_DATA;
  const SAVE_KEY = "jianghu-chronicles-save-v1";
  const VERSION = 1;
  const RANK_NAMES = { 1: "初境", 2: "成境", 3: "化境" };
  const RANK_GLYPHS = { 1: "初", 2: "成", 3: "化" };
  const CHAPTER_NAMES = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三"];
  const TIER_LABELS = { legendary: "傳奇", success: "得手", mixed: "兩難", failure: "失手" };
  const TIER_ORDER = ["failure", "mixed", "success", "legendary"];
  const SCARS = ["左臂舊創", "逆行真氣", "雨夜夢魘", "刀背長痕", "碎骨未癒", "失去半式記憶"];
  const LEDGER_TIPS = [
    "陽骰高則生勢；陰骰高則回息。看清氣向，往往比只看成敗更重要。",
    "氣勢可以在擲骰前燃燒，使總和 +2。留著不用，有時比用錯時機更可惜。",
    "兩難不是失敗：你做到了，只是江湖要求你把代價也寫進故事。",
    "體力歸零會留下傷痕，但故事不必立刻結束。最深的傷，往往也是新的招式。",
    "門派戒律不是限制玩家，而是讓主持人知道該把哪種選擇放到你面前。"
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const pick = (array) => array[Math.floor(Math.random() * array.length)];
  const die = (sides = 6) => Math.floor(Math.random() * sides) + 1;
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  const byId = (array, id) => array.find((item) => item.id === id);
  const getSect = (id) => byId(DATA.sects, id);
  const getStyle = (id) => byId(DATA.styles, id);
  const getOrigin = (id) => byId(DATA.origins, id);
  const getVow = (id) => byId(DATA.vows, id);
  const getEnemy = (id) => byId(DATA.enemies, id);

  let game = loadGame();
  let activeView = "home";
  let archiveTab = "sects";
  let archiveFilter = "all";
  let searchTerm = "";
  let sceneBurnMomentum = false;
  let combatBurnMomentum = false;
  let clockValue = 0;
  let creator = freshCreator();

  function freshCreator() {
    return { step: 1, name: "", originId: null, vowId: null, sectId: null, styleId: null };
  }

  function loadGame() {
    try {
      const parsed = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (!parsed || parsed.version !== VERSION || !parsed.character || !parsed.campaign) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function saveGame() {
    if (!game) return;
    game.savedAt = new Date().toISOString();
    localStorage.setItem(SAVE_KEY, JSON.stringify(game));
  }

  function showToast(message, tone = "good") {
    const toast = document.createElement("div");
    toast.className = `toast ${tone}`;
    toast.textContent = message;
    $("#toast-region").append(toast);
    window.setTimeout(() => toast.remove(), 3600);
  }

  function showView(view, scroll = true) {
    const valid = ["home", "create", "play", "archive", "rules", "gm"];
    if (!valid.includes(view)) view = "home";
    activeView = view;
    $$(".view").forEach((section) => section.classList.toggle("active", section.dataset.view === view));
    $$(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.viewTarget === view));
    document.body.classList.remove("menu-open");
    $("#menu-button").setAttribute("aria-expanded", "false");
    history.replaceState(null, "", `#${view}`);
    if (view === "play") renderGame();
    if (view === "archive") renderArchive();
    if (view === "gm") ensureGenerators();
    if (scroll) window.scrollTo({ top: 0, behavior: "instant" });
  }

  function renderHomeSects() {
    $("#home-sect-grid").innerHTML = DATA.sects.map((sect) => `
      <article class="home-sect-card" data-sect-detail="${sect.id}" data-glyph="${sect.mark.charAt(0)}" tabindex="0" role="button" aria-label="查看${sect.name}詳情">
        <div class="sect-index"><span>${sect.order} · ${sect.mark}</span><span>${DATA.stats[sect.stat].name}＋</span></div>
        <h3>${sect.name}</h3>
        <p class="motto">「${sect.motto}」</p>
        <p class="desc">${sect.description}</p>
        <footer><span>鎮派 · ${sect.techniques[1].name}</span><span>詳譜 ↗</span></footer>
      </article>
    `).join("");
  }

  function renderRuleStats() {
    $("#rules-stat-grid").innerHTML = Object.entries(DATA.stats).map(([, stat]) => `
      <article><span>${stat.glyph}</span><h3>${stat.name}</h3><p>${stat.desc}</p></article>
    `).join("");
  }

  function startCreation() {
    creator = freshCreator();
    renderCreator();
    showView("create");
  }

  function calculateStats(draft = creator) {
    const stats = { po: 1, shen: 1, xin: 1, shi: 1, qing: 1 };
    const bonuses = [getOrigin(draft.originId)?.stat, getSect(draft.sectId)?.stat, getStyle(draft.styleId)?.stat];
    bonuses.filter(Boolean).forEach((key) => { stats[key] = clamp(stats[key] + 1, 1, 3); });
    return stats;
  }

  function renderCreator() {
    const labels = ["", "第一筆 · 姓名來處", "第二筆 · 師門因果", "第三筆 · 武功派系", "第四筆 · 人物成卷"];
    $("#creator-step-label").textContent = labels[creator.step];
    $$('[data-step-indicator]').forEach((item) => {
      const step = Number(item.dataset.stepIndicator);
      item.classList.toggle("active", step === creator.step);
      item.classList.toggle("done", step < creator.step);
    });
    $("#creator-back").classList.toggle("hidden", creator.step === 1);
    $("#creator-next").innerHTML = creator.step === 4 ? "封卷啟程 <span>→</span>" : "下一筆 <span>→</span>";

    if (creator.step === 1) renderCreatorIdentity();
    if (creator.step === 2) renderCreatorSects();
    if (creator.step === 3) renderCreatorStyles();
    if (creator.step === 4) renderCreatorReview();
    updateCreatorValidity();
    updateFolio();
  }

  function renderCreatorIdentity() {
    $("#creator-content").innerHTML = `
      <div class="creator-section-head"><h3>江湖如何稱呼你？</h3><p>真名、化名或只有仇家知道的名字都可以。名字只影響敘事，不限制身份。</p></div>
      <div class="name-row">
        <label class="name-field"><span>姓名／化名</span><input id="character-name" type="text" maxlength="12" value="${escapeHtml(creator.name)}" placeholder="例：顧聽瀾" autocomplete="off" /><small>最多十二字</small></label>
        <button class="random-name" id="random-name" type="button">隨機題名</button>
      </div>
      <p class="choice-label">來處 · 選一</p>
      <div class="origin-grid">
        ${DATA.origins.map((origin) => `<button class="origin-card ${creator.originId === origin.id ? "selected" : ""}" type="button" data-origin="${origin.id}"><span>${DATA.stats[origin.stat].name}</span><b>${origin.name}</b><small>${origin.gift} · ${origin.desc}</small></button>`).join("")}
      </div>
      <p class="choice-label">江湖誓 · 選一</p>
      <div class="vow-choice-grid">
        ${DATA.vows.map((vow) => `<button class="vow-choice ${creator.vowId === vow.id ? "selected" : ""}" type="button" data-vow="${vow.id}"><span>${vow.mark}</span><b>${vow.name}</b><small>${vow.edge}</small></button>`).join("")}
      </div>
    `;

    const nameInput = $("#character-name");
    nameInput.addEventListener("input", () => { creator.name = nameInput.value.trimStart(); updateCreatorValidity(); updateFolio(); });
    $("#random-name").addEventListener("click", () => {
      creator.name = `${pick(DATA.npc.surnames)}${pick(DATA.npc.names)}`;
      nameInput.value = creator.name;
      updateCreatorValidity();
      updateFolio();
    });
    $$('[data-origin]', $("#creator-content")).forEach((button) => button.addEventListener("click", () => { creator.originId = button.dataset.origin; renderCreator(); }));
    $$('[data-vow]', $("#creator-content")).forEach((button) => button.addEventListener("click", () => { creator.vowId = button.dataset.vow; renderCreator(); }));
  }

  function renderCreatorSects() {
    const selected = getSect(creator.sectId);
    $("#creator-content").innerHTML = `
      <div class="creator-section-head"><h3>哪一門傳你真功？</h3><p>門派使一項屬性 +1，並給你兩式入門真傳；同時，你必須背負一條門派債。</p></div>
      <div class="sect-choice-grid">
        ${DATA.sects.map((sect) => `<button class="sect-choice ${creator.sectId === sect.id ? "selected" : ""}" type="button" data-sect="${sect.id}" data-order="${sect.order}"><span>${sect.mark} · ${DATA.stats[sect.stat].name}＋</span><h4>${sect.name}</h4><em>${sect.motto}</em><p>${sect.description}</p><footer><span>${sect.home}</span><span>${sect.weapon}</span></footer></button>`).join("")}
      </div>
      ${selected ? `<div class="sect-selected-detail"><p><b>門派債</b>${selected.debt}</p><p><b>入門真傳</b>${selected.techniques.slice(0,2).map((item) => item.name).join("、")}</p></div>` : ""}
    `;
    $$('[data-sect]', $("#creator-content")).forEach((button) => button.addEventListener("click", () => { creator.sectId = button.dataset.sect; renderCreator(); }));
  }

  function renderCreatorStyles() {
    $("#creator-content").innerHTML = `
      <div class="creator-section-head"><h3>你如何走自己的路？</h3><p>武功派系可與任何門派搭配。它使一項屬性 +1，並給你一式跨門派起手技。</p></div>
      <div class="style-choice-grid">
        ${DATA.styles.map((style) => `<button class="style-choice ${creator.styleId === style.id ? "selected" : ""}" type="button" data-style="${style.id}"><span>${style.mark}</span><h4>${style.name}</h4><small>${DATA.stats[style.stat].name}＋ · ${style.weapon}</small><p>${style.desc}<br />起手式：${style.technique.name}</p></button>`).join("")}
      </div>
    `;
    $$('[data-style]', $("#creator-content")).forEach((button) => button.addEventListener("click", () => { creator.styleId = button.dataset.style; renderCreator(); }));
  }

  function renderCreatorReview() {
    const origin = getOrigin(creator.originId);
    const vow = getVow(creator.vowId);
    const sect = getSect(creator.sectId);
    const style = getStyle(creator.styleId);
    const stats = calculateStats();
    const hp = 7 + stats.po * 2;
    const qi = 4 + stats.xin * 2;
    const techniques = [...sect.techniques.slice(0, 2), style.technique];
    $("#creator-content").innerHTML = `
      <div class="creator-section-head"><h3>此卷既成，只欠第一步。</h3><p>確認人物資料。日後可匯出 JSON 存檔；另起新卷前也能保留備份。</p></div>
      <div class="review-sheet">
        <div class="review-identity"><div class="review-seal">${vow.mark}</div><h3>${escapeHtml(creator.name)}</h3><p>${origin.name} · ${sect.name} · ${style.name}</p><blockquote>「${vow.name}。」</blockquote></div>
        <div>
          <div class="review-details">
            <p><span>五項屬性</span><b>${Object.entries(stats).map(([key,value]) => `${DATA.stats[key].name} ${value}`).join(" · ")}</b></p>
            <p><span>體力／內息</span><b>${hp} ／ ${qi}</b></p>
            <p><span>門派債</span><b>${sect.debt}</b></p>
            <p><span>出身本領</span><b>${origin.gift}</b></p>
          </div>
          <div class="review-techs"><h4>開局武學</h4><div>${techniques.map((technique) => `<article><b>${technique.name}</b><span>${DATA.stats[technique.attr].name} · 耗息 ${technique.cost} · ${technique.damage ? `${technique.damage} 傷` : "回復"}</span></article>`).join("")}</div></div>
        </div>
      </div>
    `;
  }

  function updateCreatorValidity() {
    const validByStep = {
      1: creator.name.trim().length > 0 && creator.originId && creator.vowId,
      2: Boolean(creator.sectId),
      3: Boolean(creator.styleId),
      4: Boolean(creator.name && creator.originId && creator.vowId && creator.sectId && creator.styleId)
    };
    const valid = Boolean(validByStep[creator.step]);
    $("#creator-next").disabled = !valid;
    $("#creator-hint").textContent = valid ? (creator.step === 4 ? "人物資料完整，可以啟程" : "此筆已成") : "請完成本頁選擇";
  }

  function updateFolio() {
    const origin = getOrigin(creator.originId);
    const vow = getVow(creator.vowId);
    const sect = getSect(creator.sectId);
    const style = getStyle(creator.styleId);
    const stats = calculateStats();
    $("#folio-vow-mark").textContent = vow?.mark || "？";
    $("#folio-name").textContent = creator.name || "無名客";
    $("#folio-path").textContent = [origin?.name || "身世未明", sect?.name || "師門未定", style?.name].filter(Boolean).join(" · ");
    $("#folio-vow").textContent = vow?.name || "尚未立誓";
    $("#folio-debt").textContent = sect?.debt || "尚未入門";
    $("#folio-technique").textContent = style?.technique.name || sect?.techniques[0]?.name || "尚未習武";
    $("#folio-stats").innerHTML = Object.entries(stats).map(([key, value]) => `<div><span>${DATA.stats[key].name}</span><b>${value}</b></div>`).join("");
  }

  function finalizeCharacter() {
    const stats = calculateStats();
    const maxHp = 7 + stats.po * 2;
    const maxQi = 4 + stats.xin * 2;
    game = {
      version: VERSION,
      createdAt: new Date().toISOString(),
      savedAt: new Date().toISOString(),
      character: {
        name: creator.name.trim(), originId: creator.originId, vowId: creator.vowId, sectId: creator.sectId, styleId: creator.styleId,
        stats, maxHp, hp: maxHp, maxQi, qi: maxQi, momentum: 0, renown: 0, xp: 0, rank: 1, scars: [], journal: [], vowUsedChapter: 0
      },
      campaign: { chapter: 1, completed: 0, usedScenes: [], sceneId: null, result: null, combat: null, victory: null, defeat: null, ending: false, endingType: null }
    };
    addJournal("人物成卷", `${getSect(creator.sectId).name}門人 ${creator.name} 立誓入世。`);
    saveGame();
    updateHeaderCharacter();
    showView("play");
    showToast("人物卷已成。第一回，請入江湖。", "good");
  }

  function updateHeaderCharacter() {
    const chip = $("#character-chip");
    const continueButton = $("#continue-game-button");
    if (!game) {
      chip.classList.add("hidden");
      continueButton.classList.add("hidden");
      return;
    }
    const character = game.character;
    chip.classList.remove("hidden");
    continueButton.classList.remove("hidden");
    $("#chip-mark").textContent = getVow(character.vowId)?.mark || "俠";
    $("#chip-name").textContent = character.name;
    $("#chip-sect").textContent = `${getSect(character.sectId)?.short || "無門"} · ${RANK_NAMES[character.rank]}`;
  }

  function getKnownTechniques(character = game?.character) {
    if (!character) return [];
    const sect = getSect(character.sectId);
    const style = getStyle(character.styleId);
    return [
      ...DATA.universalTechniques,
      ...sect.techniques.filter((technique) => technique.rank <= character.rank),
      style.technique
    ];
  }

  function renderGame() {
    const empty = $("#play-empty");
    const shell = $("#game-shell");
    if (!game) {
      empty.classList.remove("hidden");
      shell.classList.add("hidden");
      return;
    }
    empty.classList.add("hidden");
    shell.classList.remove("hidden");
    renderCharacterSheet();
    renderLedger();
    renderStage();
  }

  function renderCharacterSheet() {
    const character = game.character;
    const sect = getSect(character.sectId);
    const style = getStyle(character.styleId);
    const origin = getOrigin(character.originId);
    const vow = getVow(character.vowId);
    const title = character.renown >= 14 ? "名動十三州" : character.renown >= 7 ? "江湖知名" : character.rank >= 2 ? "登堂入室" : "初入江湖";
    $("#sheet-mark").textContent = vow.mark;
    $("#sheet-epithet").textContent = title;
    $("#sheet-name").textContent = character.name;
    $("#sheet-path").textContent = `${origin.name} · ${sect.short} · ${style.name}`;
    $("#hp-label").textContent = `${character.hp} / ${character.maxHp}`;
    $("#qi-label").textContent = `${character.qi} / ${character.maxQi}`;
    $("#hp-bar").style.width = `${(character.hp / character.maxHp) * 100}%`;
    $("#qi-bar").style.width = `${(character.qi / character.maxQi) * 100}%`;
    $("#momentum-pips").innerHTML = [1,2,3].map((value) => `<i class="${character.momentum >= value ? "filled" : ""}"></i>`).join("");
    $("#sheet-stats").innerHTML = Object.entries(character.stats).map(([key, value]) => `<div title="${DATA.stats[key].desc}"><span>${DATA.stats[key].name}</span><b>${value}</b></div>`).join("");
    $("#rank-label").textContent = RANK_NAMES[character.rank];
    $("#known-techniques").innerHTML = getKnownTechniques().map((technique) => `<div class="known-technique" title="${escapeHtml(technique.effect)}"><b>${technique.name}</b><span>${DATA.stats[technique.attr].name} · 息${technique.cost}</span></div>`).join("");
    $("#scar-count").textContent = `${character.scars.length} / 3`;
    $("#scar-list").innerHTML = character.scars.length ? character.scars.map((scar) => `<span>${escapeHtml(scar)}</span>`).join("") : "<span>尚無重傷</span>";
  }

  function renderLedger() {
    const character = game.character;
    $("#renown-value").textContent = character.renown;
    $("#xp-value").textContent = character.xp;
    $("#rank-value").textContent = RANK_GLYPHS[character.rank];
    $("#ledger-vow").textContent = getVow(character.vowId).name;
    $("#journal-list").innerHTML = character.journal.length
      ? [...character.journal].reverse().slice(0, 9).map((entry) => `<li><b>${escapeHtml(entry.title)}</b>${escapeHtml(entry.text)}</li>`).join("")
      : "<li><b>尚無近事</b>下一步便會落筆。</li>";
    $("#ledger-tip").textContent = LEDGER_TIPS[(game.campaign.chapter - 1) % LEDGER_TIPS.length];
  }

  function addJournal(title, text) {
    if (!game) return;
    game.character.journal.push({ title, text, chapter: game.campaign.chapter, time: new Date().toISOString() });
    if (game.character.journal.length > 40) game.character.journal.shift();
  }

  function getSceneById(id) {
    const regular = DATA.encounters.find((scene) => scene.id === id);
    if (regular) return regular;
    return Object.values(DATA.bosses).find((scene) => scene.id === id) || null;
  }

  function chooseScene() {
    const chapter = game.campaign.chapter;
    if (DATA.bosses[chapter]) return DATA.bosses[chapter];
    const act = chapter <= 4 ? 1 : chapter <= 8 ? 2 : 3;
    let candidates = DATA.encounters.filter((scene) => scene.act === act && !game.campaign.usedScenes.includes(scene.id));
    if (!candidates.length) candidates = DATA.encounters.filter((scene) => scene.act === act);
    return pick(candidates);
  }

  function startNextScene() {
    const scene = chooseScene();
    game.campaign.sceneId = scene.id;
    if (!game.campaign.usedScenes.includes(scene.id)) game.campaign.usedScenes.push(scene.id);
    saveGame();
    renderGame();
  }

  function renderStage() {
    const campaign = game.campaign;
    const chapter = campaign.chapter;
    const scene = getSceneById(campaign.sceneId);
    $("#chapter-kicker").textContent = scene?.kicker || (campaign.ending ? "終卷" : "風雨十三州");
    $("#chapter-title").textContent = campaign.ending ? "江湖有後" : `第${CHAPTER_NAMES[chapter]}回`;
    $("#chapter-progress-label").textContent = `${campaign.completed} / 13`;
    $("#chapter-progress-bar").style.width = `${(campaign.completed / 13) * 100}%`;

    if (campaign.ending) return renderEnding();
    if (campaign.victory) return renderVictory();
    if (campaign.defeat) return renderDefeat();
    if (campaign.combat) return renderCombat();
    if (campaign.result) return renderSceneResult();
    if (scene) return renderScene(scene);
    renderChapterIntro();
  }

  function renderChapterIntro() {
    const chapter = game.campaign.chapter;
    const act = chapter <= 4 ? "第一折 · 黑印" : chapter <= 8 ? "第二折 · 斷盟" : "第三折 · 山河";
    const descriptions = {
      1: "一封用你姓名落款的血書，正等在白蘆渡。從這一步開始，每條線索都會反過來問你是誰。",
      2: "殘印仍有餘溫。官道上的風聲，比你的腳程更快。",
      3: "八門各自派人來找你，有人要保你，有人只要你手裡那片灰燼。",
      4: "第一個知道第九印來歷的人，正在九口空棺之間等你。",
      5: "黑印裂開之後，露出的不是答案，而是一條通往八門舊罪的河道。",
      6: "有人開始在十三州傳唱第九門的名字——但那個名字每日都不同。",
      7: "兩封互相矛盾的盟書同時抵達。每一枚印都是真的。",
      8: "會使八門武學的叛徒，在沉劍湖上擺了一張只等你的茶桌。",
      9: "舊盟的真相傳開，各門派開始選擇要守住臉面，還是守住江湖。",
      10: "皇城新律尚未頒布，十三州的門派名冊卻已寫好每個人的價錢。",
      11: "你的誓言與門派戒律第一次真正站在兩條路上。",
      12: "井底提前響起明日的喪鐘。今夜不入皇城，便再沒有明日。",
      13: "萬民臺上，第九印缺的最後一筆，必須由一個活人親手寫下。"
    };
    $("#stage-content").innerHTML = `
      <div class="chapter-intro">
        <div class="chapter-stamp">${CHAPTER_NAMES[chapter]}</div>
        <p class="eyebrow dark">${act}</p>
        <h2>${chapter === 1 ? "雨落無聲，刀出有名。" : `第${CHAPTER_NAMES[chapter]}回，尚未落筆。`}</h2>
        <p>${descriptions[chapter]}</p>
        <div class="chapter-road" aria-hidden="true">${[1,2,3,4,5,6,7,8,9,10,11,12,13].map((value) => `<i class="${value < chapter ? "done" : value === chapter ? "current" : ""}"></i>`).join("")}</div>
        <button class="button button-primary" type="button" data-stage-action="start-scene">踏入此回 <span>→</span></button>
      </div>
    `;
  }

  function renderScene(scene) {
    const character = game.character;
    $("#stage-content").innerHTML = `
      <article class="scene-card">
        <p class="scene-location">${scene.kicker} · ${scene.location}</p>
        <h2>${scene.title}</h2>
        <span class="scene-stakes">此回所繫 · ${scene.stakes}</span>
        <p class="scene-text">${scene.text}</p>
        <div class="choice-list">
          ${scene.choices.map((choice, index) => `<button class="scene-choice" type="button" data-scene-choice="${index}"><span class="choice-stat">${DATA.stats[choice.stat].name}</span><span><b>${choice.label}</b><small>${choice.detail}</small></span><span>→</span></button>`).join("")}
        </div>
        <div class="momentum-toggle"><span>擲骰前可燃勢，使總和 +2</span><button type="button" data-stage-action="toggle-scene-momentum" class="${sceneBurnMomentum ? "active" : ""}" ${character.momentum < 1 ? "disabled" : ""}>${sceneBurnMomentum ? "已備燃勢" : `燃勢（${character.momentum}）`}</button></div>
      </article>
    `;
  }

  function determineTier(total) {
    if (total >= 12) return "legendary";
    if (total >= 9) return "success";
    if (total >= 6) return "mixed";
    return "failure";
  }

  function upgradeTier(tier) {
    return TIER_ORDER[Math.min(TIER_ORDER.indexOf(tier) + 1, TIER_ORDER.length - 1)];
  }

  function rollCheck(statKey, modifier = 0, burnMomentum = false) {
    const character = game.character;
    const yin = die(6);
    const yang = die(6);
    let momentumBonus = 0;
    const effects = [];
    if (burnMomentum && character.momentum > 0) {
      character.momentum -= 1;
      momentumBonus = 2;
      effects.push("燃燒 1 氣勢：總和 +2");
    }
    const total = yin + yang + character.stats[statKey] + modifier + momentumBonus;
    let tier = determineTier(total);
    const harmony = yin === yang;
    if (harmony) {
      const prior = tier;
      tier = upgradeTier(tier);
      effects.push(prior === "legendary" ? "陰陽和合：回復 1 體力" : `陰陽和合：結果升為${TIER_LABELS[tier]}`);
      if (prior === "legendary") character.hp = clamp(character.hp + 1, 0, character.maxHp);
    } else if (yin > yang) {
      const before = character.qi;
      character.qi = clamp(character.qi + 1, 0, character.maxQi);
      effects.push(before < character.maxQi ? "陰高：回復 1 內息" : "陰高：看見一處細微線索");
    } else {
      const before = character.momentum;
      character.momentum = clamp(character.momentum + 1, 0, 3);
      effects.push(before < 3 ? "陽高：獲得 1 氣勢" : "陽高：氣勢已滿");
    }
    return { yin, yang, total, tier, harmony, statKey, modifier, momentumBonus, effects };
  }

  function resolveSceneChoice(index) {
    const scene = getSceneById(game.campaign.sceneId);
    const choice = scene?.choices[index];
    if (!choice) return;
    const roll = rollCheck(choice.stat, 0, sceneBurnMomentum);
    sceneBurnMomentum = false;
    let tier = roll.tier;
    const vow = getVow(game.character.vowId);
    const edgeEffects = [];

    if (vow.id === "justice" && tier === "failure" && /(救|護|村民|目擊者)/.test(choice.label) && game.character.vowUsedChapter !== game.campaign.chapter) {
      tier = "mixed";
      game.character.vowUsedChapter = game.campaign.chapter;
      edgeEffects.push("江湖誓應驗：失手改為兩難");
    }
    if (vow.id === "truth" && roll.yin > roll.yang) edgeEffects.push("江湖誓應驗：另得一條關於舊案的線索");
    if (vow.id === "freedom" && /(拒|不接|離開|破|逃)/.test(choice.label)) {
      game.character.momentum = clamp(game.character.momentum + 1, 0, 3);
      edgeEffects.push("江湖誓應驗：獲得 1 氣勢");
    }

    const character = game.character;
    const effects = [...roll.effects, ...edgeEffects];
    if (tier === "legendary") { character.renown += 2; character.xp += 2; effects.push("名望 +2 · 修為 +2"); }
    if (tier === "success") { character.renown += 1; character.xp += 2; effects.push("名望 +1 · 修為 +2"); }
    if (tier === "mixed") { character.hp = clamp(character.hp - 1, 0, character.maxHp); character.xp += 1; effects.push("承擔代價：體力 -1 · 修為 +1"); }
    if (tier === "failure") { character.hp = clamp(character.hp - 2, 0, character.maxHp); character.renown = Math.max(0, character.renown - 1); character.xp += 1; effects.push("局勢惡化：體力 -2 · 修為 +1"); }
    if (character.hp <= 0) applyScar(effects);
    checkRank();

    const textKey = tier === "legendary" || tier === "success" ? "success" : tier;
    game.campaign.result = { sceneId: scene.id, choiceLabel: choice.label, tier, roll: { ...roll, tier }, text: choice[textKey], effects, pendingEnemy: scene.enemy || null };
    addJournal(`${TIER_LABELS[tier]} · ${scene.title}`, choice.label);
    saveGame();
    renderGame();
  }

  function applyScar(effects = []) {
    const character = game.character;
    const available = SCARS.filter((scar) => !character.scars.includes(scar));
    const scar = pick(available.length ? available : SCARS);
    character.scars.push(scar);
    character.hp = Math.max(3, Math.ceil(character.maxHp / 2));
    character.qi = Math.ceil(character.maxQi / 2);
    character.renown = Math.max(0, character.renown - 1);
    effects.push(`留下傷痕「${scar}」，帶傷站起`);
    if (character.scars.length >= 3) {
      game.campaign.ending = true;
      game.campaign.endingType = "retired";
    }
  }

  function checkRank() {
    const character = game.character;
    const previous = character.rank;
    const next = character.xp >= 14 ? 3 : character.xp >= 6 ? 2 : 1;
    if (next > previous) {
      character.rank = next;
      character.maxHp += 2;
      character.hp = clamp(character.hp + 2, 0, character.maxHp);
      character.maxQi += 1;
      character.qi = clamp(character.qi + 1, 0, character.maxQi);
      const unlocked = getSect(character.sectId).techniques.find((technique) => technique.rank === next);
      showToast(`破境：${RANK_NAMES[next]}。解鎖「${unlocked?.name || "本門新式"}」。`, "good");
    }
  }

  function renderSceneResult() {
    const result = game.campaign.result;
    const direction = result.roll.harmony ? "陰陽和合" : result.roll.yin > result.roll.yang ? "陰高 · 斂息" : "陽高 · 生勢";
    $("#stage-content").innerHTML = `
      <article class="roll-result">
        <div class="result-head">
          <div class="result-dice"><div class="result-die yin"><span>陰</span><b>${result.roll.yin}</b></div><div class="result-die yang"><span>陽</span><b>${result.roll.yang}</b></div></div>
          <div class="result-summary"><p>${escapeHtml(result.choiceLabel)} · 總和 ${result.roll.total}</p><h2>${TIER_LABELS[result.tier]}</h2><span>${direction}</span></div>
        </div>
        <div class="result-narrative"><blockquote>${result.text}</blockquote><div class="result-effects">${result.effects.map((effect) => `<span>${escapeHtml(effect)}</span>`).join("")}</div></div>
        <div class="result-actions"><button class="button button-primary" type="button" data-stage-action="continue-result">${result.pendingEnemy ? "兵刃已出，迎戰 →" : "收起此頁，續行 →"}</button></div>
      </article>
    `;
  }

  function continueFromResult() {
    const result = game.campaign.result;
    if (result?.pendingEnemy) {
      startCombat(result.pendingEnemy, result.tier);
      return;
    }
    completeChapter();
  }

  function startCombat(enemyId, openingTier = "mixed") {
    const enemy = getEnemy(enemyId);
    const openingDamage = { legendary: 3, success: 2, mixed: 1, failure: 0 }[openingTier] || 0;
    game.campaign.combat = {
      enemyId, hp: Math.max(1, enemy.hp - openingDamage), maxHp: enemy.hp, round: 1, debuff: 0,
      log: openingDamage ? [`你先奪一著，交鋒前削去 ${openingDamage} 點體力。`] : ["對手沒有留下可乘之隙。"]
    };
    game.campaign.result = null;
    saveGame();
    renderGame();
  }

  function renderCombat() {
    const combat = game.campaign.combat;
    const enemy = getEnemy(combat.enemyId);
    const character = game.character;
    const techniques = getKnownTechniques();
    $("#stage-content").innerHTML = `
      <article class="combat-arena">
        <div class="enemy-card">
          <div><p class="eyebrow">${enemy.epithet}</p><h2>${enemy.name}</h2><p>${enemy.desc}</p></div>
          <div class="enemy-hp"><strong>${combat.hp}</strong><span>／ ${combat.maxHp} 體力 · 攻勢 ${enemy.attack}</span></div>
          <div class="enemy-track"><i style="width:${(combat.hp / combat.maxHp) * 100}%"></i></div>
        </div>
        <div class="combat-status"><span>第 ${combat.round} 合 · 強敵修正 ${enemy.danger ? `-${enemy.danger}` : "±0"}</span><span>${combatBurnMomentum ? "已備燃勢 +2" : `氣勢 ${character.momentum} · 內息 ${character.qi}`}</span></div>
        <div class="combat-actions">
          ${techniques.map((technique) => `<button class="combat-action" type="button" data-technique="${technique.id}" ${character.qi < technique.cost ? "disabled" : ""}><header><b>${technique.name}</b><em>${technique.branch}</em></header><p>${technique.text}</p><footer><span>${DATA.stats[technique.attr].name}判定 · 耗息 ${technique.cost}</span><span>${technique.kind === "heal" ? "回復" : `${technique.damage} 傷`}</span></footer></button>`).join("")}
        </div>
        <div class="momentum-toggle"><span>燃燒一點氣勢，使下一式總和 +2</span><button type="button" data-stage-action="toggle-combat-momentum" class="${combatBurnMomentum ? "active" : ""}" ${character.momentum < 1 ? "disabled" : ""}>${combatBurnMomentum ? "取消燃勢" : `燃勢（${character.momentum}）`}</button></div>
        <div class="combat-log">${combat.log.slice(-8).map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div>
      </article>
    `;
  }

  function findTechnique(id) {
    return allTechniques().find((technique) => technique.id === id);
  }

  function useTechnique(id) {
    const combat = game.campaign.combat;
    const technique = findTechnique(id);
    if (!combat || !technique) return;
    const character = game.character;
    const enemy = getEnemy(combat.enemyId);
    if (character.qi < technique.cost) return showToast("內息不足，無法使出此式。", "warn");
    character.qi -= technique.cost;
    const roll = rollCheck(technique.attr, -enemy.danger, combatBurnMomentum);
    combatBurnMomentum = false;
    const tier = roll.tier;
    let damage = 0;
    let healing = 0;
    let counter = 0;
    const landed = tier !== "failure";
    if (landed && technique.damage > 0) damage = technique.damage + (tier === "legendary" ? 1 : 0);
    if (technique.kind === "heal" && landed) healing = tier === "legendary" ? 4 : tier === "success" ? 3 : 2;
    if (tier === "mixed") counter = enemy.attack;
    if (tier === "failure") counter = enemy.attack + 1;
    if (technique.kind === "guard") counter = Math.max(0, counter - 2);
    if (combat.debuff > 0) { counter = Math.max(0, counter - combat.debuff); combat.debuff = 0; }
    if (technique.kind === "control" && (tier === "success" || tier === "legendary")) combat.debuff = 1;
    combat.hp = clamp(combat.hp - damage, 0, combat.maxHp);
    character.hp = clamp(character.hp + healing - counter, 0, character.maxHp);

    const line = `陰 ${roll.yin}、陽 ${roll.yang}，總和 ${roll.total}：${TIER_LABELS[tier]}。${damage ? `造成 ${damage} 傷。` : ""}${healing ? `回復 ${healing} 體力。` : ""}${counter ? `承受 ${counter} 傷。` : ""}`;
    combat.log.push(`${technique.name}｜${line}`);
    roll.effects.forEach((effect) => combat.log.push(effect));
    combat.round += 1;

    if (combat.hp <= 0) {
      winCombat(enemy, technique.name);
    } else if (character.hp <= 0) {
      loseCombat(enemy);
    }
    saveGame();
    renderGame();
  }

  function winCombat(enemy, techniqueName) {
    const character = game.character;
    character.xp += enemy.reward;
    character.renown += enemy.danger + 2;
    if (character.vowId === "glory") character.renown += 1;
    checkRank();
    game.campaign.combat = null;
    game.campaign.victory = { enemyName: enemy.name, techniqueName, xp: enemy.reward, renown: enemy.danger + 2 + (character.vowId === "glory" ? 1 : 0) };
    addJournal(`勝 · ${enemy.name}`, `以「${techniqueName}」收住此戰。`);
  }

  function loseCombat(enemy) {
    const effects = [];
    applyScar(effects);
    game.campaign.combat = null;
    if (!game.campaign.ending) game.campaign.defeat = { enemyName: enemy.name, effects };
    addJournal(`敗 · ${enemy.name}`, effects.join("；"));
  }

  function renderVictory() {
    const victory = game.campaign.victory;
    $("#stage-content").innerHTML = `
      <article class="ending-card"><div class="ending-seal">勝</div><p class="eyebrow dark">此戰已定</p><h2>${escapeHtml(victory.enemyName)}退了。</h2><blockquote>最後收住局面的，是「${escapeHtml(victory.techniqueName)}」。勝負之外，你也讓江湖多記住了一筆。</blockquote><div class="ending-stats"><div><strong>＋${victory.xp}</strong><span>修為</span></div><div><strong>＋${victory.renown}</strong><span>名望</span></div></div><button class="button button-primary" type="button" data-stage-action="complete-chapter">收刀續行 →</button></article>
    `;
  }

  function renderDefeat() {
    const defeat = game.campaign.defeat;
    $("#stage-content").innerHTML = `
      <article class="ending-card"><div class="ending-seal">痕</div><p class="eyebrow dark">敗而未終</p><h2>你從 ${escapeHtml(defeat.enemyName)} 手下活了下來。</h2><blockquote>江湖沒有替這一敗落下句點。傷勢會留在人物卷上，也會在某個將來成為你看懂另一招的理由。</blockquote><div class="result-effects">${defeat.effects.map((effect) => `<span>${escapeHtml(effect)}</span>`).join("")}</div><br /><button class="button button-primary" type="button" data-stage-action="complete-chapter">帶傷續行 →</button></article>
    `;
  }

  function completeChapter() {
    const campaign = game.campaign;
    campaign.completed = Math.max(campaign.completed, campaign.chapter);
    campaign.sceneId = null;
    campaign.result = null;
    campaign.combat = null;
    campaign.victory = null;
    campaign.defeat = null;
    sceneBurnMomentum = false;
    combatBurnMomentum = false;
    if (campaign.chapter >= 13) {
      campaign.ending = true;
      campaign.endingType = "victory";
    } else {
      campaign.chapter += 1;
    }
    game.character.hp = clamp(game.character.hp + 2, 0, game.character.maxHp);
    game.character.qi = clamp(game.character.qi + 2, 0, game.character.maxQi);
    saveGame();
    renderGame();
  }

  function renderEnding() {
    const character = game.character;
    const sect = getSect(character.sectId);
    const vow = getVow(character.vowId);
    const retired = game.campaign.endingType === "retired";
    const title = retired ? "三痕封卷" : character.renown >= 15 ? "新盟第一筆" : character.renown >= 8 ? "留名十三州" : "無名亦是自由";
    const text = retired
      ? `${character.name} 沒能走到萬民臺，卻把三道傷痕各自教會的事傳給後來人。${sect.name}少了一位能戰的門人，江湖多了一位不再替勝負說謊的老師。`
      : `${character.name} 沒替天下寫下唯一答案。你只讓每個人保有回答的資格。${sect.name}的門派債仍在，所立之誓「${vow.name}」也仍在——江湖因此沒有結束。`;
    $("#stage-content").innerHTML = `
      <article class="ending-card"><div class="ending-seal">終</div><p class="eyebrow dark">風雨十三州 · 終卷</p><h2>${title}</h2><blockquote>${text}</blockquote><div class="ending-stats"><div><strong>${character.renown}</strong><span>最終名望</span></div><div><strong>${character.xp}</strong><span>最終修為</span></div><div><strong>${character.scars.length}</strong><span>江湖傷痕</span></div></div><div class="result-actions"><button class="button button-ghost dark" type="button" data-stage-action="export-ending">匯出人物卷</button><button class="button button-primary" type="button" data-stage-action="new-after-ending">另起新卷 →</button></div></article>
    `;
  }

  function allTechniques() {
    return [
      ...DATA.universalTechniques.map((technique) => ({ ...technique, source: "江湖基本" })),
      ...DATA.styles.map((style) => ({ ...style.technique, source: style.name })),
      ...DATA.sects.flatMap((sect) => sect.techniques.map((technique) => ({ ...technique, source: sect.name })))
    ];
  }

  function renderArchive() {
    $$('[data-archive-tab]').forEach((button) => {
      const active = button.dataset.archiveTab === archiveTab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    if (archiveTab === "sects") renderSectArchive();
    if (archiveTab === "styles") renderStyleArchive();
    if (archiveTab === "techniques") renderTechniqueArchive();
  }

  function matchesSearch(...parts) {
    if (!searchTerm) return true;
    return parts.join(" ").toLowerCase().includes(searchTerm.toLowerCase());
  }

  function renderSectArchive() {
    const items = DATA.sects.filter((sect) => matchesSearch(sect.name, sect.mark, sect.motto, sect.description, sect.techniques.map((item) => item.name).join(" ")));
    $("#archive-content").innerHTML = `
      <div class="archive-intro"><h2>山河八門</h2><p>八門因十三年前的山河盟誓而結盟。每門使一項屬性 +1，初境即學兩式，並背負一條門派債。</p></div>
      ${items.length ? `<div class="sect-archive-grid">${items.map((sect) => `<article class="sect-archive-card" data-order="${sect.order}" data-sect-detail="${sect.id}" tabindex="0" role="button"><header><span>${sect.order} · ${sect.mark}</span><span>${DATA.stats[sect.stat].name}＋</span></header><h3>${sect.name}</h3><p class="motto">「${sect.motto}」</p><p class="description">${sect.description}</p><div class="sect-archive-meta"><div><span>山門</span><b>${sect.home}</b></div><div><span>兵刃</span><b>${sect.weapon}</b></div><div><span>門派債</span><b>${sect.debt}</b></div></div></article>`).join("")}</div>` : `<div class="no-results">藏經中沒有與「${escapeHtml(searchTerm)}」相合的門派。</div>`}
    `;
  }

  function renderStyleArchive() {
    const items = DATA.styles.filter((style) => matchesSearch(style.name, style.doctrine, style.desc, style.weapon, style.technique.name));
    $("#archive-content").innerHTML = `
      <div class="archive-intro"><h2>七種武功派系</h2><p>派系不是門派。棲霞弟子也能練刀，鐵衣門人也能修醫毒；搭配所產生的矛盾，正是人物特色。</p></div>
      ${items.length ? `<div class="style-archive-grid">${items.map((style) => `<article class="style-archive-card"><div class="mark">${style.mark}</div><h3>${style.name}</h3><p class="doctrine">「${style.doctrine}」</p><p>${style.desc}</p><div class="style-technique"><span>${DATA.stats[style.stat].name}＋ · ${style.weapon}</span><b>${style.technique.name}</b><small>${style.technique.text}</small></div></article>`).join("")}</div>` : `<div class="no-results">沒有符合搜尋的武功派系。</div>`}
    `;
  }

  function renderTechniqueArchive() {
    const filters = [
      ["all", "全部"], ["attack", "攻伐"], ["control", "制敵"], ["guard", "護守"], ["heal", "療息"]
    ];
    const items = allTechniques().filter((technique) => (archiveFilter === "all" || technique.kind === archiveFilter) && matchesSearch(technique.name, technique.branch, technique.text, technique.effect, technique.source));
    $("#archive-content").innerHTML = `
      <div class="archive-intro"><h2>四十二式武學</h2><p>傷害與耗息供網頁戰鬥直接使用；在桌上團務中，也可只採用招式描述與特效。</p></div>
      <div class="technique-filter">${filters.map(([id,label]) => `<button class="${archiveFilter === id ? "active" : ""}" type="button" data-tech-filter="${id}">${label}</button>`).join("")}</div>
      ${items.length ? `<div class="technique-grid">${items.map((technique) => `<article class="technique-card"><header><span>${technique.source} · ${technique.branch}</span><span>${technique.rank ? `${RANK_NAMES[technique.rank]}` : "基本"}</span></header><h3>${technique.name}</h3><div class="tech-numbers"><span>${DATA.stats[technique.attr].name}判定</span><span>耗息 ${technique.cost}</span><span>${technique.kind === "heal" ? "回復" : `${technique.damage} 傷`}</span></div><p>${technique.text}<br />${technique.effect}</p></article>`).join("")}</div>` : `<div class="no-results">沒有符合條件的武學。</div>`}
    `;
  }

  function showSectDetail(id) {
    const sect = getSect(id);
    if (!sect) return;
    $("#detail-dialog-content").innerHTML = `
      <header class="detail-sect-head"><span>${sect.order} · ${sect.mark}</span><h2>${sect.name}</h2><p>「${sect.motto}」</p></header>
      <p>${sect.description}</p>
      <div class="detail-meta"><div><span>山門</span><b>${sect.home}</b></div><div><span>慣用兵刃</span><b>${sect.weapon}</b></div><div><span>屬性</span><b>${DATA.stats[sect.stat].name}＋1</b></div><div><span>盟友</span><b>${sect.allies}</b></div><div><span>宿敵</span><b>${sect.rivals}</b></div><div><span>門派債</span><b>${sect.debt}</b></div></div>
      <div class="detail-techs"><h3>門中四式</h3>${sect.techniques.map((technique) => `<article><div><b>${technique.name}</b><span>${RANK_NAMES[technique.rank]} · ${technique.branch} · 息 ${technique.cost}</span></div><p>${technique.text}<br />${technique.effect}</p></article>`).join("")}</div>
    `;
    $("#detail-dialog").showModal();
  }

  function ensureGenerators() {
    if (!$("#hook-output").children.length) generateHook();
    if (!$("#npc-output").children.length) generateNpc();
    if (!$("#rumor-output").children.length) generateRumor();
    renderClock();
  }

  function generateHook() {
    const location = pick(DATA.locations);
    const need = pick(DATA.hooks.needs);
    const pressure = pick(DATA.hooks.pressures);
    const twist = pick(DATA.hooks.twists);
    const cost = pick(DATA.hooks.costs);
    $("#hook-output").innerHTML = `<span class="location">${location} · 即席一局</span><h2>${need}</h2><p>俠客抵達時，${pressure}。每個知情者都只肯說一半。</p><div class="hook-parts"><div><span>暗折</span><b>${twist}</b></div><div><span>最後代價</span><b>${cost}</b></div></div>`;
  }

  function generateNpc() {
    const surname = pick(DATA.npc.surnames);
    const name = pick(DATA.npc.names);
    const full = surname + name;
    $("#npc-output").innerHTML = `<div class="npc-name"><span>${surname}</span><div><h2>${full}</h2><p>人稱「${pick(DATA.npc.epithets)}」</p></div></div><div class="npc-facts"><p><span>一眼所見</span><b>${pick(DATA.npc.faces)}</b></p><p><span>眼下所求</span><b>${pick(DATA.npc.wants)}</b></p><p><span>不肯說的</span><b>${pick(DATA.npc.secrets)}</b></p></div>`;
  }

  function generateRumor() {
    const rumor = `${pick(DATA.rumors.starts)}${pick(DATA.rumors.middles)}，${pick(DATA.rumors.ends)}`;
    $("#rumor-output").innerHTML = `<div class="rumor-mark">聞</div><blockquote>「${rumor}」</blockquote><p class="rumor-truth"><b>主持人暗記：</b>${pick(DATA.rumors.truths)}</p>`;
  }

  function generateOracle() {
    const yin = die(6);
    const yang = die(6);
    $("#oracle-yin").textContent = yin;
    $("#oracle-yang").textContent = yang;
    let answer;
    let nuance;
    if (yin === yang) { answer = "是，但出現轉折"; nuance = "陰陽和合：答案成立，並帶來沒有人預料的第三方。"; }
    else if (yang - yin >= 3) { answer = "是，而且很明確"; nuance = "陽勢大盛：答案成立，另有一項有利細節。"; }
    else if (yang > yin) { answer = "大致是"; nuance = "陽高：答案偏向肯定，但仍需付出小代價。"; }
    else if (yin - yang >= 3) { answer = "否，而且有危險"; nuance = "陰氣深沉：答案否定，背後另藏一層麻煩。"; }
    else { answer = "大致不是"; nuance = "陰高：答案偏向否定，但仍留一條可走的窄路。"; }
    $("#oracle-result").innerHTML = `<strong>${answer}</strong><span>${nuance}</span>`;
  }

  function rollUtility(kind) {
    let label;
    let result;
    if (kind === "yin-yang") { const yin = die(6); const yang = die(6); label = "陰陽"; result = `陰 ${yin} · 陽 ${yang} · 合 ${yin + yang}`; }
    else { label = `D${kind}`; result = String(die(Number(kind))); }
    const log = $("#dice-log");
    if (log.children.length === 1 && log.firstElementChild.textContent.includes("等你擲下")) log.innerHTML = "";
    log.insertAdjacentHTML("afterbegin", `<li><span>${label}</span><b>${result}</b></li>`);
    while (log.children.length > 12) log.lastElementChild.remove();
  }

  function renderClock() {
    $("#clock-track").innerHTML = [1,2,3,4,5,6].map((value) => `<button type="button" class="clock-segment ${clockValue >= value ? "filled" : ""}" data-clock="${value}" aria-label="將局勢鐘設為 ${value} 格"></button>`).join("");
    const text = clockValue === 0 ? "風聲未起" : clockValue <= 2 ? "暗流初動" : clockValue <= 4 ? "危局已明" : clockValue === 5 ? "只差一步" : "威脅成真";
    $("#clock-status").textContent = `${clockValue} / 6 · ${text}`;
  }

  function exportGame() {
    if (!game) return showToast("目前沒有可匯出的人物卷。", "warn");
    const blob = new Blob([JSON.stringify(game, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const safeName = game.character.name.replace(/[^\p{L}\p{N}_-]+/gu, "-") || "wuxia-hero";
    link.download = `${safeName}-江湖錄.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("人物卷已匯出。", "good");
  }

  async function importGame(file) {
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed || parsed.version !== VERSION || !parsed.character || !parsed.campaign || !parsed.character.name) throw new Error("invalid");
      const required = [parsed.character.originId, parsed.character.vowId, parsed.character.sectId, parsed.character.styleId];
      if (!required.every(Boolean)) throw new Error("invalid");
      game = parsed;
      saveGame();
      updateHeaderCharacter();
      $("#save-dialog").close();
      showView("play");
      showToast("人物卷已還原。", "good");
    } catch {
      showToast("無法讀取這份人物卷；請確認是本遊戲匯出的 JSON。", "bad");
    }
  }

  function restartGame() {
    if (!window.confirm("要封存目前進度並另起新卷嗎？若尚未匯出，原進度將無法復原。")) return;
    localStorage.removeItem(SAVE_KEY);
    game = null;
    $("#save-dialog").close();
    updateHeaderCharacter();
    startCreation();
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const viewTarget = event.target.closest("[data-view-target]");
      if (viewTarget) { showView(viewTarget.dataset.viewTarget); return; }
      const start = event.target.closest('[data-action="start-creation"]');
      if (start) { startCreation(); return; }
      const detail = event.target.closest("[data-sect-detail]");
      if (detail) { showSectDetail(detail.dataset.sectDetail); return; }
    });

    document.addEventListener("keydown", (event) => {
      const detail = event.target.closest?.("[data-sect-detail]");
      if (detail && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); showSectDetail(detail.dataset.sectDetail); }
    });

    $("#menu-button").addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      $("#menu-button").setAttribute("aria-expanded", String(open));
    });
    $("#new-game-button").addEventListener("click", startCreation);
    $("#continue-game-button").addEventListener("click", () => showView("play"));
    $("#creator-back").addEventListener("click", () => { if (creator.step > 1) { creator.step -= 1; renderCreator(); } });
    $("#creator-next").addEventListener("click", () => { if ($("#creator-next").disabled) return; if (creator.step < 4) { creator.step += 1; renderCreator(); } else finalizeCharacter(); });

    $("#stage-content").addEventListener("click", (event) => {
      const choice = event.target.closest("[data-scene-choice]");
      if (choice) return resolveSceneChoice(Number(choice.dataset.sceneChoice));
      const technique = event.target.closest("[data-technique]");
      if (technique) return useTechnique(technique.dataset.technique);
      const action = event.target.closest("[data-stage-action]")?.dataset.stageAction;
      if (!action) return;
      if (action === "start-scene") startNextScene();
      if (action === "toggle-scene-momentum") { sceneBurnMomentum = !sceneBurnMomentum; renderStage(); }
      if (action === "continue-result") continueFromResult();
      if (action === "toggle-combat-momentum") { combatBurnMomentum = !combatBurnMomentum; renderStage(); }
      if (action === "complete-chapter") completeChapter();
      if (action === "export-ending") exportGame();
      if (action === "new-after-ending") startCreation();
    });

    $("#archive-search").addEventListener("input", (event) => { searchTerm = event.target.value.trim(); renderArchive(); });
    $$('[data-archive-tab]').forEach((button) => button.addEventListener("click", () => { archiveTab = button.dataset.archiveTab; archiveFilter = "all"; renderArchive(); }));
    $("#archive-content").addEventListener("click", (event) => {
      const filter = event.target.closest("[data-tech-filter]");
      if (filter) { archiveFilter = filter.dataset.techFilter; renderArchive(); }
    });

    $$('[data-generate]').forEach((button) => button.addEventListener("click", () => {
      if (button.dataset.generate === "hook") generateHook();
      if (button.dataset.generate === "npc") generateNpc();
      if (button.dataset.generate === "rumor") generateRumor();
      if (button.dataset.generate === "oracle") generateOracle();
    }));
    $$('[data-die]').forEach((button) => button.addEventListener("click", () => rollUtility(button.dataset.die)));
    $("#clear-dice-log").addEventListener("click", () => { $("#dice-log").innerHTML = "<li><span>—</span><b>等你擲下第一顆骰</b></li>"; });
    $("#clock-track").addEventListener("click", (event) => { const segment = event.target.closest("[data-clock]"); if (segment) { const value = Number(segment.dataset.clock); clockValue = clockValue === value ? value - 1 : value; renderClock(); } });
    $("#reset-clock").addEventListener("click", () => { clockValue = 0; renderClock(); });

    $("#export-save").addEventListener("click", exportGame);
    $("#open-save-tools").addEventListener("click", () => $("#save-dialog").showModal());
    $("#dialog-export").addEventListener("click", exportGame);
    $("#import-save").addEventListener("change", (event) => { const [file] = event.target.files; if (file) importGame(file); event.target.value = ""; });
    $("#restart-game").addEventListener("click", restartGame);
    $("#clear-journal").addEventListener("click", () => { if (!game) return; game.character.journal = []; saveGame(); renderLedger(); showToast("行旅簿的顯示紀錄已拂去。", "good"); });
  }

  function init() {
    renderHomeSects();
    renderRuleStats();
    renderCreator();
    renderArchive();
    bindEvents();
    updateHeaderCharacter();
    const requested = location.hash.slice(1);
    showView(["home", "create", "play", "archive", "rules", "gm"].includes(requested) ? requested : "home", false);
  }

  init();
})();
