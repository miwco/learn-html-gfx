# Renders the course markdown docs into a single styled review.html.
# Stdlib only. Handles the markdown subset used in this repo:
# headings, paragraphs, hr, tables, fenced code (also inside list items),
# ordered/unordered lists with one nesting level, **bold**, `code`.
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

DOCS = [
    ("course-map.md", "Course map"),
    ("unit-plans.md", "Unit plans"),
    ("lessons/unit-00.md", "Unit 0 lessons"),
    ("lessons/unit-01.md", "Unit 1 lessons"),
    ("lessons/unit-02.md", "Unit 2 lessons"),
    ("lessons/unit-03.md", "Unit 3"),
    ("lessons/unit-04.md", "Unit 4"),
    ("lessons/unit-05.md", "Unit 5"),
    ("lessons/unit-06.md", "Unit 6"),
    ("lessons/unit-07.md", "Unit 7"),
    ("lessons/unit-08.md", "Unit 8"),
    ("lessons/unit-09.md", "Unit 9"),
    ("progression-model.md", "Progression model"),
    ("gamification-plan.md", "Gamification"),
    ("app-product-outline.md", "Product outline"),
    ("AUDIT.md", "Consistency audit"),
    ("BEGINNER-REVIEW.md", "Beginner review"),
    ("app/README.md", "The app"),
    ("mvp/README.md", "MVP"),
]


def inline(text):
    out = []
    # split on code spans first so formatting never applies inside them
    for i, part in enumerate(re.split(r"`([^`]*)`", text)):
        if i % 2:
            out.append("<code>%s</code>" % html.escape(part))
        else:
            part = html.escape(part)
            part = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", part)
            part = re.sub(r"(?<!\w)\*([^*\n]+)\*(?!\w)", r"<em>\1</em>", part)
            out.append(part)
    return "".join(out)


def slugify(text):
    text = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"[\s]+", "-", text).strip("-")


LIST_RE = re.compile(r"^(\s*)(-|\d+\.)\s+(.*)$")


def convert(md, used_ids):
    lines = md.splitlines()
    out = []
    i = 0
    # list stack: list of dicts {indent, tag, item_open}
    stack = []

    def close_lists(to_indent=-1):
        while stack and stack[-1]["indent"] > to_indent:
            top = stack.pop()
            if top["item_open"]:
                out.append("</li>")
            out.append("</%s>" % top["tag"])

    def heading_id(text):
        base = slugify(text)
        hid = base
        n = 2
        while hid in used_ids:
            hid = "%s-%d" % (base, n)
            n += 1
        used_ids.add(hid)
        return hid

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # fenced code block (top level or inside a list item)
        if stripped.startswith("```"):
            indent = len(line) - len(line.lstrip())
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code_lines.append(lines[i][indent:] if lines[i][:indent].strip() == "" else lines[i])
                i += 1
            i += 1  # skip closing fence
            block = "<pre><code>%s</code></pre>" % html.escape("\n".join(code_lines))
            if stack and stack[-1]["item_open"] and indent > stack[-1]["indent"]:
                out.append(block)
            else:
                close_lists()
                out.append(block)
            continue

        if not stripped:
            close_lists()
            i += 1
            continue

        m = re.match(r"^(#{1,4})\s+(.*)$", stripped)
        if m and not stack:
            level = len(m.group(1))
            text = m.group(2)
            hid = heading_id(text)
            out.append('<h%d id="%s">%s</h%d>' % (level, hid, inline(text), level))
            i += 1
            continue

        if re.match(r"^-{3,}$", stripped):
            close_lists()
            out.append("<hr>")
            i += 1
            continue

        # table
        if stripped.startswith("|") and i + 1 < len(lines) and re.match(r"^\s*\|[\s:|-]+\|\s*$", lines[i + 1]):
            close_lists()
            header = [c.strip() for c in stripped.strip("|").split("|")]
            i += 2
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            out.append('<div class="tablewrap"><table><thead><tr>')
            out.extend("<th>%s</th>" % inline(c) for c in header)
            out.append("</tr></thead><tbody>")
            for r in rows:
                out.append("<tr>" + "".join("<td>%s</td>" % inline(c) for c in r) + "</tr>")
            out.append("</tbody></table></div>")
            continue

        m = LIST_RE.match(line)
        if m:
            indent = len(m.group(1))
            tag = "ul" if m.group(2) == "-" else "ol"
            # close deeper lists
            close_lists(indent)
            if not stack or stack[-1]["indent"] < indent or (stack[-1]["indent"] == indent and stack[-1]["tag"] != tag):
                if stack and stack[-1]["indent"] == indent and stack[-1]["tag"] != tag:
                    close_lists(indent - 1)
                out.append("<%s>" % tag)
                stack.append({"indent": indent, "tag": tag, "item_open": False})
            if stack[-1]["item_open"]:
                out.append("</li>")
            out.append("<li>" + inline(m.group(3)))
            stack[-1]["item_open"] = True
            i += 1
            continue

        # continuation line of a list item
        if stack and stack[-1]["item_open"] and (len(line) - len(line.lstrip())) > stack[-1]["indent"]:
            out.append(" " + inline(stripped))
            i += 1
            continue

        close_lists()
        out.append("<p>%s</p>" % inline(stripped))
        i += 1

    close_lists()
    return "\n".join(out)


CSS = """
:root{--paper:#f7f7f4;--ink:#1a1d23;--muted:#6a6f78;--amber:#e8b90c;
--amber-deep:#b8920a;--dark:#14161a;--line:#e0dfd8;--code-bg:#efeee8;}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);
font:16px/1.6 "Segoe UI",system-ui,-apple-system,sans-serif;}
header{position:sticky;top:0;z-index:10;background:var(--dark);color:#f2f2ee;
padding:0 20px;display:flex;align-items:center;gap:18px;flex-wrap:wrap;
border-bottom:3px solid var(--amber);}
header .bug{background:var(--amber);color:var(--dark);font-weight:700;
padding:4px 10px;margin:10px 0;letter-spacing:.08em;font-size:13px;}
header nav{display:flex;gap:2px;flex-wrap:wrap;}
header nav a{color:#c9c9c2;text-decoration:none;font-size:13px;
letter-spacing:.05em;text-transform:uppercase;padding:14px 12px;}
header nav a:hover,header nav a:focus{color:#fff;background:#22252c;outline:none;}
main{max-width:900px;margin:0 auto;padding:32px 24px 96px;}
section.doc{margin-bottom:64px;}
h1{font-size:26px;font-weight:600;letter-spacing:-.01em;margin:56px 0 8px;
padding-left:14px;border-left:6px solid var(--amber);text-wrap:balance;}
section.doc:first-of-type h1{margin-top:8px;}
h2{font-size:19px;font-weight:600;margin:44px 0 8px;padding:6px 12px;
background:var(--dark);color:#f2f2ee;display:inline-block;
border-left:6px solid var(--amber);text-wrap:balance;}
h3{font-size:16px;font-weight:600;margin:28px 0 6px;color:var(--amber-deep);
text-transform:uppercase;letter-spacing:.06em;}
p,li{max-width:70ch;}
p{margin:10px 0;}
ul,ol{padding-left:26px;margin:8px 0;}
li{margin:5px 0;}
li>ul,li>ol{margin:4px 0;}
strong{font-weight:600;}
code{font:13.5px/1.5 "Cascadia Mono",Consolas,ui-monospace,monospace;
background:var(--code-bg);padding:1px 5px;border-radius:3px;}
pre{background:var(--dark);color:#e8e8e2;padding:14px 16px;overflow-x:auto;
border-left:6px solid var(--amber);margin:12px 0;}
pre code{background:none;color:inherit;padding:0;font-size:13.5px;}
.tablewrap{overflow-x:auto;margin:14px 0;}
table{border-collapse:collapse;font-size:14.5px;min-width:600px;}
th,td{border:1px solid var(--line);padding:8px 12px;text-align:left;
vertical-align:top;}
th{background:var(--code-bg);font-weight:600;letter-spacing:.03em;}
td:first-child{white-space:nowrap;font-variant-numeric:tabular-nums;}
hr{border:0;border-top:1px solid var(--line);margin:36px 0;}
.meta{color:var(--muted);font-size:13.5px;margin:4px 0 0;}
@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}
"""


def main():
    used_ids = set()
    sections = []
    nav = []
    for path, label in DOCS:
        md = (ROOT / path).read_text(encoding="utf-8")
        sid = "doc-" + slugify(label)
        used_ids.add(sid)
        nav.append('<a href="#%s">%s</a>' % (sid, html.escape(label)))
        sections.append('<section class="doc" id="%s">\n%s\n</section>' % (sid, convert(md, used_ids)))

    page = (
        "<title>Learn HTML Broadcast Graphics - Curriculum Review</title>\n"
        "<style>%s</style>\n"
        '<header><span class="bug">GFX COURSE</span><nav>%s</nav></header>\n'
        '<main>\n<p class="meta">Curriculum review - Deliverables 1-3 (in progress). '
        "Units 1-2 are specified exercise-by-exercise; Units 3-9 are planned at unit level.</p>\n"
        "%s\n</main>"
    ) % (CSS, "".join(nav), "\n".join(sections))

    out_path = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "review.html"
    out_path.write_text(page, encoding="utf-8")
    print("wrote %s (%d bytes)" % (out_path, len(page)))


if __name__ == "__main__":
    main()
