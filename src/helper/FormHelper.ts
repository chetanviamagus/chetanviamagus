import { FormModel } from "../model/FormModel";
import { DropdownOption } from "../interface/common";
export default class FormDropDownHelperUtil {
  // Static method
  static staticDropDownOptions(): DropdownOption[] {
    return [
      { label: "Option 10", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
      { label: "Option 4", value: "option4" },
    ];
  }
  static dynamicDropDownOptions(formModel: FormModel): DropdownOption[] {
    // Call the respective API services and return the dropdown options.
    return [];
  }
  static dynamicAutoCompleteOptions(formModel: FormModel): DropdownOption[] {
    // Call the respective API services and return the dropdown options.
    return [];
  }
}
