export const PUBLIC_USER_SELECT = {
    id: true,
    email: true,
    name: true,
    activated: true,
    createdAt: true,
} as const;
export const USER_SELECT = {
    ...PUBLIC_USER_SELECT,
    password: true,
} as const;
