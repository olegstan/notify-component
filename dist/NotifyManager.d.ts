import React from 'react';
export type ContainerInterface = {
    addItem: (id: string, notify: React.ReactElement) => void;
    removeItem: (id: string) => void;
    updateItem: (id: string, percent: number) => void;
    hasItem?: (id: string) => boolean;
};
/**
 *
 */
declare class NotifyManager {
    static container: ContainerInterface | null;
    static id(): string;
    private static normalizeText;
    private static createNotifyElement;
    private static scheduleDeletion;
    private static addOrOnce;
    static add(title: string, text: string, type: string, time: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static once(jobTypeId: string, title: string, text: string, type: string, time: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static delete(jobTypeId: string): void;
    static update(jobTypeId: string, percent: number): void;
    static bind(container: ContainerInterface): void;
    static info(title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static error(title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static warning(title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static loading(title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static infoOnce(id: string, title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static errorOnce(id: string, title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static warningOnce(id: string, title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static loadingOnce(id: string, title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void): string | undefined;
}
export default NotifyManager;
//# sourceMappingURL=NotifyManager.d.ts.map