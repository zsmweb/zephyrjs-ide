// Core
import { Component, ElementRef, ViewChild } from '@angular/core';

// Third party
import { NotificationsService } from 'angular2-notifications';

// Own
import { AppDataService } from '../../app.data.service';
import { EditorTab } from './editor.tab';
import { WebUsbService } from '../../shared/webusb/webusb.service';


@Component({
    moduleId: module.id,
    selector: 'sd-editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.css']
})
export class EditorComponent {
    public notificationOptions = {
        timeOut: 3000,
        showProgressBar: false
    };

    public tabs: Array<EditorTab>;

    public consoleToggledOff: boolean = false;

    @ViewChild('toggleConsoleButton')
    private toggleConsoleButton: ElementRef;

    // Methods

    constructor(
        private appDataService: AppDataService,
        private notificationsService: NotificationsService,
        private webusbService: WebUsbService) {
        this.tabs = appDataService.editorTabs;
    }

    // tslint:disable-next-line:no-unused-locals
    public onToggleConsole() {
        this.consoleToggledOff = !this.consoleToggledOff;
    }

    // tslint:disable-next-line:no-unused-locals
    public onCloseConsole() {
        this.consoleToggledOff = true;
        return false;
    }

    // tslint:disable-next-line:no-unused-locals
    public onWarning(message: any) {
        let overrides: any = {};

        if (message.sticky) {
            overrides['timeOut'] = 0;
        }

        this.notificationsService.alert(
            message.header, message.body, overrides);
    }

    // tslint:disable-next-line:no-unused-locals
    public onError(message: any) {
        let overrides: any = {};

        if (message.sticky) {
            overrides['timeOut'] = 0;
        }

        this.notificationsService.error(
            message.header, message.body, overrides);
    }

    // tslint:disable-next-line:no-unused-locals
    public onBeginResizing() {
        let overlays = document.getElementsByClassName(
            'protect-resizing-overlay');
        [].forEach.call(overlays, (overlay: HTMLElement) => {
            overlay.style.display = 'block';
        });
    }

    // tslint:disable-next-line:no-unused-locals
    public onEndedResizing() {
        let overlays = document.getElementsByClassName(
            'protect-resizing-overlay');
        [].forEach.call(overlays, (overlay: HTMLElement) => {
            overlay.style.display = 'none';
        });
    }
}
