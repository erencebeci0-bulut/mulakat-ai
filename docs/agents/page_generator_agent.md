## Page Type Rules

### 1. salary_page

Purpose:
A role-based or title-based salary page.

Examples:
- yazılım mühendisi maaşı
- data analyst maaşı
- product manager maaşı

This page type should later support these UI sections:
- page title
- salary overview summary
- salary range chart
- experience breakdown table
- benefits section
- FAQ section
- related links

Suggested component slots:
- SalaryRangeChart
- ExperienceSalaryTable
- BenefitsList
- SalaryFAQ

---

### 2. company_salary_page

Purpose:
A company plus role salary page.

Examples:
- Trendyol yazılımcı maaşı
- Amazon data analyst maaşı

This page type should later support:
- company-role title
- estimated salary summary
- experience-based salary table
- benefits and compensation notes
- company context snippet
- related profession links

Suggested component slots:
- CompanySalarySummary
- ExperienceSalaryTable
- BenefitsList
- RelatedRoleLinks

---

### 3. interview_category_page

Purpose:
An interview preparation page.

Examples:
- frontend developer mülakat soruları
- satış temsilcisi mülakat soruları

This page type should later support:
- page title
- interview simulator area
- grouped questions
- answer tips
- FAQ
- related interview links

Suggested component slots:
- InterviewSimulatorWidget
- QuestionList
- AnswerTips
- InterviewFAQ

Important:
This page type must be designed as an interactive preparation page, not as a generic article page.

---

### 4. company_page

Purpose:
A company intelligence page.

Examples:
- Trendyol
- Amazon Türkiye
- Garanti BBVA

This page type should later support:
- company overview
- sector info
- hiring process
- employee review summary
- role and salary links

Suggested component slots:
- CompanyStats
- HiringProcessTimeline
- AggregatedReviews
- RelatedSalaryLinks
- RelatedInterviewLinks

---

### 5. profession_page

Purpose:
A profession guide page.

Examples:
- yazılım mühendisi
- veri analisti
- İK uzmanı

This page type should later support:
- job description
- required skills
- career path
- salary snippet
- related interview links

Suggested component slots:
- JobDescription
- SkillMatrix
- CareerPath
- SalarySnippet

---

### 6. worklife_page

Purpose:
A work life regulation or employee rights page.

Examples:
- asgari ücret
- kıdem tazminatı
- işsizlik maaşı

This page type should later support:
- law or regulation summary
- updated value table
- calculation explanation
- FAQ
- related calculator links

Suggested component slots:
- RegulationSummary
- ValueTable
- FAQSection
- RelatedCalculatorLinks

---

### 7. calculator_page

Purpose:
A practical interactive calculator page.

Examples:
- net maaş hesaplama
- kıdem tazminatı hesaplama
- fazla mesai hesaplama

This page type should later support:
- calculator widget
- formula explanation
- input fields
- output card
- FAQ

Suggested component slots:
- CalculatorWidget
- FormulaExplanation
- FAQSection

---

## SEO Rules

Every generated page must contain:
- a unique title
- a unique meta description
- a clear H1
- logical H2 and H3 hierarchy
- internal links to related pages

The page must be structured as a data or tool page, not as a thin content article.

---

## Structured Data Rules

Each page should later support JSON-LD structured data.

Examples:
- salary pages: Dataset
- interview pages: FAQPage or QAPage
- company pages: Organization or BreadcrumbList
- calculator pages: FAQPage plus BreadcrumbList

---

## Internal Linking Rules

Each page must support future internal linking to:
- related salary pages
- related interview pages
- related company pages
- related profession pages
- related calculators

This is mandatory for topical authority and crawl depth optimization.

---

## Future Execution

This document defines how the Page Generator Agent should behave later.

At a future step, the agent will:
1. read docs/data/keyword_database_v1.json
2. map each keyword to a route
3. generate Next.js page skeletons
4. assign the correct page template
5. prepare scalable SEO-safe routes

---

## Final Goal

The Page Generator Agent must help build a scalable programmatic SEO platform for mülakat.com without triggering thin content or spam problems in Google.

---

## Page Type Rules

The `page_type` field determines which page template must be used.

The Page Generator Agent must map each keyword to one of the following page structures.

---

### salary_page

Purpose  
A role-based salary intelligence page.

Examples

- yazılım mühendisi maaşı
- veri analisti maaşı
- ürün yöneticisi maaşı

This page must later support the following UI sections:

- page title
- salary overview summary
- salary range visualization
- experience breakdown table
- benefits and compensation notes
- FAQ section
- related role links

Suggested component slots

SalaryRangeChart  
ExperienceSalaryTable  
BenefitsList  
SalaryFAQ  

---

### company_salary_page

Purpose  
A company + role salary intelligence page.

Examples

- Trendyol yazılımcı maaşı
- Amazon data analyst maaşı
- Garanti BBVA yazılım mühendisi maaşı

Required sections

- company role title
- estimated salary range
- experience-based salary table
- compensation notes
- company hiring context
- related profession links

Suggested component slots

CompanySalarySummary  
ExperienceSalaryTable  
BenefitsList  
RelatedRoleLinks  

---

### interview_category_page

Purpose  
An interview preparation hub page.

Examples

- frontend developer mülakat soruları
- satış temsilcisi mülakat soruları
- İK uzmanı mülakat soruları

Required sections

- page title
- interview simulator module
- categorized question list
- answer guidance
- frequently asked interview questions
- related interview links

Suggested component slots

InterviewSimulatorWidget  
QuestionList  
AnswerTips  
InterviewFAQ  

Important rule

This page must behave like an **interactive preparation tool**, not a generic article page.

---

### company_page

Purpose  
A company intelligence page.

Examples

- Trendyol
- Amazon Türkiye
- Garanti BBVA
- Microsoft Türkiye

Required sections

- company overview
- industry classification
- hiring process overview
- employee review summary
- related salary pages
- related interview pages

Suggested component slots

CompanyStats  
HiringProcessTimeline  
AggregatedReviews  
RelatedSalaryLinks  
RelatedInterviewLinks  

---

### profession_page

Purpose  
A profession information page.

Examples

- yazılım mühendisi
- veri analisti
- insan kaynakları uzmanı

Required sections

- job description
- required hard skills
- required soft skills
- career progression path
- salary preview
- related interview preparation pages

Suggested component slots

JobDescription  
SkillMatrix  
CareerPath  
SalarySnippet  

---

### worklife_page

Purpose  
A work life regulation or employment rights page.

Examples

- asgari ücret
- kıdem tazminatı
- ihbar tazminatı
- işsizlik maaşı

Required sections

- regulation summary
- updated legal values
- calculation explanation
- FAQ section
- related calculator tools

Suggested component slots

RegulationSummary  
ValueTable  
FAQSection  
RelatedCalculatorLinks  

---

### calculator_page

Purpose  
An interactive career or salary calculation tool.

Examples

- net maaş hesaplama
- kıdem tazminatı hesaplama
- fazla mesai hesaplama

Required sections

- calculator widget
- input fields
- calculation result card
- formula explanation
- FAQ section

Suggested component slots

CalculatorWidget  
FormulaExplanation  
FAQSection  

---

## SEO Rules

Every generated page must include:

- a unique title
- a unique meta description
- a clearly defined H1 heading
- logical H2 and H3 sections
- internal links to related pages

Keyword placement rules

- the main keyword must appear in the title
- the main keyword must appear in the H1
- the main keyword must appear naturally inside the description

The page must behave like a **data or tool page**, not like a thin blog post.

---

## Structured Data Support

Each page should support structured data markup using JSON-LD.

Examples

Salary pages  
Dataset schema

Interview pages  
FAQPage schema

Company pages  
Organization schema

Breadcrumb navigation  
BreadcrumbList schema

Structured data improves Google's understanding of the platform.

---

## Internal Linking Rules

Every generated page must support internal linking to:

- related salary pages
- related interview pages
- related company pages
- related profession pages
- related calculator pages

Internal linking improves

- crawl depth
- topical authority
- SEO ranking signals

---

## Future Execution Workflow

This document defines how the Page Generator Agent will behave later.

Future workflow

1. read docs/data/keyword_database_v1.json  
2. map each keyword to a route  
3. generate Next.js page skeletons  
4. assign the correct template  
5. prepare SEO-safe scalable routes  

---

## Final Goal

The Page Generator Agent exists to help build a scalable **programmatic SEO career platform**.

The system must grow to thousands of pages while remaining safe from Google's thin content penalties.
