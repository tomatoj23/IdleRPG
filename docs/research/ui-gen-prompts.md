# UI 生图提示词：结构与元素清单（不含风格）

用途：交给图像生成 AI 逐屏出稿。**本文只定义「画面里有什么、放在哪、显示什么内容」，不定义任何视觉风格**——配色、字体、质感、装饰由你另附的参考图或风格提示词决定。

风格提示词的用法：把风格词/参考图放在句首或句尾，本文的「结构提示词」原样接在后面即可。

## 全局约定

- **桌面端**：16:9 横屏，1024×576
- **移动端**：9:16 竖屏，576×1024
- **导航**：桌面=左侧竖栏；移动=底部标签栏。条目一律 5 个：修（修炼）/ 丹（炼丹）/ 秘（秘境）/ 奇（奇遇）/ 设（设置），当前页需有高亮态
- **资源栏**：桌面顶部通栏；移动端顶部通栏（内容更精简）
- **图标形式**：由风格提示词决定（可用单字方章，也可用图形图标），本文只规定数量与标注文字
- **通用禁项（与风格无关，务必带）**：不要出现英文、不要出现不可读的假汉字、不要水印、不要截断画面、严格按照指定比例

文案样例均取自 xkx100 调研语料（四字格招式、`$N 使出 $w` 句式、时辰制日志），可直接替换。

---

# 一、桌面端 16:9（1024×576）

## 1. 主界面·修炼（闭关）

**目的**：放置主循环第一屏，修为进度是最大视觉元素。

**分区**
- 顶部资源栏（高 8%）：修为值 6,412 / 当前境界「一流」/ 银两 / 时辰
- 左侧竖栏（宽 12%）：5 个导航项纵向排列，「修」为当前页高亮
- 主区中央偏左（约 40%）：大圆环进度环，环上 6 个刻度点标注境界名（不入流→三流→二流→一流→绝顶→宗师），当前刻度为实心；环心两行字「一流 72%」
- 进度环下方：主行动按钮「闭关」（唯一主按钮，视觉上最重）
- 右侧栏（宽 25%）：标题「修炼日志」+ 4 行竖排短句：
  - 辰时三刻·打坐炼气，修为+12
  - 巳时·领悟剑意，闭关效率提升

**结构提示词**
> 16:9 desktop game UI, cultivation main screen. Top thin resource bar with cultivation points 6,412, realm name 一流, currency, and time-of-day. Left vertical nav bar with 5 items 修 丹 秘 奇 设, 修 highlighted. Center-left large circular progress ring with 6 tick labels around it (不入流 三流 二流 一流 绝顶 宗师), center text 一流 72%. Below the ring one prominent primary button 闭关. Right panel titled 修炼日志 with four short Chinese log lines in a vertical list.

## 2. 战斗·对峙

**目的**：自动战斗可视化，玩家挂机后回来只看结果。

**分区**
- 顶部中央：秘境名 + 层数「藏剑山庄·第七层」，右侧计时「一炷香」
- 左（约 22%）：我方圆形头像 + 血条 + 3 个增益方章
- 右（约 22%）：敌方圆形头像 + 血条 + 3 个状态方章
- 中央（约 40%）：上方招式名「孤鸿印雪」大字；其下红色伤害数字「-1,287」；再下一行小字命中类型「要害！」
- 底部通栏日志条（高 15%）：2 行战斗文案：
  - 沈青崖使出「孤鸿印雪」，剑尖直取黑风寨主咽喉，伤敌 1,287！
  - 黑风寨主侧身急闪，剑风扫落一缕鬓发！

**结构提示词**
> 16:9 desktop game UI, auto-battle screen. Top center dungeon name 藏剑山庄 第七层 with timer on the right. Left and right circular portrait frames with thin outlines, HP bars beneath each, three small square buff/debuff icons under each. Center: large move name 孤鸿印雪 above a red damage number -1,287 with a small hit-type line 要害！. Bottom full-width log strip with two lines of classical Chinese combat narration.

## 3. 秘境列表

**目的**：刷宝目标选择页，并列可选项用卡片网格。

**分区**
- 左竖栏（「秘」高亮）+ 顶部资源栏
- 主区：3×2 卡片网格，每卡自上而下：
  - 横幅小景（山砦 / 渡口 / 竹林 / 矿洞 / 古寺 / 湖心亭 各一）
  - 秘境名（书法字）「黑石矿」
  - 层数进度「7/10」
  - 推荐境界小章「三流」
  - 未解锁的两张卡：整体置灰 + 中央一枚「锁」章

**结构提示词**
> 16:9 desktop game UI, dungeon selection screen. Left vertical nav with 5 items, 秘 highlighted. Top resource bar. Main area: 3x2 grid of six cards. Each card: a small horizontal scene banner, a calligraphic dungeon name 黑石矿, floor progress 7/10, a small seal with recommended realm 三流. Two cards greyed out with a 锁 seal in the center.

## 4. 角色养成（装备 + 武功装配）

**目的**：构筑操作台，装备词缀与武功装配的联动要一眼可见。

**分区**
- 左竖栏（「修」高亮）+ 顶部资源栏
- 主区左（40%）：人物全身立绘（持剑），周身 6 个六边形装备槽环绕（兵/冠/甲/腕/腰/靴，槽内一个字），槽边框有品质区分（三档），空槽为虚线
- 主区右（45%）上下两栏：
  - 「招式」4 行：方章首字 + 四字招式名（孤鸿印雪 / 白虹贯日 / 横江锁浪 / 踏雪寻梅）+ 品阶小字（下乘/中乘/上乘/绝学）+ 已装配标记
  - 「心法」3 行：同构
- 底部一行：标签汇总「剑法 +2　毒系 +1」

**结构提示词**
> 16:9 desktop game UI, character loadout screen. Left vertical nav, top resource bar. Main left 40%: full-body character illustration holding a sword, surrounded by six hexagonal equipment slots, each slot containing one Chinese character, slot borders show three rarity tiers, one slot is empty with a dashed outline. Main right 45%: two stacked lists titled 招式 (four rows) and 心法 (three rows); each row has a small seal character, a four-character move name, a tiny tier label, and an equipped marker. Bottom one line of tag summary text.

## 5. 炼丹（生产链）

**目的**：采集→丹方→炼制的行瀑布式页面，层级清晰、噪音低。

**分区**
- 左竖栏（「丹」高亮）+ 顶部资源栏
- 主区三段纵列：
  - 「药材」3 行：药材名（零苓草 / 断肠花 / 紫金参）+ 产地小字 + 持有数量
  - 「丹方」4 行：丹方名（小还丹 / 大还丹 / 碧血丹 / 凝气散）+ 材料需求小字 + 状态（可炼 / 未解锁）
  - 「丹炉」区：一条炼制进度条 + 一个产出格
- 右缘窄栏：当前增益「闭关效率 +15%」+ 倒计时

**结构提示词**
> 16:9 desktop game UI, alchemy production screen, row-based waterfall layout. Left vertical nav with 丹 highlighted, top resource bar. Main area in three vertical sections: herb list with three rows (name, origin in small text, quantity); recipe list with four rows (recipe name, material cost in small grey text, status 可炼 or 未解锁); furnace section with one thin progress bar and one output slot. Right slim column with an active buff line and countdown.

## 6. 奇遇事件弹窗

**目的**：随机叙事的仪式感翻牌。

**分区**
- 背景界面压暗为剪影
- 中央横幅弹窗（宽 60%、高 45%）：顶部小章「奇遇」+ 3 行叙事文案：
  - 你在后山采得一支七叶灵芝，根须犹带山岚湿气。
  - 老药师眯眼端详半晌：「成色上佳，够炼一炉小还丹了。」
- 弹窗下方：2 个并排小按钮「收下」「谢过」

**结构提示词**
> 16:9 desktop game UI, random event popup. Background screen dimmed to silhouette. Center: horizontal popup panel (60% width, 45% height) with a small seal 奇遇 at the top and three lines of classical Chinese narrative text. Below the text two small side-by-side buttons 收下 and 谢过.

---

# 二、移动端 9:16（576×1024）

移动端统一变化：左竖栏改为**底部 5 格标签栏**（高 8%）；顶部资源栏只保留修为与境界两项；主内容改为**单列纵向堆叠**；主行动按钮固定在拇指区（底部标签栏上方，通栏宽）。

## 1. 主界面·修炼

**分区**（自上而下）
- 顶部资源栏（高 7%）：修为 6,412 · 一流 · 时辰
- 情境区（高 30%）：可留白的氛围主视图（人物闭关剪影或空场景），用于承载风格参考图
- 进度区（高 25%）：大圆环进度环居中，环上 6 个境界刻度，环心「一流 72%」
- 日志区（剩余高度）：标题「修炼日志」+ 3 行短句
- 底部标签栏上方：通栏主按钮「闭关」
- 底部标签栏：修（高亮）/ 丹 / 秘 / 奇 / 设

**结构提示词**
> 9:16 mobile game UI, cultivation main screen. Top compact resource bar with 6,412 and 一流. Center large circular progress ring with six realm tick labels and center text 一流 72%. Below it a panel titled 修炼日志 with three short Chinese log lines. A full-width primary button 闭关 above the bottom bar. Bottom tab bar with five items 修 丹 秘 奇 设, 修 highlighted.

## 2. 战斗·对峙

**分区**（自上而下）
- 顶部：秘境名 + 层数「藏剑山庄·第七层」，右侧计时
- 敌人区（高 20%）：敌方圆形头像居上 + 血条 + 状态方章
- 动作区（高 22%）：招式名「孤鸿印雪」+ 红色伤害数字「-1,287」+ 命中类型小字
- 我方区（高 18%）：我方圆形头像 + 血条 + 增益方章（与敌人区上下呼应）
- 日志区（剩余高度）：2 行战斗文案，右侧一个折叠小箭头（可收起仅看结论）
- 底部标签栏

**结构提示词**
> 9:16 mobile game UI, auto-battle screen. Top bar with dungeon name 藏剑山庄 第七层 and timer. Enemy portrait at top with HP bar and status icons. Center action area with move name 孤鸿印雪, red damage number -1,287, and a small hit-type line. Player portrait below with HP bar and buff icons. Bottom log panel with two lines of classical Chinese combat narration and a small collapse arrow. Bottom tab bar with five items.

## 3. 秘境列表

**分区**
- 顶部资源栏（精简）
- 单列卡片列表，可见 3 张 + 下方露出一角表示可滚动；每卡横向布局：左侧方形小景（山砦/渡口/矿洞），右侧三行文字：秘境名「黑石矿」/ 层数「7/10」/ 推荐境界「三流」；未解锁卡整体置灰 + 「锁」章
- 底部标签栏（「秘」高亮）

**结构提示词**
> 9:16 mobile game UI, dungeon list screen. Top compact resource bar. Single-column card list, three cards visible with a fourth peeking from the bottom edge. Each card is horizontal: square scene thumbnail on the left, three lines of text on the right (dungeon name 黑石矿, 7/10, recommended realm 三流). One card greyed out with a 锁 seal. Bottom tab bar with five items, 秘 highlighted.

## 4. 角色养成

**分区**
- 上半（高 30%）：人物立绘 + 环绕 6 个六边形装备槽（槽内一个字，品质分三档）
- 中部（高 30%）：「招式」4 行，每行 方章首字 + 四字招式名 + 品阶小字 + 装配标记
- 中下（高 20%）：「心法」3 行，同构
- 底部一行：标签汇总「剑法 +2　毒系 +1」
- 底部标签栏（「修」高亮）

**结构提示词**
> 9:16 mobile game UI, character loadout screen. Top section with character illustration and six hexagonal equipment slots arranged around it, each slot one Chinese character, three rarity tiers. Middle list titled 招式 with four rows (seal character, four-character move name, tier label, equipped marker). Below it list titled 心法 with three rows. One line of tag summary. Bottom tab bar with five items.

## 5. 炼丹

**分区**
- 顶部资源栏（精简）
- 三段纵列，单列铺满宽度：「药材」3 行 → 「丹方」4 行 → 「丹炉」一个进度条 + 产出格
- 顶部右角：当前增益小章「+15%」+ 倒计时
- 底部标签栏（「丹」高亮）

**结构提示词**
> 9:16 mobile game UI, alchemy production screen. Top compact resource bar with a small buff badge +15% and countdown at the right. Vertical single-column stack: herb list three rows, recipe list four rows with status 可炼 or 未解锁, furnace section with one progress bar and one output slot. Bottom tab bar with five items, 丹 highlighted.

## 6. 奇遇事件弹窗

**分区**
- 背景压暗为剪影
- 中央竖向弹窗（宽 85%、高 40%）：顶部小章「奇遇」+ 4 行叙事文案（竖屏每行更短）
- 弹窗底部 2 个并排按钮「收下」「谢过」
- 底部标签栏仍可见但压暗

**结构提示词**
> 9:16 mobile game UI, random event popup. Background dimmed to silhouette. Center vertical popup panel (85% width, 40% height) with a small seal 奇遇 and four short lines of classical Chinese narrative text. Two side-by-side buttons 收下 and 谢过 at the bottom of the popup. Bottom tab bar dimmed behind the popup.

---

## 验收清单（与风格无关的硬标准）

1. 比例正确（桌面 16:9 / 移动 9:16），无黑边无截断
2. 每个界面的元素数量与位置符合上文分区描述
3. 文字可读、无英文乱码、无假汉字、无水印
4. 导航 5 项且当前项有高亮态
5. 主界面有且仅有一个主行动按钮（闭关）
