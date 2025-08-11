'use client'

import { X, Calendar, Clock, Monitor, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course } from "./types";
import { getTopicIcon, getLanguageSymbol, getStatusColor } from "./CourseIcons";

interface CourseDetailsModalProps {
  show: boolean;
  course: Course;
  onClose: () => void;
}

export const CourseDetailsModal = ({
  show,
  course,
  onClose,
}: CourseDetailsModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 gap-1">
            <h2 className="text-xl font-semibold text-white">
              Detalhes do Curso
            </h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Cabeçalho do Curso */}
            <div className="flex items-start gap-4">
              <span className="text-4xl">
                {getLanguageSymbol(course.topic, course.name)}
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {course.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  {getTopicIcon(course.topic)}
                  <span className="text-gray-400">{course.topic}</span>
                </div>
                <span
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-sm",
                    getStatusColor(course.status)
                  )}
                >
                  {course.status}
                </span>
              </div>
            </div>

            {/* Grid de Informações */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Plataforma</span>
                </div>
                <span className="text-white font-medium">
                  {course.platform}
                </span>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Duração</span>
                </div>
                <span className="text-white font-medium">
                  {course.duration}
                </span>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Início</span>
                </div>
                <span className="text-white font-medium">
                  {new Date(course.startDate).toLocaleDateString("pt-BR")}
                </span>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Progresso</span>
                </div>
                <span className="text-white font-medium">
                  {course.progress}%
                </span>
              </div>
            </div>

            {/* Barra de Progresso */}
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progresso do Curso</span>
                <span>{course.progress}%</span>
              </div>
              <div className="bg-gray-600 rounded-full h-3">
                <div
                  className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Avaliação */}
            {course.rating > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-400">Sua Avaliação:</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < course.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">({course.rating}/5)</span>
                </div>
                {course.comment && (
                  <div className="bg-gray-700/30 rounded-lg p-3">
                    <p className="text-gray-300 italic">{`"${course.comment}"`}</p>
                  </div>
                )}
              </div>
            )}

            {/* Descrição */}
            {course.description && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">
                  Descrição
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {course.description}
                </p>
              </div>
            )}

            {/* Data de Conclusão */}
            {course.endDate && (
              <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-medium">
                    Curso concluído em{" "}
                    {new Date(course.endDate).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};