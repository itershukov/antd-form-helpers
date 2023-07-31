import { FieldData } from 'rc-field-form/es/interface';
import { IValidationErrorData } from '../models';

function mapModelToFields<T extends { [key: string]: any }>(
  stateData: FieldData[],
  errors?: IValidationErrorData | null,
  params?: T | null
): FieldData[] {
  return stateData.map(({ name, value }) => {
    const flatName: string | number = typeof name === 'string' || typeof name === 'number' ? name : name.join('.');

    const newValue = params ? params[flatName] : value;
    const newErrors = errors ? errors[flatName] : [];

    return { value: newValue, name, errors: newErrors };
  });
}

function mapToFields<T extends { [key: string]: any }>(
  stateData: FieldData[],
  errors?: IValidationErrorData | null,
  data?: T | null,
  params?: T | null
): FieldData[] {
  return stateData.map(({ name, value }) => {
    const flatName: string | number = typeof name === 'string' || typeof name === 'number' ? name : name.join('.');

    const hasParams = params && typeof params === 'object' && flatName in params;
    const paramsValue = params && params[flatName];

    const hasValue = data && typeof data === 'object' && flatName in data;
    const dataValue = data && hasValue ? data[flatName] : value;

    const newValue = hasParams ? paramsValue : dataValue;
    const newErrors = errors ? errors[flatName] : [];

    return { value: newValue, name, errors: newErrors };
  });
}

export const FormMappers = { mapModelToFields, mapToFields };
