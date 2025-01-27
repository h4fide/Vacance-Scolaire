import { error, redirect } from '@sveltejs/kit';

export function load({ params, url }) {
    const validCalendars = ['general', 'university', 'ofppt'];
    if (!validCalendars.includes(params.calendar)) {
        throw redirect(307, '/general?fl=all');
    }
    return {
        calendar: params.calendar
    };
}