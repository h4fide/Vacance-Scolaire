
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import schoolCalendar from '../../../../database/Calendrier_Scolaire.json';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*'
};

export const GET: RequestHandler = async () => {
    const today = new Date();
    const nextEvent = schoolCalendar
        .filter(event => new Date(event.start_date) > today)
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())[0];

    return json(nextEvent || null, {
        headers: corsHeaders
    });
};

export const OPTIONS: RequestHandler = async () => {
    return new Response(null, {
        headers: corsHeaders
    });
};