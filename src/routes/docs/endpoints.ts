const baseUrl = 'https://vacance-scolaire.pages.dev/api';

export const endpoints = [
    {
        method: 'GET',
        path: '/api',
        description: 'Get API information and available endpoints',
        example: `${baseUrl}`,
        response: {
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
    },
    {
        method: 'GET',
        path: '/api/general',
        description: 'Get all general calendar events',
        example: `${baseUrl}/general`,
        response: [
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
                "eventname": "رأس السنة الميلادية",
                "start_date": "2025-01-01",
                "end_date": "2025-01-01",
                "days_number": 1
            },
            {
                "_id": 6,
                "eventname": "العطلة النصفية الثانية",
                "start_date": "2025-01-18",
                "end_date": "2025-01-25",
                "days_number": 8
            },
            {
                "_id": 7,
                "eventname": "عيد الشغل",
                "start_date": "2025-05-01",
                "end_date": "2025-05-01",
                "days_number": 1
            },
            {
                "_id": 8,
                "eventname": "عيد الفطر",
                "start_date": "2025-04-27",
                "end_date": "2025-04-30",
                "days_number": "3-4"
            },
            {
                "_id": 9,
                "eventname": "عيد الأضحى",
                "start_date": "2025-06-06",
                "end_date": "2025-06-07",
                "days_number": 2
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
                "eventname": "عيد الشغل",
                "start_date": "2025-05-01",
                "end_date": "2025-05-01",
                "days_number": 1
            },
            {
                "_id": 13,
                "eventname": "عيد الأضحى",
                "start_date": "2025-06-06",
                "end_date": "2025-06-07",
                "days_number": 2
            },
            {
                "_id": 14,
                "eventname": "رأس السنة الهجرية",
                "start_date": "2025-07-07",
                "end_date": "2025-07-07",
                "days_number": 1
            },
            {
                "_id": 15,
                "eventname": "فاتح محرم",
                "start_date": "2025-07-07",
                "end_date": "2025-07-07",
                "days_number": 1
            }
        ]
    },
    {
        method: 'GET',
        path: '/api/general/next',
        description: 'Get the next upcoming general event',
        example: `${baseUrl}/general/next`,
        response: {
            "_id": 10,
            "eventname": "العطلة النصفية الثالثة",
            "start_date": "2025-03-16",
            "end_date": "2025-03-23",
            "days_number": 8
        }
    },
    {
        method: 'GET',
        path: '/api/general/upcoming',
        description: 'Get all upcoming general events',
        example: `${baseUrl}/general/upcoming`,
        response: [
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
                "eventname": "عيد الشغل",
                "start_date": "2025-05-01",
                "end_date": "2025-05-01",
                "days_number": 1
            },
            {
                "_id": 13,
                "eventname": "عيد الأضحى",
                "start_date": "2025-06-06",
                "end_date": "2025-06-07",
                "days_number": 2
            },
            {
                "_id": 14,
                "eventname": "رأس السنة الهجرية",
                "start_date": "2025-07-07",
                "end_date": "2025-07-07",
                "days_number": 1
            },
            {
                "_id": 15,
                "eventname": "فاتح محرم",
                "start_date": "2025-07-07",
                "end_date": "2025-07-07",
                "days_number": 1
            }
        ]
    },
    {
        method: 'GET',
        path: '/api/university',
        description: 'Get all university calendar events',
        example: `${baseUrl}/university`,
        response: [
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
                "eventname": "العطلة النصفية الثانية",
                "start_date": "2025-01-18",
                "end_date": "2025-01-25",
                "days_number": 8
            },
            {
                "_id": 6,
                "eventname": "عيد الشغل",
                "start_date": "2025-05-01",
                "end_date": "2025-05-01",
                "days_number": 1
            },
            {
                "_id": 7,
                "eventname": "عيد الفطر",
                "start_date": "2025-04-27",
                "end_date": "2025-04-30",
                "days_number": "3-4"
            },
            {
                "_id": 8,
                "eventname": "عيد الأضحى",
                "start_date": "2025-06-06",
                "end_date": "2025-06-07",
                "days_number": 2
            },
            {
                "_id": 9,
                "eventname": "العطلة النصفية الثالثة",
                "start_date": "2025-03-16",
                "end_date": "2025-03-23",
                "days_number": 8
            },
            {
                "_id": 10,
                "eventname": "عيد الفطر",
                "start_date": "2025-04-27",
                "end_date": "2025-04-30",
                "days_number": "3-4"
            },
            {
                "_id": 11,
                "eventname": "عيد الشغل",
                "start_date": "2025-05-01",
                "end_date": "2025-05-01",
                "days_number": 1
            },
            {
                "_id": 12,
                "eventname": "رأس السنة الهجرية",
                "start_date": "2025-07-07",
                "end_date": "2025-07-07",
                "days_number": 1
            }
        ]
    },
    {
        method: 'GET',
        path: '/api/university/next',
        description: 'Get the next upcoming university event',
        example: `${baseUrl}/university/next`,
        response: {
            "_id": 8,
            "eventname": "عيد الفطر",
            "start_date": "2025-04-27",
            "end_date": "2025-04-30",
            "days_number": "3 أو 4"
        }
    },
    {
        method: 'GET',
        path: '/api/university/upcoming',
        description: 'Get all upcoming university events',
        example: `${baseUrl}/university/upcoming`,
        response: [
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
            }
        ]
    },
    {
        method: 'GET',
        path: '/api/ofppt',
        description: 'Get all OFPPT calendar events',
        example: `${baseUrl}/ofppt`,
        response: [
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
                "event_name": "رأس السنة الميلادية",
                "start_date": "2025-01-01",
                "end_date": "2025-01-01",
                "days_number": 1
            },
            {
                "id": "5",
                "event_name": "العطلة النصفية الثانية",
                "start_date": "2025-01-18",
                "end_date": "2025-01-25",
                "days_number": 8
            },
            {
                "id": "6",
                "event_name": "عيد الشغل",
                "start_date": "2025-05-01",
                "end_date": "2025-05-01",
                "days_number": 1
            },
            {
                "id": "7",
                "event_name": "عيد الفطر",
                "start_date": "2025-04-27",
                "end_date": "2025-04-30",
                "days_number": "3-4"
            },
            {
                "id": "8",
                "event_name": "عيد الأضحى",
                "start_date": "2025-06-06",
                "end_date": "2025-06-07",
                "days_number": 2
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
                "event_name": "عيد الأضحى",
                "start_date": "2025-06-06",
                "end_date": "2025-06-07",
                "days_number": 2
            },
            {
                "id": "13",
                "event_name": "رأس السنة الهجرية",
                "start_date": "2025-07-07",
                "end_date": "2025-07-07",
                "days_number": 1
            },
            {
                "id": "14",
                "event_name": "فاتح محرم",
                "start_date": "2025-07-30",
                "end_date": "2025-07-30",
                "days_number": 1
            }
        ]
    },
    {
        method: 'GET',
        path: '/api/ofppt/next',
        description: 'Get the next upcoming OFPPT event',
        example: `${baseUrl}/ofppt/next`,
        response: {
            "id": "9",
            "event_name": "عطلة الطور الثاني",
            "start_date": "2025-03-16",
            "end_date": "2025-03-23",
            "days_number": 8
        }
    },
    {
        method: 'GET',
        path: '/api/ofppt/upcoming',
        description: 'Get all upcoming OFPPT events',
        example: `${baseUrl}/ofppt/upcoming`,
        response: [
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
            }
        ]
    }
];