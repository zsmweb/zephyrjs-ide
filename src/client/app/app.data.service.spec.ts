import { ReflectiveInjector } from '@angular/core';

import { AppDataService } from './app.data.service';


export function main() {
    describe('AppData Service', () => {
        let service: AppDataService;

        beforeEach(() => {
            let injector = ReflectiveInjector.resolveAndCreate([
                AppDataService
            ]);
            service = injector.get(AppDataService);
        });

        it('editor should have one tab initially', () => {
            expect(service.editorTabs.length).toBe(1);
        });

        it('adding an editor tab should work', () => {
            let tab = service.newEditorTab();
            expect(tab.id).toBe(2);
            expect(tab.active).toBe(true);
            expect(service.editorTabs[0].active).toBe(false);
            expect(tab.title).toBe('Tab # 2');
            expect(service.editorTabs.length).toBe(2);

            // Adding one while the last one is not the active tab should
            // still result in the new tab being the only active one.
            service.resetEditorTabs();
            tab = service.getEditorTab(0);
            let tab2 = service.newEditorTab();
            service.activateEditorTab(tab);
            let tab3 = service.newEditorTab();

            expect(tab.active).toBe(false);
            expect(tab2.active).toBe(false);
            expect(tab3.active).toBe(true);
        });

        it('activating an editor tab should work', () => {
            let tab1 = service.getEditorTab(0);
            let tab2 = service.newEditorTab();

            expect(tab1.active).toBe(false);
            expect(tab2.active).toBe(true);

            service.activateEditorTab(tab1);

            expect(tab1.active).toBe(true);
            expect(tab2.active).toBe(false);
        });

        it('getting an editor tab should work', () => {
            let tab = service.getEditorTab(0);
            expect(tab).toBeTruthy();
        });

        it('getting the active editor tab should work', () => {
            let tab = service.getActiveEditorTab();
            expect(tab).toBeTruthy();
            expect(tab.active).toBe(true);
        });

        it('removing an editor tab should work', () => {
            // Removing the only tab should not alter the tab count
            service.removeEditorTab(service.getEditorTab(0));
            expect(service.editorTabs.length).toBe(1);

            let tab = service.newEditorTab();
            service.removeEditorTab(tab);
            expect(service.editorTabs.length).toBe(1);

            // When we remove an active tab that was last, the new last becomes
            // active.
            let tab2 = service.newEditorTab();
            let tab3 = service.newEditorTab();

            expect(service.editorTabs.length).toBe(3);
            expect(service.editorTabs[0].active).toBe(false);
            expect(service.editorTabs[1].active).toBe(false);
            expect(service.editorTabs[2].active).toBe(true);

            service.removeEditorTab(tab3);
            expect(service.editorTabs[1].active).toBe(true);

            // When we remove an active tab that was not last, the one that was
            // following it becomes active.
            tab3 = service.newEditorTab();
            service.activateEditorTab(tab2);
            service.removeEditorTab(tab2);
            expect(tab3.active).toBe(true);

            // When we remove the first tab, which is also active, the newly
            // first tab becomes active.
            service.resetEditorTabs();
            tab = service.getEditorTab(0);
            tab2 = service.newEditorTab();
            service.activateEditorTab(tab);
            service.removeEditorTab(tab);
            expect(tab2.active).toBe(true);

            // When we remove an inactive tab, the currently active tab does
            // not change.
            service.resetEditorTabs();
            tab2 = service.newEditorTab();
            tab3 = service.newEditorTab();
            service.removeEditorTab(tab2);
            expect(tab3.active).toBe(true);
        });

        it('resetting all editor tabs should work', () => {
            let tab1 = service.getEditorTab(0);
            let tab2 = service.newEditorTab();
            let tab3 = service.newEditorTab();

            service.resetEditorTabs();
            expect(service.editorTabs.length).toBe(1);
        });

        it('renaming an editor tab should work', () => {
            let tab1 = service.getEditorTab(0);
            service.renameEditorTab(tab1, 'New title');
            expect(tab1.title).toBe('New title');

            let tab2 = service.newEditorTab();
            expect(() => {
                service.renameEditorTab(tab2, 'New title');
            }).toThrow();
        });
    });
}
