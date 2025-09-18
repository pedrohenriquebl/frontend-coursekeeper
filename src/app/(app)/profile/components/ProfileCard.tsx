'use client'

import { LucideIcon } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";

interface ProfileCardProps {
  icon: LucideIcon;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
  value: string | number;
  label: string;
}

export function ProfileCard({ icon: Icon, iconColor, gradientFrom, gradientTo, value, label }: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y / height) - 0.5) * -10;
    const rotateY = ((x / width) - 0.5) * 10;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(600px) rotateX(0) rotateY(0) scale(1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-6 shadow-lg overflow-hidden transition-transform duration-200 ease-out"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        border: `2px solid ${gradientTo}`,
        borderRadius: '24px 12px 24px 12px',
      }}
    >
      <div className="absolute inset-0 bg-white/5 pointer-events-none rounded-[24px_12px_24px_12px] blur-xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg drop-shadow-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Icon className={`h-6 w-6 ${iconColor} drop-shadow-md`} />
          </div>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold"
            style={{ color: 'var(--goal-card-title)' }}
          >
            {value}
          </motion.span>
        </div>
        <h3 className="text-sm font-medium text-gray-400">{label}</h3>
      </div>
    </div>
  );
}
