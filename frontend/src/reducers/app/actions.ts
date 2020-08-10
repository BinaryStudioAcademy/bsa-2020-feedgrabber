export const TOGGLE_MENU = 'TOGGLE_MENU';

export interface IToggleMenuAction {
    type: typeof TOGGLE_MENU;
}

export function toggleMenu(): IToggleMenuAction {
    return {
        type: TOGGLE_MENU
    };
}