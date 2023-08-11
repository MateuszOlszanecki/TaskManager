import { AbstractControl } from "@angular/forms";
import { GlobalVariables } from "./global-variables";

export class CustomValidators {
    static statusValid(control: AbstractControl): {[s: string]: boolean} | null {
        let status = control.value.status;
        let status_of_completion = control.value.status_of_completion;
        if(status === GlobalVariables.TASK_NOT_STARTED_STATUS
          && status_of_completion === 0){
            return null
        }
        else if(status === GlobalVariables.TASK_FINISHED_STATUS
                && status_of_completion === 100){
            return null
        }
        else if(status === GlobalVariables.TASK_STARTED_STATUS
                && status_of_completion > 0
                && status_of_completion < 100){
            return null
        }
        return {'statusValid': false};
    }
    
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
        if(text != ''){
            return null;
        }
        return {'onlySpaces': false};
    }

    static maxLengthTextArea(control: AbstractControl): {[s: string]: boolean} | null {
        let text: string = control.value.trim();
        let maxLength = GlobalVariables.MAX_LENGTH_TEXT_AREA;
        if(text.length <= maxLength){
            return null;
        }
        return {'maxLength': false};
    }

    static maxLengthInput(control: AbstractControl): {[s: string]: boolean} | null {
        let text: string = control.value.trim();
        let maxLength = GlobalVariables.MAX_LENGTH_INPUT;
        if(text.length <= maxLength){
            return null;
        }
        return {'maxLength': false};
    }
}