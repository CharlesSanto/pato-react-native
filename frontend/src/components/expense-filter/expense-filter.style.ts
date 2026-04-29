import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F3F4",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D5D8DC",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  label: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#2C3E50",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    color: "#2C3E50",
    flex: 1,
  },
  filterGroup: {
    marginBottom: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  clearButton: {
    backgroundColor: "#E74C3C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  applyButton: {
    backgroundColor: "#2980B9",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  categoryOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2980B9",
    backgroundColor: "#FFFFFF",
  },
  categoryOptionText: {
    color: "#2980B9",
    fontSize: 13,
  },
  categoryOptionSelected: {
    backgroundColor: "#2980B9",
  },
  categoryOptionSelectedText: {
    color: "#FFFFFF",
  },
});

export default styles;
