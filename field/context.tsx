import * as React from "react";
import { Field, Check } from "./types";

interface Context {
  state: {
    check: Check;
  };
  actions: {
    updateField: (id: string, value: string) => void;
  };
}

interface Props {
  fields: Field[];
  children: React.ReactNode;
}

const FieldContext = React.createContext({} as Context);

const FieldProvider: React.VFC<Props> = (props) => {
  const [check, setCheck] = React.useState<Check>(() => new Map());

  const updateField = React.useCallback(
    (id: string, value: string) => {
      check.set(id, value);
      setCheck(new Map(check));
    },
    [check]
  );

  const state = React.useMemo(() => ({ check }), [check]);
  const actions = React.useMemo(() => ({ updateField }), [updateField]);

  return (
    <FieldContext.Provider value={{ state, actions }}>
      {props.children}
    </FieldContext.Provider>
  );
};

export function useField(): [Context["state"], Context["actions"]] {
  const { state, actions } = React.useContext(FieldContext);

  return [state, actions];
}

export default FieldProvider;
