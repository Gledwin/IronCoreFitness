// components/ui/CoreValue.tsx
export default function CoreValue({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 bg-[#2B2B2B] rounded-lg border border-white/10 flex-1">
      <h4 className="text-xl font-oswald text-[#F5E6B3]">{title}</h4>
      <p className="text-sm text-[#CFC4A7] mt-1 font-roboto">{desc}</p>
    </div>
  );
}