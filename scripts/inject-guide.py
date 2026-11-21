#!/usr/bin/env python3
"""채무 안내서(/guide/) HTML에 GA 태그와 하단 상담 띠를 넣는다.
위즈독스로 guide를 다시 빌드한 뒤 매번 실행:  python3 scripts/inject-guide.py
(dist/guide, public/guide 둘 다 처리. 이미 넣은 파일은 건너뜀)"""
import pathlib, shutil
ROOT = pathlib.Path(__file__).resolve().parent.parent
GA_ID = 'G-NZK6WNP0TW'
MARK = '<!-- rb-guide-inject -->'
HEAD = MARK + f'''<script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());(function(){{var k='rb_internal',v=null;try{{var m=location.search.match(/[?&]internal=([01])/);if(m){{m[1]==='1'?localStorage.setItem(k,'1'):localStorage.removeItem(k);}}v=localStorage.getItem(k);}}catch(e){{}}gtag('config','{GA_ID}',v?{{traffic_type:'internal'}}:{{}});}})();</script><link rel="stylesheet" href="/guide/rb-cta.css">'''
TAIL = '<script src="/guide/rb-cta.js" defer></script>'
for base in ('dist/guide', 'public/guide'):
    d = ROOT / base
    if not d.is_dir():
        continue
    shutil.copy(ROOT / 'scripts/guide-cta.css', d / 'rb-cta.css')
    shutil.copy(ROOT / 'scripts/guide-cta.js', d / 'rb-cta.js')
    n = 0
    for f in d.rglob('*.html'):
        s = f.read_text(encoding='utf-8')
        if MARK in s or '</head>' not in s:
            continue
        s = s.replace('</head>', HEAD + '</head>', 1).replace('</body>', TAIL + '</body>', 1)
        f.write_text(s, encoding='utf-8'); n += 1
    print(base, n, 'files')
