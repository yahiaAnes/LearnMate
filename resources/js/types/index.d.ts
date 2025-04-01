export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    profile_image?: string;
    university?: string;
    bio?: string;
    level?: string;
    speciality?: string;
    skills?: {
        id: number;
        name: string;
        description: string;
        level: string;
    }[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
