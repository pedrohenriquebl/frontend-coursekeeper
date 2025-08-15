"use client";

import { useState } from "react";
import { Target, BookOpen, Clock, TrendingUp } from "lucide-react";
import { CreateGoalData, GoalType, GoalUnit, Topic } from "@/types";
import { GoalTypeButton } from "./GoalTypeButton";
import { GoalPreview } from "./GoalPreview";
import { ModalActions } from "./ModalActions";
import { ModalHeader } from "./ModalHeader";
import { toDateString } from "@/utils/dateUtils";

interface GoalModalProps {
  showModal: boolean;
  onClose: () => void;
  onSave: (goal: CreateGoalData) => void;
}

const goalTypes = [
  { value: "HORAS_TOTAIS", label: "Horas Totais de Estudo", icon: Clock, unit: "HORAS" },
  { value: "HORAS_TOPICO", label: "Horas por Tópico", icon: BookOpen, unit: "HORAS" },
  { value: "CURSOS_CONCLUIDOS", label: "Cursos Concluídos", icon: Target, unit: "CURSOS" },
  { value: "PERIODO_ESTUDO", label: "Período de Estudo", icon: TrendingUp, unit: "DIAS" },
];

const topics: Topic[] = [
  "FRONTEND", "BACKEND", "DESIGN", "DATA SCIENCE",
  "DEVOPS", "MOBILE", "FULL STACK", "OUTROS"
];

export function GoalModal({ showModal, onClose, onSave }: GoalModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [goalData, setGoalData] = useState<CreateGoalData>({
    title: "",
    type: "HORAS_TOTAIS",
    target: 0,
    unit: "HORAS",
    deadline: toDateString(new Date()),
    description: "",
    topic: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleTypeChange = (type: string) => {
    const selectedType = goalTypes.find((t) => t.value === type);

    setErrors({});

    setGoalData({
      ...goalData,
      type: type as GoalType,
      unit: selectedType?.unit as GoalUnit || "HORAS",
      topic: type === "HORAS_TOPICO" || type === "CURSOS_CONCLUIDOS" ? goalData.topic : null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    const newErrors: { [key: string]: string } = {};
    if (!goalData.title) newErrors.title = "Título é obrigatório";
    if (goalData.target <= 0) newErrors.target = "Objetivo deve ser maior que zero";
    if (!goalData.deadline) newErrors.deadline = "Prazo é obrigatório";
    if (!goalData.description) newErrors.description = "Descrição é obrigatória";
    if (goalData.type === "HORAS_TOPICO" && !goalData.topic) {
      newErrors.topic = "Tópico é obrigatório";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await onSave({
        ...goalData,
        deadline: new Date(goalData.deadline + "T23:59:59.999Z").toISOString(),
      });

      // Resetar formulário
      setGoalData({
        title: "",
        type: "HORAS_TOTAIS",
        target: 0,
        unit: "HORAS",
        deadline: toDateString(new Date()),
        description: "",
        topic: null,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGoalTypeIcon = (type: string) => {
    const goalType = goalTypes.find((t) => t.value === type);
    const Icon = goalType?.icon || Target;
    return <Icon className="h-5 w-5" />;
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <ModalHeader
            title="Criar Nova Meta"
            icon={<Target className="h-6 w-6 text-emerald-400" />}
            onClose={onClose}
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Meta */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Tipo de Meta *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goalTypes.map((type) => (
                  <GoalTypeButton
                    key={type.value}
                    value={type.value}
                    label={type.label}
                    icon={type.icon}
                    unit={type.unit}
                    isSelected={goalData.type === type.value}
                    onClick={() => handleTypeChange(type.value)}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Título */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Título da Meta *</label>
                <input
                  type="text"
                  value={goalData.title}
                  onChange={(e) => setGoalData({ ...goalData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Ex: 100 horas de estudo em Frontend"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Objetivo */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Objetivo *</label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    value={goalData.target || ""}
                    onChange={(e) => setGoalData({ ...goalData, target: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 pr-16 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="100"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">{goalData.unit}</span>
                </div>
                {errors.target && <p className="text-red-500 text-sm mt-1">{errors.target}</p>}
              </div>

              {/* Prazo */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Prazo *</label>
                <input
                  type="date"
                  value={goalData.deadline}
                  onChange={(e) => setGoalData({ ...goalData, deadline: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
              </div>

              {/* Tópico */}
              {(goalData.type === "HORAS_TOPICO" || goalData.type === "CURSOS_CONCLUIDOS") && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tópico *</label>
                  <select
                    value={goalData.topic || ""}
                    onChange={(e) => setGoalData({ ...goalData, topic: e.target.value as Topic })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="">Selecione um tópico</option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                  {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
                </div>
              )}

              {/* Descrição */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Descrição *</label>
                <textarea
                  rows={3}
                  value={goalData.description || ""}
                  onChange={(e) => setGoalData({ ...goalData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                  placeholder="Descreva o objetivo desta meta e como ela contribui para seu desenvolvimento..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Preview */}
            {goalData.title && goalData.target > 0 && (
              <GoalPreview
                title={goalData.title}
                target={goalData.target}
                unit={goalData.unit}
                topic={goalData.topic || ""}
                deadline={goalData.deadline}
                typeIcon={getGoalTypeIcon(goalData.type)}
              />
            )}

            <ModalActions
              onCancel={onClose}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              submitText="Criar Meta"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
