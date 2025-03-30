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
export default class NotifyManager {
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
}
//# sourceMappingURL=NotifyManager.d.ts.map