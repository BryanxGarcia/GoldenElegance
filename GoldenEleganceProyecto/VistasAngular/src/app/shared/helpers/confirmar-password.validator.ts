import { FormGroup } from "@angular/forms";

export function confirmarPasswordValidation(controlName: string, matchControlName: string, customError = 'mismatch') {
    return (fg: FormGroup) => {
        return fg.get(controlName)?.value === fg.get(matchControlName)?.value ? null : { [customError]: true };
    };
}


