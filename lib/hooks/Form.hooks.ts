import { FieldData } from 'rc-field-form/es/interface';
import { useEffect, useState } from 'react';
import { FormMappers } from '../mappers';
import { IUpdateModel, IError } from '../models';

type TBranch = { [key: string]: any } | null;

type TValidation = (
  fieldsNames: string[],
  model?: TBranch,
  errors?: IError | null,
  initModel?: TBranch
) => { fields: FieldData[] };

// Deprecated
export const useFormValidation: TValidation = function(fieldsNames, model, errors, initModel) {
  const [fields, setFields] = useState<FieldData[]>(
    fieldsNames.map(item => ({ name: item, value: initModel && initModel[item] }))
  );

  useEffect(() => {
    setFields(prevState => FormMappers.mapModelToFields(prevState, errors?.validation, model));
  }, [model, errors, setFields]);

  return { fields };
};

type TUpdateValidation = (
  fieldsNames: string[],
  model?: IUpdateModel<TBranch> | null,
  errors?: IError | null,
  initModel?: TBranch
) => { fields: FieldData[] };

// Deprecated
export const useUpdateFormValidation: TUpdateValidation = function(fieldsNames, model, errors, initModel) {
  return useFormValidation(fieldsNames, model?.data, errors, initModel);
};

type TFormMapper = (
  fieldsNames: string[],
  data: Object | null,
  params?: Object | null,
  errors?: IError | null
) => { fields: FieldData[]; setField: (params: FieldData) => void; baseError?: string };

export const useFormMapper: TFormMapper = function(fieldsNames, data, params, errors) {
  const [fields, setFields] = useState<FieldData[]>(fieldsNames.map(item => ({ name: item, value: undefined })));

  useEffect(() => {
    setFields(prevState => FormMappers.mapToFields(prevState, errors?.validation, data, params));
  }, [data, params, errors, setFields]);

  const setField = (newField: FieldData) => {
    setFields(prevState => {
      const stateWithoutNew = prevState.filter(({ name }) => name !== newField.name);

      return stateWithoutNew.concat([newField]);
    });
  };

  return { fields, setField };
};
