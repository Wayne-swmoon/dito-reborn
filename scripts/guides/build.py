# rebornmylife.kr 안내 페이지 생성기 → public/<path>/index.html, public/sitemap.xml, public/robots.txt
# 사용: python3 scripts/guides/build.py   (내용 수정은 content.py)
import html, json, os, re, sys
from datetime import date

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from content import SITE, NOTE, PAGES, COMMON_FAQ, FAQ_PAGE  # noqa: E402

ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
PUB = os.path.join(ROOT, "public")
TEL = SITE["tel"].replace("-", "")


def e(s):
    return html.escape(str(s), quote=True)


def plain(s):
    return re.sub("<[^>]+>", "", str(s))


def part(p):
    k = p[0]
    if k == "p":
        return f"<p>{p[1]}</p>"
    if k == "checks":
        return '<ul class="checks">' + "".join(f"<li>{x}</li>" for x in p[1]) + "</ul>"
    if k == "dots":
        return '<ul class="dots">' + "".join(f"<li>{x}</li>" for x in p[1]) + "</ul>"
    if k == "steps":
        return '<ol class="steps">' + "".join(f"<li><b>{t}</b><span>{d}</span></li>" for t, d in p[1]) + "</ol>"
    if k == "table":
        th = "".join(f"<th>{h}</th>" for h in p[1])
        tr = "".join("<tr><th>" + r[0] + "</th>" + "".join(f"<td>{c}</td>" for c in r[1:]) + "</tr>" for r in p[2])
        return f'<div class="tbl"><table><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table></div>'
    if k == "info":
        return '<dl class="info">' + "".join(f"<dt>{a}</dt><dd>{b}</dd>" for a, b in p[1]) + "</dl>"
    raise ValueError(k)


def faq_html(items):
    return "".join(f'<details class="faq"><summary>{q}</summary><p>{a}</p></details>' for q, a in items)


def org_ld():
    return {"@context": "https://schema.org", "@type": "LegalService", "name": f'{SITE["firm"]} {SITE["name"]}',
            "url": SITE["domain"] + "/", "telephone": "+82-" + SITE["tel"][1:], "email": SITE["email"],
            "image": SITE["domain"] + "/og-image-js.jpg",
            "address": {"@type": "PostalAddress", "streetAddress": "법원남로9번길 10, 천우빌딩 3·4층", "addressLocality": "연제구",
                        "addressRegion": "부산광역시", "addressCountry": "KR"},
            "areaServed": ["부산광역시", "울산광역시", "경상남도"],
            "openingHoursSpecification": [{"@type": "OpeningHoursSpecification",
                                           "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                           "opens": "09:00", "closes": "18:00"}]}


def lds(pg, faq):
    out = [org_ld(),
           {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
               {"@type": "ListItem", "position": 1, "name": SITE["name"], "item": SITE["domain"] + "/"},
               {"@type": "ListItem", "position": 2, "name": pg["nav"], "item": SITE["domain"] + pg["path"]}]}]
    if faq:
        out.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": plain(q), "acceptedAnswer": {"@type": "Answer", "text": plain(a)}} for q, a in faq]})
    return "".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in out)


NAV = [(p["nav"], p["path"]) for p in PAGES] + [(FAQ_PAGE["nav"], FAQ_PAGE["path"])]


def page(pg, body, faq):
    nav = "".join(f'<a href="{h}"' + (' aria-current="page"' if h == pg["path"] else "") + f">{t}</a>" for t, h in NAV)
    return f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1XB4QT47PS"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-1XB4QT47PS');</script>
<title>{e(pg["title"])}</title>
<meta name="description" content="{e(pg["desc"])}">
<link rel="canonical" href="{SITE["domain"]}{pg["path"]}">
<meta name="theme-color" content="#0D6E6B">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="article">
<meta property="og:url" content="{SITE["domain"]}{pg["path"]}">
<meta property="og:title" content="{e(pg["title"])}">
<meta property="og:description" content="{e(pg["desc"])}">
<meta property="og:image" content="{SITE["domain"]}/og-image-js.jpg">
<meta property="og:site_name" content="{e(SITE["name"])}">
<link rel="preload" href="/fonts/Paperlogy-6SemiBold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/guides.css">
{lds(pg, faq)}
</head>
<body>
<header class="hd"><div class="wrap">
  <a class="brand" href="/" aria-label="{e(SITE["name"])} 처음으로"><img src="/img/logo-lawfirm-js.webp" alt="{e(SITE["firm"])}" width="474" height="167"><span>{e(SITE["name"])}</span></a>
  <a class="btn btn-acc hd-cta" href="/#contact">무료 상담</a>
</div>
<nav class="gnav" aria-label="안내 페이지"><div class="wrap">{nav}</div></nav></header>
<main id="main">
<section class="g-hero"><div class="wrap narrow">
  <p class="crumb"><a href="/">처음</a> / {pg["nav"]}</p>
  <p class="label">{pg["kicker"]}</p>
  <h1>{pg["h1"]}</h1>
  <p class="lead">{pg["lead"]}</p>
  <div class="cta"><a class="btn btn-acc" href="tel:{TEL}">전화 상담 {SITE["tel"]}</a><a class="btn btn-line" href="/#check">1분 자가진단</a></div>
</div></section>
{body}
<section class="g-sec"><div class="wrap narrow"><p class="note">{NOTE}</p></div></section>
<section class="band"><div class="wrap band-in">
  <div><h2>혼자 고민하지 마세요</h2><p>이름과 연락처만 남기시면 사무장이 직접 전화드립니다. 첫 상담은 무료입니다.</p></div>
  <div class="cta"><a class="btn btn-white" href="tel:{TEL}">{SITE["tel"]}</a><a class="btn btn-ghost" href="/#contact">상담 신청하기</a></div>
</div></section>
</main>
<footer class="ft"><div class="wrap">
  <p class="ft-name">{e(SITE["firm"])} {e(SITE["name"])}</p>
  <p class="ft-links">{" · ".join(f'<a href="{h}">{t}</a>' for t, h in NAV)}</p>
  <p>{SITE["addr"]} ({SITE["addr_note"]}) · 상담 {SITE["tel"]} · 사무실 {SITE["office_tel"]} · 팩스 {SITE["fax"]} · {SITE["email"]}</p>
  <p>{SITE["firm"]} · 사업자등록번호 {SITE["biz_no"]} · 모든 상담 내용은 변호사법에 의거하여 비밀이 보장됩니다.</p>
</div></footer>
<nav class="mbar" aria-label="빠른 연결"><a href="tel:{TEL}">전화 상담</a><a href="/#contact">무료 상담 신청</a></nav>
</body>
</html>
'''


def sections(pg):
    out = ""
    for i, (h, parts) in enumerate(pg["sections"]):
        soft = " soft" if i % 2 else ""
        out += f'<section class="g-sec{soft}"><div class="wrap narrow"><h2>{h}</h2>' + "".join(part(p) for p in parts) + "</div></section>"
    if pg.get("faq"):
        out += f'<section class="g-sec soft"><div class="wrap narrow"><h2>자주 묻는 질문</h2>{faq_html(pg["faq"])}<p class="more"><a href="/faq/">질문 전체 보기 →</a></p></div></section>'
    return out


def write(path, content):
    d = os.path.join(PUB, path.strip("/"))
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as f:
        f.write(content)


def main():
    all_faq = []
    for pg in PAGES:
        write(pg["path"], page(pg, sections(pg), pg.get("faq")))
        all_faq += pg.get("faq", [])
    faq_items = COMMON_FAQ + all_faq
    body = f'<section class="g-sec"><div class="wrap narrow">{faq_html(faq_items)}</div></section>'
    write(FAQ_PAGE["path"], page(FAQ_PAGE, body, faq_items))
    with open(os.path.join(HERE, "guides.css"), encoding="utf-8") as f:
        css = f.read()
    with open(os.path.join(PUB, "guides.css"), "w", encoding="utf-8") as f:
        f.write(css)
    today = date.today().isoformat()
    urls = [("/", "1.0")] + [(p["path"], "0.8") for p in PAGES] + [(FAQ_PAGE["path"], "0.7")]
    sm = "".join(f"<url><loc>{SITE['domain']}{u}</loc><lastmod>{today}</lastmod><priority>{pr}</priority></url>" for u, pr in urls)
    with open(os.path.join(PUB, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{sm}</urlset>\n')
    with open(os.path.join(PUB, "robots.txt"), "w", encoding="utf-8") as f:
        f.write(f"User-agent: *\nAllow: /\nDisallow: /templates/\nSitemap: {SITE['domain']}/sitemap.xml\n")
    print(f"{len(PAGES) + 1}개 안내 페이지 + sitemap.xml({len(urls)}개 주소) + robots.txt")


if __name__ == "__main__":
    main()
