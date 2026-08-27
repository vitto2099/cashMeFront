import { BD, T1 } from "@/constants/theme";

interface FormFieldProps {
  label: string;
  placeholder: string;
}

export function FormField({ label, placeholder }: FormFieldProps) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}` }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: T1, display: "block", marginBottom: 8 }}>{label}</label>
      <div style={{ background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "12px 14px" }}>
        <span style={{ fontSize: 14, color: "#9CA3AF" }}>{placeholder}</span>
      </div>
    </div>
  );
}
