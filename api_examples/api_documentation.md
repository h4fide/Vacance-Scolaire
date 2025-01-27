# API Documentation

Base URL: https://vacance-scolaire.pages.dev/api

## /api

**Method:** GET

**Description:** Get API information and available endpoints

**Example Request:**
```http
GET https://vacance-scolaire.pages.dev/api
```

**Example Response:**
```json
{
  "message": "Welcome to the Vacances Scolaires API",
  "endpoints": {
    "general": {
      "all": "/api/general",
      "next": "/api/general/next",
      "upcoming": "/api/general/upcoming"
    },
    "university": {
      "all": "/api/university",
      "next": "/api/university/next",
      "upcoming": "/api/university/upcoming"
    },
    "ofppt": {
      "all": "/api/ofppt",
      "next": "/api/ofppt/next",
      "upcoming": "/api/ofppt/upcoming"
    }
  }
}
```

## /api/general

**Method:** GET

**Description:** Get all general calendar events

**Example Request:**
```http
GET https://vacance-scolaire.pages.dev/api/general
```

**Example Response:**
```json
[
  {
    "_id": 1,
    "eventname": "عيد المولد النبوي",
    "start_date": "2024-09-04",
    "end_date": "2024-09-05",
    "days_number": 2
  },
  {
    "_id": 2,
    "eventname": "العطلة النصفية الأولى",
    "start_date": "2024-10-20",
    "end_date": "2024-10-27",
    "days_number": 8
  },
  {
    "_id": 3,
    "eventname": "المسيرة الخضراء",
    "start_date": "2024-11-06",
    "end_date": "2024-11-06",
    "days_number": 1
  },
  {
    "_id": 4,
    "eventname": "عيد الاستقلال",
    "start_date": "2024-11-18",
    "end_date": "2024-11-18",
    "days_number": 1
  },
  {
    "_id": 5,
    "eventname": "العطلة النصفية الثانية",
    "start_date": "2024-12-08",
    "end_date": "2024-12-15",
    "days_number": 8
  },
  {
    "_id": 6,
    "eventname": "رأس السنة الميلادية",
    "start_date": "2025-01-01",
    "end_date": "2025-01-01",
    "days_number": 1
  },
  {
    "_id": 7,
    "eventname": "ذكرى تقديم وثيقة الاستقلال",
    "start_date": "2025-01-11",
    "end_date": "2025-01-11",
    "days_number": 1
  },
  {
    "_id": 8,
    "eventname": "رأس السنة الأمازيغية",
    "start_date": "2025-01-14",
    "end_date": "2025-01-14",
    "days_number": 1
  },
  {
    "_id": 9,
    "eventname": "العطلة البينية",
    "start_date": "2025-01-26",
    "end_date": "2025-02-02",
    "days_number": 8
  },
  {
    "_id": 10,
    "eventname": "العطلة النصفية الثالثة",
    "start_date": "2025-03-16",
    "end_date": "2025-03-23",
    "days_number": 8
  },
  {
    "_id": 11,
    "eventname": "عيد الفطر",
    "start_date": "2025-04-27",
    "end_date": "2025-04-30",
    "days_number": "3-4"
  },
  {
    "_id": 12,
    "eventname": "عيد العمال",
    "start_date": "2025-05-01",
    "end_date": "2025-05-01",
    "days_number": 1
  },
  {
    "_id": 13,
    "eventname": "العطلة النصفية الرابعة",
    "start_date": "2025-05-04",
    "end_date": "2025-05-11",
    "days_number": 8
  },
  {
    "_id": 14,
    "eventname": "عيد الأضحى",
    "start_date": "2025-06-06",
    "end_date": "2025-06-08",
    "days_number": 3
  },
  {
    "_id": 15,
    "eventname": "فاتح محرم",
    "start_date": "2025-07-07",
    "end_date": "2025-07-07",
    "days_number": 1
  }
]
```

## /api/general/next

**Method:** GET

**Description:** Get the next upcoming general event

**Example Request:**
```http
GET https://vacance-scolaire.pages.dev/api/general/next
```

**Example Response:**
```json
{
  "_id": 10,
  "eventname": "العطلة النصفية الثالثة",
  "start_date": "2025-03-16",
  "end_date": "2025-03-23",
  "days_number": 8
}
```

## /api/general/upcoming

**Method:** GET

**Description:** Get all upcoming general events

**Example Request:**
```http
GET https://vacance-scolaire.pages.dev/api/general/upcoming
```

**Example Response:**
```json
[
  {
    "_id": 10,
    "eventname": "العطلة النصفية الثالثة",
    "start_date": "2025-03-16",
    "end_date": "2025-03-23",
    "days_number": 8
  },
  {
    "_id": 11,
    "eventname": "عيد الفطر",
    "start_date": "2025-04-27",
    "end_date": "2025-04-30",
    "days_number": "3-4"
  },
  {
    "_id": 12,
    "eventname": "عيد العمال",
    "start_date": "2025-05-01",
    "end_date": "2025-05-01",
    "days_number": 1
  },
  {
    "_id": 13,
    "eventname": "العطلة النصفية الرابعة",
    "start_date": "2025-05-04",
    "end_date": "2025-05-11",
    "days_number": 8
  },
  {
    "_id": 14,
    "eventname": "عيد الأضحى",
    "start_date": "2025-06-06",
    "end_date": "2025-06-08",
    "days_number": 3
  },
  {
    "_id": 15,
    "eventname": "فاتح محرم",
    "start_date": "2025-07-07",
    "end_date": "2025-07-07",
    "days_number": 1
  }
]
```

## /api/university

**Method:** GET

**Description:** Get all university calendar events

**Example Request:**
```http
GET https://vacance-scolaire.pages.dev/api/university
```

**Example Response:**
```json
[
  {
    "_id": 1,
    "eventname": "عيد المولد النبوي",
    "start_date": "2024-09-04",
    "end_date": "2024-09-05",
    "days_number": 2
  },
  {
    "_id": 2,
    "eventname": "ذكرى المسيرة الخضراء",
    "start_date": "2024-11-06",
    "end_date": "2024-11-06",
    "days_number": 1
  },
  {
    "_id": 3,
    "eventname": "عيد الاستقلال",
    "start_date": "2024-11-18",
    "end_date": "2024-11-18",
    "days_number": 1
  },
  {
    "_id": 4,
    "eventname": "رأس السنة الميلادية",
    "start_date": "2025-01-01",
    "end_date": "2025-01-01",
    "days_number": 1
  },
  {
    "_id": 5,
    "eventname": "ذكرى تقديم وثيقة المطالبة بالاستقلال",
    "start_date": "2025-01-11",
    "end_date": "2025-01-11",
    "days_number": 1
  },
  {
    "_id": 6,
    "eventname": "رأس السنة الأمازيغية",
    "start_date": "2025-01-14",
    "end_date": "2025-01-14",
    "days_number": 1
  },
  {
    "_id": 7,
    "eventname": "عطلة نهاية الفصل الأول",
    "start_date": "2025-01-26",
    "end_date": "2025-02-02",
    "days_number": 8
  },
  {
    "_id": 8,
    "eventname": "عيد الفطر",
    "start_date": "2025-04-27",
    "end_date": "2025-04-30",
    "days_number": "3 أو 4"
  },
  {
    "_id": 9,
    "eventname": "عيد الشغل",
    "start_date": "2025-05-01",
    "end_date": "2025-05-01",
    "days_number": 1
  },
  {
    "_id": 10,
    "eventname": "عطلة منتصف الفصل الثاني",
    "start_date": "2025-05-04",
    "end_date": "2025-05-11",
    "days_number": 8
  },
  {
    "_id": 11,
    "eventname": "عيد الأضحى",
    "start_date": "2025-06-06",
    "end_date": "2025-06-08",
    "days_number": 3
  },
  {
    "_id": 12,
    "eventname": "رأس السنة الهجرية",
    "start_date": "2025-07-07",
    "end_date": "2025-07-07",
    "days_number": 1
  }
]
```

## /api/university/next

**Method:** GET

**Description:** Get the next upcoming university event

**Example Request:**
```http
GET https://vacance-scolaire.pages.dev/api/university/next
```

**Example Response:**
```json
{
  "_id": 8,
  "eventname": "عيد الفطر",
  "start_date": "2025-04-27",
  "end_date": "2025-04-30",
  "days_number": "3 أو 4"
}
```

## /api/university/upcoming

**Method:** GET

**Description:** Get all upcoming university events

**Example Request:**
```http
GET https://vacance-scolaire.pages.dev/api/university/upcoming
```

**Example Response:**
```json
[
  {
    "_id": 8,
    "eventname": "عيد الفطر",
    "start_date": "2025-04-27",
    "end_date": "2025-04-30",
    "days_number": "3 أو 4"
  },
  {
    "_id": 9,
    "eventname": "عيد الشغل",
    "start_date": "2025-05-01",
    "end_date": "2025-05-01",
    "days_number": 1
  },
  {
    "_id": 10,
    "eventname": "عطلة منتصف الفصل الثاني",
    "start_date": "2025-05-04",
    "end_date": "2025-05-11",
    "days_number": 8
  },
  {
    "_id": 11,
    "eventname": "عيد الأضحى",
    "start_date": "2025-06-06",
    "end_date": "2025-06-08",
    "days_number": 3
  },
  {
    "_id": 12,
    "eventname": "رأس السنة الهجرية",
    "start_date": "2025-07-07",
    "end_date": "2025-07-07",
    "days_number": 1
  }
]
```

## /api/ofppt

**Method:** GET

**Description:** Get all OFPPT calendar events

**Example Request:**
```http
GET https://vacance-scolaire.pages.dev/api/ofppt
```

**Example Response:**
```json
[
  {
    "id": "1",
    "event_name": "عيد المولد النبوي الشريف",
    "start_date": "2024-09-25",
    "end_date": "2024-09-26",
    "days_number": 2
  },
  {
    "id": "2",
    "event_name": "ذكرى المسيرة الخضراء",
    "start_date": "2024-11-06",
    "end_date": "2024-11-06",
    "days_number": 1
  },
  {
    "id": "3",
    "event_name": "عيد الاستقلال",
    "start_date": "2024-11-18",
    "end_date": "2024-11-18",
    "days_number": 1
  },
  {
    "id": "4",
    "event_name": "عطلة الطور الأول",
    "start_date": "2024-12-08",
    "end_date": "2024-12-15",
    "days_number": 8
  },
  {
    "id": "5",
    "event_name": "فاتح يناير",
    "start_date": "2025-01-01",
    "end_date": "2025-01-01",
    "days_number": 1
  },
  {
    "id": "6",
    "event_name": "ذكرى تقديم وثيقة الاستقلال",
    "start_date": "2025-01-11",
    "end_date": "2025-01-11",
    "days_number": 1
  },
  {
    "id": "7",
    "event_name": "عطلة رأس السنة الأمازيغية",
    "start_date": "2025-01-14",
    "end_date": "2025-01-14",
    "days_number": 1
  },
  {
    "id": "8",
    "event_name": "عطلة منتصف السنة التكوينية",
    "start_date": "2025-01-26",
    "end_date": "2025-02-02",
    "days_number": 8
  },
  {
    "id": "9",
    "event_name": "عطلة الطور الثاني",
    "start_date": "2025-03-16",
    "end_date": "2025-03-23",
    "days_number": 8
  },
  {
    "id": "10",
    "event_name": "عيد الفطر",
    "start_date": "2025-03-29",
    "end_date": "2025-04-02",
    "days_number": 4
  },
  {
    "id": "11",
    "event_name": "عيد الشغل",
    "start_date": "2025-05-01",
    "end_date": "2025-05-01",
    "days_number": 1
  },
  {
    "id": "12",
    "event_name": "عطلة الطور الثالث",
    "start_date": "2025-05-04",
    "end_date": "2025-05-11",
    "days_number": 8
  },
  {
    "id": "13",
    "event_name": "عيد الأضحى",
    "start_date": "2025-06-06",
    "end_date": "2025-06-09",
    "days_number": 4
  },
  {
    "id": "14",
    "event_name": "فاتح محرم",
    "start_date": "2025-07-30",
    "end_date": "2025-07-30",
    "days_number": 1
  }
]
```

## /api/ofppt/next

**Method:** GET

**Description:** Get the next upcoming OFPPT event

**Example Request:**
```http
GET https://vacance-scolaire.pages.dev/api/ofppt/next
```

**Example Response:**
```json
{
  "id": "9",
  "event_name": "عطلة الطور الثاني",
  "start_date": "2025-03-16",
  "end_date": "2025-03-23",
  "days_number": 8
}
```

## /api/ofppt/upcoming

**Method:** GET

**Description:** Get all upcoming OFPPT events

**Example Request:**
```http
GET https://vacance-scolaire.pages.dev/api/ofppt/upcoming
```

**Example Response:**
```json
[
  {
    "id": "9",
    "event_name": "عطلة الطور الثاني",
    "start_date": "2025-03-16",
    "end_date": "2025-03-23",
    "days_number": 8
  },
  {
    "id": "10",
    "event_name": "عيد الفطر",
    "start_date": "2025-03-29",
    "end_date": "2025-04-02",
    "days_number": 4
  },
  {
    "id": "11",
    "event_name": "عيد الشغل",
    "start_date": "2025-05-01",
    "end_date": "2025-05-01",
    "days_number": 1
  },
  {
    "id": "12",
    "event_name": "عطلة الطور الثالث",
    "start_date": "2025-05-04",
    "end_date": "2025-05-11",
    "days_number": 8
  },
  {
    "id": "13",
    "event_name": "عيد الأضحى",
    "start_date": "2025-06-06",
    "end_date": "2025-06-09",
    "days_number": 4
  },
  {
    "id": "14",
    "event_name": "فاتح محرم",
    "start_date": "2025-07-30",
    "end_date": "2025-07-30",
    "days_number": 1
  }
]
```

