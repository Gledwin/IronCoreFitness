// components/ui/FeatureCard.tsx
export default function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-[#111111] border border-white/6 shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="font-oswald text-xl mb-2 text-[#E6E6E6]">{title}</h4>
      <p className="text-[#8C8C8C] text-sm font-roboto">{desc}</p>
    </div>
  );
}