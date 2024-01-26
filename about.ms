.\" **** Custom macro definitions *********************************
.\" * Super/subscript
.\" (https://lists.gnu.org/archive/html/groff/2012-07/msg00046.html)
.ds { \v'-0.3m'\\s[\\n[.s]*9u/12u]
.ds } \s0\v'0.3m'
.ds < \v'0.3m'\s[\\n[.s]*9u/12u]
.ds > \s0\v'-0.3m'
.\" * Horizontal line
.de HLINE
.LP
.ce
\l'20'
..
.\" **** Settings *************************************************
.\" text width
.nr LL 5.5i
.\" left margin
.nr PO 1.25i
.\" top margin
.nr HM 1.25i
.\" bottom margin
.nr FM 1.25i
.\" header/footer width
.nr LT \n[LL]
.\" point size
.nr PS 10p
.\" line height
.nr VS 12p
.\" font family: A, BM, H, HN, N, P, T, ZCM
.fam P
.\" paragraph indent
.nr PI 0m
.\" interparagraph space
.nr PD 0.4v
.\" footnote width
.nr FL \n[LL]
.\" footnote point size
.nr FPS (\n[PS] - 2000)
.\" color used for strikeout
.defcolor strikecolor rgb 0.7 0.7 0.7
.\" color for links (rgb)
.ds PDFHREF.COLOUR   0.35 0.00 0.60
.\" border for links (default none)
.ds PDFHREF.BORDER   0 0 0
.\" point size difference between heading levels
.nr PSINCR 1p
.\" heading level above which point size no longer changes
.nr GROWPS 2
.\" comment these out if you want a dot after section numbers:
.als SN SN-NO-DOT
.als SN-STYLE SN-NO-DOT
.\" page numbers in footer, centered
.rm CH
.ds CF %
.\" pdf outline fold level
.nr PDFOUTLINE.FOLDLEVEL 3
.\" start out in outline view
.pdfview /PageMode /UseOutlines
.\" ***************************************************************
.\" PDF metadata
.pdfinfo /Title "About the Homan Lab"
.pdfinfo /Author "homanlab"
.hy
.TL
About the Homan Lab
.AU
homanlab
.AU
.sp 0.5
.ft R
2019-09-29 Sun
.\" 1 column (use .2C for two column)
.1C
.LP
Located at the \c
.pdfhref W -D "https://www.pukzh.ch" -A "\c" \
 -- "University Hospital of Psychiatry"
\& in Zurich, the Homan Lab studies the origins and clinical
consequences of heterogeneity in psychotic disorders.
Interested in working with us?
Please start by \c
.pdfhref W -D "https://homanlab.github.io/blog/2019/10/20/applying" -A "\c" \
 -- "reading here"
\&.
.SH 2
Alumni
.pdfhref O 2 "Alumni"
.pdfhref M "alumni"
.IP \[bu] 3
Simon Fuchs.
Resident physician
.IP \[bu] 3
Marius Brandenberg, Master student
.IP \[bu] 3
Stephanie Homan, PhD.
Postdoc
.IP \[bu] 3
Alba Lopez, Research intern
.IP \[bu] 3
Ueli Stocker, Research intern
.SH 1
External collaborators
.pdfhref O 1 "External collaborators"
.pdfhref M "external-collaborators"
.SH 2
Current:
.pdfhref O 2 "Current:"
.pdfhref M "current"
.IP \[bu] 3
Iris Sommer, MD, PhD.
UMC Groningen
.IP \[bu] 3
Brita Elvevåg, PhD.
UiT Tromsø
.IP \[bu] 3
Wolfram Hinzen, PhD.
UPF Barcelona
.IP \[bu] 3
Stefan Kaiser, MD.
University of Geneva
.IP \[bu] 3
Matthias Kirschner, MD.
University of Geneva
.IP \[bu] 3
Emre Bora, MD.
Dokuz Eylul University, Turkey
.IP \[bu] 3
Filip Spaniel, MD.
National Institute of Mental Health, Czech Republic
.IP \[bu] 3
David Cotter, MD and Mary Cannon, MD.
Royal College of Surgeons, Ireland
.IP \[bu] 3
\c
.pdfhref W -D "https://www.psychology.uzh.ch/en/areas/nec/plafor/team/Head-of-Discipline/Langer.html" -A "\c" \
 -- "Nicolas Langer"
\&, PhD.
University of Zurich
.IP \[bu] 3
\c
.pdfhref W -D "https://feinstein.northwell.edu/institutes-researchers/our-researchers/john-m-kane-md" -A "\c" \
 -- "John Kane"
\&, MD.
Zucker Hillside Hospital, NY
.IP \[bu] 3
\c
.pdfhref W -D "http://www.psykl.mri.tum.de/evidenzbasierte-psychiatrie" -A "\c" \
 -- "Stefan Leucht"
\&, MD.
TU Munich
.SH 2
Former:
.pdfhref O 2 "Former:"
.pdfhref M "former"
.IP \[bu] 3
\c
.pdfhref W -D "https://medicine.yale.edu/lab/decision/" -A "\c" \
 -- "Ifat Levy"
\&, PhD.
Yale University
.IP \[bu] 3
\c
.pdfhref W -D "https://medicine.yale.edu/lab/harpazrotem/" -A "\c" \
 -- "Ilan Harpaz-Rotem"
\&, PhD.
Yale University
.IP \[bu] 3
\c
.pdfhref W -D "https://people.wgtn.ac.nz/david.podhortzercarmel" -A "\c" \
 -- "David Carmel"
\&, PhD.
University of Wellington
.IP \[bu] 3
\c
.pdfhref W -D "http://labs.neuroscience.mssm.edu/project/schiller-lab/" -A "\c" \
 -- "Daniela Schiller"
\&, PhD.
Mount Sinai, NY
.IP \[bu] 3
\c
.pdfhref W -D "https://nordic.cochrane.org/our-centre/nordic-cochrane-centre/our-team" -A "\c" \
 -- "Klaus Munkholm"
\&, MD, DMSc.
Nordic Cochrane Centre, Denmark
.IP \[bu] 3
\c
.pdfhref W -D "https://www3.unifr.ch/psycho/de/departement/mitarbeitende/dept/people/6316/9b1e3" -A "\c" \
 -- "Chantal Martin Soelch"
\&, PhD.
University of Fribourg, CH
.IP \[bu] 3
\c
.pdfhref W -D "https://www.rehazentrum-valens.ch/ueber-uns/organisation/" -A "\c" \
 -- "Peter Brugger"
\&, PhD.
University of Zurich
.pdfsync
