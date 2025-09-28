import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Content {
    id: number;
    type: 'tip' | 'survey';
    title: string;
    body: string | null;
    is_active: boolean;
    created_by: User;
}

export interface Question {
    id: number;
    body: string;
}

export interface Option {
    id: number;
    label?: string;
    body?: string;
}

export interface Response {
    id: number;
    question: Question | null;
    option: Option | null;
    body: string | null;
    created_at: string;
}

export interface Session {
    id: number;
    ip_address: string | null;
    user_agent: string | null;
    url: string | null;
    responses: Response[];
    content?: Pick<Content, 'id' | 'title' | 'type'> | null;
    created_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
