# N8N Automation Webhook Payloads

This document defines the expected JSON payloads that Mülakat.com will send to our n8n automation webhooks. These structures are designed to be easily parsed and routed by n8n workflows for appending data to Notion, Google Sheets, or internal databases.

## 1. Salary Contribution Payload
**Endpoint:** `POST https://n8n.mulakatim.com/webhook/salary-submission`

```json
{
  "event_type": "salary_submission",
  "timestamp": "2026-03-15T14:30:00Z",
  "data": {
    "role": "Frontend Developer",
    "company": "Trendyol",             // Optional
    "experience_level": "Mid Level",  // Junior, Mid, Senior, Lead
    "years_of_experience": 3,
    "location": "Istanbul",
    "work_model": "Hybrid",           // Remote, Hybrid, On-site
    "net_salary_try": 65000,
    "benefits": ["Özel Sağlık", "Yemek Kartı", "Hisse Senedi"],
    "submission_source": "web_calculator_banner"
  },
  "metadata": {
    "user_agent": "Mozilla/5.0...",
    "session_id": "anon-123456"
  }
}
```

## 2. Interview Experience & Question Payload
**Endpoint:** `POST https://n8n.mulakatim.com/webhook/interview-submission`

```json
{
  "event_type": "interview_experience",
  "timestamp": "2026-03-15T15:45:00Z",
  "data": {
    "role": "Product Manager",
    "company": "Getir",
    "interview_date": "2026-02-10",
    "difficulty_rating": 8,           // 1 to 10
    "offer_received": true,
    "questions_asked": [
      {
        "type": "behavioral",
        "question": "Zaman kısıtlaması altında teknik ekinizle yaşadığınız bir anlaşmazlığı nasıl çözdünüz?"
      },
      {
        "type": "technical",
        "question": "Elinizde eksik veri varken yeni bir özelliğin başarı metriklerini nasıl tanımlarsınız?"
      }
    ],
    "general_advice": "Case study aşamasında varsayımlarınızı net bir şekilde belirtmeniz çok önemli."
  },
  "metadata": {
    "is_anonymous": true,
    "session_id": "anon-987654"
  }
}
```

## 3. General User Feedback / Bug Report
**Endpoint:** `POST https://n8n.mulakatim.com/webhook/user-feedback`

```json
{
  "event_type": "user_feedback",
  "timestamp": "2026-03-16T09:15:00Z",
  "data": {
    "category": "bug_report",         // bug_report, feature_request, general
    "message": "Maaş hesaplama aracında İzmir seçildiğinde deneyim yılı değişmiyor.",
    "page_url": "https://mülakat.com/maas-hesaplama"
  },
  "metadata": {
    "browser": "Chrome",
    "os": "MacOS",
    "user_email": "user@example.com"  // Optional
  }
}
```

## Workflow Routing Rules (n8n Setup)
1. **Switch Node:** Use the `event_type` field at the root level to route the incoming webhook to the correct processing logic.
2. **Data Cleaning:** Ensure `net_salary_try` is treated as a Number.
3. **Anonymization:** Do not store `session_id` or IP addresses in public-facing dashboards.
