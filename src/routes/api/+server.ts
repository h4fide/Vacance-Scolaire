import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import schoolCalendar from '../../database/Calendrier_Scolaire.json';
import universityCalendar from '../../database/Calendrier_Universitaire.json';
import ofpptCalendar from '../../database/Calendrier _OFPPT.json';

// CORS headers for all responses
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*'
};

export const GET: RequestHandler = async () => {
    return json({
        message: 'Welcome to the Vacances Scolaires API',
        endpoints: {
            school: {
                all: '/api/school',
                next: '/api/school/next',
                upcoming: '/api/school/upcoming'
            },
            university: {
                all: '/api/university',
                next: '/api/university/next',
                upcoming: '/api/university/upcoming'
            },
            ofppt: {
                all: '/api/ofppt',
                next: '/api/ofppt/next',
                upcoming: '/api/ofppt/upcoming'
            }
        }
    }, {
        headers: corsHeaders
    });
};

export const OPTIONS: RequestHandler = async () => {
    return new Response(null, {
        headers: corsHeaders
    });
};