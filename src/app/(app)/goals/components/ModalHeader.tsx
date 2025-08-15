import { X } from "lucide-react";

interface ModalHeaderProps {
  title: string;
  icon: React.ReactNode;
  onClose: () => void;
}

export function ModalHeader({ title, icon, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 gap-1">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors duration-200"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
}