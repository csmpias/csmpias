-- Seeded from content.md > # Pages (course page bodies) and
-- content.md > # Programs / Batches (structured tables) — the latter's native
-- HTML fee tables (fee-details, foundation-batch-2026-hindi-medium,
-- 72th-bpsc-integrated-mentorship-2026-2-2) are the authoritative pricing
-- source; all figures below are reproduced verbatim from those tables.
-- Where a course has no published fee in the source, fee is left NULL
-- rather than invented.

insert into courses (slug, name, exam_type, duration, mode, medium, fee, description, content, category, display_order, is_active) values

($q$upsc-foundation$q$,
 $q$UPSC Foundation Course (18 Months)$q$,
 $q$UPSC$q$,
 $q$18 Months$q$,
 $q$Offline (Lucknow) + Online Access$q$,
 $q$Hindi & English$q$,
 $q$Rs. 92,000 (OTP: Rs. 82,000) — "IAS Foundation Course (Full Package)" tier, per Fee Details table$q$,
 $q$The flagship 18-month UPSC Foundation Course integrates Prelims and Mains preparation for IAS/IPS/IFS aspirants, delivered offline at the Gomti Nagar, Lucknow centre with online access, under the mentorship of S.B. Shukla Sir and a team of UPSC experts.$q$,
 $q$Course Overview (Batch Details page): Duration 18 Months; Daily Guidance 2.5 Hours (Monday to Saturday); Mode of Learning: Offline (Lucknow) + Online Access; Mentorship: S.B. Shukla Sir & Team of UPSC Experts; Instruction Medium: Hindi & English. Includes daily classroom lectures covering the complete syllabus from basic to advanced level, PYQ discussion, integrated Prelims + Mains preparation, printed subject-wise books and class handouts, detailed GS notes, a monthly Current Affairs magazine (Hindi & English), and an Essay framework with Ethics case studies.

Fee (Fee Details page): "IAS Foundation Course (Full Package)" — Fee Rs. 92,000, One-Time-Payment Rs. 82,000, Duration stated as 14 Months. Instalment plan: Rs. 32,000 (1st) + Rs. 30,000 (2nd) + Rs. 30,000 (3rd) = Rs. 92,000 total.

Note on source discrepancy: the Batch Details page states an 18-Month duration for the UPSC Foundation Course, while the Fee Details page lists the "IAS Foundation Course (Full Package)" fee tier (same Rs. 92,000 / Rs. 82,000 OTP figures) against a stated 14-Month duration. Both figures are reproduced here exactly as published on the source site rather than reconciled. All fees are inclusive of 18% GST per the site's fee notes; duration is subject to change per institute policy.$q$,
 $q$upsc-foundation$q$, 1, true),

($q$upsc-advance-foundation$q$,
 $q$IAS Advance Foundation Course$q$,
 $q$UPSC$q$,
 $q$22 Months$q$,
 $q$Offline (Lucknow) + Online$q$,
 $q$Hindi & English$q$,
 $q$Rs. 1,05,000 (OTP: Rs. 95,000)$q$,
 $q$An extended 22-month advance foundation track for UPSC aspirants who want additional runway for concept-building ahead of the integrated Prelims and Mains preparation cycle.$q$,
 $q$Per the Fee Details fee table: "IAS Advance Foundation Course" — Fee Rs. 1,05,000, One-Time-Payment Rs. 95,000, Duration 22 Months. Instalment plan: Rs. 40,000 (1st) + Rs. 35,000 (2nd) + Rs. 30,000 (3rd) = Rs. 1,05,000 total.

Listed as an available Online course on the Online Batches page ("IAS Advance Foundation Course", Exam Category: UPSC Civil Services). All fees are inclusive of 18% GST per the site's fee notes; duration/fees subject to change per institute policy.$q$,
 $q$upsc-foundation$q$, 2, true),

($q$ba-to-bureaucracy$q$,
 $q$BA to Bureaucracy (3-Year Integrated Foundation Program)$q$,
 $q$UPSC$q$,
 $q$3 Years$q$,
 NULL,
 NULL,
 $q$Rs. 1,42,000 (OTP: Rs. 1,27,800)$q$,
 $q$A 3-year integrated foundation program combining undergraduate study with UPSC preparation, aimed at early-stage aspirants targeting the UPSC 2027 / 2028 attempts.$q$,
 $q$Per the Fee Details fee table: "BA to Bureaucracy (Degree with UPSC)" — Fee Rs. 1,42,000, One-Time-Payment Rs. 1,27,800, Duration 3 Years. Instalment plan (labelled "नव बैच" in the source table): Rs. 50,000 (1st) + Rs. 50,000 (2nd) + Rs. 42,000 (3rd) = Rs. 1,42,000 total.

Referenced on the Interview Guidance Program page's admissions table as a "3-Year Integrated Foundation Program" targeting UPSC 2027 / 2028 attempts, alongside a note that early-bird discounts are available for this batch (contact the institute for details). All fees are inclusive of 18% GST per the site's fee notes.$q$,
 $q$integrated-program$q$, 3, true),

($q$uppcs-foundation$q$,
 $q$UPPCS Foundation Course (12 Months)$q$,
 $q$UPPCS$q$,
 $q$12 Months$q$,
 $q$Offline (Lucknow – Gomti Nagar) + Online (Live & Recorded)$q$,
 $q$Hindi & English$q$,
 $q$Rs. 49,000 (One-Time Special Fee: Rs. 45,000, All Inclusive)$q$,
 $q$A 12-month integrated Prelims + Mains General Studies Foundation Course for UPPCS aspirants, covering History, Geography, Polity, Economy, Environment, Science & Technology and Current Affairs with UP-specific focus, delivered offline in Lucknow and online.$q$,
 $q$Course Overview (Batch Details page, UPPCS block): Duration 12 Months; Daily Guidance 2.5 Hours (Monday to Saturday); Mode of Learning: Offline (Lucknow) + Online Access; Mentorship: S.B. Shukla Sir & Team of UPPCS Experts (the separate Foundation Batch 2027 Hindi Medium page credits mentorship instead to "Saket Sir" — both names reproduced as published on the source site); Instruction Medium: Hindi & English.

Subject coverage (UPPCS – Foundation Course 10-11 Months page): History (Ancient, Medieval, Modern + Uttar Pradesh Special), Geography (Physical, Indian & World), Polity (Indian Constitution, Governance & Political System), Economy (Basic Concepts, Indian Economy, Budget & Economic Survey), Environment (Ecology, Biodiversity, Climate Change & Current Issues), Science & Technology (General Science, Latest Developments & Applications), Current Affairs (National, International & Uttar Pradesh Specific) — all delivered in Offline Classroom mode.

Fee (Fee Details / Foundation Batch 2027 Hindi Medium pages): "UPPCS Foundation Course (Full Package)" — Rs. 49,000, One-Time Special Fee Rs. 45,000 (All Inclusive), Duration 12 Months. Instalment plan: Rs. 20,000 (1st) + Rs. 15,000 (2nd) + Rs. 14,000 (3rd) = Rs. 49,000 total.

Related standalone fee tiers also published for narrower packages: "UPPCS (GS Foundation Only)" Rs. 35,000 (OTP Rs. 30,000, 11 Months); "UPPCS (GS + CSAT)" Rs. 45,000 (OTP Rs. 40,000, 12 Months). EMI options are available; fees inclusive of 18% GST; duration/fees subject to change per institute policy.$q$,
 $q$uppcs-foundation$q$, 4, true),

($q$uppcs-advance-foundation$q$,
 $q$UPPCS Advance Foundation Course$q$,
 $q$UPPCS$q$,
 $q$22 Months$q$,
 $q$Offline (Lucknow) + Online$q$,
 $q$Hindi & English$q$,
 $q$Rs. 90,000 (One-Time Special Fee: Rs. 80,000)$q$,
 $q$An extended 22-month advance foundation track for UPPCS aspirants wanting deeper coverage before the integrated Prelims and Mains preparation cycle.$q$,
 $q$Per the Foundation Batch 2027 (Hindi Medium) and Fee Details pages: "UPPCS Advance Foundation Course" — Original Fee Rs. 90,000, One-Time Special Fee Rs. 80,000, Duration 22 Months. Instalment plan ("UPPCS Advance Foundation Batch (10+2)"): Rs. 30,000 + Rs. 30,000 + Rs. 30,000 = Rs. 90,000 total.

Listed as an available Online course on the Online Batches page ("UPPCS Advance Foundation Course", Exam Category: State PCS (UPPCS)). EMI options are available; fees inclusive of 18% GST; duration/fees subject to change per institute policy.$q$,
 $q$uppcs-foundation$q$, 5, true),

($q$uppcs-mains-enrichment-program-2026$q$,
 $q$UPPCS Mains Enrichment Program 2026$q$,
 $q$UPPCS$q$,
 $q$Feb 2026 – Jul 2026 (46-test schedule)$q$,
 $q$Online Live Classes & Hybrid Support (Online and Offline)$q$,
 $q$Hindi & English$q$,
 NULL,
 $q$A comprehensive Mains answer-writing and test-series program for UPPCS aspirants running 02 February 2026 to 02 July 2026, with 46 sectional, full-length and essay tests, 48-hour evaluation turnaround, and special focus on GS Paper 5 & 6 (UP-specific content).$q$,
 $q$Programme dates: 02 February 2026 to 02 July 2026, 46 tests total (sectional tests, full-length GS Papers 1-6, and 3 Essay tests), with answer copies evaluated within 48 hours.

Key features: elaborate model answers for each test; dedicated Ethics case-study and theory coverage for GS Paper 4; full-length tests replicating the real UPPCS Mains exam pattern; detailed performance analysis; regular discussion/doubt-solving review sessions; special coverage for GS Paper 5 & 6 (UP-specific content); available in both Online and Offline formats.

Test schedule highlights: sectional tests cover Indian Society, India After Independence, World History, Modern History (1707-1905 and 1905-1947), Art & Culture, Geomorphology, Climatology + Hydrosphere, Indian Geography, Resources (World + India), Indian Polity (x2), Governance, Social Justice, International Relations, Indian Economy (x2), Internal Security + Disaster Management, Environment & Ecology, Science & Technology, Ethics & Integrity (x2), Case Studies (x2), and UP Special GS Paper 5 / UP Special GS Paper 6 (x3 each); full-length tests cover GS Papers 1 through 6 (each run twice across the schedule) plus 3 Essay tests.

Outcomes emphasised: structured answer-writing skills, conceptual clarity, time management, measurable score improvement, exam readiness, essay mastery, ethics preparation, and a UPPCS-specific edge via command over GS Paper 5 & 6.

No standalone fee for this specific program was published in the source fee tables — contact CSMP IAS, +91 8887039761, for current pricing.$q$,
 $q$mains-enrichment$q$, 6, true),

($q$assured-prelims-programme-uppcs-2026$q$,
 $q$Assured Prelims Programme – UPPCS 2026$q$,
 $q$UPPCS$q$,
 NULL,
 $q$Online Live Classes & Hybrid Support$q$,
 $q$Hindi & English$q$,
 NULL,
 $q$A phase-wise UPPCS Prelims preparation programme (GS Paper-I + CSAT) under the mentorship of Dr. S.B. Shukla Sir, combining concept building, PYQ analysis, MCQ practice, a 28-test series, and a structured last-60-days revision plan, targeting UPPCS Prelims 2026 (expected December).$q$,
 $q$Programme structure:

Phase 1 – Foundation Stage covering GS Paper-I subjects: History (Ancient & Medieval selective, Modern India, Freedom Struggle with UP focus), Geography (Physical, Indian, Uttar Pradesh), Polity (Constitution, Fundamental Rights, DPSP, Panchayati Raj with UP focus), Economy (Basic Concepts, Budget, Economic Survey, UP Economy), Environment (Ecology, Biodiversity, Climate Change, Conventions), Science & Tech (Basic Science, Space, Defence, IT), Current Affairs (National + International + UP Special).

Phase 2 – CSAT Preparation (parallel phase): Comprehension (Hindi + English), Logical Reasoning & Decision Making, Quantitative Aptitude (Class 10 level), Data Interpretation; strategy of daily 1-hour practice on weak areas.

Phase 3 – Advanced Practice & PYQ Analysis: 10-15 years PYQ analysis (UPPCS + UPSC), topic-wise MCQ practice, concept strengthening, with special focus on UP-specific questions, current-affairs-based MCQs, and static + dynamic integration.

Phase 4 – Test Series: 28 tests total (13 GS Sectional, 5 CSAT Sectional, 10 Full Length), with accuracy analysis, weak-area identification, and time-management improvement.

Phase 5 – Revision Master Plan (last 60 days): short-notes revision, important one-liners, mock + PYQ revision, and must-revise topics (Government Schemes Central + UP, Reports & Indices, Environment Conventions, Important Polity Articles, Modern History Events).

Selection strategy: 80-20 rule (20% topics = 80% questions); focus subjects Polity, History, Economy, Geography, Science, Current Affairs; attempt strategy 90-100 questions; target accuracy 70%+; ideal daily study plan of 6 hours (GS Static 3-4 hrs, Current Affairs 1 hr, CSAT 1 hr, MCQ Practice 1 hr).

Programme USP: daily study schedule, topic-wise value-added notes, daily MCQ practice, weekly revision tests, monthly current-affairs compilation, UP special modules, and a CSAT crash course.

No standalone fee for this specific program was published in the source fee tables — contact CSMP IAS, +91 8887039761, for current pricing.$q$,
 $q$prelims-program$q$, 7, true),

($q$72nd-bpsc-test-series-2026$q$,
 $q$72nd BPSC Comprehensive Test Series 2026$q$,
 $q$BPSC$q$,
 $q$Mar 2026 – Jul 2026 (18-test schedule)$q$,
 $q$Online Live Classes & Hybrid Support (Online and Offline)$q$,
 $q$Hindi & English$q$,
 NULL,
 $q$An 18-test comprehensive Prelims test series for the BPSC 72nd examination (8 sectional + 10 full-length tests), run on real OMR sheets with all-India ranking, starting 9 March 2026.$q$,
 $q$Batch begins 9th March 2026. Test Series Structure: 18 Tests total — 8 Sectional Tests (History, Geography, Economy, Science, Polity, and Bihar Special) and 10 Full-Length Tests (FLT) covering the entire General Studies syllabus. Current affairs coverage spans October 2025 to June 2026.

Full schedule: 72BPSC-S01 (09 Mar 2026, Ancient & Medieval History) through 72BPSC-S08 (27 Apr 2026, Current Affairs Special), then 72BPSC-F01 (04 May 2026) through 72BPSC-F10 (06 Jul 2026, cumulative Oct 2025 - Jun 2026 current affairs coverage).

Syllabus coverage: General Science, History of India, Indian National Movement, Geography (Indian & World), Indian Polity & Economy, Post-Independence Economy, Indian Agriculture & Natural Resources, General Mental Ability, and Bihar Special Focus (History, Geography, Polity, Economy).

Key features: expert faculty with deep BPSC-pattern understanding, OMR-based realistic practice tests, detailed solutions for every question, all-India ranking benchmarking, and CSMP IAS app support for tests/results/study material.

No standalone fee for this specific program was published in the source fee tables — contact CSMP IAS, +91 8887039761, for current pricing.$q$,
 $q$test-series$q$, 8, true),

($q$72th-bpsc-integrated-mentorship-2026$q$,
 $q$72th BPSC Integrated Mentorship – 2026$q$,
 $q$BPSC$q$,
 $q$22 Feb 2026 – BPSC Mains (3 phases)$q$,
 $q$Online Live Classes & Hybrid Support (Online / Offline)$q$,
 $q$Hindi & English$q$,
 $q$Online Mentorship: Rs. 3,900/-; Offline Mentorship (Without Library): Rs. 8,000/-; Mains Mentorship with Test Series (Offline / Hybrid): Rs. 3,500/-$q$,
 $q$A three-phase integrated mentorship program under S.B. Shukla Sir for long-time BPSC aspirants, combining 20 Prelims + 20 Mains tests, 500+ PYQ-based practice questions, and 72-hour answer-writing evaluation, starting 22 February 2026.$q$,
 $q$Program phases: Phase I (Pre-Prelims, Feb 2026 – Apr 2026); Phase II (During Prelims, Apr 2026 – Jul 2026); Phase III (Mains Focus, Aug 2026 until BPSC Mains Exam).

Key features & deliverables: Integrated Test Series of 20 Prelims + 20 Mains (GS, Essay, Hindi) tests; 500+ questions with detailed PYQ analysis; 72-hour answer-writing evaluation; one-to-one personalized mentorship with feedback; an 11-week Prelims + 9-week Mains structured plan.

9-week mentorship schedule: Week 1 Modern History (1707-1905); Week 2 Modern History (1905-1947); Week 3 Art & Culture; Week 4 Indian Polity; Week 5 Indian Economy; Week 6 Indian Geography + Agriculture; Week 7 Science & Technology; Week 8 International Relations + National Issues; Week 9 Data Interpretation (DI) — each week carries a Bihar Special integration/focus angle and is delivered Online / Offline.

Course fees: Mentorship Program (Without Library), Offline, Rs. 8,000/-; Mentorship Course, Online, Rs. 3,900/-; Mains Mentorship with Test Series, Offline / Hybrid, Rs. 3,500/-.

Exclusive offers: 30% discount for IAS/BPSC interview candidates; 20% discount for IAS/BPSC Mains-appeared candidates or existing CSMP students.$q$,
 $q$mentorship$q$, 9, true),

($q$interview-guidance-program$q$,
 $q$Interview Guidance Program (IGP)$q$,
 NULL,
 NULL,
 $q$Online Live Classes & Hybrid Support (Offline / Online)$q$,
 $q$Hindi & English$q$,
 NULL,
 $q$A personality-test preparation program under Dr. S.B. Shukla Sir for UPSC/UPPCS Mains-cleared candidates, combining personalized DAF analysis, one-on-one mentorship, mock interview panels with retired bureaucrats, and video feedback analysis.$q$,
 $q$Core features (Feature / Description & Impact / Delivery Mode): Personalized DAF Analysis — comprehensive scanning of the Detailed Application Form to identify high-probability questions based on the candidate's profile (Offline / Online); One-on-One Mentorship — exclusive sessions with Dr. S.B. Shukla Sir to refine communication, attitude and analytical thinking (Offline / Online); Expert Mock Panels — simulated interviews with retired bureaucrats and subject-matter experts (Offline / Online); Video Feedback Analysis — recorded mock sessions with detailed review of body language, tone and logical consistency (Offline); Psychological Conditioning — workshops to manage stress and build confidence under pressure (Offline / Online); Current Affairs Integration — analysis of national/international issues from an administrative perspective (Online / Offline); Bureaucratic Etiquette Training — non-verbal cues, posture, eye contact, professional attire (Offline); Hobby & Interest Polishing — articulating interests and extra-curricular activities (Online / Offline).

Personality Refining module focuses on four pillars: Communication & Clarity of Expression, Body Language & Non-Verbal Cues, Emotional Intelligence & Stress Management, and Administrative Attitude & Ethics.

Who should attend: candidates who have cleared UPSC/UPPCS Mains, aspirants facing hesitation in public speaking or formal interviews, students looking to improve their rank through a higher interview score, and early starters aiming to build a professional persona from day one.

No standalone fee for this program was published in the source; contact CSMP IAS, +91 8887039761, for current pricing.$q$,
 $q$interview-guidance$q$, 10, true),

($q$online-batches$q$,
 $q$Online Batches (UPSC & State PCS)$q$,
 NULL,
 NULL,
 $q$Online (Live Interactive Classes + Recorded Video Access)$q$,
 $q$Hindi & English$q$,
 NULL,
 $q$A hybrid-capable online delivery option covering the full CSMP IAS course catalogue for UPSC Civil Services and State PCS (UPPCS) aspirants nationwide, with live interactive classes, recorded lectures, digital study material, and one-to-one mentorship.$q$,
 $q$Courses offered online, by exam category:

UPSC Civil Services — IAS Foundation Course (GS + CSAT + Current Affairs), IAS Advance Foundation Course, IAS GS Prelims Course, IAS GS + CSAT Prelims Course, IAS GS Mains Course, Ethics & Essay Writing Program.

State PCS (UPPCS) — UPPCS Foundation Course (Full Package), UPPCS Advance Foundation Course, UPPCS GS Prelims Course, UPPCS GS + CSAT Prelims Course, UPPCS GS Mains Course.

Special Programs — Optional Subject Online Coaching, NCERT Foundation Course, Essay Writing & Answer Writing Program, CSAT Dedicated Course.

Test Series & Mentorship — Prelims Test Series, Mains Answer Writing Program, Personal Mentorship Program.

Admission details: batches start 02 Feb 2026 at CSMP IAS Lucknow, offered as Online Live Classes, Hybrid (Online + Offline Support), or Recorded + Live Doubt Sessions; a laptop/smartphone with internet is required.

Fees for each underlying course follow the same Fee Details pricing tables as the equivalent offline programs (see the respective UPSC/UPPCS Foundation, Prelims, Mains, and Optional Subject course rows in this catalogue) — no separate "online-only" price list was published on the source site.$q$,
 $q$online$q$, 11, true),

($q$optional-subjects$q$,
 $q$UPSC Optional Subjects Coaching$q$,
 $q$UPSC$q$,
 $q$3–4 Months$q$,
 $q$Online / Offline$q$,
 $q$Hindi & English$q$,
 $q$Rs. 30,000 (OTP: Rs. 27,000) — generic "Optional Subject" line item, per Fee Details (IAS Fee Structure)$q$,
 $q$Subject-specialist coaching for the single UPSC Mains optional paper (500 marks), covering syllabus mapping, answer-writing practice, an optional-specific test series, and one-to-one counseling to help aspirants choose and prepare their optional.$q$,
 $q$UPSC offers 48 optional subjects (25 core/non-literature + 23 literature); candidates choose one, regardless of graduation background.

Optional courses offered at CSMP IAS (Optional Subject / Course Name / Mode): Sociology — Sociology Optional Full Course (UPSC Mains), Online / Offline; Public Administration — Public Administration Optional Full Course, Online / Offline; Geography — Geography Optional Full Course, Online / Offline; Political Science & IR — PSIR Optional Full Course, Online / Offline; History — History Optional Full Course, Online / Offline; Anthropology — Anthropology Optional Full Course, Online / Offline; Law — Law Optional Course (UPSC Mains), Online; Psychology — Psychology Optional Course, Online; Economics — Economics Optional Course, Online; Agriculture — Agriculture Optional Course, Online.

Subjects with high GS syllabus overlap highlighted by CSMP IAS: Public Administration (GS Paper II), Sociology (GS Paper I, Essay, Ethics), History (Prelims, GS Paper I), Geography (Prelims, GS Paper I), Political Science & IR (Prelims, GS Paper II), Law (Prelims, GS Paper II).

Detailed optional syllabus (Subject / Paper I / Paper II) published for: History (Ancient & Medieval India, Archaeology, World History / Modern Indian History, Post-Independence Consolidation); Geography (Geomorphology, Climatology, Oceanography, Human Geography Models / Indian Geography); Sociology (Sociological Thinkers, Stratification, Research Methods / Indian Society Structure, Caste System, Social Changes in India); Political Science (PSIR) (Political Theory, Western & Indian Political Thought, Indian Govt & Politics / Comparative Politics, International Relations, India's Foreign Policy); Public Administration (Admin Theory, Thinkers, Organizations, Accountability, Administrative Law / Indian Administration); Hindi Literature (History of Hindi Language & Literature / Detailed Study of Texts).

Fee: the Fee Details "Optional Subject" line item lists Rs. 30,000 (One-Time-Payment Rs. 27,000), Duration 3-4 Months, under the IAS Fee Structure — the same generic line is used here as the optional-subject fee reference since no subject-wise fee breakdown was published on the source site.

An Optional Subject Test Series (topic-wise and full-length tests, detailed evaluation with mentor remarks, model answers) and free downloadable UPSC syllabus PDFs (Prelims, Mains, and Optional Subjects) are also offered.$q$,
 $q$optional-subjects$q$, 12, true),

-- Seeded from a brochure PDF the user uploaded directly (bilingual Hindi/English,
-- translated to English here) -- see scripts/seed-test-series.sql for the
-- matching per-track test_series rows (with the brochure attached as file_url).
($q$uppcs-test-series-2026$q$,
 $q$UP-PCS Test Series 2026$q$,
 $q$UPPCS$q$,
 $q$July - November 2026 (76 tests total across Prelims + Mains)$q$,
 $q$Online Live Classes & Offline Guidance Center$q$,
 $q$Hindi & English$q$,
 $q$Prelims: Rs. 3,999 | Mains: Rs. 10,000 (Offline) / Rs. 6,999 (Online)$q$,
 $q$A combined UP-PCS Test Series 2026 covering both Prelims (28 tests: 13 sectional + 5 CSAT + 10 full-length, starting 7 July 2026) and Mains (48 tests: 29 sectional + 2 Hindi + 5 Essay + 12 full-length, starting 5 July 2026), with weekly feedback classes, full GS + CSAT syllabus coverage, and detailed solutions with every test. Available in Hindi and English.$q$,
 $q$UP-PCS Test Series 2026

Two integrated tracks, available in both Hindi and English:
- CSMP-P-2026 (Prelims): 28 Tests -- 13 Sectional + 5 CSAT + 10 Full Length. Starts 7 July 2026. Fee: Rs. 3,999/-.
- CSMP-M-2026 (Mains): 48 Tests -- 29 Sectional + 2 Hindi + 5 Essay + 12 Full Length. Starts 5 July 2026. Fee: Rs. 10,000/- (Offline) or Rs. 6,999/- (Online).

Features:
- Detailed explanatory solutions and evaluation with every test.
- Weekly Sunday feedback classes, available online and offline.
- Complete GS and CSAT coverage.
- Online doubt-solving with subject specialists.
- Based on the latest exam pattern and syllabus.

Prelims Schedule (CSMP-P-2601 to 2628, GS + CSAT sectional tests followed by combined full-length tests):
1. CSMP-P-2601 - 05/07/2026 - Indian Polity (CA: Asia Map)
2. CSMP-P-2602 - 12/07/2026 - Indian Polity (State Legislature) (CA: June 2026)
3. CSMP-P-2603 - 19/07/2026 - Reasoning (CSAT)
4. CSMP-P-2604 - 26/07/2026 - Ancient History, Art & Culture (CA: Europe Map)
5. CSMP-P-2605 - 02/08/2026 - Medieval History, Art & Culture (CA: Feb 2026)
6. CSMP-P-2606 - 09/08/2026 - Modern History (CA: Africa)
7. CSMP-P-2607 - 16/08/2026 - Indian Freedom Struggle (CA: March 2026)
8. CSMP-P-2608 - 23/08/2026 - Maths (CSAT)
9. CSMP-P-2609 - 30/08/2026 - World Geography (CA: April 2026)
10. CSMP-P-2610 - 06/09/2026 - Indian Geography (CA: North America Map)
11. CSMP-P-2611 - 13/09/2026 - Communication (CSAT)
12. CSMP-P-2612 - 20/09/2026 - Basic Science & Technology (CA: South America)
13. CSMP-P-2613 - 27/09/2026 - Life Science + Biotechnology (CA: May-June 2026)
14. CSMP-P-2614 - 04/10/2026 - Environment & Ecology (CA: Australia Map)
15. CSMP-P-2615 - 11/10/2026 - Hindi + English
16. CSMP-P-2616 - 18/10/2026 - Economics + Budget (National + UP Budget) (CA: July 2026)
17. CSMP-P-2617 - 25/10/2026 - Forest Policy + Census + International Institutions + 5-Month Current Issues + UP (CA: Aug-Sept-Oct 2026)
18. CSMP-P-2618 - 01/11/2026 - English (CSAT)
19. CSMP-P-2619 & 20 - 05/11/2026 - General Studies + CSAT
20. CSMP-P-2621 & 22 - 13/11/2026 - General Studies + CSAT
21. CSMP-P-2623 & 24 - 18/11/2026 - General Studies + CSAT
22. CSMP-P-2625 & 26 - 22/11/2026 - General Studies + CSAT
23. CSMP-P-2627 & 28 - 29/11/2026 - General Studies + CSAT

Prelims Syllabus:

Paper I -- General Studies I:
- Current events of national and international importance: candidates are expected to have knowledge of contemporary events of national and international significance.
- History of India and the Indian National Movement: under history, special attention should be paid to a broad understanding of the social, economic, and political aspects of Indian history. On the Indian National Movement, candidates are expected to have a general understanding of the nature and character of the freedom struggle and the circumstances surrounding the attainment of independence.
- Geography of India and the World: physical, social, and economic geography -- for World Geography only a general awareness of the subject will be tested; for the Geography of India, questions will relate to physical, social, and economic geography.
- Indian Polity and Governance -- Constitution, political system, Panchayati Raj, public policy, rights issues, etc.: questions will test knowledge of the country's political system including Panchayati Raj, the broad features of India's economic policy, and knowledge of Indian culture.
- Economic and Social Development -- sustainable development, poverty, inclusive demographics, social-sector initiatives, etc.: candidates will be tested on general awareness of economic development and its issues in relation to society.
- General issues on environmental ecology, biodiversity, and climate change: this topic does not require subject specialisation -- only general awareness is expected.
- General Science: questions on General Science will be based on everyday observation and experience, of the kind expected of any well-educated person who has not made a special study of any scientific discipline.
Note: candidates are expected to have general awareness of the above topics with special reference to Uttar Pradesh.

Paper II -- CSAT:
- Comprehension
- Interpersonal skills, including communication skills
- Logical reasoning and analytical ability
- Decision-making and problem-solving
- General mental ability
- Basic numeracy (Class X level) -- arithmetic, algebra, and statistics
- General English (Class X level)
- General Hindi (Class X level)

Basic Numeracy (Class X level) topics:
- Arithmetic: number systems (natural, integer, rational-irrational and real numbers; divisors and prime factorisation of whole numbers, LCM and HCF and their relationships), averages, ratio and proportion, percentage, profit and loss, interest (simple and compound), time and work, time and distance.
- Algebra: factorisation of polynomials, HCF of polynomials and their relationships, remainder theorem, simultaneous linear equations, quadratic equations; (i) set theory (ii) sets, subsets, proper subsets, operations between sets (union, intersection, symmetric difference), Venn diagrams.
- Geometry: construction and properties of triangles, rectangles, squares, trapeziums and circles along with related theorems on perimeter and area; volume and surface area of spheres, right circular cylinders, right circular cones, and hemispheres.
- Statistics: collection of data, classification of data, frequency, frequency distribution, tabulation, cumulative frequency, representation of data, bar charts, pie charts, frequency polygons, cumulative frequency polygons.

General English (Class X level): Comprehension, Active and Passive Voice, Parts of Speech, Transformation of Sentences, Direct and Indirect Speech, Punctuation and Spelling, Word Meanings, Vocabulary & Usage, Idioms and Phrases, Fill in the Blanks.

General Hindi (Class X level) topics: Hindi alphabet and punctuation marks, verbs, word formation and sentence formation and meaning, words with multiple meanings, word forms, antonyms, sandhi and samas (conjunctions and compounds), synonyms, idioms and proverbs, tatsam/tadbhav/deshaj/foreign vocabulary, spelling, comprehension, common errors in Hindi usage, and the major dialects of Uttar Pradesh.

Fee Structure:
- Prelims: Rs. 3,999/-
- Mains: Rs. 10,000/- (Offline) / Rs. 6,999/- (Online)

Enrollment & payment: pay via www.csmpias.com (Net Banking / Debit / Credit Card / UPI), by NEFT or cash deposit to the CSMP IAS HDFC account (email info@csmpias.com for account details), or in person at the offline guidance center by card/cheque/DD. For queries call +91 8887039761 or email info@csmpias.com.

Terms & Conditions: All fees are non-refundable and the course is non-transferable to another person. The course is valid till Exam 2026. Each program is linked to a fixed mobile number on the CSMPIAS account -- sharing of any program is not allowed; candidates found sharing may have their access terminated without refund, and CSMPIAS may pursue legal action against those found sharing or selling content. CSMPIAS reserves full rights to close admissions per capacity and to amend the schedule in case of any exigencies.

Contact: contact@csmpias.com | +91 8887039761 | www.csmpias.com | 3/186, Vivek Khand 3, Gomti Nagar, Lucknow - 226010$q$,
 $q$test-series$q$, 17, true),

-- Seeded from a WhatsApp/Instagram-style promo caption the user pasted directly
-- (Hindi, translated to English here). cover_image_url is set by a follow-up
-- update below, once the user pushed public/uppcs-crash-course-2026-cover.jpeg
-- to main (see components/courses/course-detail.tsx, which renders
-- course.cover_image_url when present).
($q$uppcs-crash-course-2026$q$,
 $q$UPPCS Crash Course 2026 (Prelims)$q$,
 $q$UPPCS$q$,
 $q$130 Days$q$,
 $q$Online$q$,
 $q$Hindi & English$q$,
 $q$Rs. 12,000/- + GST (Discounted: Rs. 6,200/- + GST)$q$,
 $q$A targeted UPPCS Prelims crash course for 2026 covering GS + CSAT, with 400+ hours of classes, a 130-day dedicated Quick Revision Programme (QRP), 28 tests, and a free mentorship program. Registrations open 19-30 July 2026; batch starts 1 August 2026.$q$,
 $q$Hi, UPPCS Aspirants 2026!

Targeted UPPCS Prelims Batch 2026 -- "UPPCS Crash Course" -- GS + CSAT

Registration Start Date: 19 July
Registration Last Date: 30 July
Course Fee: Rs. 12,000/- + GST (Online)
Discounted Course Fee: Rs. 6,200/- + GST (Online)

UPPCS Prelims Programme - 2026
Batch Start: 1 August
Batch Mode: Online
Medium: Hindi & English

Course Includes:
- 400+ hours of classes
- 130 days of dedicated QRP (Quick Revision Programme) + comprehensive classes (General Studies & CSAT)
- CSAT classes
- Extensive syllabus coverage
- Total tests: 28 (General Studies papers: 18 + CSAT: 10)
- Subject-expert faculty
- Regular class tests
- Study material
- Full-length mock tests
- Free Mentorship Program - 2026

For details visit www.csmpias.com or call +91 8887039761.$q$,
 $q$prelims-program$q$, 18, true),

($q$upsc-integrated-mentorship-2027$q$,
 $q$UPSC Integrated Mentorship Programme – 2027$q$,
 $q$UPSC$q$,
 $q$3 Phases · 68 Tests (Pre-Prelims, During Prelims, Post-Prelims Mains)$q$,
 $q$Online & Offline (Hybrid Support)$q$,
 $q$Hindi & English$q$,
 $q$Online: Rs. 10,000/-; Offline: Rs. 15,000/-$q$,
 $q$A three-phase UPSC Integrated Mentorship Programme covering the complete Prelims and Mains syllabus through 68 tests, personalized mentorship, and structured answer-writing practice under CSMP IAS faculty, starting 3 October 2025.$q$,
 $q$# UPSC Integrated Mentorship Programme – 2027

A structured, mentor-led programme built to cover the complete Prelims and Mains syllabus in a compact timeframe, guiding aspirants step by step toward becoming officers with CSMP IAS.

## Course at a Glance

```box
Total Tests: 68
Fee (Online): Rs. 10,000/-
Fee (Offline): Rs. 15,000/-
Start Date: 3 October 2025
Mode: Online & Offline
Medium: Hindi & English
```

## Why Most Students Fail Prelims

- Wrong strategy and inadequate preparation
- Reliance on incorrect or scattered study material
- Poor time management and exam-day stress
- Weak grasp of basic concepts
- Negative marking caught out by guesswork instead of informed attempts
- Lack of consistent, focused practice
- Not covering every topic and sub-topic required for Prelims
- Confusing motivation with preparation, and reading with studying
- Working hard in the wrong direction, and not learning from mistakes

## Programme Highlights

- Guidance from experienced mentors
- Personalized, one-to-one attention
- Full test series with regular evaluation and feedback
- Curated study material
- Time-management coaching
- Motivation and confidence-building sessions
- Online support so students can study from anywhere
- Individual goal-setting for every aspirant

## Programme Structure — 3 Phases

| Phase | Stage | Focus |
|---|---|---|
| Phase I | Before Prelims | Foundation building & complete syllabus coverage |
| Phase II | During Prelims | Intensive test practice & revision |
| Phase III | After Prelims | Free Mains test series |

## What's Included

- Mentorship sessions with experienced faculty
- Answer-writing sessions
- Essay test series
- Full-length General Studies test series
- Value-added study material
- Doubt-clearing sessions
- Subject-specific discussion sessions
- Detailed test discussion and feedback

> For more information, contact CSMP IAS at +91 8887039761 or visit www.csmpias.com.
$q$,
 $q$mentorship$q$, 24, true),
($q$up-pcsj-apo$q$,
 $q$UP PCS-J & APO – Judicial Services Programme$q$,
 $q$PCS-J$q$,
 $q$4–14 Months (Batch-wise)$q$,
 $q$Offline (Gomtinagar, Lucknow) + Online Live$q$,
 $q$Hindi & English$q$,
 $q$Rs. 7,500 – Rs. 69,000 (Batch-wise)$q$,
 $q$CSMP IAS's UP PCS-J & APO Judicial Services Programme in Lucknow — coaching for Civil Judge (Junior Division) and Assistant Prosecution Officer with daily answer writing, bare-Act classes and exam-pattern test series, offline and online, in Hindi and English.$q$,
 $q$# UP PCS-J & APO – Judicial Services Programme

Structured classroom coaching in Lucknow for UPPSC's judicial services exams — **Civil Judge (Junior Division)** via PCS-J, and **Assistant Prosecution Officer (APO)** — built around the UPPSC exam pattern: law subjects taught from the bare Acts, daily answer writing, judgment drafting and regular tests, in Hindi and English.

```box
Prelims Marks: 450
Mains Marks: 1000
Interview Marks: 100
Mains Papers: 6
Fee Range: Rs. 7,500 – Rs. 69,000
Mode: Offline & Online
```

## Why CSMP IAS

- Complete coverage of the UPPSC PCS-J syllabus: GK, Law, English and Hindi
- Daily answer writing with individual feedback for every Mains paper
- Prelims and Mains test series in exact exam pattern, with model answers
- Printed notes, bare-Act reading sessions and current-affairs updates
- Flexible batches: offline in Gomtinagar, or live online

---

## UP PCS-J (Civil Judge, Junior Division)

### Exam at a Glance

**Stage 1 — Preliminary (Screening)**

| Paper | Subject | Marks | Time |
|---|---|---|---|
| I | General Knowledge | 150 | 2 hrs |
| II | Law | 300 | 2 hrs |

Objective type, with negative marking (1/3 mark per wrong answer). Prelims marks are used only for screening.

**Stage 2 — Mains (Descriptive, Counted for Merit)**

| Paper | Subject | Marks | Time |
|---|---|---|---|
| I | General Knowledge | 200 | 3 hrs |
| II | English Language | 100 | 3 hrs |
| III | Hindi Language | 100 | 3 hrs |
| IV | Law-I (Substantive Law) | 200 | 3 hrs |
| V | Law-II (Procedure and Evidence) | 200 | 3 hrs |
| VI | Law-III (Penal, Revenue and Local Laws) | 200 | 3 hrs |

**Stage 3 — Interview**

> Viva-voce of 100 marks. Final merit = Mains (1000) + Interview (100).

### Basic Eligibility

- Indian citizen with an LL.B. degree from a recognised university
- Eligible for enrolment as an Advocate, with working knowledge of Hindi and English
- Age limit and other conditions as per the latest UPPSC notification

### Syllabus Covered

**Prelims Paper I: GK**
- Indian history and culture
- Geography of India
- Indian polity
- Indian economy
- Science and technology
- Environmental issues
- Current national and international affairs

**Prelims Paper II: Law**
- Jurisprudence
- International organisations and human rights
- Indian Constitution
- Transfer of Property Act
- Law of Contract
- Evidence Act, IPC, CPC, CrPC

**Mains Paper I: GK**
- History and culture of India
- Geography, polity and economy
- National issues and social relevance
- India and the world, international institutions
- Science and technology developments

**Mains Papers II and III: English and Hindi**
- Essay writing
- Précis writing
- Translation (Hindi to English, English to Hindi)

**Mains Paper IV: Law-I**
- Law of contracts and partnership
- Easements and torts
- Transfer of property, equity principles
- Trusts and specific relief
- Hindu law and Mohammedan law
- Constitutional law

**Mains Paper V: Law-II**
- Law of evidence
- Code of Criminal Procedure
- Code of Civil Procedure
- Principles of pleading
- Judgment writing

**Mains Paper VI: Law-III**
- Indian Penal Code
- UP land revenue and tenancy laws
- UP municipal, panchayat and urban laws
- Rules under these Acts

The syllabus follows the UPPSC PCS-J scheme. The exact list of State Acts and the new criminal codes (BNS, BNSS, BSA) is taught as per the latest UPPSC notification.

### PCS-J Batches and Fees

| Programme | Duration | Fee |
|---|---|---|
| Foundation Batch (Prelims + Mains) | 14 Months · Offline, Gomtinagar | Rs. 69,000 |
| Online Live Batch | 10 Months · Live + Recordings | Rs. 28,000 |
| Prelims Sprint | 4 Months · Offline | Rs. 18,000 |
| Mains Answer Writing + Judgment Drafting | 4 Months · Offline | Rs. 16,000 |
| Test Series Only (Prelims 12 + Mains 8) | Offline / Online | Rs. 7,500 |

**What every batch includes**
- Printed notes and bare-Act guidance
- Answer-writing and judgment-drafting practice
- Weekly tests with discussion
- Current-affairs updates
- Doubt-clearing sessions
- Mentorship and interview guidance

---

## UP APO Programme (Assistant Prosecution Officer)

### Exam at a Glance

**Prelims (Screening)**

| Part | Marks |
|---|---|
| General Knowledge | 50 |
| Law | 100 |
| Total (Objective, 2 hrs) | 150 |

Negative marking applies (1/3 mark per wrong answer). Prelims marks are used only for screening.

**Mains (Descriptive, 500 Marks)**

| Paper | Marks |
|---|---|
| I: General Hindi | 100 |
| II: General English | 50 |
| III: General Knowledge | 50 |
| IV: Criminal Law & Procedure | 100 |
| V: Sakshya Adhiniyam (Evidence) | 100 |
| VI: Anya Adhiniyam (Other Laws) | 100 |

> Interview: 50 marks. Final merit = Mains + Interview.

### Syllabus Covered

**Prelims: GK**
- General science
- Indian history and National Movement
- Indian polity and economy
- Current national and international affairs

**Prelims: Law**
- Indian Penal Code (IPC/BNS)
- Code of Criminal Procedure (CrPC/BNSS)
- Indian Evidence Act (BSA)
- UP Police Act and Regulations
- Constitution of India

**Mains: Hindi, English and GK**
- General Hindi and General English (high-school standard)
- General Knowledge: culture, polity, economy, science, current affairs

**Mains: Law Papers**
- Criminal Law and Procedure: BNS, BNSS, UP Police Act and allied laws
- Sakshya Adhiniyam: Bharatiya Sakshya Adhiniyam, 2023
- Anya Adhiniyam: special and local laws such as the Arms Act, POCSO Act and UAPA

### APO Batches and Fees

| Programme | Duration | Fee |
|---|---|---|
| APO Law — complete law coverage for Prelims & Mains (BNS, BNSS, Sakshya Adhiniyam, UP Police Act), with answer writing and tests | 12 Months · Hindi & English | Rs. 29,999 |
| APO + GS — everything in APO Law, plus General Studies (GK) for Prelims and Mains | 12 Months · Hindi & English | Rs. 39,999 |

Exam pattern as per public sources; the final pattern and syllabus are as per the latest UPPSC notification.

---

## How to Enrol

- Call or message us on +91 8887039761 to book a free demo class and counselling session
- Choose your batch and medium (Hindi or English)
- Complete registration and pay the fee to confirm your seat

> Seats are limited per batch. For more information, contact CSMP IAS at +91 8887039761 or visit www.csmpias.com.
$q$,
 $q$judicial-services$q$, 25, true);

update courses set cover_image_url = $q$/uppcs-crash-course-2026-cover.jpeg$q$
where slug = $q$uppcs-crash-course-2026$q$;

-- Cover uploaded to Cloudinary (csmp-ias/courses folder) rather than a
-- static /public file, so a redeploy isn't needed to serve it.
update courses set
  cover_image_url = $q$https://res.cloudinary.com/t6nm5hzp/image/upload/v1790788056/csmp-ias/courses/pu3cpbk4cxinmdlewgjy.jpg$q$,
  cover_image_public_id = $q$csmp-ias/courses/pu3cpbk4cxinmdlewgjy$q$
where slug = $q$upsc-integrated-mentorship-2027$q$;

-- Cover uploaded to Cloudinary (csmp-ias/courses folder) rather than a
-- static /public file, so a redeploy isn't needed to serve it.
update courses set
  cover_image_url = $q$https://res.cloudinary.com/t6nm5hzp/image/upload/v1791791964/csmp-ias/courses/elx4eeh4kmmpsqhpygrk.jpg$q$,
  cover_image_public_id = $q$csmp-ias/courses/elx4eeh4kmmpsqhpygrk$q$
where slug = $q$up-pcsj-apo$q$;
