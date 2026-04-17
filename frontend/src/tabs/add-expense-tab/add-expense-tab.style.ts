import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    marginTop: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#2C3E50",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#2C3E50",
  },
  inputError: {
    borderColor: "#E74C3C",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#2C3E50",
    minHeight: 90,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 12,
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
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
  submitButton: {
    backgroundColor: "#2980B9",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  submitButtonDisabled: {
    backgroundColor: "#AED6F1",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  successMessage: {
    backgroundColor: "#D5F5E3",
    borderColor: "#27AE60",
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  successMessageText: {
    color: "#1E8449",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default styles;
