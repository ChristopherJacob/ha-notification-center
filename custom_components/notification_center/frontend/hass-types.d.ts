export interface HomeAssistant {
    callWS<T = any>(msg: any): Promise<T>;
    connection: {
        subscribeMessage<T = any>(callback: (msg: T) => void, msg: any, resubscribe?: boolean): Promise<() => void>;
    };
    states: Record<string, HassEntity>;
    services: HassServices;
    panels: Record<string, {
        title: string;
        icon?: string;
        url_path: string;
    }>;
    callService(domain: string, service: string, data?: Record<string, any>): Promise<void>;
    language: string;
    selectedLanguage: string;
    themes: HassThemes;
}
export interface HassEntity {
    entity_id: string;
    state: string;
    attributes: Record<string, any>;
    last_changed: string;
    last_updated: string;
}
export interface HassServices {
    [domain: string]: {
        [service: string]: HassService;
    };
}
export interface HassService {
    name?: string;
    description?: string;
    fields?: Record<string, any>;
}
export interface HassThemes {
    default_theme: string;
    default_dark_theme: string | null;
    themes: Record<string, any>;
}
