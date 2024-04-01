import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { Positions, SIZE } from "./Config";
import Item from "./Item";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

interface SortableListProps {
  children: ReactElement<{ id: string }>[];
  COL?: number;
  height: number;
  // ROWS?: number;
}

function SortableList({ children, COL = 1, height }: SortableListProps) {
  const scrollView = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const position = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({ [child.props.id]: index }))
    )
  );
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => (scrollY.value = y),
  });
  return (
    <Animated.ScrollView
      ref={scrollView}
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * height + height,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      onScroll={onScroll}
    >
      {children.map((child) => {
        return (
          <Item
            key={child.props.id}
            id={child.props.id}
            positions={position}
            scrollView={scrollView}
            scrollY={scrollY}
            COL={COL}
            Height={height}
          >
            {child}
          </Item>
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SortableList;
