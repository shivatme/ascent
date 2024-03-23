import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";

interface ListItem2Props {
  id: string;
  title: string;
  label: string;
  renderRightActions: any;
}

function ListItem2({
  id,
  title,
  label,
  renderRightActions,
}: ListItem2Props): JSX.Element {
  const [isSwipeableOpen, setIsSwipeableOpen] = useState(true);

  useEffect(() => {
    let timer;
    if (isSwipeableOpen) {
      timer = setTimeout(() => {
        setIsSwipeableOpen(false);
        swipeableRef.current.close();
      }, 3000); // 5000 milliseconds = 5 seconds
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSwipeableOpen]);

  const handleSwipeableRightOpen = () => {
    setIsSwipeableOpen(true);
  };

  const swipeableRef = useRef(null);
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableOpen={handleSwipeableRightOpen}
    >
      <View style={styles.container}>
        <View style={styles.circle}>
          <AppText>{label}</AppText>
        </View>
        <AppText>{title}</AppText>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    // marginVertical:
    height: 60,
    alignItems: "center",
    backgroundColor: "#181c1f",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 100,
    height: 50,
    width: 50,
    margin: 10,
  },
});

export default ListItem2;
