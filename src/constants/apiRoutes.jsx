const BASE_URL = import.meta.env.VITE_BASE_URL;

const API_ROUTES = {
    REGISTER: '/register',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_OTP: '/verify-otp',

    GET_USER_MOODS: '/mood-log/user-moods',
    POST_MOOD_LOG: '/mood-log/log',
    MOOD_HISTORY: '/mood-log/history',
    MOOD_BY_DATE: '/mood-log/calendar/by-date',
    MOOD_ANALYTICS: '/mood-log/mood-analytics',

    AI_SUGGEST_ACTIVITY: '/ai/suggest-activity',

    MOOD_LIST: '/mood/list',
    MOOD_ADD: '/mood/add',
    MOOD_DELETE: (id) => `/mood/delete/${id}`,

    VIEW_PROFILE: '/profile/viewprofile',
    UPLOAD_PROFILE_IMAGE: '/profile/upload-profile-image',
    CREATE_PROFILE: '/profile/create',
    DELETE_PROFILE: "/profile/delete",

    GET_ACTIVITIES: '/suggestion/viwe',
    GET_ACTIVITY_BY_ID: (id) => `/activity/${id}`,
    UPDATE_ACTIVITY: (id) => `/activity/update/${id}`,
    ADD_ACTIVITY: '/activity/add',
    ACTIVITY_LIST: "/activity/list",
    DELETE_ACTIVITY: (id) => `/activity/delete/${id}`,

    ALL_USERS: "/admin/users",
    ADMIN_USER_DETAIL: (id) => `/admin/users/${id}`,
    ADMIN_USER_MOODLOGS: (id) => `/admin/users/moodlogs/${id}`,
};

export { BASE_URL, API_ROUTES };
