import React from "react";
import { useGetter } from "../utils";
export const useCommittingSlider = (initialValue, onChange) => {
  const [sliderValue, setSliderValue] = React.useState(initialValue);
  const [adoptedValue, setAdoptedValue] = React.useState(initialValue);
  const [resetTimeout, setResetTimeout] = React.useState();
  const getResetTimeout = useGetter(resetTimeout);
  React.useEffect(() => {
    if (adoptedValue !== initialValue) {
      clearTimeout(getResetTimeout());
      setSliderValue(initialValue);
      setAdoptedValue(initialValue);
    } else if (initialValue !== sliderValue) {
      clearTimeout(getResetTimeout());
      setResetTimeout(setTimeout(() => {
        setSliderValue(initialValue);
      }, 1000));
    }
  }, [sliderValue, initialValue, adoptedValue, getResetTimeout]);
  const handleSliderChange = React.useCallback((_event, value) => {
    if (typeof value !== "number") {
      return;
    }
    setSliderValue(value);
  }, []);
  const handleSliderCommitted = React.useCallback((event, value) => {
    if (typeof value !== "number") {
      return;
    }
    setSliderValue(value);
    onChange(value);
  }, [onChange]);
  return [sliderValue, handleSliderChange, handleSliderCommitted];
};