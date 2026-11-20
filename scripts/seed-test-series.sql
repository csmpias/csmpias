-- Seeded from a UP-PCS Test Series 2026 brochure PDF the user uploaded directly
-- (bilingual Hindi/English), stored at public/uppcs-test-series-2026.pdf since
-- no Cloudinary upload credentials were available in this session. See
-- scripts/seed-courses.sql (slug uppcs-test-series-2026) for the matching
-- public course listing with the full syllabus/schedule text.

insert into test_series (name, exam_type, start_date, subject, description, file_url)
values
($q$UP-PCS Prelims Test Series 2026$q$,
 $q$UPPCS Prelims$q$,
 '2026-07-07',
 $q$GS + CSAT (28 Tests: 13 Sectional + 5 CSAT + 10 Full Length)$q$,
 $q$CSMP-P-2026: 28-test Prelims series covering GS and CSAT, available in both Hindi and English. Sectional tests run weekly from 5 July 2026 through November 2026 (test codes CSMP-P-2601 to 2628), covering Polity, History (Ancient/Medieval/Modern), Freedom Struggle, Geography, Science & Technology, Life Science, Environment & Ecology, Economics + Budget, Hindi + English, and full CSAT modules (Reasoning, Maths, Communication, English), each paired with rolling current-affairs coverage (monthly compilations plus world-map topics). The final weeks combine into General Studies + CSAT full-length tests. Features: detailed solutions and evaluation with every test, weekly Sunday feedback classes (online and offline), and doubt-solving with subject experts. Fee: Rs. 3,999/-. Enrollment via www.csmpias.com, NEFT/cash deposit, or the offline guidance center. Contact +91 8887039761 / contact@csmpias.com. Full syllabus, week-by-week schedule, and terms are in the attached brochure.$q$,
 $q$/uppcs-test-series-2026.pdf$q$
),
($q$UP-PCS Mains Test Series 2026$q$,
 $q$UPPCS Mains$q$,
 '2026-07-05',
 $q$GS + Essay + Hindi (48 Tests: 29 Sectional + 2 Hindi + 5 Essay + 12 Full Length)$q$,
 $q$CSMP-M-2026: 48-test Mains series -- 29 sectional tests, 2 Hindi-medium tests, 5 Essay tests, and 12 full-length tests -- available in both Hindi and English, starting 5 July 2026. Same features as the Prelims track: detailed explanatory solutions and evaluation with every test, weekly Sunday feedback classes (online and offline), and online doubt-solving with subject specialists, based on the latest UPPCS Mains pattern and syllabus. Fee: Rs. 10,000/- (Offline) or Rs. 6,999/- (Online). Enrollment via www.csmpias.com, NEFT/cash deposit, or the offline guidance center. Contact +91 8887039761 / contact@csmpias.com. Full terms and the combined Prelims + Mains brochure are attached.$q$,
 $q$/uppcs-test-series-2026.pdf$q$
);
