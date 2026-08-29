# 放置类游戏 UI 界面设计参考

> 调研目的：为 IdleRPG 前端（对峙式战斗 + 境界进度 + 秘境列表）提供真实游戏界面的布局与设计语言参考。
> 图片源说明：Steam 截图直链来自 Steam 官方 `appdetails` API（`https://store.steampowered.com/api/appdetails?appids=<id>&filters=screenshots`），可长期稳定访问；其余为可浏览的图集/百科页。
> 调研日期：2026-08-30。

---

## 一、设计方案模式总结

| 模式 | 代表作 | 说明 | 来源 |
|---|---|---|---|
| **单页多页签（横向顶栏）** | Antimatter Dimensions | 主内容区单页呈现，顶部一排页签随进程逐层解锁（Dimensions → Infinity → Eternity → Reality → Celestials），页签带阶段符号（Ω、∞、Δ…） | https://antimatterdimensions.wiki.gg/wiki/Antimatter_Dimensions_Wiki 、 https://store.steampowered.com/app/1399720/ |
| **左侧竖栏分类导航** | Melvor Idle、NGU Idle | 左侧固定竖栏按大类分组（战斗技能 / 非战斗技能 / 其他），点开大类后再展开具体系统页签；主内容区为网格卡片或行面板 | https://wiki.melvoridle.com/index.php?title=Main_Page 、 https://store.steampowered.com/app/1147690/ |
| **主副视图（常驻主场景 + 弹出面板）** | Leaf Blower Revolution、一念逍遥 | 主画面常驻"正在发生的事"（吹树叶 / 丹田修炼），升级、商店等以侧面板或弹出层叠加；适合强调"挂机中可见反馈"的游戏 | https://store.steampowered.com/app/1468260/ 、 https://www.taptap.cn/app/159465 |
| **顶部资源常驻栏** | 几乎全部放置游戏 | 货币、生命、每秒产量等核心数值永远固定在顶部，任何页签下都可读 | https://store.steampowered.com/app/1147690/ （"Progress Bars everywhere!"） |
| **进度条为第一视觉公民** | NGU Idle、一念逍遥 | NGU 把"到处都是进度条"写进商店宣传语；一念逍遥用修为进度条（已有修为 / 下级所需）作为境界成长的主视觉 | https://store.steampowered.com/app/1147690/ 、 https://zhuanlan.zhihu.com/p/651048396 |
| **数值瀑布 / 行式面板** | Antimatter Dimensions | 每行 = 一个生产体（1~8 维），行内按钮（买 1 / 买 10 / 买 Max）+ 数量 + 单价，纵向堆叠成"瀑布"，极低视觉噪音、纯文本驱动 | https://antimatterdimensions.wiki.gg/wiki/Dimensions 、 https://gitee.com/idlegame/antimatter-dimensions-dilmod/blob/master/index.html |
| **网格卡片信息组织** | Melvor Idle | 每个技能页内以等宽卡片网格排列可行动对象（树 / 矿 / 鱼塘），卡片内嵌等级需求与进度，扫一眼即知"哪些可点" | https://wiki.melvoridle.com/index.php?title=Woodcutting 、 https://store.steampowered.com/app/1267910/ |
| **渐进化解锁式 UI** | AD、LBR、NGU | 界面元素随进度逐步出现（新页签、新面板、新资源位），初期极简、后期"数值瀑布"，避免一次性淹没玩家 | https://antimatterdimensions.wiki.gg/wiki/Antimatter_Dimensions_Wiki 、 https://leafblowerrevolution.wiki.gg/wiki/Leaf_Blower_Revolution_Wiki |
| **成长的环境化具象反馈** | 一念逍遥 | 不止数字变化：丹田随境界从气态→液态→金丹→元婴→化神具象演变，洞府灵气亮度随突破提升 | https://xian.leiting.com/news/273.html |
| **国风视觉语言 = 水墨 + 器物隐喻** | 侠客风云传、太吾绘卷 | 卷轴（纪录）、竹简（菜单/物品）、日晷（时间）、印章（按钮/标签）、宣纸底色 + 墨黑 + 朱砂点缀；书法标题字 + 宋体/细黑体数值字 | https://gl.ali213.net/html/2015-7/76299_3.html 、 https://www.zcool.com.cn/work/ZMzg4NzE0MjA=.html |

**关键取舍结论**：
- **网页横屏放置游戏主流是"左竖栏 / 顶页签 + 顶部资源栏 + 主内容区"三段式**，其中内容区要么走"卡片网格"（Melvor，适合并列可选项），要么走"行瀑布"（AD，适合层级生产链）。
- **竖屏国风放置（一念逍遥）走"场景主视图 + 底部/侧边功能入口"**，牺牲信息密度换取沉浸感与想象力留白。
- **对峙式战斗在放置游戏中的成熟形态是"左我右敌 + 中央/侧边战斗日志"**（Melvor 战斗页），玩家需要的是"不盯着也看得到结果"。
- **UI 界面本身就是世界观氛围的延伸**（侠客风云传"以风格换便利"），国风放置游戏应当让面板质感（卷轴/竹简/印章）承担叙事功能。

---

## 二、逐游戏参考

### 1. Melvor Idle（梅尔沃放置）

**可查看截图的图片源**
- Steam 商店页（截图轮播区）：https://store.steampowered.com/app/1267910/Melvor_Idle/
- Steam API 截图直链（全尺寸 1920x1080，示例，替换哈希可取其余 10 张）：
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1267910/ss_a7988926d18b0035cce632cb860c00a295b47d36.1920x1080.jpg`
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1267910/ss_a73d53bc3bf6301b7f9cc4274a49a05fab1aba13.1920x1080.jpg`
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1267910/ss_5a8f7d294879a43f9e388ed59b3cef0138c9011e.1920x1080.jpg`
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1267910/ss_4d1ff907a39313707c27cddb1fc1b0a03a743859.1920x1080.jpg`
- 官网（可直接进网页版看真实界面）：https://melvoridle.com/
- 官方 Wiki：https://wiki.melvoridle.com/index.php?title=Main_Page

**布局结构**
- **导航方式**：左侧固定竖栏，按"战斗（Combat）/ 技能（Skills）/ 其他（Bank、商店、设置等）"三大类分组，每类下展开 28 项技能与系统入口；类目与游戏数据结构一一对应（Wiki 同构：战斗 9 项技能 + 非战斗 19 项技能）。
- **主循环信息层级**：顶部常驻栏显示 GP、生命、祈祷点等核心资源 → 主内容区按当前页签切换 → 技能页内是**等宽卡片网格**，每张卡片 = 一个可行动对象（一棵树/一炉矿），内嵌等级需求、动作进度条、产出图标。
- **战斗界面**：左右分栏——左侧选敌人/区域，右侧为对峙与战斗日志；玩家核心诉求是"挂机后回来只看日志结论"。
- **进度可视化**：卡片内动作进度条 + 全局 XP 条 + 精通（Mastery）池进度，三者分层（动作级 / 技能级 / 物品级）。

**可借鉴的设计语言要点**
- 扁平卡片 + 细描边 + 低饱和底色，信息密度高但不靠字号堆砌，靠**网格对齐**控制秩序感。
- 技能图标承担导航记忆点，彩色图标在灰底上形成焦点。
- "Wiki 与游戏同构"：游戏内分类即玩家心智模型，值得 IdleRPG 在内容注册表设计时对齐。

---

### 2. 一念逍遥

**可查看截图的图片源**
- TapTap 商店页（截图轮播）：https://www.taptap.cn/app/159465
- 17173 截图图集：https://newgame.17173.com/album-list-4073792.html
- 百度图片聚合（486 张界面截图）：http://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=gb18030&word=一念逍遥+界面+截图
- 官网：https://xian.leiting.com/ ；美术升级专题：https://xian.leiting.com/news/273.html

**布局结构**
- **导航方式**：竖屏；主视图常驻"洞府修炼场景"（水墨洞天），功能入口（探索/洞府炼丹/坊市/镇妖塔/宗门/秘境）以图标按钮环绕或收于侧边，点入切换到对应子界面。
- **主循环信息层级**：修炼界面 = 场景（丹田/灵台具象化）+ 修为进度条 + 境界名（炼气→筑基→结丹→元婴→化神→…→大罗）+ "吐纳"主按钮居中。知乎拆解指出：进度条显示"已拥有修为 / 下一小级所需修为"，修为存满后需手动点击突破，突破分三级（突破瓶颈→破境→渡劫），离线持续修炼、修为可超额存储。
- **秘境/探索**：选择地图后进入放置打怪，离线结算，资源自动累积；呈现上不做具象建模，延续水墨留白。
- **进度可视化**：三条线——数值进度条（修为）、环境反馈（灵气亮度/场景元素增多）、具象演进（丹田气→液→丹→婴→神）。

**可借鉴的设计语言要点**
- **水墨留白**：写意水墨晕染制造"不确定性"，官方明确将其作为"高自由度与参与想象空间"的设计手段（TapTap 开发者自述）。
- **弱化立绘/建模，文字与图标主导**：界面"化繁为简"，用完整还原的修仙术语体系（瓶颈/破境/雷劫/洞府/秘境）撑起代入感（GameRes 分析）。
- **突破的仪式感**：新境界时口诀心法文字在角色身周浮现、灵气变化、预览上一/下一境界（实力不足不可窥探更远，保留神秘感）。
- **交互对齐**：同类操作按钮对齐、主行动按钮（吐纳）居中且以色彩区分修炼路线（体/法），按钮带流光周转动效。

---

### 3. NGU Idle

**可查看截图的图片源**
- Steam 商店页：https://store.steampowered.com/app/1147690/NGU_IDLE/
- Steam API 截图直链（9 张，示例）：
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1147690/ss_5bd022cf9448ee41b7d7a0be97f32ff1c5169ad5.1920x1080.jpg`
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1147690/ss_01b7ea016693318f5565348f54cbed66ba66ec1e.1920x1080.jpg`
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1147690/ss_6810a2da42ff61d432525a2c443b93512eccdac2.1920x1080.jpg`

**布局结构**
- **导航方式**：左侧一列竖排图标页签（Adventure / Progress / Combat / Augmentation / Training / NGU / Gear / Yggdrasil…），每个图标页签内部再用横向子页签细分；逐游戏进程解锁新图标。
- **主循环信息层级**：顶部常驻资源栏（经验、PP、AP 等多货币）→ 图标页签区 → 主面板内是大按钮 + 进度条 + 时间倒计行的重复堆叠（如训练页每行为一个训练项目：等级、当前速率、剩余时间、分配数）。
- **进度可视化**：官方宣传语即"Progress Bars everywhere!"——所有等待都以进度条呈现，进度条内嵌文字（剩余时间/百分比），玩家可同时监控十几条并行进度。
- **数值瀑布**：升级按钮成行成列，每个按钮显示代价与当前可买性（可买高亮/不可买置灰）。

**可借鉴的设计语言要点**
- 高信息密度靠**统一行模板**（同宽同结构重复）消化，而非靠缩小字号。
- 手绘风插画（350+ 装备、300+ Boss 立绘）只在"奖励物"上出现，界面骨架保持朴素——奖励的视觉丰富度与界面的朴素形成对比。
- 趣味文案（幽默、自嘲）是 UI 的一部分，放置游戏长周期依赖文案调味。

---

### 4. Antimatter Dimensions

**可查看截图的图片源**
- Steam 商店页：https://store.steampowered.com/app/1399720/Antimatter_Dimensions/
- Steam API 截图直链（6 张，示例）：
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1399720/ss_681ae972983e32ebb54abe0424c47a54323dd871.1920x1080.jpg`
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1399720/ss_7f56c5b8d5c42bf2668fa72ae155ccc90a93de5a.1920x1080.jpg`
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1399720/ss_21b5bd7663d1e612fd63ce0c94692a10695fa35f.1920x1080.jpg`
- 网页原版（可直接打开看界面）：https://ivark.github.io/

**布局结构**
- **导航方式**：顶部横向页签，随转生层级逐层新增（Dimensions → Challenges → Achievements → Infinity → Eternity → Reality → Automation…）；每个大阶段在 Wiki 的 Game Navigation 中以符号标记（Ω / ∞ / ∝ / Δ / Ψ / Ϟ…），对应游戏内进度图标。
- **主循环信息层级**：顶栏反物质总量与每秒增量 → 8 行维度面板纵向堆叠（第 N 维生产第 N-1 维），每行 = 名称 + 数量 + 增量 + 买 1/买 10/买 Max 按钮 + 价格。
- **进度可视化**：大数字滚动 + 大比例尺计数（科学计数法/记号系统可切换）本身就是进度；里程碑与挑战进度另立页签。
- **自动化优先**：官方强调"海量自动化功能，包括自定义脚本语言"，界面包含大量自动化开关与 Automator 编辑器。

**可借鉴的设计语言要点**
- **纯文本驱动的克制美学**：深色底 + 少量强调色，无装饰图形，靠排版层级（数字大小、颜色深浅）传达重要性。
- 页签符号化（Ω、∞、Δ）：用极小视觉成本承载"阶段感"，适合境界类游戏借鉴。
- 解锁式扩展：新页签出现本身就是奖励反馈。

---

### 5. Leaf Blower Revolution（闪闪蘑菇/吹叶机旋转）

**可查看截图的图片源**
- Steam 商店页：https://store.steampowered.com/app/1468260/Leaf_Blower_Revolution__Idle_Game/
- Steam API 截图直链（7 张，示例）：
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1468260/ss_8769e7aaf17dc9d65e77bae68311f8e01ad33747.1920x1080.jpg`
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1468260/ss_686111de84838eea950053561d92f7a118a077ad.1920x1080.jpg`
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1468260/ss_fddb61065d39afd771785588129174b0906adcf0.1920x1080.jpg`
- 官方 Wiki：https://leafblowerrevolution.wiki.gg/wiki/Leaf_Blower_Revolution_Wiki

**布局结构**
- **主副视图**：主画面常驻游戏场景（吹叶机吹散树叶的粒子演出），数值反馈直接发生在"世界"里；顶部悬浮各类树叶/资源计数器。
- **导航方式**：屏幕边缘/侧边的面板按钮组（升级、区域、神器、炼金、宠物等），点开为叠加面板；Wiki 的内容分类（Leaves 按声望层级 Basic→Gold→Platinum→Bismuth→Cosmic→Void…、Areas、Mechanisms、Resets）即面板内部结构。
- **进度可视化**：多重声望层（Prestige / BLC / MLC / Galaxies 各自一套树叶序列），每层解锁后计数器与升级面板随之扩展——"层级序列"本身就是可视化导航。

**可借鉴的设计语言要点**
- **"正在发生"的可见性**：主画面永远是玩家挂机的焦点，面板只是工具——适合有秘境自动战斗演出的 IdleRPG 借鉴。
- 资源计数器按层级配色（普通树叶→宇宙树叶颜色渐变），用颜色编码" prestige 层级"。

---

### 6. 武侠/国风题材界面参考（侠客风云传、太吾绘卷）

**侠客风云传（Tale of Wuxia）**

- 可查看截图的图片源：Steam 商店页 https://store.steampowered.com/app/943550/ ；游侠网 UI 分析文（含界面截图）：https://gl.ali213.net/html/2015-7/76299_3.html ；站酷水墨卡牌 UI 二创：https://www.zcool.com.cn/work/ZMzg4NzE0MjA=.html
- 布局/设计语言（游侠网试玩分析）：
  - **状态界面**：人物数值、功体状态、称号、装备一屏陈列，延续《武林群侠传》布局——即"角色页 = 一张卷轴式总览"。
  - **器物隐喻**：纪录界面为**展开的书画卷轴**，物品栏与菜单为**书简（竹简）**造型，呼出时伴随缓缓展开动画；右上角以**日晷**显示 24 小时制游戏时间。
  - 整体气质"古色古香、质朴大气"，UI 本身是世界观氛围的延伸；缺点是翻页箭头偏小——装饰性不能牺牲可点性。
  - 参考 国风水墨卡牌 UI 的典型配色体系：墨黑（约 `#1a1a1a`）、宣纸米白（约 `#f2ede4`）、浅灰墨（约 `#8a8a8a`）、朱砂红/印章红（约 `#c0392b`）、描金点缀；书法字体做标题、宋体/细黑体做数值（注：色值为行业惯例推断，非官方值）。

**太吾绘卷（The Scroll of Taiwu）——反面教材**

- 可查看截图的图片源：Steam API 截图直链（6 张，示例）：
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/838450/ss_4219dbd55c7f77b80dc4aa5e56aa1011fef4bfd3.1920x1080.jpg`
  - `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/838450/ss_b345534660f7a4f557d17ca51ea413d295dbd77d.1920x1080.jpg`
- 教训（玩家社区集中吐槽，NGA/什么值得买）：正式版 UI 色调过丰富导致"最直观的感觉是混乱"；商店列表窗口过小、悬浮说明直接遮挡整个页面、不同界面风格不统一。2026-07 更新被迫做大规模"排序筛选 + 简化"的 UI 优化。
  - 来源：https://bbs.nga.cn/read.php?tid=47023461 、 https://post.smzdm.com/p/ak8230qk 、 https://news.17173.com/content/07232026/110447435.shtml
- 结论：**国风 ≠ 高装饰密度**。水墨质感要落在底色、纹理与字形上，面板结构必须像 Melvor/AD 一样克制统一。

---

## 三、对 IdleRPG 前端的布局建议

针对本项目三大核心界面（对峙式战斗、境界进度、秘境列表），综合上述参考：

### 1. 总体骨架：三段式 + 左竖栏
- 采用**左侧竖栏分类导航**（Melvor/NGU 模式）+ **顶部常驻资源栏** + **主内容区**：
  - 左竖栏分组建议与内容注册表对齐：修炼 / 战斗 / 秘境 / 物品·丹药 / 宗门(预留) / 设置。分组图标用国风符号（太极、剑、山门、葫芦、卷轴）。
  - 顶部资源栏常驻：修为（含每息增量）、灵石、寿元等核心数值，任何页签下可见（全放置游戏通用做法）。
- 桌面横屏优先，但保留竖屏窄栏可折叠（参考一念逍遥的功能入口收纳方式）。

### 2. 对峙式战斗页：Melvor 战斗分栏 + LBR 主视图可见性
- 左侧 = 秘境/敌人选择（卡片列表），右侧 = **对峙主视图**：我方与敌方分立左右、中间为攻防交互区，下方/侧方为**战斗日志**（时间倒序、可折叠为"仅结论"）——玩家挂机回来只看结论，想细看再展开。
- 若希望"挂机时能看到正在发生的事"，可将对峙演出做成常驻主视图（LBR 模式），战斗日志做成可收起的侧面板。

### 3. 境界进度页：进度条第一公民 + 突破仪式感
- 主视觉 = **修为进度条**（已有/所需，可超额存储，一念逍遥模式），上方境界名 + 页签符号化阶段标记（借鉴 AD 的 Ω/∞/Δ 符号思路，用"炼气/筑基/金丹…"的印章式徽记）。
- 突破做成**仪式性弹层**：渡劫/破境全屏演出，新境界口诀浮现、底色亮度提升（一念逍遥的环境化反馈思路）。
- 提供境界预览：可见下一小境界的表现，更远境界置灰锁定（保留神秘感）。

### 4. 秘境列表页：Melvor 卡片网格
- 秘境以**等宽卡片网格**排列，每卡 = 秘境名 + 推荐境界/战力 + 当前挂机进度（进度条）+ 产出图标；未解锁置灰并显示解锁条件。
- 卡片网格比行列表更适合"并列可选项"的心智模型；若秘境有层级链（如秘境逐层深入），在网格上方加一层阶段页签。

### 5. 国风设计语言落点
- **底色**：宣纸米白系（或夜间墨色系双主题），墨黑文字，朱砂红只用于主行动按钮与突破/渡劫时刻，描金用于境界徽记。
- **字形**：标题/境界名用书法体，数值与正文用宋体或细黑体，"刚柔对比"（站酷水墨 UI 惯例）。
- **质感**：卷轴（日志/大事记）、竹简（列表页签）、印章（按钮/状态徽记）、日晷（时间/CD）等器物隐喻，全部为 CSS 可实现的装饰层。
- **克制原则**（太吾绘卷教训）：装饰只落在容器边缘与背景纹理，信息结构本身保持扁平统一；不同页面的色调、圆角、描边必须同一套 token。

### 6. 工程注意
- 所有页签/分组/秘境数量来自 `content/` 注册表，UI 只渲染注册数据（与 ADR 0004 引擎-内容分离一致）；解锁式 UI（新页签随进度出现）应由内容表的 `unlock` 条件驱动。
- Steam 截图直链仅作开发期参考图，勿直接热链入产品。

---

## 附：来源清单

| 来源 | 用途 |
|---|---|
| https://melvoridle.com/ | Melvor 官网/网页版 |
| https://wiki.melvoridle.com/index.php?title=Main_Page 、 …/Woodcutting | Melvor 技能结构与页面组织 |
| https://store.steampowered.com/app/1267910/Melvor_Idle/ + Steam API | Melvor 截图 |
| https://www.taptap.cn/app/159465 | 一念逍遥截图/画风自述 |
| https://newgame.17173.com/album-list-4073792.html | 一念逍遥图集 |
| http://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=gb18030&word=一念逍遥+界面+截图 | 一念逍遥界面图片聚合 |
| https://xian.leiting.com/news/273.html | 一念逍遥洞府美术升级（丹田具象化/布局） |
| https://www.gameres.com/880589.html | 一念逍遥"化繁为简"产品分析 |
| https://zhuanlan.zhihu.com/p/651048396 | 一念逍遥境界系统拆解（修为进度条/突破三级） |
| https://store.steampowered.com/app/1147690/NGU_IDLE/ + Steam API | NGU 截图与"Progress Bars everywhere" |
| https://store.steampowered.com/app/1399720/Antimatter_Dimensions/ + Steam API | AD 截图 |
| https://antimatterdimensions.wiki.gg/wiki/Antimatter_Dimensions_Wiki | AD 页签结构与 Game Navigation |
| https://ivark.github.io/ | AD 网页原版（可直接看界面） |
| https://store.steampowered.com/app/1468260/Leaf_Blower_Revolution__Idle_Game/ + Steam API | LBR 截图 |
| https://leafblowerrevolution.wiki.gg/wiki/Leaf_Blower_Revolution_Wiki | LBR 内容分类/声望层级 |
| https://gl.ali213.net/html/2015-7/76299_3.html | 侠客风云传 UI 分析（卷轴/竹简/日晷） |
| https://www.zcool.com.cn/work/ZMzg4NzE0MjA=.html | 水墨卡牌 UI 风格参考 |
| https://store.steampowered.com/app/943550/ | 侠客风云传 Steam 版截图 |
| Steam API (app 838450) | 太吾绘卷截图 |
| https://bbs.nga.cn/read.php?tid=47023461 、 https://post.smzdm.com/p/ak8230qk | 太吾绘卷 UI 反面反馈 |
