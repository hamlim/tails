"use client";
import { Button } from "@recipes/button";
import { Input } from "@recipes/input";
import { Label } from "@recipes/label";
import { Text } from "@recipes/text";
import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";

export function MultiInput() {
  let [values, setValues] = useState<Array<{ name: string; amount: string }>>([]);

  let listenerCallback = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.closest("form")?.addEventListener("reset", () => {
        setValues([]);
      });
    }
  }, []);

  return (
    <div
      ref={listenerCallback}
      className="p-2"
    >
      <Label className="pb-2 inline-flex">Ingredients:</Label>
      <div className="mb-2 flex flex-col gap-4">
        {values.map(({ name, amount }, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <Input
              name={`ingredient-amount`}
              id={`ingredient-amount-${index}`}
              type="text"
              value={amount}
              onChange={(e) => {
                let newValue = e.target.value;
                setValues(stateVals =>
                  stateVals.map((val, idx) => {
                    if (idx === index) {
                      return { ...val, amount: newValue };
                    }
                    return val;
                  })
                );
              }}
            />
            <Text>of</Text>
            <Input
              name={`ingredient-name`}
              id={`ingredient-name-${index}`}
              type="text"
              value={name}
              onChange={(e) => {
                let newValue = e.target.value;
                setValues(stateVals =>
                  stateVals.map((val, idx) => {
                    if (idx === index) {
                      return { ...val, name: newValue };
                    }
                    return val;
                  })
                );
              }}
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setValues([...values, { name: "", amount: "" }]);
        }}
      >
        <PlusIcon /> New Ingredient
      </Button>
    </div>
  );
}
