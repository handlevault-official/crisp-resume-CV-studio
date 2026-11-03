"""Handle Vault Resume core: form data -> ATS-friendly resume PDF (selectable text). No network, no storage."""
import io, re
from xml.sax.saxutils import escape
from PIL import Image as PI
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, FrameBreak, NextPageTemplate, Paragraph,
                                Table, TableStyle, Spacer, Image, KeepTogether, HRFlowable)

W, H = A4
esc = lambda s: escape(s or "").replace("\n", "<br/>")
lines = lambda s: [l.strip().lstrip("-•* ").strip() for l in (s or "").splitlines() if l.strip().lstrip("-•* ").strip()]
items = lambda s: [x.strip() for x in re.split(r"[,\n;]+", s or "") if x.strip()]

def square_photo(b, px=300):
    im = PI.open(io.BytesIO(b)).convert("RGB"); w, h = im.size; s = min(w, h)
    im = im.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s)).resize((px, px))
    o = io.BytesIO(); im.save(o, "JPEG", quality=88); return o.getvalue()

def build_resume(d, photo=None):
    tpl, acc = d["template"], colors.HexColor(d["accent"])
    font = "Times-Roman" if tpl == "classic" else "Helvetica"
    bold = font.replace("Roman", "Bold") if tpl == "classic" else "Helvetica-Bold"
    ps = lambda n, **k: ParagraphStyle(n, fontName=k.pop("fontName", font), fontSize=k.pop("fontSize", 9.8),
                                       leading=k.pop("leading", 13), **k)
    base, right = ps("b"), ps("r", alignment=2, textColor=colors.HexColor("#555555"))
    bullet = ps("bu", leftIndent=12, bulletIndent=2, spaceAfter=1.5)
    hs = ps("h", fontName=bold, fontSize=10.5, textColor=acc, spaceBefore=10, spaceAfter=2)
    wh, whb = ps("w", textColor=colors.white, fontSize=9), ps("wb", fontName=bold, textColor=colors.white, fontSize=10, spaceBefore=12, spaceAfter=4)
    big = lambda c: ps("big", fontName=bold, fontSize=25, leading=29, textColor=c)
    sub = lambda c: ps("sub", fontSize=11.5, leading=15, textColor=c)

    def heading(t): return [Paragraph(t.upper(), hs), HRFlowable(width="100%", thickness=.6, color=acc, spaceAfter=4)]
    def two(l, r, w): 
        t = Table([[Paragraph(l, base), Paragraph(esc(r), right)]], colWidths=[w * .72, w * .28])
        t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")] + [(a, (0, 0), (-1, -1), 0) for a in
                              ("LEFTPADDING", "RIGHTPADDING", "TOPPADDING", "BOTTOMPADDING")])); return t
    def body(w):
        o = []
        if d["summary"].strip(): o += heading("Profile") + [Paragraph(esc(d["summary"]), base)]
        ex = [e for e in d["exp"] if e["role"] or e["company"]]
        if ex:
            o += heading("Experience")
            for e in ex:
                head = two(f"<b>{esc(e['role'])}</b>" + (f", {esc(e['company'])}" if e["company"] else ""), e["dates"], w)
                bl = [Paragraph(esc(b), bullet, bulletText="•") for b in lines(e["bullets"])]
                o += [KeepTogether([head] + bl[:1])] + bl[1:] + [Spacer(1, 6)]
        ed = [e for e in d["edu"] if e["school"] or e["degree"]]
        if ed:
            o += heading("Education")
            for e in ed:
                o += [two(f"<b>{esc(e['school'])}</b>" + (f", {esc(e['degree'])}" if e["degree"] else ""), e["dates"], w)]
                if e["notes"].strip(): o.append(Paragraph(esc(e["notes"]), base))
                o.append(Spacer(1, 5))
        return o
    def extras():
        o = []
        if d["skills"].strip(): o += heading("Skills") + [Paragraph(" • ".join(esc(s) for s in items(d["skills"])), base)]
        if d["languages"].strip(): o += heading("Languages") + [Paragraph(" • ".join(esc(s) for s in items(d["languages"])), base)]
        if d["certs"].strip(): o += heading("Certifications & Awards") + [Paragraph(esc(c), bullet, bulletText="•") for c in lines(d["certs"])]
        return o
    contact = [x for x in (d["email"], d["phone"], d["location"]) if x] + lines(d["links"])
    pimg = lambda s: Image(io.BytesIO(square_photo(photo)), s, s) if photo else None

    buf = io.BytesIO(); nm = d["name"] or "Your Name"
    doc = BaseDocTemplate(buf, pagesize=A4, title=f"{nm} - Resume", author=nm)
    full = Frame(42, 40, W - 84, H - 80, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="full")
    story = []
    if tpl == "sidebar":
        SW = 190
        doc.addPageTemplates([
            PageTemplate("first", [Frame(0, 0, SW, H, 20, 30, 16, 20, id="s"), Frame(SW, 0, W - SW, H, 26, 34, 34, 34, id="m")],
                         onPage=lambda c, _: (c.setFillColor(acc), c.rect(0, 0, SW, H, fill=1, stroke=0))),
            PageTemplate("later", [full])])
        story.append(NextPageTemplate("later"))
        if photo: story += [pimg(110)]
        story += [Paragraph("CONTACT", whb)] + [Paragraph(esc(c), wh) for c in contact]
        for t, k, fn in (("SKILLS", "skills", items), ("LANGUAGES", "languages", items), ("CERTIFICATIONS", "certs", lines)):
            if d[k].strip(): story += [Paragraph(t, whb)] + [Paragraph("• " + esc(x), wh) for x in fn(d[k])]
        story += [FrameBreak(), Paragraph(esc(nm), big(acc)), Paragraph(esc(d["title"]), sub(colors.HexColor("#444444")))]
        story += body(W - SW - 60)
    else:
        doc.addPageTemplates([PageTemplate("main", [full])])
        fw = W - 84
        dark, grey = colors.HexColor("#333333"), colors.HexColor("#555555")
        if tpl == "modern":
            cell = [Paragraph(esc(nm), big(colors.white)), Paragraph(esc(d["title"]), sub(colors.white))]
            hd = Table([[cell, pimg(64) or ""]], colWidths=[fw - 90, 90] if photo else [fw, 0])
            hd.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), acc), ("LEFTPADDING", (0, 0), (-1, -1), 14),
                                    ("TOPPADDING", (0, 0), (-1, -1), 12), ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
                                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE")]))
            story += [hd, Spacer(1, 6), Paragraph("  |  ".join(esc(c) for c in contact), ps("c", textColor=grey, fontSize=9))]
        else:
            al = ps("ctr", alignment=1)
            cell = [Paragraph(esc(nm), ParagraphStyle("n", parent=big(dark), alignment=0 if photo else 1)),
                    Paragraph(esc(d["title"]), ParagraphStyle("t", parent=sub(grey), alignment=0 if photo else 1)),
                    Paragraph("  |  ".join(esc(c) for c in contact), ps("c", textColor=grey, fontSize=9, alignment=0 if photo else 1))]
            hd = Table([[cell, pimg(70) or ""]], colWidths=[fw - 85, 85] if photo else [fw, 0])
            hd.setStyle(TableStyle([(a, (0, 0), (-1, -1), 0) for a in ("LEFTPADDING", "RIGHTPADDING", "TOPPADDING", "BOTTOMPADDING")]))
            story += [hd]
        story += body(fw) + extras()
    doc.build(story)
    return buf.getvalue()
