
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import ofpptCalendar from '../../../database/Calendrier_OFPPT.json';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*'
};

export const GET: RequestHandler = async () => {
    return json(ofpptCalendar, {
        headers: corsHeaders
    });
};

export const OPTIONS: RequestHandler = async () => {
    return new Response(null, {
        headers: corsHeaders
    });
};