import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  Broadcast,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  ChartLineUp,
  CheckCircle,
  Clock,
  CurrencyCny,
  Database,
  Drop,
  Eye,
  Files,
  Funnel as FunnelIcon,
  GameController,
  Gift,
  Handshake,
  Image,
  LinkSimple,
  List,
  Medal,
  Megaphone,
  Robot,
  ShareNetwork,
  ShieldCheck,
  Snowflake,
  Sparkle,
  Target,
  TrendUp,
  Trophy,
  Users,
  UsersThree,
  VideoCamera,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import { SiTiktok, SiWechat } from "react-icons/si";
import {
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const navItems = [
  ["overview", "项目概览"],
  ["market", "市场判断"],
  ["mechanism", "活动机制"],
  ["content", "内容矩阵"],
  ["conversion", "转化闭环"],
  ["brief", "合作方案"],
  ["budget", "预算风险"],
  ["metrics", "效果指标"],
];

const overviewMetrics = [
  { value: "21天", label: "活动周期", Icon: CalendarBlank },
  { value: "4场", label: "核心直播", Icon: VideoCamera },
  { value: "3名", label: "阵营主播", Icon: UsersThree },
  { value: "12名", label: "中腰部达人", Icon: Users },
  { value: "90—100名", label: "普通玩家代表", Icon: GameController },
  { value: "300+", label: "内容产出目标", Icon: Files },
];

const cases = [
  { type: "真人秀任务机制", title: "《飞黄腾达》式连续挑战", borrow: "连续任务、团队竞争、阶段奖励与最终反转", apply: "把一次直播升级为21天持续追更的赏金挑战" },
  { type: "暑期综艺", title: "水上闯关内容", borrow: "水上赛道、团队接力、轻竞技与强视觉", apply: "包装冰块保卫、水上运粮与泼水攻城" },
  { type: "主播营销", title: "主播阵营活动", borrow: "主播担任领袖，粉丝助力与榜单竞争", apply: "建立魏、蜀、吴三阵营，游戏行为贡献积分" },
  { type: "创作者生态", title: "游戏创作者激励", borrow: "现金激励、投稿任务、榜单与模板化生产", apply: "为达人切片、玩家投稿和同盟应援设置奖励池" },
  { type: "内容分发", title: "直播切片矩阵", borrow: "核心事件拆成多目标素材并快速追加投放", apply: "区分流量型、转化型、追更型与UGC型切片" },
  { type: "游戏运营", title: "游戏内同盟活动", borrow: "集体任务、阵营积分、团队排名与连续回流", apply: "让游戏内助力直接改变线下真人秀结果" },
  { type: "用户共创", title: "UGC挑战赛", borrow: "统一话题、参与模板、荣誉展示与分层激励", apply: "阵营身份卡、助力截图、同盟集结与水上模仿" },
  { type: "直播事件", title: "主播专场直播", borrow: "集中曝光、限时福利、强口播与互动任务", apply: "将决赛夜做成4—6小时阵营冲刺事件" },
];

const episodes = [
  { no: "01", title: "冰块保卫战", subtitle: "高温 × 保冰", desc: "在高温环境中运输和保护冰块，最终按剩余重量排名。", gains: ["保温箱", "遮阳布", "冰袋", "任务提示"] },
  { no: "02", title: "水上运粮战", subtitle: "水道 × 运粮", desc: "穿越浮桥、滑道和障碍区，将粮草安全送到本方城池。", gains: ["水上捷径", "时间加成", "物资保护", "复活机会"] },
  { no: "03", title: "泼水攻城战", subtitle: "阵营 × 攻防", desc: "用水枪、水球和海绵装备完成城池攻防与资源争夺。", gains: ["高阶水枪", "防守盾牌", "额外复活", "保护时间"] },
  { no: "04", title: "赏金决赛夜", subtitle: "冲刺 × 瓜分", desc: "线下成绩、游戏内有效助力和直播互动共同决定冠军。", gains: ["赏金箱", "资源兑换", "隐藏任务", "最后冲刺"] },
];

const matrix = {
  "短视频": { objective: "制造话题，并把热点转化为可执行的游戏行动。", forms: ["流量型：失败、冲突、反转", "转化型：奖励、任务、限时行动", "追更型：榜单、赏金变化、预告", "UGC型：阵营身份卡、同盟应援"], action: "点击统一游戏入口，选择阵营并完成首次助力。" },
  "直播": { objective: "让真人秀、主播关系与游戏助力在同一场景发生。", forms: ["真人秀任务 40%", "主播互动与拉票 20%", "游戏演示及助力 20%", "福利公布与预告 20%"], action: "每15—20分钟明确口播，引导进入活动专题页。" },
  "KOL": { objective: "由头部制造事件，中腰部补充视角，切片账号扩大覆盖。", forms: ["头部主播：阵营领袖与核心直播", "垂类主播：目标用户渗透", "中腰部达人：任务与花絮", "切片达人：高光与转化二创"], action: "按渠道参数进入游戏，完成阵营任务。" },
  "游戏内": { objective: "承接外部流量，并形成连续任务、排名和即时反馈。", forms: ["首屏阵营选择", "5—10分钟首次助力", "实时贡献与阵营排名", "连续登录、同盟和邀请任务"], action: "完成任务获得礼包、积分、头像框和赏金抽取资格。" },
  "线下": { objective: "形成可直播、可切片、可二创的暑期视觉事件。", forms: ["冰块保卫", "水上运粮", "泼水攻城", "赏金决赛与玩家见面"], action: "通过游戏内助力解锁现场物资、时间和复活机会。" },
};

const funnelSteps = [
  "看到真人秀内容",
  "点击游戏入口",
  "进入活动专题页",
  "选择主播阵营",
  "完成首次助力任务",
  "获得即时奖励",
  "查看阵营排名",
  "第二天继续参与",
  "形成留存和付费",
];

const timeline = [
  { week: "第1周", title: "市场调研和机制策划", tasks: ["用户与竞品判断", "真人秀机制设计", "预算框架", "主播候选池"] },
  { week: "第2周", title: "主播、场地及技术筹备", tasks: ["合作沟通", "场地确认", "任务安全测试", "授权与合同"] },
  { week: "第3周", title: "KV、PV和落地页制作", tasks: ["主视觉与预热视频", "活动专题页", "直播流程", "数据追踪配置"] },
  { week: "第4周", title: "阵营公布及玩家招募", tasks: ["公布三大阵营", "招募玩家代表", "启动UGC", "预热内容发布"] },
  { week: "第5周", title: "第一期和第二期活动", tasks: ["冰块保卫战", "水上运粮战", "直播切片", "游戏内阵营任务"] },
  { week: "第6周", title: "第三期活动", tasks: ["泼水攻城战", "阵营积分冲刺", "主播拉票", "UGC二次扩散"] },
  { week: "第7周", title: "赏金决赛", tasks: ["决赛直播", "最终排名", "奖励发放", "冠军内容"] },
  { week: "第8周", title: "获奖内容和长尾召回", tasks: ["获奖故事", "高光复盘", "老玩家召回", "同盟持续运营"] },
];

const budgetData = [
  { name: "主播及达人", value: 160, color: "#2768d8" },
  { name: "真人秀制作及场地", value: 90, color: "#65bdf3" },
  { name: "效果投放", value: 150, color: "#7b75dd" },
  { name: "赏金和玩家奖励", value: 50, color: "#ffad2f" },
  { name: "KV、PV及内容", value: 20, color: "#72d4cb" },
  { name: "技术及数据监测", value: 15, color: "#a8c6ed" },
  { name: "保险、安保和预备金", value: 15, color: "#ff8c78" },
];

const risks = [
  ["内容火但没有新增", "传播与转化素材分开制作；热门内容24小时内补充转化版本。"],
  ["主播流量转化不足", "依据历史进入、留存与付费筛选；部分费用与有效任务挂钩。"],
  ["用户进入后快速流失", "直达活动页；首个任务5—10分钟；完成即发奖励。"],
  ["高温与水上活动安全", "避开高温峰值，配置救生、医疗、保险和室内备选场地。"],
  ["主播及活动舆情", "公开计分规则，保留赏金发放记录并设置统一响应口径。"],
  ["肖像、音乐、场地和切片授权", "拍摄前完成肖像、二创、投放、音乐和场地授权。"],
  ["奖励发放争议", "明确资格、核验、税费和发放周期，公示处理流程。"],
  ["活动数据作弊", "校验账号、设备和行为；异常助力不计成绩，高额奖励人工复核。"],
];

const metricGroups = [
  { title: "传播指标", Icon: Megaphone, items: [["全网曝光", "8000万—1.5亿"], ["话题播放", "5000万—1亿"], ["直播累计观看", "200万—400万"], ["UGC投稿", "3000—6000条"]] },
  { title: "转化指标", Icon: FunnelIcon, items: [["入口点击率", "2.5%—4%"], ["有效进入游戏", "20万—35万"], ["新增或有效回流", "12万—22万"], ["首次任务完成率", "55%—65%"]] },
  { title: "留存指标", Icon: TrendUp, items: [["次日留存", "35%—42%"], ["7日留存", "15%—22%"], ["连续三日参与", "≥25%"], ["核心阵营回流", "≥30%"]] },
  { title: "商业指标", Icon: ChartLineUp, items: [["单个有效用户成本", "20—40元"], ["首日ROI", "≥0.12"], ["30日ROI", "≥0.80"], ["90日ROI", "争取≥1.20"]] },
];

const conversionModel = [
  { name: "内容曝光 1亿", value: 100000000, fill: "#2d70d6" },
  { name: "深度观看/互动 800万", value: 8000000, fill: "#4b87dd" },
  { name: "点击入口 28万", value: 280000, fill: "#62a2e6" },
  { name: "进入游戏 23.8万", value: 238000, fill: "#76b8eb" },
  { name: "选择阵营 17.9万", value: 179000, fill: "#72c9dd" },
  { name: "完成首任务 10.7万", value: 107000, fill: "#72d4cb" },
  { name: "次日参与 4.3万", value: 43000, fill: "#f2b84b" },
  { name: "七日参与 2.1万", value: 21000, fill: "#ff9d43" },
];

function Badge({ children, tone = "blue" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <header className="section-header reveal">
      <span className="section-eyebrow"><Snowflake weight="fill" />{eyebrow}</span>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </header>
  );
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function App() {
  const [activeNav, setActiveNav] = useState("overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [matrixTab, setMatrixTab] = useState("短视频");
  const [activeFunnel, setActiveFunnel] = useState(0);
  const [activeWeek, setActiveWeek] = useState(0);
  const caseRail = useRef(null);

  const decisionData = useMemo(() => [
    { name: "线下任务成绩", value: 30, color: "#5ba6ea" },
    { name: "游戏内有效助力", value: 50, color: "#6c67df" },
    { name: "直播互动任务", value: 20, color: "#ff9e3f" },
  ], []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActiveNav(visible.target.id);
    }, { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.2, 0.5] });
    navItems.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  const goTo = (id) => {
    scrollToId(id);
    setMobileMenu(false);
  };

  return (
    <div className="site-shell">
      <nav className="top-nav" aria-label="方案目录">
        <button className="brand-mark" onClick={() => goTo("overview")} aria-label="返回项目概览">
          <span className="brand-icon"><Snowflake weight="fill" /></span>
          <span>冰河赏金营</span>
        </button>
        <div className="desktop-nav">
          {navItems.map(([id, label]) => (
            <button key={id} className={activeNav === id ? "active" : ""} onClick={() => goTo(id)}>{label}</button>
          ))}
        </div>
        <button className="menu-button" onClick={() => setMobileMenu((v) => !v)} aria-expanded={mobileMenu} aria-label="打开目录">
          {mobileMenu ? <X /> : <List />}
        </button>
        {mobileMenu && (
          <div className="mobile-menu">
            {navItems.map(([id, label]) => <button key={id} onClick={() => goTo(id)}>{label}</button>)}
          </div>
        )}
      </nav>

      <main>
        <section id="overview" className="hero section-anchor">
          <div className="hero-art" aria-hidden="true" />
          <div className="hero-content">
            <Badge>课程作业 · 营销提案</Badge>
            <p className="hero-kicker">《三国：冰河时代》暑期营销方案</p>
            <h1>冰河<span>赏金营</span></h1>
            <p className="hero-subtitle">暑期真人秀赏金挑战</p>
            <p className="hero-tagline">进入三冰，帮你的主公赢下赏金</p>
            <p className="hero-copy">主播在线下闯关，玩家在游戏内助力；21天连续内容，把真人秀热度转化为新增、回流、留存与付费。</p>
            <div className="hero-actions">
              <button className="button button-gold" onClick={() => goTo("mechanism")}>查看活动机制<ArrowRight /></button>
              <button className="button button-blue" onClick={() => goTo("conversion")}>查看转化闭环<ArrowRight /></button>
            </div>
          </div>
          <div className="hero-chips" aria-label="活动核心信息">
            <span><CalendarBlank />21天活动周期</span>
            <span><UsersThree />三大主播阵营</span>
            <span><Broadcast />四期真人秀</span>
            <span><Gift />赏金激励机制</span>
          </div>
        </section>

        <section className="overview-panel page-wrap" aria-labelledby="overview-title">
          <div className="planning-label"><Badge>项目规划数据</Badge><span>以下为方案设定，不是已实现结果</span></div>
          <div className="metric-strip reveal">
            {overviewMetrics.map(({ value, label, Icon }) => (
              <div className="metric-item" key={label}><Icon weight="duotone" /><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
          <div className="chapter-grid">
            <div className="chapter-number">01</div>
            <div>
              <h2 id="overview-title">项目背景</h2>
              <p>把产品的“极寒生存”差异点，翻译成暑期高温、水上闯关与冰块保卫的内容反差。</p>
            </div>
          </div>
          <div className="background-columns reveal">
            <article><Snowflake weight="duotone" /><h3>产品卖点</h3><p>冰雪生存、城市经营、三国武将、同盟协作与资源争夺，构成长线策略体验。</p><div className="keyword-row"><span>冰雪生存</span><span>城市经营</span><span>同盟竞争</span></div></article>
            <article><UsersThree weight="duotone" /><h3>目标用户</h3><p>28—40岁成熟男性游戏用户为核心，兼顾小游戏用户、真人秀受众与低活跃老玩家。</p><div className="keyword-row"><span>成熟游戏用户</span><span>主播粉丝</span><span>老玩家</span></div></article>
            <article><Target weight="duotone" /><h3>营销目标</h3><p>从内容关注出发，推动有效新增、玩家回流、持续活跃和商业转化。</p><div className="keyword-row"><span>曝光</span><span>新增</span><span>回流</span><span>付费</span></div></article>
          </div>
          <div className="thesis reveal"><Target weight="fill" /><div><span>核心判断</span><strong>本方案需要解决的不是内容能不能火，而是流量能不能真正进入游戏。</strong></div></div>
        </section>

        <section id="market" className="section section-anchor market-section">
          <div className="page-wrap">
            <SectionHeader eyebrow="02 市场判断" title="内容曝光不等于有效新增" desc="双平台协作，让抖音负责制造热度与即时进入，让微信负责关系沉淀与长期回流。" />
            <div className="platform-compare reveal">
              <article className="platform-panel douyin"><div className="platform-icon" aria-label="抖音"><SiTiktok /></div><div><span>传播与即时转化</span><h3>抖音</h3><p>短视频预热、主播直播、真人秀切片、二创扩散与效果投放。</p></div><ul><li>先制造内容事件</li><li>再用明确行动指令承接</li><li>热门素材24小时内补转化版</li></ul></article>
              <div className="platform-plus">×</div>
              <article className="platform-panel wechat"><div className="platform-icon" aria-label="微信"><SiWechat /></div><div><span>社群沉淀与长期经营</span><h3>微信</h3><p>小游戏经营、同盟社群、好友邀请、连续签到与老玩家召回。</p></div><ul><li>承接主播关系</li><li>形成同盟与阵营任务</li><li>推动次日与长期回流</li></ul></article>
            </div>
            <div className="breakpoint-row reveal">
              <article><Eye /><span>只看预览</span><p>用户在直播间外看到内容，却没有进入直播。</p></article>
              <ArrowRight />
              <article><ShareNetwork /><span>刷到切片</span><p>用户产生兴趣，但找不到统一游戏入口。</p></article>
              <ArrowRight />
              <article><GameController /><span>进入后迷失</span><p>进入普通首页，不知道需要完成什么任务。</p></article>
            </div>
          </div>
        </section>

        <section className="section cases-section">
          <div className="page-wrap">
            <div className="section-header-row">
              <SectionHeader eyebrow="案例参考" title="拆解8类可借鉴机制" desc="不复述案例历史，只回答“借鉴什么、如何应用”。" />
              <div className="rail-controls"><button onClick={() => caseRail.current?.scrollBy({ left: -420, behavior: "smooth" })} aria-label="向左查看更多案例"><CaretLeft /></button><button onClick={() => caseRail.current?.scrollBy({ left: 420, behavior: "smooth" })} aria-label="向右查看更多案例"><CaretRight /></button></div>
            </div>
            <div className="case-rail" ref={caseRail}>
              {cases.map((item, index) => (
                <article className="case-card reveal" key={item.title}>
                  <div className="case-top"><span className="case-index">{String(index + 1).padStart(2, "0")}</span><span className="case-type">{item.type}</span></div>
                  <h3>{item.title}</h3>
                  <dl><dt>可借鉴机制</dt><dd>{item.borrow}</dd><dt>应用到本项目</dt><dd>{item.apply}</dd></dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section core-section">
          <div className="page-wrap core-grid reveal">
            <div><Badge tone="gold">核心传播点</Badge><h2>普通直播让观众围观，<br />冰河赏金营让玩家决定胜负。</h2><p>“主播在线下闯关，玩家在游戏内决定其胜负”是贯穿所有内容和转化入口的核心差异。</p></div>
            <div className="versus"><div><span>普通游戏直播</span><strong>主播玩<br />观众看</strong><small>单向内容输出</small></div><b>VS</b><div className="winner"><span>冰河赏金营</span><strong>主播闯关<br />玩家决胜</strong><small>内容 × 参与 × 转化</small></div></div>
          </div>
          <div className="page-wrap motivation-row reveal">
            <article><UsersThree /><span>情感动力</span><strong>帮助喜欢的主播</strong></article>
            <article><Medal /><span>竞争动力</span><strong>所在阵营不能输</strong></article>
            <article><Gift /><span>奖励动力</span><strong>完成任务瓜分赏金</strong></article>
          </div>
        </section>

        <section id="mechanism" className="section section-anchor mechanism-section">
          <div className="page-wrap">
            <SectionHeader eyebrow="03 真人秀机制" title="四期任务，把暑期视觉变成持续追更" desc="每一期都由线下挑战制造内容，再由游戏内助力改变比赛条件。" />
            <div className="challenge-image reveal"><img src={`${import.meta.env.BASE_URL}assets/challenge-arena.webp`} alt="冰块保卫、水上运粮、泼水攻城与赏金决赛四个挑战区域的冰雪插画" /></div>
            <div className="episode-timeline">
              {episodes.map((ep) => (
                <article className="episode-card reveal" key={ep.no}>
                  <div className="episode-no">第{ep.no}期</div><span className="episode-subtitle">{ep.subtitle}</span><h3>{ep.title}</h3><p>{ep.desc}</p>
                  <div className="gain-list"><span>玩家助力可解锁</span>{ep.gains.map((gain) => <small key={gain}><CheckCircle weight="fill" />{gain}</small>)}</div>
                </article>
              ))}
            </div>
            <div className="decision-block reveal">
              <div><Badge>决赛权重 · 项目建议</Badge><h3>游戏内有效助力占比最高</h3><p>让玩家进入游戏成为决定主播胜负的关键，而不是附加环节。</p><div className="decision-legend">{decisionData.map((d) => <span key={d.name}><i style={{ backgroundColor: d.color }} />{d.name} {d.value}%</span>)}</div></div>
              <div className="chart-box" aria-label="决赛权重环形图"><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={decisionData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={3}>{decisionData.map((d) => <Cell key={d.name} fill={d.color} />)}</Pie><Tooltip formatter={(value, name) => [`${value}%`, name]} /></PieChart></ResponsiveContainer><div className="chart-center"><strong>50%</strong><span>游戏内助力</span></div></div>
            </div>
          </div>
        </section>

        <section id="content" className="section section-anchor content-section">
          <div className="page-wrap">
            <SectionHeader eyebrow="04 内容矩阵" title="每一种内容，都对应一个用户动作" desc="内容不只负责播放量，还要明确它承接哪一段转化路径。" />
            <div className="content-tabs reveal" role="tablist" aria-label="内容矩阵">
              {Object.keys(matrix).map((tab) => <button key={tab} role="tab" aria-selected={matrixTab === tab} className={matrixTab === tab ? "active" : ""} onClick={() => setMatrixTab(tab)}>{tab}</button>)}
            </div>
            <div className="content-detail reveal" role="tabpanel">
              <div className="content-objective"><span>内容目标</span><h3>{matrix[matrixTab].objective}</h3><p><Target weight="fill" />用户动作：{matrix[matrixTab].action}</p></div>
              <div className="content-forms"><span>具体形式</span>{matrix[matrixTab].forms.map((form, idx) => <div key={form}><b>{String(idx + 1).padStart(2, "0")}</b><p>{form}</p></div>)}</div>
            </div>
          </div>
        </section>

        <section id="conversion" className="section section-anchor conversion-section">
          <div className="page-wrap">
            <SectionHeader eyebrow="05 用户转化闭环" title="从第一眼内容，到第二天继续参与" desc="点击任一步骤，查看它在完整转化链路中的位置。" />
            <div className="conversion-art reveal"><img src={`${import.meta.env.BASE_URL}assets/conversion-journey.webp`} alt="由内容触达到游戏进入、连续回流和价值转化的冰雪路径插画" /></div>
            <div className="funnel-steps reveal" aria-label="用户转化步骤">
              {funnelSteps.map((step, index) => <button key={step} className={activeFunnel === index ? "active" : index < activeFunnel ? "passed" : ""} onClick={() => setActiveFunnel(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></button>)}
            </div>
            <div className="funnel-note"><Badge tone="gold">当前步骤</Badge><strong>{funnelSteps[activeFunnel]}</strong><span>{activeFunnel < 4 ? "降低进入门槛，确保入口明确且可追踪。" : activeFunnel < 7 ? "用即时奖励和可见贡献强化参与反馈。" : "用排名、主播求援与连续任务形成回流。"}</span></div>
            <div className="breakpoints reveal">
              <article><div><WarningCircle weight="fill" /><span>断点一</span></div><h3>只看直播预览</h3><p>直播外素材也配置明确入口、游戏名和行动提示。</p></article>
              <article><div><WarningCircle weight="fill" /><span>断点二</span></div><h3>切片找不到游戏</h3><p>授权切片、官方视频和效果素材统一配置入口。</p></article>
              <article><div><WarningCircle weight="fill" /><span>断点三</span></div><h3>进入后不知道做什么</h3><p>直达活动页，5分钟内完成首个任务并领取奖励。</p></article>
            </div>
            <blockquote className="core-principle reveal"><LinkSimple weight="bold" /><p>每一条流量内容之后，都必须有可点击、可追踪、可承接的游戏入口。</p></blockquote>
          </div>
        </section>

        <section id="brief" className="section section-anchor brief-section">
          <div className="page-wrap">
            <SectionHeader eyebrow="06 合作方案 BRIEF" title="头部制造事件，达人扩散，玩家完成共创" desc="具体合作对象不写死，依据档期、报价和历史转化效果综合选择。" />
            <div className="partner-structure reveal">
              {[ ["1名", "核心话题主播"], ["2名", "阵营主播"], ["12名", "中腰部达人"], ["30—50名", "切片达人"], ["90—100名", "普通玩家代表"] ].map(([num, label], i) => <div key={label}><span>{String(i + 1).padStart(2, "0")}</span><strong>{num}</strong><small>{label}</small></div>)}
            </div>
            <div className="brief-grid reveal">
              <article><h3><UsersThree />主播筛选标准</h3><ul><li>粉丝以25—40岁成熟游戏用户为主</li><li>具备跨游戏用户转化与粉丝组织能力</li><li>历史合作关注进入、留存与付费，而非只看播放</li><li>允许直播切片、二创及效果广告授权</li></ul></article>
              <article><h3><Files />主要交付内容</h3><div className="delivery-tags">{["预热视频", "真人秀录制", "核心直播", "直播切片", "二次创作授权", "效果广告授权", "阵营拉票", "活动收尾"].map((tag) => <span key={tag}>{tag}</span>)}</div></article>
            </div>
          </div>
        </section>

        <section className="section ai-section">
          <div className="page-wrap">
            <SectionHeader eyebrow="07 AI 应用" title="让调研、生产与复盘形成次日迭代" desc="AI提高效率，但不代替最终创意判断、正式视觉制作和数据真实性审核。" />
            <div className="ai-flow reveal">
              {[ [Eye, "市场和竞品调研"], [Database, "用户评论聚类"], [Robot, "脚本和文案生成"], [Image, "KV及分镜预演"], [VideoCamera, "多版本效果素材"], [ChartLineUp, "数据复盘"], [Sparkle, "次日素材迭代"] ].map(([Icon, label], index) => <div key={label}><span><Icon weight="duotone" /></span><strong>{label}</strong>{index < 6 && <ArrowRight className="ai-arrow" />}</div>)}
            </div>
          </div>
        </section>

        <section className="section timeline-section">
          <div className="page-wrap">
            <SectionHeader eyebrow="08 时间线" title="8周完成策划、爆发与长尾召回" desc="点击周次查看对应的执行任务。" />
            <div className="week-rail reveal" role="tablist" aria-label="8周项目时间线">
              {timeline.map((item, index) => <button key={item.week} role="tab" aria-selected={activeWeek === index} className={activeWeek === index ? "active" : ""} onClick={() => setActiveWeek(index)}><span>{item.week}</span><small>{item.title}</small></button>)}
            </div>
            <div className="week-detail reveal"><div><CalendarBlank weight="duotone" /><span>{timeline[activeWeek].week}</span></div><h3>{timeline[activeWeek].title}</h3><ul>{timeline[activeWeek].tasks.map((task) => <li key={task}><CheckCircle weight="fill" />{task}</li>)}</ul></div>
          </div>
        </section>

        <section id="budget" className="section section-anchor budget-section">
          <div className="page-wrap">
            <SectionHeader eyebrow="09 预算与风险" title="500万元项目测算版" desc="课程方案预算，不代表实际报价；具体金额需结合主播档期、场地和投放成本调整。" />
            <div className="budget-layout reveal">
              <div className="budget-chart"><div className="budget-total"><Badge>项目测算</Badge><strong>500<small>万元</small></strong><span>总预算</span></div><ResponsiveContainer width="100%" height={340}><PieChart><Pie data={budgetData} dataKey="value" nameKey="name" innerRadius={86} outerRadius={128} paddingAngle={2}>{budgetData.map((d) => <Cell key={d.name} fill={d.color} />)}</Pie><Tooltip formatter={(value, name) => [`${value}万元`, name]} /></PieChart></ResponsiveContainer></div>
              <div className="budget-list">{budgetData.map((item) => <div key={item.name}><i style={{ backgroundColor: item.color }} /><span>{item.name}</span><strong>{item.value}万元</strong><small>{Math.round(item.value / 5)}%</small></div>)}</div>
            </div>
            <h3 className="risk-title"><ShieldCheck weight="duotone" />关键风险与解决措施</h3>
            <div className="risk-grid">{risks.map(([risk, solution]) => <article className="reveal" key={risk}><div><WarningCircle weight="fill" /><h4>{risk}</h4></div><p>{solution}</p></article>)}</div>
          </div>
        </section>

        <section id="metrics" className="section section-anchor metrics-section">
          <div className="page-wrap">
            <SectionHeader eyebrow="10 效果指标" title="所有数字都标明数据性质" desc="以下均为活动目标或模型测算，不呈现为已经实现的业绩。" />
            <div className="metric-groups">{metricGroups.map(({ title, Icon, items }) => <article className="reveal" key={title}><div className="metric-group-title"><Icon weight="duotone" /><h3>{title}</h3><Badge tone="gold">项目目标值</Badge></div>{items.map(([label, value]) => <div className="metric-line" key={label}><span>{label}</span><strong>{value}</strong></div>)}</article>)}</div>
            <div className="model-block reveal">
              <div className="model-copy"><Badge>模型测算</Badge><h3>1亿内容曝光的转化漏斗示例</h3><p>用于展示转化逻辑，后续需结合游戏历史投放成本、付费率、客单价和LTV校准。</p><div className="data-notes"><span><i className="dot-blue" />项目测算：资源与机制规划</span><span><i className="dot-gold" />活动目标：希望达到的业务结果</span><span><i className="dot-coral" />模型测算：用于演示转化关系</span></div></div>
              <div className="funnel-chart" aria-label="一亿内容曝光转化漏斗"><ResponsiveContainer width="100%" height={420}><FunnelChart><Tooltip formatter={(value, name) => [Number(value).toLocaleString("zh-CN"), name]} /><Funnel dataKey="value" data={conversionModel} isAnimationActive><LabelList position="right" fill="#18457f" stroke="none" dataKey="name" /></Funnel></FunnelChart></ResponsiveContainer></div>
            </div>
          </div>
        </section>

        <section className="final-section">
          <div className="page-wrap final-inner reveal"><Snowflake weight="fill" /><Badge tone="gold">方案总结</Badge><h2>冰河赏金营不是一次普通主播试玩。</h2><p>它是一套以真人秀吸引观看、以阵营竞争激发参与、以赏金推动行动、以游戏任务完成转化的暑期营销方案。</p><div className="final-path"><span>真人秀制造话题</span><ArrowRight /><span>主播阵营形成情绪</span><ArrowRight /><span>游戏助力改变结果</span><ArrowRight /><span>连续任务推动回流</span></div><button className="button button-gold" onClick={() => goTo("overview")}>返回顶部<ArrowUp /></button></div>
        </section>
      </main>

      <footer><div className="page-wrap footer-inner"><div><strong>《三国：冰河时代》暑期营销方案</strong><span>“冰河赏金营”暑期真人秀赏金挑战</span></div><div className="footer-meta"><span>版本 V1.0</span><span>更新日期 2026-08-05</span><span>用途：课程作业 / 内部提案</span></div><p>数据说明：公开资料需单独标注引用；本页面数据均为项目规划、活动目标或模型测算，不代表实际业绩或正式报价。</p></div></footer>

      <button className="back-top" onClick={() => goTo("overview")} aria-label="返回顶部"><ArrowUp /></button>
    </div>
  );
}

export { App };
