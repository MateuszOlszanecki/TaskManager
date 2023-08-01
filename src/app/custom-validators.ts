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
        let search: String = control.value.trim();
        if(search.split(' ').length < 3) {
            return null;
        }
        return {'searchValid': false};
    }

    static onlySpaces(control: AbstractControl): {[s: string]: boolean} | null {
        let text: String = control.value.trim();
        if(text != ''){
            return null;
        }
        return {'onlySpaces': false};
    }
}