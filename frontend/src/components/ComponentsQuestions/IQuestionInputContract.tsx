import React, { useEffect } from "react";
import {isEmpty} from "lodash";

export interface IComponentState<T> {
  value: T;
  isCompleted: boolean;
}

export interface IGenericQuestionProps<T> {
  value: T | undefined;
  onValueChange(result: IComponentState<T>): void;
}

export type IGenericQuestionComponent<T> = React.FC<IGenericQuestionProps<T>>;

export function useInitValue<T>(
  initValue: IComponentState<T>,
  propValue: T | undefined,
  onValueChange: (result: IComponentState<T>) => void
): T | undefined {
  useEffect(() => {
    if (isEmpty(propValue)) {
      onValueChange(initValue);
    }
  }, [initValue, onValueChange, propValue]);

  return isEmpty(propValue) ? initValue.value : propValue;
}

export function invalidState<T>(value: T): IComponentState<T> {
  return { value, isCompleted: false };
}

export function validState<T>(value: T): IComponentState<T> {
  return { value, isCompleted: true };
}
