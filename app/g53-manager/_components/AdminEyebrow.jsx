const variants = {
  default: "text-dark50",
  accent: "text-accent",
  light: "text-white/45",
};

const AdminEyebrow = ({ children, variant = "default" }) => (
  <p
    className={`font-[family-name:var(--font-syne)] text-[10px] font-semibold uppercase tracking-[0.2em] ${variants[variant]}`}
  >
    {children}
  </p>
);

export default AdminEyebrow;
