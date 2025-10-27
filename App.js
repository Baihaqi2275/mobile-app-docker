import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";

const boxSize = 20;
const gridSize = 20;

export default function App() {
  const [snake, setSnake] = useState([{ x: 9, y: 10 }]);
  const [food, setFood] = useState(randomFood());
  const [direction, setDirection] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // 🔁 Jalankan game loop
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  function randomFood() {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  }

  const moveSnake = () => {
    if (!direction) return;

    const head = { ...snake[0] };

    if (direction === "UP") head.y -= 1;
    else if (direction === "DOWN") head.y += 1;
    else if (direction === "LEFT") head.x -= 1;
    else if (direction === "RIGHT") head.x += 1;

    // 🚧 Cek tabrakan
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= gridSize ||
      head.y >= gridSize ||
      snake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
      setGameOver(true);
      Alert.alert(
        "💀 Game Over",
        `Skor kamu: ${score}`,
        [{ text: "Main Lagi 🔁", onPress: restartGame }],
        { cancelable: false }
      );
      return;
    }

    const newSnake = [head, ...snake];

    // 🍎 Makan makanan
    if (head.x === food.x && head.y === food.y) {
      setFood(randomFood());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const restartGame = () => {
    setSnake([{ x: 9, y: 10 }]);
    setDirection(null);
    setGameOver(false);
    setScore(0);
    setFood(randomFood());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🐍 Snake Game</Text>
      <Text style={styles.score}>Skor: {score}</Text>

      {/* Area Permainan */}
      <View style={styles.gameBoard}>
        {Array.from({ length: gridSize }).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: gridSize }).map((_, col) => {
              const isSnake = snake.some(s => s.x === col && s.y === row);
              const isFood = food.x === col && food.y === row;
              return (
                <View
                  key={col}
                  style={[
                    styles.cell,
                    isSnake && styles.snake,
                    isFood && styles.food,
                  ]}
                />
              );
            })}
          </View>
        ))}
      </View>

      {/* Tombol Kontrol */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setDirection("UP")}
        >
          <Text style={styles.arrow}>⬆️</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setDirection("LEFT")}
          >
            <Text style={styles.arrow}>⬅️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setDirection("DOWN")}
          >
            <Text style={styles.arrow}>⬇️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setDirection("RIGHT")}
          >
            <Text style={styles.arrow}>➡️</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.restart} onPress={restartGame}>
          <Text style={styles.restartText}>🔁 Restart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  score: {
    color: "#C8E6C9",
    fontSize: 18,
    marginBottom: 10,
  },
  gameBoard: {
    width: gridSize * boxSize,
    height: gridSize * boxSize,
    backgroundColor: "#1B5E20",
    borderWidth: 4,
    borderColor: "#A5D6A7",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: boxSize,
    height: boxSize,
    backgroundColor: "#1B5E20",
  },
  snake: {
    backgroundColor: "#81C784",
    borderRadius: 4,
  },
  food: {
    backgroundColor: "#FFEB3B",
    borderRadius: 10,
  },
  controls: {
    marginTop: 25,
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "#C8E6C9",
    padding: 15,
    margin: 5,
    borderRadius: 10,
  },
  arrow: {
    fontSize: 26,
  },
  restart: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#81C784",
    borderRadius: 8,
  },
  restartText: {
    fontWeight: "bold",
    color: "#1B5E20",
    fontSize: 18,
  },
});
