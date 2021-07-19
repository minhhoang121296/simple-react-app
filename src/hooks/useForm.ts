import { ChangeEvent, FormEvent, useState } from 'react';

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type ErrorRecord<T> = Record<keyof T, string>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: (data: T) => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({} as ErrorRecord<T>);

  // Needs to extend unknown so we can add a generic to an arrow function
  const handleChange =(
    key: keyof T,
  ) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const setFieldsValue = (value: Partial<T>) => {
    console.log(value);
    setData({
      ...data, ...value
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;

    if (validations) {
      let valid = true;
      const newErrors = {} as ErrorRecord<T>;
      
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !pattern.value.test(value)) {
          
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value ? value : '')) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({} as ErrorRecord<T>);

    if (options?.onSubmit) {
      options.onSubmit(data);
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    setFieldsValue,
    setData,
    errors,
  };
};
