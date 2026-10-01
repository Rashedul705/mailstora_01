// What each non-admin role may change. Admins can do everything.
// Old tokens without a role are treated as admin (single-admin installs).
const ALLOW = {
    editor: [/^\/admin\/revisions/, /^\/page-edits/, /^\/seo\//,/^\/blog/, /^\/admin\/blog/, /^\/portfolio/, /^\/admin\/portfolio/, /^\/testimonials/, /^\/faq/, /^\/services/, /^\/content/, /^\/trust-logos/, /^\/partners/, /^\/file-manager/, /^\/auth\/(verify|change-password|logout)/],
    seo: [/^\/admin\/revisions/, /^\/seo\//, /^\/blog/, /^\/admin\/blog/, /^\/auth\/(verify|change-password|logout)/],
};

// Business data only admins may even read
const ADMIN_ONLY_READ = [/^\/customers/, /^\/orders/, /^\/inquiries/, /^\/quotes/, /^\/messages/, /^\/dashboard/, /^\/admin\/users/, /^\/admin\/activity/, /^\/admin\/site-settings\/revisions/];

module.exports = function roleCheck(req, res, next) {
    const role = req.admin?.role || 'admin';
    if (role === 'admin') return next();
    const read = req.method === 'GET' || req.method === 'HEAD';
    if (read && !ADMIN_ONLY_READ.some((re) => re.test(req.path))) return next();
    if (!read && (ALLOW[role] || []).some((re) => re.test(req.path))) return next();
    return res.status(403).json({ message: `Your role (${role}) cannot do this.` });
};
