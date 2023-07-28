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
        return {'valid': false};
    }
}