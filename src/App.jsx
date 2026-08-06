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
  MagnifyingGlass,
  Medal,
  Megaphone,
  MouseSimple,
  Repeat,
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
  { no: "01", phase: "首战篇", title: "冰块保卫战", subtitle: "高温 × 保冰", desc: "在高温环境中运输、遮阳并保护同等重量的冰块，60分钟后按剩余重量排名。", scene: "冰块实时融化，让领先与落后在镜头中持续变化。", gameTask: "完成首次建设、资源采集和武将招募，为所属主播累计有效助力。", effect: "每达成一档助力人数，现场解锁保温箱、遮阳布、冰袋或路线提示。", gains: ["保温箱", "遮阳布", "冰袋", "任务提示"] },
  { no: "02", phase: "进阶篇", title: "水上运粮战", subtitle: "水道 × 运粮", desc: "队员穿越浮桥、滑道、水池和障碍区，把代表粮草的道具运到本方城池。", scene: "粮草可能掉落、路线可能受阻，阵营之间可以拦截并争夺隐藏捷径。", gameTask: "完成资源采集、火炉升级和同盟任务，把游戏经营行为转化为运粮优势。", effect: "助力积分可兑换水上捷径、额外时间、免罚令牌、物资保护与复活机会。", gains: ["水上捷径", "时间加成", "物资保护", "复活机会"] },
  { no: "03", phase: "攻防篇", title: "泼水攻城战", subtitle: "阵营 × 攻防", desc: "三阵营用水枪、水球和海绵装备攻守城池，争夺旗帜与资源令牌。", scene: "进攻、防守、运输和指挥分工明确，冲突与反转适合直播切片。", gameTask: "玩家通过阵营任务持续贡献积分，决定本阵营攻城物资和战术资源。", effect: "积分可兑换高阶水枪、防守盾牌、额外复活、攻城加时和城池保护时间。", gains: ["高阶水枪", "防守盾牌", "额外复活", "保护时间"] },
  { no: "04", phase: "决赛篇", title: "赏金决赛夜", subtitle: "冲刺 × 瓜分", desc: "前三期成绩、游戏内有效助力与决赛直播互动共同决定最终冠军。", scene: "赏金箱、隐藏任务、阵营资源兑换与最后十分钟冲刺制造终局悬念。", gameTask: "玩家完成最后阶段任务、召回好友并参与直播互动，为主播完成最终冲刺。", effect: "游戏内助力占50%，并可触发主播复活、特殊事件与最终赏金增益。", gains: ["赏金箱", "资源兑换", "隐藏任务", "最后冲刺"] },
];

const painPoints = [
  { no: "01", Icon: Eye, problem: "只在直播间外观看预览", why: "用户看到了事件，但没有进入直播间，也没有接触到完整转化口播。", solution: "在直播预览画面、预热视频和官方素材中直接露出完整游戏名、活动利益点与可点击入口。", action: "预览外也能直接进入游戏", result: "减少第一步流失" },
  { no: "02", Icon: ShareNetwork, problem: "刷到切片，却找不到游戏入口", why: "高光和二创带来兴趣，但传播素材与转化入口彼此分离。", solution: "授权切片、官方视频与效果素材统一挂载小游戏入口，评论区置顶进入方式；热点出现后24小时内补发转化版。", action: "所有切片统一入口", result: "把围观变成点击" },
  { no: "03", Icon: MagnifyingGlass, problem: "感兴趣，却不知道游戏名或搜索路径", why: "用户记住了主播和挑战，却没有记住产品名称，无法主动搜索。", solution: "封面、前三秒、字幕与口播统一露出《三国：冰河时代》，固定搜索口令“搜索三国冰河时代，进入冰河赏金营”。", action: "统一游戏名与搜索口令", result: "承接非点击用户" },
  { no: "04", Icon: MouseSimple, problem: "进入游戏后看不到活动，不知道做什么", why: "用户落在普通首页，任务入口深、操作目标和奖励不明确。", solution: "外部入口直达活动专题页，首屏选择主播阵营；首个助力任务控制在5分钟内，完成后立即发放奖励。", action: "直达活动页与首任务", result: "提升首次任务完成" },
  { no: "05", Icon: Repeat, problem: "完成第一次体验后，缺少回流理由", why: "首次奖励结束后，没有新的关系反馈、竞争压力或阶段目标。", solution: "用阵营排名、主播求援、赏金变化、连续签到和下一期任务提醒，形成游戏内、主播账号与社群三重召回。", action: "排名＋奖励＋主播召回", result: "推动次日与七日留存" },
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
  { no: "01", title: "内容触达", metric: "内容曝光 1亿", detail: "真人秀、直播与切片形成第一轮关注", visualValue: 100, fill: "#6d8ff2" },
  { no: "02", title: "兴趣激活", metric: "深度观看 / 互动 800万", detail: "冲突、反转与主播关系推动深度观看", visualValue: 82, fill: "#53b7ee" },
  { no: "03", title: "入口转化", metric: "点击 28万 · 进入游戏 23.8万", detail: "统一入口承接内容热度，减少路径流失", visualValue: 64, fill: "#56cdc9" },
  { no: "04", title: "游戏承接", metric: "选阵营 17.9万 · 首任务 10.7万", detail: "阵营选择与即时奖励完成首次价值反馈", visualValue: 46, fill: "#f2bc4d" },
  { no: "05", title: "留存回流", metric: "次日 4.3万 · 七日 2.1万", detail: "榜单、主播求援和连续任务推动回流", visualValue: 30, fill: "#ff8f65" },
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

function useReplayableChart() {
  const chartRef = useRef(null);
  const [chartRun, setChartRun] = useState(0);
  const [chartVisible, setChartVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReducedMotion(mediaQuery.matches);
    syncMotionPreference();
    mediaQuery.addEventListener?.("change", syncMotionPreference);

    if (mediaQuery.matches) {
      setChartVisible(true);
      return () => mediaQuery.removeEventListener?.("change", syncMotionPreference);
    }

    let isActive = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      const shouldEnter = entry.isIntersecting && entry.intersectionRatio >= 0.45;
      const shouldLeave = !entry.isIntersecting || entry.intersectionRatio <= 0.08;

      if (shouldEnter && !isActive) {
        isActive = true;
        setChartRun((run) => run + 1);
        setChartVisible(true);
      } else if (shouldLeave && isActive) {
        isActive = false;
        setChartVisible(false);
      }
    }, { threshold: [0, 0.08, 0.45, 1] });

    if (chartRef.current) observer.observe(chartRef.current);
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener?.("change", syncMotionPreference);
    };
  }, []);

  return { chartRef, chartRun, chartVisible, reducedMotion };
}

function App() {
  const [activeNav, setActiveNav] = useState("overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [matrixTab, setMatrixTab] = useState("短视频");
  const [activeFunnel, setActiveFunnel] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [activeModelStage, setActiveModelStage] = useState(0);
  const [activeWeek, setActiveWeek] = useState(0);
  const caseRail = useRef(null);
  const decisionChart = useReplayableChart();
  const budgetChart = useReplayableChart();
  const modelFunnel = useReplayableChart();

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
            <div className="problem-strip reveal" aria-label="五个核心用户流失问题">
              <div className="problem-strip-title"><WarningCircle weight="fill" /><span>五个核心流失问题</span><strong>从看见内容到持续回流，每一步都可能断裂</strong></div>
              <div className="problem-strip-list">
                {painPoints.map(({ no, problem }) => <span key={no}><b>{no}</b>{problem}</span>)}
              </div>
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
            <SectionHeader eyebrow="03 真人秀机制" title="四期任务，让暑期内容持续追更" desc="每一期都由线下挑战制造内容，再由游戏内助力改变比赛条件。" />
            <div className="challenge-image reveal"><img src={`${import.meta.env.BASE_URL}assets/challenge-arena.webp`} alt="冰块保卫、水上运粮、泼水攻城与赏金决赛四个挑战区域的冰雪插画" /></div>
            <div className="episode-timeline reveal" role="tablist" aria-label="四期真人秀任务">
              {episodes.map((ep, index) => (
                <button className={activeEpisode === index ? "episode-card active" : "episode-card"} key={ep.no} role="tab" aria-selected={activeEpisode === index} aria-controls="episode-detail" onClick={() => setActiveEpisode(index)}>
                  <div className="episode-no">第{ep.no}期</div><span className="episode-subtitle">{ep.subtitle}</span><h3>{ep.title}</h3><p>{ep.desc}</p>
                </button>
              ))}
            </div>
            <article id="episode-detail" className="episode-feature reveal" role="tabpanel" aria-live="polite">
              <div className="episode-feature-heading">
                <div className="episode-feature-id">
                  <div className="episode-id-label"><Trophy weight="fill" /><span>真人秀任务</span></div>
                  <div className="episode-id-number"><small>EP.</small><strong>{episodes[activeEpisode].no}</strong></div>
                  <span className="episode-id-phase">{episodes[activeEpisode].phase}</span>
                </div>
                <div className="episode-feature-copy">
                  <div className="episode-feature-meta"><Badge tone="gold">{episodes[activeEpisode].subtitle}</Badge><span>第{episodes[activeEpisode].no}期 · {episodes[activeEpisode].phase}</span></div>
                  <h3>{episodes[activeEpisode].title}</h3>
                  <p>{episodes[activeEpisode].desc}</p>
                </div>
              </div>
              <div className="episode-detail-grid">
                <section><div className="episode-detail-icon"><VideoCamera weight="duotone" /></div><span>现场真人秀看点</span><p>{episodes[activeEpisode].scene}</p></section>
                <ArrowRight className="episode-flow-arrow" />
                <section><div className="episode-detail-icon"><GameController weight="duotone" /></div><span>玩家在游戏内做什么</span><p>{episodes[activeEpisode].gameTask}</p></section>
                <ArrowRight className="episode-flow-arrow" />
                <section className="episode-effect"><div className="episode-detail-icon"><Gift weight="duotone" /></div><span>如何改变主播比赛</span><p>{episodes[activeEpisode].effect}</p></section>
              </div>
              <div className="episode-gains"><span>本期可解锁现场增益</span>{episodes[activeEpisode].gains.map((gain) => <small key={gain}><CheckCircle weight="fill" />{gain}</small>)}</div>
            </article>
            <div className="episode-loop reveal"><span>每期固定内容循环</span><strong>线下任务制造冲突</strong><ArrowRight /><strong>主播直播号召助力</strong><ArrowRight /><strong>玩家进入游戏完成任务</strong><ArrowRight /><strong>助力改变现场结果</strong></div>
            <div className="decision-block reveal">
              <div><Badge>决赛权重 · 项目建议</Badge><h3>游戏内有效助力占比最高</h3><p>让玩家进入游戏成为决定主播胜负的关键，而不是附加环节。</p><div className="decision-legend">{decisionData.map((d) => <span key={d.name}><i style={{ backgroundColor: d.color }} />{d.name} {d.value}%</span>)}</div></div>
              <div className="chart-box" ref={decisionChart.chartRef} aria-label="决赛权重环形图">{decisionChart.chartVisible && <ResponsiveContainer width="100%" height={260} key={decisionChart.chartRun}><PieChart><Pie data={decisionData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={3} isAnimationActive={!decisionChart.reducedMotion} animationDuration={850} animationEasing="ease-out">{decisionData.map((d) => <Cell key={d.name} fill={d.color} />)}</Pie><Tooltip formatter={(value, name) => [`${value}%`, name]} /></PieChart></ResponsiveContainer>}<div className="chart-center"><strong>决赛权重</strong><span>三项构成</span></div></div>
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
            <div className="solution-heading reveal"><Badge tone="gold">重点模块</Badge><h3>五个用户问题，对应五套解决动作</h3><p>不是笼统地“增加曝光”，而是逐一修复从内容触达到长期回流的关键断点。</p></div>
            <div className="solution-map reveal">
              {painPoints.map(({ no, Icon, problem, why, solution, action, result }) => (
                <article key={no} className="solution-card">
                  <div className="solution-problem"><span className="solution-no">{no}</span><Icon weight="duotone" /><div><small>用户问题</small><h3>{problem}</h3><p>{why}</p></div></div>
                  <div className="solution-arrow"><ArrowRight weight="bold" /></div>
                  <div className="solution-action"><small>解决方法</small><p>{solution}</p><div><span><CheckCircle weight="fill" />{action}</span><b>{result}</b></div></div>
                </article>
              ))}
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
              <div className="budget-chart" ref={budgetChart.chartRef}><div className="budget-total"><Badge>项目测算</Badge><strong>500<small>万元</small></strong><span>总预算</span></div>{budgetChart.chartVisible && <ResponsiveContainer width="100%" height={340} key={budgetChart.chartRun}><PieChart><Pie data={budgetData} dataKey="value" nameKey="name" innerRadius={86} outerRadius={128} paddingAngle={2} isAnimationActive={!budgetChart.reducedMotion} animationDuration={900} animationEasing="ease-out">{budgetData.map((d) => <Cell key={d.name} fill={d.color} />)}</Pie><Tooltip formatter={(value, name) => [`${value}万元`, name]} /></PieChart></ResponsiveContainer>}</div>
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
              <div className="model-heading">
                <div><Badge tone="gold">模型测算</Badge><h3>从内容热度到长期回流</h3></div>
                <p>将八个测算节点整理为五个转化阶段，强调营销链路的递进关系；具体人数仍完整保留在右侧。</p>
              </div>
              <div className="model-visual-grid">
                <div className="funnel-chart" ref={modelFunnel.chartRef} aria-label="一亿内容曝光转化漏斗">
                  <span className="funnel-caption">CONVERSION PATH</span>
                  {modelFunnel.chartVisible && <ResponsiveContainer width="100%" height={400} key={modelFunnel.chartRun}>
                    <FunnelChart margin={{ top: 18, right: 20, bottom: 18, left: 20 }}>
                      <Tooltip formatter={(_value, _name, item) => [item.payload.metric, item.payload.title]} cursor={false} />
                      <Funnel dataKey="visualValue" nameKey="title" data={conversionModel} stroke="#ffffff" strokeWidth={8} isAnimationActive={!modelFunnel.reducedMotion} animationDuration={950} animationEasing="ease-out" onMouseEnter={(_entry, index) => setActiveModelStage(index)}>
                        {conversionModel.map((stage, index) => <Cell key={stage.title} fill={stage.fill} opacity={activeModelStage === index ? 1 : 0.9} />)}
                        <LabelList position="center" fill="#ffffff" stroke="none" dataKey="title" />
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>}
                </div>
                <div className="funnel-details" aria-label="转化阶段详情">
                  {conversionModel.map((stage, index) => (
                    <button key={stage.title} className={activeModelStage === index ? "active" : ""} style={{ "--stage-color": stage.fill }} onMouseEnter={() => setActiveModelStage(index)} onFocus={() => setActiveModelStage(index)} onClick={() => setActiveModelStage(index)}>
                      <span>{stage.no}</span><div><strong>{stage.title}</strong><b>{stage.metric}</b><small>{stage.detail}</small></div>
                    </button>
                  ))}
                </div>
              </div>
              <p className="funnel-scale-note">图形宽度仅用于表现阶段递进，不代表实际人数比例；模型数值以右侧文字为准。</p>
            </div>
          </div>
        </section>

        <section className="final-section">
          <div className="page-wrap final-inner reveal"><Snowflake weight="fill" /><Badge tone="gold">方案总结</Badge><h2>冰河赏金营不是一次普通主播试玩。</h2><p>它是一套以真人秀吸引观看、以阵营竞争激发参与、以赏金推动行动、以游戏任务完成转化的暑期营销方案。</p><div className="final-path"><span>真人秀制造话题</span><ArrowRight /><span>主播阵营形成情绪</span><ArrowRight /><span>游戏助力改变结果</span><ArrowRight /><span>连续任务推动回流</span></div><button className="button button-gold" onClick={() => goTo("overview")}>返回顶部<ArrowUp /></button></div>
        </section>
      </main>

      <footer><div className="page-wrap footer-inner"><div><strong>《三国：冰河时代》暑期营销方案</strong><span>“冰河赏金营”暑期真人秀赏金挑战</span></div><div className="footer-meta"><span>版本 V1.1</span><span>更新日期 2026-08-06</span><span>用途：课程作业 / 内部提案</span></div><p>数据说明：公开资料需单独标注引用；本页面数据均为项目规划、活动目标或模型测算，不代表实际业绩或正式报价。</p></div></footer>

      <button className="back-top" onClick={() => goTo("overview")} aria-label="返回顶部"><ArrowUp /></button>
    </div>
  );
}

export { App };
