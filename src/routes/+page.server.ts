import { redirect } from '@sveltejs/kit';

export const load = ({ url }) => {
    if (url.pathname === '/') {
        // Default redirect if no stored URL (server-side)
        return { redirect: true };
    }
    return {};
};