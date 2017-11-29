// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component to show errors if an input isn't valid.
 *
 * @description
 * The purpose of this component is to make easier and consistent the validation of forms.
 *
 * It should be applied next to the input element (ion-input, ion-select, ...). In case of ion-checkbox, it should be in another
 * item, placing it in the same item as the checkbox will cause problems.
 *
 * Please notice that the inputs need to have a FormControl to make it work. That FormControl needs to be passed to this component.
 *
 * If this component is placed in the same ion-item as a ion-label or ion-input, then it should have the attribute "item-content",
 * otherwise Ionic will remove it.
 *
 * Example usage:
 *
 * <ion-item text-wrap>
 *     <ion-label stacked core-mark-required="true">{{ 'mm.login.username' | translate }}</ion-label>
 *     <ion-input type="text" name="username" formControlName="username"></ion-input>
 *     <core-input-errors item-content [control]="myForm.controls.username" [errorMessages]="usernameErrors"></core-input-errors>
 * </ion-item>
 */
@Component({
    selector: 'core-input-errors',
    templateUrl: 'input-errors.html'
})
export class CoreInputErrorsComponent implements OnInit {
    @Input('control') formControl: FormControl;
    @Input() errorMessages?: any;
    errorKeys: any[];

    constructor(private translate: TranslateService) {}

    /**
     * Component is being initialized.
     */
    ngOnInit() {
        this.initErrorMessages();

        this.errorKeys = Object.keys(this.errorMessages);
    }

    /**
     * Initialize some common errors if they aren't set.
     */
    protected initErrorMessages() {
        this.errorMessages = this.errorMessages || {};

        this.errorMessages.required = this.errorMessages.required || this.translate.instant('mm.core.required');
        this.errorMessages.email = this.errorMessages.email || this.translate.instant('mm.login.invalidemail');
        this.errorMessages.date = this.errorMessages.date || this.translate.instant('mm.login.invaliddate');
        this.errorMessages.datetime = this.errorMessages.datetime || this.translate.instant('mm.login.invaliddate');
        this.errorMessages.datetimelocal = this.errorMessages.datetimelocal || this.translate.instant('mm.login.invaliddate');
        this.errorMessages.time = this.errorMessages.time || this.translate.instant('mm.login.invalidtime');
        this.errorMessages.url = this.errorMessages.url || this.translate.instant('mm.login.invalidurl');

        // @todo: Check how to handle min/max errors once we have a test case to use. Also, review previous errors.
        // ['min', 'max'].forEach((type) => {
        //     // Initialize min/max errors if needed.
        //     if (!this.errorMessages[type]) {
        //         if (input && typeof input[type] != 'undefined' && input[type] !== '') {
        //             var value = input[type];
        //             if (input.type == 'date' || input.type == 'datetime' || input.type == 'datetime-local') {
        //                 var date = moment(value);
        //                 if (date.isValid()) {
        //                     value = moment(value).format($translate.instant('mm.core.dfdaymonthyear'));
        //                 }
        //             }

        //             scope.errorMessages[type] = $translate.instant('mm.login.invalidvalue' + type, {$a: value});
        //         } else {
        //             scope.errorMessages[type] = $translate.instant('mm.login.profileinvaliddata');
        //         }
        //     }
        // });
    }

}
