'use client'

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "../../../components/ui/Spinner";
import { CreateCourseData, Status } from "./types";
import { getLanguageSymbol } from "./CourseIcons";
import { FormInput, FormSelect, FormTextarea, CustomFieldWrapper } from "./FormControls";
import { LANGUAGES, PLATFORMS, TOPICS } from "./constants";
import { useCourse } from "./hooks/useCourse";


interface AddCourseModalProps {
    show: boolean;
    onClose: () => void;
}

export default function AddCourseModal({
    show,
    onClose,
}: AddCourseModalProps) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<CreateCourseData>({
        defaultValues: {
            topic: "FRONTEND",
            language: "PORTUGUES",
            startDate: new Date().toISOString().split("T")[0],
            status: "NAO_INICIADO",
            progress: 0,
            rating: 0,
            comment: ""
        }
    });

    const { createCourse, isLoadingCreateCourse, success, resetSuccess } = useCourse();

    useEffect(() => {
        if (success) {
            reset();
            onClose();
            resetSuccess();
        }
    }, [success, reset, onClose, resetSuccess]);

    const topic = watch("topic");
    const platform = watch("platform");
    const language = watch("language");
    const name = watch("name");

    const onSubmit = (data: Omit<CreateCourseData, 'id' | 'platform' | 'topic' | 'language' | 'progress' | 'studiedHours'> & {
        platform: string;
        topic: string;
        language: string;
        platformCustom?: string;
        topicCustom?: string;
        languageCustom?: string;
        studiedHours?: string | number;
    }) => {
        const courseData = {
            name: data.name,
            duration: Number(data.duration),
            studiedHours: Number(data.studiedHours) || 0,
            topic: data.topic === "Outro" ? data.topicCustom || "" : data.topic,
            platform: data.platform === "Outro" ? data.platformCustom || "" : data.platform,
            language: data.language === "Outro" ? data.languageCustom || "" : data.language,
            description: data.description,
            instructor: data.instructor,
            startDate: data.startDate,
            status: 'NAO_INICIADO' as Status
        };
        createCourse(courseData);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6 gap-1">
                        <h2 className="text-xl font-semibold text-white">
                            Adicionar Novo Curso
                        </h2>
                        <button
                            onClick={onClose}
                            className="cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Nome do Curso *"
                                {...register("name", { required: "Nome do curso é obrigatório" })}
                                error={errors.name?.message}
                                className="md:col-span-2"
                                placeholder="Ex: React 18 Completo - Do Zero ao Avançado"
                            />

                            <FormSelect
                                label="Plataforma *"
                                {...register("platform", { required: "Plataforma é obrigatória" })}
                                options={PLATFORMS}
                                error={errors.platform?.message}
                            />

                            <CustomFieldWrapper
                                show={platform === "OUTROS"}
                                label="Nome da Plataforma *"
                                register={register("platformCustom", {
                                    required: platform === "OUTROS" ? "Nome da plataforma é obrigatório" : false
                                })}
                                error={errors.platformCustom?.message}
                                className="md:col-span-2"
                            />

                            <FormInput
                                label="Duração (horas) *"
                                type="number"
                                {...register("duration", {
                                    required: "Duração é obrigatória",
                                    min: { value: 1, message: "Duração mínima de 1 hora" }
                                })}
                                error={errors.duration?.message}
                                placeholder="Ex: 42"
                            />

                            <FormSelect
                                label="Tópico *"
                                {...register("topic", { required: "Tópico é obrigatório" })}
                                options={TOPICS}
                                error={errors.topic?.message}
                            />

                            <CustomFieldWrapper
                                show={topic === "OUTROS"}
                                label="Nome do Tópico *"
                                register={register("topicCustom", {
                                    required: topic === "OUTROS" ? "Nome do tópico é obrigatório" : false
                                })}
                                error={errors.topicCustom?.message}
                                className="md:col-span-2"
                            />

                            <FormSelect
                                label="Idioma"
                                {...register("language")}
                                options={LANGUAGES}
                            />

                            <CustomFieldWrapper
                                show={language === "OUTROS"}
                                label="Nome do Idioma *"
                                register={register("languageCustom", {
                                    required: language === "OUTROS" ? "Nome do idioma é obrigatório" : false
                                })}
                                error={errors.languageCustom?.message}
                                className="md:col-span-2"
                            />

                            <FormInput
                                label="Data de Início"
                                type="date"
                                {...register("startDate")}
                            />

                            <FormInput
                                label="Instrutor"
                                {...register("instructor")}
                                placeholder="Nome do instrutor"
                            />

                            <FormTextarea
                                label="Descrição"
                                {...register("description")}
                                className="md:col-span-2"
                                rows={3}
                                placeholder="Descrição do curso e objetivos de aprendizado..."
                            />
                        </div>

                        {name && (
                            <div className="bg-gray-700/30 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-400 mb-2">
                                    Preview do Curso:
                                </h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">
                                        {getLanguageSymbol(topic, name)}
                                    </span>
                                    <div>
                                        <div className="font-medium text-white">{name}</div>
                                        <div className="text-sm text-gray-400">
                                            {platform} • {watch("duration")}h • {topic}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg transition-colors duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoadingCreateCourse}
                                className={cn(
                                    "cursor-pointer flex-1 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2",
                                    isLoadingCreateCourse
                                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                        : "bg-emerald-600 hover:bg-emerald-700 text-white",
                                )}
                            >
                                {isLoadingCreateCourse ? (
                                    <>
                                        <Spinner
                                            size="sm"
                                            className="border-gray-300 border-t-transparent"
                                        />
                                        Adicionando...
                                    </>
                                ) : (
                                    "Adicionar Curso"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};