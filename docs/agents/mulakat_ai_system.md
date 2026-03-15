# AI SEO SYSTEM — mülakat.com

## Overview

mülakat.com uses an AI driven SEO system to generate scalable career related pages.

The system relies on structured keyword data and multiple AI agents working together.

The platform focuses on data driven pages rather than traditional blog articles.

The goal is to build a scalable career data platform.

------------------------------------------------------------

# Agent Architecture

The system is powered by five AI agents:

1. Keyword Universe Agent
2. Page Generator Agent
3. Data Agent
4. Content Agent
5. Cleanup Agent

These agents work together to generate, enrich, and maintain SEO pages.

------------------------------------------------------------

# 1. Keyword Universe Agent

## Role

The Keyword Universe Agent generates the structured keyword database for the platform.

This agent does NOT write articles.

It only generates structured keyword data used by other agents.

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

## Rules

The agent must follow these rules:

- avoid random blog topics
- avoid lifestyle content
- avoid motivational content
- avoid opinion content
- focus only on search intent driven pages
- avoid keyword cannibalization

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

The Page Generator Agent converts keywords into SEO page structures.

Input:
keyword_database_v1.json

Output:
SEO page routes.

Example:

keyword:
trendyol yazılımcı maaşı

generated page:
/sirket/trendyol-yazilimci-maasi

------------------------------------------------------------

# 3. Data Agent

## Role

Collect structured data required for SEO pages.

Examples:

salary ranges
company benefits
job market data
interview questions

The data agent prepares structured data for the content agent.

------------------------------------------------------------

# 4. Content Agent

## Role

Generate the structured content of each page.

Each page should include:

introduction
tables
interview questions
salary ranges
tips

Content must be structured and optimized for SEO.

------------------------------------------------------------

# 5. Cleanup Agent

## Role

Remove or redirect low performance pages.

Rules:

pages older than 3 months
clicks = 0
impressions < 100

Actions:

delete page
or redirect to parent category

This protects crawl budget and SEO quality.

------------------------------------------------------------

# Execution Pipeline

Keyword Universe Agent
↓
Page Generator Agent
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

# System Growth Plan

Phase 1

generate 120 keywords
generate first 100 pages

Phase 2

expand keyword database
generate 1000 pages

Phase 3

full programmatic SEO
5000+ pages
