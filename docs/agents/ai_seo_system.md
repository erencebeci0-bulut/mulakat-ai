# AI SEO SYSTEM — mülakat.com

## Overview

mülakat.com is a programmatic SEO driven Career Intelligence Platform.

Instead of writing manual blog posts, the platform uses AI agents to generate scalable data-driven pages.

The system is designed to support thousands of SEO pages.

Initial target:
100 pages

Growth target:
1000 pages

Long term target:
5000+ pages

The system is powered by 5 AI agents.

------------------------------------------------------------

# Agent Architecture

The platform uses the following agents:

1. Keyword Universe Agent  
2. Page Generator Agent  
3. Data Agent  
4. Content Agent  
5. Cleanup Agent  

Each agent has a specific responsibility in the SEO pipeline.

------------------------------------------------------------

# 1. Keyword Universe Agent

## Role

The Keyword Universe Agent is responsible for generating the structured SEO keyword database.

It does NOT write content.

It only generates structured keyword data that other agents will use.

## Phase Targets

Test phase:
120 keywords

Expansion phase:
5000 keywords

## Keyword Categories

The agent must generate keywords for the following categories:

maaslar  
meslekler  
mulakat-sorulari  
sirketler  
is-hayati  
hesaplama-araclari  

## Critical Rules

The agent must:

- Avoid random blog topics
- Avoid lifestyle content
- Avoid opinion content
- Focus on search intent driven pages
- Avoid keyword cannibalization

## JSON Schema

Example structure:

```json
[
 {
  "keyword": "trendyol yazılımcı maaşı",
  "category": "maaslar",
  "url_slug": "/sirket/trendyol-yazilimci-maasi",
  "search_intent": "transactional/data",
  "page_type": "company_salary_page",
  "required_data_nodes": [
   "ortalama_maas",
   "yan_haklar",
   "deneyim_yili_tablosu"
  ]
 }
]
```

Output file:

docs/data/keyword_database_v1.json

------------------------------------------------------------

# 2. Page Generator Agent

## Role

This agent converts the keyword database into SEO page structures.

Input:
keyword_database.json

Output:
SEO page routes

Example:

keyword:

trendyol yazılımcı maaşı

generated page:

/sirket/trendyol-yazilimci-maasi

------------------------------------------------------------

# 3. Data Agent

## Role

Collect structured data required for pages.

Examples:

salary ranges  
company benefits  
job market data  
interview questions  

The data agent prepares raw data for the content agent.

------------------------------------------------------------

# 4. Content Agent

## Role

Generate the structured page content.

Each page must include:

introduction  
tables  
interview questions  
salary ranges  
tips  

Content must be structured and SEO optimized.

------------------------------------------------------------

# 5. Cleanup Agent

## Role

Remove or redirect low performance pages.

Rules:

pages older than 3 months  
clicks = 0  
impressions < 100  

Action:

delete page  
or redirect to parent category

This protects crawl budget and SEO quality.

------------------------------------------------------------

# Execution Pipeline

Keyword Agent
↓
Page Generator
↓
Data Agent
↓
Content Agent
↓
Deploy
↓
Traffic
↓
Cleanup Agent

------------------------------------------------------------

# Future Expansion

The system will scale from:

100 pages
to
5000+ pages

using programmatic SEO automation.
