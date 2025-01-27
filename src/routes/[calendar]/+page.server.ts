import { error, redirect } from '@sveltejs/kit';

export function load({ params, url }) {
    const validCalendars = ['school', 'university', 'ofppt'];
    if (!validCalendars.includes(params.calendar)) {
        throw redirect(307, '/school?fl=all');
    }
    return {
        calendar: params.calendar
    };
}