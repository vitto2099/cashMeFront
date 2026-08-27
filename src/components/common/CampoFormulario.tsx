import { BD, T1 } from "@/constants/theme";

export interface CampoFormularioProps {
  rotulo: string;
  marcador: string;
}

/**
 * Campo visual de formulário estático para protótipos
 */
export function CampoFormulario({ rotulo, marcador }: CampoFormularioProps) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: `1px solid ${BD}` }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: T1, display: "block", marginBottom: 8 }}>{rotulo}</label>
      <div style={{ background: "#F9FAFB", borderRadius: 10, border: `1px solid ${BD}`, padding: "12px 14px" }}>
        <span style={{ fontSize: 14, color: "#9CA3AF" }}>{marcador}</span>
      </div>
    </div>
  );
}

// Alias para compatibilidade
export const FormField = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <CampoFormulario rotulo={label} marcador={placeholder} />
);
