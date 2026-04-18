import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    flex: 1,
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27AE60",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  category: {
    backgroundColor: "#EBF5FB",
    color: "#2980B9",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: "hidden",
  },
  date: {
    fontSize: 12,
    color: "#95A5A6",
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  deleteButtonText: {
    color: "#E74C3C",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default styles;
