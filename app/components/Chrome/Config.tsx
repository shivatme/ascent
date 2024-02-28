import { Dimensions } from "react-native";
import { Easing } from "react-native-reanimated";

export interface Positions {
  [id: string]: number;
}

const { width } = Dimensions.get("window");
export const MARGIN = 8;
export const SIZE = width - MARGIN;
export const COL = 1;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

export const getPosition = (position: number) => {
  "worklet";
  return {
    x: position % COL === 0 ? 0 : SIZE * (position % COL),
    y: (Math.floor(position / COL) * SIZE) / 3,
  };
};

export const getOrder = (x: number, y: number) => {
  "worklet";

  const col = Math.round(x / SIZE);
  const row = Math.round(y / SIZE);
  return row * COL + col;
};
