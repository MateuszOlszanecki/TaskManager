import { AbstractControl } from "@angular/forms";
import { GlobalVariables } from "./global-variables";

export class CustomValidators {    
    static searchValid(control: AbstractControl): {[s: string]: boolean} | null {
        let search: string[] = control.value.trim().split(' ');
        search = search.filter(str => {
            return str !== '';
        })
        if(search.length < 3) {
            return null;
        }
        return {'searchValid': false};
    }

    static onlySpaces(control: AbstractControl): {[s: string]: boolean} | null {
        let text: string = control.value.trim();
        if(text != '') {
            return null;
        }
        return {'onlySpaces': false};
    }

    static maxLengthInput(control: AbstractControl): {[s: string]: boolean} | null {
        let text: string = control.value.trim();
        if(text.length <= GlobalVariables.MAX_LENGTH_INPUT) {
            return null;
        }
        return {'maxLengthInput': false};
    }

    static maxLengthTextArea(control: AbstractControl): {[s: string]: boolean} | null {
        let text: string = control.value.trim();
        if(text.length <= GlobalVariables.MAX_LENGTH_TEXT_AREA) {
            return null;
        }
        return {'maxLengthTextArea': false};
    }
}