import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

import { styles } from "./statistics-tab.style";
import { useStatisticsTabVM } from "./statistics-tab.vm";


const StatisticsTab: React.FC = () => {
  const { total, categoryChartData } = useStatisticsTabVM();

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estatísticas</Text>

      <View style={styles.card}>
        <Text style={styles.totalText}>
          Total gasto: R$ {total.toFixed(2)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Por categoria</Text>

        <View style={styles.chartContainer}>
          <PieChart
            data={categoryChartData}
            width={screenWidth - 32}
            height={220}
            accessor={"name"}
            chartConfig={chartConfig}
            backgroundColor="transparent"
            paddingLeft="10"
            absolute
          />
        </View>
      </View>
    </View>
  );
}

export default StatisticsTab