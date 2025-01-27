
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import schoolCalendar from '../../../database/Calendrier_Scolaire.json';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*'
};

export const GET: RequestHandler = async () => {
    return json(schoolCalendar, {
        headers: corsHeaders
    });
};

export const OPTIONS: RequestHandler = async () => {
    return new Response(null, {
        headers: corsHeaders
    });
};