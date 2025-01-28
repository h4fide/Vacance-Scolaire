import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*'
};

export const GET: RequestHandler = async () => {
    return json({
        message: 'Vacances Scolaires 2024-2025',
        endpoints: {
            general: {
                all: '/api/general',
                next: '/api/general/next',
                upcoming: '/api/general/upcoming'
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