import os, re, json
import streamlit as st
from resume import build_resume

st.set_page_config(page_title="Resume Builder | Handle Vault Resume", page_icon="📄")
home = os.environ.get("HOME_URL", "")
if home:
    st.markdown(f"[← Handle Vault]({home})")
st.title("📄 Resume Builder")
st.caption("Handle Vault Resume: build an ATS-friendly resume PDF. Nothing is stored on the server.")

SIMPLE = ["template", "accent", "name", "title", "email", "phone", "location", "links", "summary", "skills", "languages", "certs"]
EXPF = ["role", "company", "dates", "bullets"]
EDUF = ["school", "degree", "dates", "notes"]
TPL = {"modern": "Modern (color header)", "classic": "Classic (serif)", "sidebar": "Sidebar (two-column)"}

def load_backup():
    f = st.session_state.get("backup_file")
    if f is None:
        return
    try:
        data = json.loads(f.getvalue())
        for k in SIMPLE:
            v = str(data["simple"].get(k, ""))
            if k == "template" and v not in TPL:
                continue
            if k == "accent" and not re.fullmatch(r"#[0-9a-fA-F]{6}", v):
                continue
            st.session_state[k] = v
        for pre, F, key, n_key in (("exp", EXPF, "exp", "n_exp"), ("edu", EDUF, "edu", "n_edu")):
            rows = data.get(key, [])[:12]
            st.session_state[n_key] = len(rows)
            for i, row in enumerate(rows):
                for f_ in F:
                    st.session_state[f"{pre}_{f_}_{i}"] = str(row.get(f_, ""))
    except Exception:
        st.session_state["backup_bad"] = True

if st.session_state.pop("backup_bad", False):
    st.warning("That file is not a valid resume backup.")

st.subheader("Design")
c1, c2, c3 = st.columns(3)
template = c1.selectbox("Template", list(TPL), format_func=TPL.get, key="template")
accent = c2.color_picker("Accent color", value="#1d4ed8", key="accent")
photo_up = c3.file_uploader("Photo (optional)", type=["png", "jpg", "jpeg", "webp"])

st.subheader("About you")
c1, c2 = st.columns(2)
name = c1.text_input("Full name", key="name")
title = c2.text_input("Job title", key="title")
c1, c2, c3 = st.columns(3)
email = c1.text_input("Email", key="email")
phone = c2.text_input("Phone", key="phone")
location = c3.text_input("Location", key="location")
links = st.text_area("Links (LinkedIn, portfolio, GitHub: one per line)", key="links")
summary = st.text_area("Profile summary (2-3 sentences)", key="summary")

st.subheader("Experience")
n_exp = int(st.number_input("Number of jobs", 0, 12, 1, key="n_exp"))
exp = []
for i in range(n_exp):
    with st.expander(f"Job {i + 1}", expanded=(i == 0)):
        row = dict(
            role=st.text_input("Job title", key=f"exp_role_{i}"),
            company=st.text_input("Company", key=f"exp_company_{i}"),
            dates=st.text_input("Dates", key=f"exp_dates_{i}", placeholder="Jan 2022 - Present"),
            bullets=st.text_area("Achievements (one per line)", key=f"exp_bullets_{i}"))
    exp.append(row)

st.subheader("Education")
n_edu = int(st.number_input("Number of schools", 0, 8, 1, key="n_edu"))
edu = []
for i in range(n_edu):
    with st.expander(f"School {i + 1}", expanded=(i == 0)):
        row = dict(
            school=st.text_input("School", key=f"edu_school_{i}"),
            degree=st.text_input("Degree / course", key=f"edu_degree_{i}"),
            dates=st.text_input("Dates", key=f"edu_dates_{i}"),
            notes=st.text_area("Honors, GPA, notes (optional)", key=f"edu_notes_{i}"))
    edu.append(row)

st.subheader("Skills and extras")
skills = st.text_area("Skills (comma or line separated)", key="skills")
languages = st.text_input("Languages", key="languages", placeholder="English (fluent), Filipino (native)")
certs = st.text_area("Certifications and awards (one per line)", key="certs")

if st.button("Generate PDF resume", type="primary"):
    d = dict(template=template, accent=accent, name=name[:80], title=title[:100], email=email[:100], phone=phone[:40],
             location=location[:100], links=links[:400], summary=summary[:900], skills=skills[:900],
             languages=languages[:300], certs=certs[:900],
             exp=[{k: v[:1500] for k, v in e.items()} for e in exp], edu=[{k: v[:400] for k, v in e.items()} for e in edu])
    try:
        fn = re.sub(r"[^A-Za-z0-9_-]+", "-", name or "resume").strip("-") or "resume"
        st.session_state["resume"] = (build_resume(d, photo_up.getvalue() if photo_up else None), fn)
    except Exception as e:
        st.error(f"Could not build resume: {e}")
res = st.session_state.get("resume")
if res:
    st.download_button("Download PDF", res[0], f"{res[1]}-resume.pdf", "application/pdf", type="primary")

with st.expander("Save or load a backup"):
    st.caption("Your resume is not stored online. Download a backup file and load it next time.")
    backup = dict(simple={k: st.session_state.get(k, "") for k in SIMPLE}, exp=exp, edu=edu)
    st.download_button("Download backup", json.dumps(backup), "resume-backup.json", "application/json")
    st.file_uploader("Load backup", type="json", key="backup_file", on_change=load_backup)
    st.divider()
st.link_button("☕ Support this tool", "https://ko-fi.com/handlevaultofficial")
