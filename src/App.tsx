import { useState } from "react";

type SiteKey = "makkah" | "mina" | "muzdalifah" | "arafat";
type Site = {
  key: SiteKey;
  ar: string;
  en: string;
  eyebrow: string;
  description: string;
  fact: string;
  x: number;
  y: number;
};

const sites: Site[] = [
  {
    key: "makkah",
    ar: "مكة المكرمة",
    en: "Makkah",
    eyebrow: "المسجد الحرام",
    description:
      "قبلة المسلمين ومهوى أفئدتهم، وفي قلب المسجد الحرام تقوم الكعبة المشرفة.",
    fact: "بداية الرحلة • الطواف والسعي",
    x: 20,
    y: 73,
  },
  {
    key: "mina",
    ar: "منى",
    en: "Mina",
    eyebrow: "مدينة الخيام",
    description:
      "وادي الشعائر وموطن المبيت ورمي الجمرات، يمتد بين جبال مكة في مشهد فريد.",
    fact: "8–13 ذو الحجة • المبيت والجمرات",
    x: 44,
    y: 49,
  },
  {
    key: "muzdalifah",
    ar: "مزدلفة",
    en: "Muzdalifah",
    eyebrow: "المشعر الحرام",
    description:
      "مشعر مفتوح بين منى وعرفات، يجتمع فيه الحجاج بعد غروب يوم عرفة.",
    fact: "ليلة 10 ذو الحجة • الجمع والمبيت",
    x: 61,
    y: 62,
  },
  {
    key: "arafat",
    ar: "عرفات",
    en: "Arafat",
    eyebrow: "جبل الرحمة",
    description:
      "ميدان الوقوف الأعظم، وفيه جبل الرحمة ومسجد نمرة، وهو ركن الحج الأكبر.",
    fact: "9 ذو الحجة • الوقوف بعرفة",
    x: 80,
    y: 31,
  },
];

const journey: SiteKey[] = [
  "makkah",
  "mina",
  "arafat",
  "muzdalifah",
  "mina",
  "makkah",
];

const Icon = ({ name }: { name: "plus" | "minus" | "reset" | "close" | "arrow" }) => {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    reset: <path d="M5 8V4m0 0h4M5 4a9 9 0 1 1-2 10" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="m15 18-6-6 6-6" />,
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

function TouchButton({
  children,
  className = "",
  onClick,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  label?: string;
}) {
  return (
    <div
      className={`touch-button ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      {children}
    </div>
  );
}

function LandmarkMap({
  selected,
  onSelect,
  zoom,
}: {
  selected: SiteKey | null;
  onSelect: (key: SiteKey) => void;
  zoom: number;
}) {
  return (
    <div className="map-stage" style={{ transform: `scale(${zoom})` }}>
      <svg
        className="terrain"
        viewBox="0 0 1200 760"
        role="img"
        aria-label="خريطة توضيحية للمشاعر المقدسة"
      >
        <defs>
          <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#cdbb94" />
            <stop offset="1" stopColor="#826e4c" />
          </linearGradient>
          <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#705e42" />
            <stop offset="1" stopColor="#403b2e" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="16" stdDeviation="18" floodOpacity=".35" />
          </filter>
        </defs>

        <path className="contour" d="M5 614C170 514 264 564 385 463S613 359 748 407s250-40 447-198" />
        <path className="contour faint" d="M-10 661C194 556 306 630 428 509s256-84 359-39 232-69 420-215" />
        <path
          className="island"
          d="M84 588 277 321 620 187l488 142-164 256-380 139-447-61Z"
          fill="url(#land)"
          filter="url(#shadow)"
        />
        <path d="m84 588 33 75 447 61v-61Z" fill="#66583d" />
        <path d="m564 663 380-139 164-195v69L944 585 564 724Z" fill="#4c4635" />

        <g className="mountains" fill="url(#hill)">
          <path d="m154 481 55-112 58 116-51-28Z" />
          <path d="m285 381 45-88 52 93-44-20Z" />
          <path d="m706 292 52-110 64 126-62-32Z" />
          <path d="m915 405 57-112 64 129-59-34Z" />
          <path d="m727 573 46-83 48 91-47-18Z" />
        </g>

        <path className="route-under" d="M244 565C350 475 412 434 523 405S691 461 758 482s111-98 207-186" />
        <path className="route" d="M244 565C350 475 412 434 523 405S691 461 758 482s111-98 207-186" />

        <g className={`landmark makkah ${selected && selected !== "makkah" ? "subdued" : ""}`}>
          <path d="m179 561 73-40 74 40-74 42Z" fill="#e5ddcd" />
          <path d="m190 559 62-33 62 34v31l-62 34-62-34Z" fill="#f1eadc" />
          <path d="m235 543 18-10 18 10v30l-18 10-18-10Z" fill="#171612" />
          <path d="m236 548 17-9 17 9" stroke="#c8a96b" strokeWidth="3" />
          {[198, 303].map((x) => (
            <g key={x}>
              <path d={`M${x} 538v-68l7-13 7 13v68Z`} fill="#eee7da" />
              <path d={`M${x + 2} 475h10`} stroke="#c8a96b" strokeWidth="4" />
            </g>
          ))}
        </g>

        <g className={`landmark mina ${selected && selected !== "mina" ? "subdued" : ""}`}>
          {Array.from({ length: 18 }).map((_, i) => {
            const x = 440 + (i % 6) * 25;
            const y = 348 + Math.floor(i / 6) * 27 + (i % 2) * 8;
            return <path key={i} d={`m${x} ${y} 11-9 11 9-11 7Z`} fill="#f3eee3" />;
          })}
          <path d="m544 427 71-36 22 13-70 37Z" fill="#415952" />
          <path d="m567 441 70-37v28l-70 37Z" fill="#273b36" />
        </g>

        <g className={`landmark muzdalifah ${selected && selected !== "muzdalifah" ? "subdued" : ""}`}>
          <path d="m704 488 53-29 50 29-52 29Z" fill="#efe7d7" />
          <path d="m719 488 37-20 35 20v31l-36 20-36-20Z" fill="#d8c7a5" />
          <path d="m744 477 12-26 12 26Z" fill="#c8a96b" />
        </g>

        <g className={`landmark arafat ${selected && selected !== "arafat" ? "subdued" : ""}`}>
          <path d="m893 311 62-121 70 130-63-38Z" fill="#796548" />
          <path d="m942 219 13-29 17 31-16-6Z" fill="#d6c69f" />
          <path d="m860 345 72-39 63 36-68 40Z" fill="#eee6d7" />
          <path d="m878 345 54-29 45 26v24l-50 28-49-28Z" fill="#d7c59f" />
          <path d="M885 326v-55l7-12 7 12v53Z" fill="#f2ecdf" />
        </g>
      </svg>

      {sites.map((site) => (
        <div
          className={`marker ${selected === site.key ? "active" : ""} ${
            selected && selected !== site.key ? "subdued" : ""
          }`}
          key={site.key}
          style={{ left: `${site.x}%`, top: `${site.y}%` }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(site.key);
          }}
          role="button"
          tabIndex={0}
        >
          <span className="marker-rings" />
          <span className="marker-core" />
          <span className="marker-label">
            <b>{site.ar}</b>
            <small>{site.en}</small>
          </span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState<SiteKey | null>(null);
  const [zoom, setZoom] = useState(1);
  const [english, setEnglish] = useState(false);
  const [journeyMode, setJourneyMode] = useState(false);
  const [stage, setStage] = useState(0);
  const activeSite = sites.find((site) => site.key === selected);

  const reset = () => {
    setSelected(null);
    setZoom(1);
    setJourneyMode(false);
    setStage(0);
  };

  const startJourney = () => {
    setJourneyMode(true);
    setStage(0);
    setSelected(journey[0]);
    setZoom(1.08);
  };

  const moveJourney = (direction: number) => {
    const next = Math.min(journey.length - 1, Math.max(0, stage + direction));
    setStage(next);
    setSelected(journey[next]);
  };

  return (
    <main className="experience" dir={english ? "ltr" : "rtl"} onClick={() => selected && setSelected(null)}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div className="identity">
          <div className="identity-mark">
            <span />
            <span />
            <span />
          </div>
          <div>
            <p className="title">{english ? "The Holy Sites" : "المشاعر المقدسة"}</p>
            <p className="subtitle">{english ? "AN INTERACTIVE JOURNEY" : "THE HOLY SITES"}</p>
          </div>
        </div>
        <div className="top-actions">
          <div className="live-status"><i /> {english ? "Interactive Map" : "خريطة تفاعلية"}</div>
          <TouchButton className="language" onClick={() => setEnglish(!english)}>
            {english ? "العربية" : "EN"}
          </TouchButton>
        </div>
      </header>

      <section className="map-copy">
        <p className="kicker">{english ? "Sacred geography" : "جغرافيا المكان المقدّس"}</p>
        <p className="display">
          {english ? "A journey through place and ritual" : "رحلةٌ عبر المكان والشعيرة"}
        </p>
        <p className="lede">
          {english
            ? "Explore the connected landscape of Makkah, Mina, Muzdalifah and Arafat."
            : "استكشف المشاعر الأربعة، وتعرّف على معالمها ومكانتها في رحلة الحج."}
        </p>
      </section>

      <div className="map-shell">
        <LandmarkMap selected={selected} onSelect={(key) => { setSelected(key); setZoom(1.08); }} zoom={zoom} />
      </div>

      <nav className="site-nav" aria-label="المواقع">
        <span className="nav-index">٠١ — ٠٤</span>
        {sites.map((site, index) => (
          <div
            className={`site-link ${selected === site.key ? "active" : ""}`}
            key={site.key}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(site.key);
              setZoom(1.08);
            }}
            role="button"
            tabIndex={0}
          >
            <span className="site-number">0{index + 1}</span>
            <span><b>{english ? site.en : site.ar}</b><small>{english ? site.ar : site.en}</small></span>
            <i />
          </div>
        ))}
      </nav>

      <div className="map-tools">
        <TouchButton onClick={() => setZoom(Math.min(1.22, zoom + 0.06))} label="تكبير"><Icon name="plus" /></TouchButton>
        <TouchButton onClick={() => setZoom(Math.max(0.94, zoom - 0.06))} label="تصغير"><Icon name="minus" /></TouchButton>
        <TouchButton onClick={reset} label="إعادة ضبط"><Icon name="reset" /></TouchButton>
      </div>

      <div className="bottom-bar">
        <div className="hint"><span className="tap-icon" /><span><b>{english ? "Touch a site to explore" : "المس الموقع لاستكشافه"}</b><small>{english ? "Tap outside to close" : "يمكنك التكبير والتحرّك داخل الخريطة"}</small></span></div>
        <TouchButton className="journey-button" onClick={startJourney}>
          <span>{english ? "Begin Hajj Journey" : "ابدأ رحلة الحج"}</span>
          <Icon name="arrow" />
        </TouchButton>
      </div>

      {activeSite && !journeyMode && (
        <aside className="info-panel" onClick={(e) => e.stopPropagation()}>
          <TouchButton className="close-button" onClick={() => setSelected(null)} label="إغلاق"><Icon name="close" /></TouchButton>
          <div className="photo">
            <img
              src={activeSite.key === "makkah"
                ? "https://images.unsplash.com/photo-1780265861345-a787b955b505?auto=format&fit=crop&w=1400&q=85"
                : "https://images.unsplash.com/photo-1577889933775-33b8571874c4?auto=format&fit=crop&w=1400&q=85"}
              alt={activeSite.en}
            />
            <span className="photo-credit">UNSPLASH</span>
          </div>
          <div className="panel-content">
            <p className="panel-eyebrow">{activeSite.eyebrow}</p>
            <p className="panel-title">{activeSite.ar}</p>
            <p className="panel-english">{activeSite.en}</p>
            <div className="rule" />
            <p className="panel-description">{activeSite.description}</p>
            <div className="fact"><span>✦</span><p><small>محطة في رحلة الحج</small><b>{activeSite.fact}</b></p></div>
            <TouchButton className="explore-button" onClick={() => startJourney()}>
              <span>استكشف رحلة الموقع</span><Icon name="arrow" />
            </TouchButton>
          </div>
        </aside>
      )}

      {journeyMode && activeSite && (
        <aside className="journey-panel" onClick={(e) => e.stopPropagation()}>
          <div className="journey-head">
            <span>رحلة الحج</span>
            <TouchButton className="close-button" onClick={reset} label="إغلاق"><Icon name="close" /></TouchButton>
          </div>
          <p className="journey-count">المحطة {stage + 1} من {journey.length}</p>
          <div className="progress">{journey.map((_, i) => <i key={i} className={i <= stage ? "done" : ""} />)}</div>
          <p className="panel-title">{activeSite.ar}</p>
          <p className="panel-english">{activeSite.en}</p>
          <p className="panel-description">{activeSite.description}</p>
          <div className="journey-actions">
            <TouchButton className={stage === 0 ? "disabled" : ""} onClick={() => moveJourney(-1)}>السابق</TouchButton>
            <TouchButton className={stage === journey.length - 1 ? "disabled primary" : "primary"} onClick={() => moveJourney(1)}>
              {stage === journey.length - 1 ? "اكتملت الرحلة" : "المحطة التالية"}
            </TouchButton>
          </div>
          <TouchButton className="overview-link" onClick={reset}>العودة إلى الخريطة</TouchButton>
        </aside>
      )}
    </main>
  );
}
