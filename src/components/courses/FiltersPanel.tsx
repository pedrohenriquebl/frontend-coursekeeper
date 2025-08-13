'use client'

import { Search } from 'lucide-react';
import { LANGUAGES, PLATFORMS, TOPICS, STATUS_OPTIONS } from '@/components/courses/CourseModals/constants';
import { FormInput } from '../courses/CourseModals/FormControls';

export interface CourseFilters {
  search: string;
  topic: string;
  platform: string;
  status: string;
  language: string;
  duration: string;
}

interface FiltersPanelProps {
  filters: CourseFilters;
  onFilterChange: (filters: Partial<CourseFilters>) => void;
}

export const FiltersPanel = ({ filters, onFilterChange }: FiltersPanelProps) => {
  const durationOptions = [
    { value: 'all', label: 'Qualquer duração' },
    { value: 'short', label: 'Curto (0-2 horas)' },
    { value: 'medium', label: 'Médio (2-10 horas)' },
    { value: 'long', label: 'Longo (10+ horas)' },
  ];

  const handleSelectChange = (key: keyof CourseFilters) => (value: string) => {
    onFilterChange({ [key]: value });
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <FormInput
            label="Buscar cursos"
            type="text"
            placeholder="Buscar cursos..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 placeholder-gray-400"
          />
        </div>

        {/* Topic Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-2">Tópico</label>
          <select
            value={filters.topic}
            onChange={(e) => handleSelectChange('topic')(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all" className="bg-gray-800">
              Todos os tópicos
            </option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic} className="bg-gray-800">
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-2">Plataforma</label>
          <select
            value={filters.platform}
            onChange={(e) => handleSelectChange('platform')(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all" className="bg-gray-800">
              Todas as plataformas
            </option>
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform} className="bg-gray-800">
                {platform}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleSelectChange('status')(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all" className="bg-gray-800">
              Todos os status
            </option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value} className="bg-gray-800">
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-2">Idioma</label>
          <select
            value={filters.language}
            onChange={(e) => handleSelectChange('language')(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all" className="bg-gray-800">
              Todos os idiomas
            </option>
            {LANGUAGES.map((language) => (
              <option key={language} value={language} className="bg-gray-800">
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-2">Duração</label>
          <select
            value={filters.duration}
            onChange={(e) => handleSelectChange('duration')(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};