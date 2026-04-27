export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-6 md:p-8 shadow-sm">
      {children}
    </div>
  );
}
