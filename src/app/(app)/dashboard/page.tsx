'use client'

import { CourseModals } from "@/components/courses/CourseModals/CourseModals";
import { useAuthUser } from "@/context/authUserContext";
import { CreateCourseData } from "@/types";
import { BookOpen, Clock, Target, Plus, Calendar, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
    const { user } = useAuthUser();
    const router = useRouter();
    const [showAddModal, setShowAddModal] = useState(false);

    const addCourse = (course: CreateCourseData) => {
        setShowAddModal(false);
    };

    const stats = {
        totalCourses: 5,
        completedCourses: 3,
        studyHours: 120,
        currentGoalPercent: 75,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    {`Bem-vindo de volta ${user?.firstName}! 👋`}
                </h1>
                <p className="text-gray-400">
                    Acompanhe seu progresso educacional e continue aprendendo
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-emerald-600/20 p-3 rounded-lg">
                            <BookOpen className="h-6 w-6 text-emerald-400" />
                        </div>
                        <span className="text-2xl font-bold text-white">{stats.totalCourses}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Total de Cursos</h3>
                </div>

                <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-600/20 p-3 rounded-lg">
                            <Award className="h-6 w-6 text-green-400" />
                        </div>
                        <span className="text-2xl font-bold text-white">{stats.completedCourses}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Cursos Concluídos</h3>
                </div>

                <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-600/20 p-3 rounded-lg">
                            <Clock className="h-6 w-6 text-purple-400" />
                        </div>
                        <span className="text-2xl font-bold text-white">{stats.studyHours}h</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Horas de Estudo</h3>
                </div>

                <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-orange-600/20 p-3 rounded-lg">
                            <Target className="h-6 w-6 text-orange-400" />
                        </div>
                        <span className="text-2xl font-bold text-white">{Math.round(stats.currentGoalPercent)}%</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Meta Atual</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
                        <div className="flex items-center justify-between mb-6 gap-1">
                            <h2 className="text-xl font-semibold text-white">Cursos Recentes</h2>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="cursor-pointer flex text-sm items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                            >
                                <Plus className="h-4 w-4" />
                                Novo Curso
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* {recentCourses.map((course) => (
                                <div key={course.id} className="p-4 border border-gray-600/50 rounded-lg hover:border-emerald-500/50 transition-colors duration-200 bg-gray-700/30">
                                    <div className="flex items-start flex-wrap gap-4 justify-between mb-3 sm:no-wrap sm:gap-0">
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl">{getLanguageSymbol(course.topic, course.name)}</span>
                                            <div>
                                                <h3 className="font-semibold text-white mb-1">{course.name}</h3>
                                                <div className="flex items-center gap-4 text-sm sm:text-base text-gray-400">
                                                    <span>{course.platform}</span>
                                                    <span>•</span>
                                                    <span>{course.duration}</span>
                                                    <span>•</span>
                                                    <span className="bg-gray-600/50 px-2 py-1 rounded text-xs text-gray-300">{course.topic}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < course.rating ? "text-yellow-400 fill-current" : "text-slate-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-600 rounded-full h-2 w-32">
                                                <div
                                                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-400">{course.progress}%</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${course.status === "Concluído"
                                                ? "bg-green-600/20 text-green-400"
                                                : "bg-emerald-600/20 text-emerald-400"
                                            }`}>
                                            {course.status}
                                        </span>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Progress Goal */}
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Meta de Horas</h3>
                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                <span>{0}h estudadas</span>
                                <span>{0}h meta</span>
                            </div>
                            <div className="bg-gray-600 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-emerald-600 to-green-600 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(0, 100)}%` }}
                                />
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">
                            Faltam {Math.max(0 - 0, 0)}h para atingir sua meta!
                        </p>
                    </div>

                    {/* Recent Achievements */}
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Conquistas Recentes</h3>
                        <div className="space-y-3">
                            {/* {recentAchievements.map((achievement, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="bg-green-600/20 p-1 rounded-full mt-1">
                                        <TrendingUp className="h-3 w-3 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white font-medium">{achievement.text}</p>
                                        <p className="text-xs text-gray-400">{achievement.date}</p>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="w-full text-left p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 flex items-center gap-3"
                            >
                                <Plus className="h-4 w-4 text-emerald-400" />
                                <span className="text-sm text-gray-300">Adicionar Curso</span>
                            </button>
                            <button
                                onClick={() => router.push('/metas')}
                                className="w-full text-left p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 flex items-center gap-3"
                            >
                                <Target className="h-4 w-4 text-purple-400" />
                                <span className="text-sm text-gray-300">Definir Meta</span>
                            </button>
                            <button
                                onClick={() => router.push('/relatorios')}
                                className="w-full text-left p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 flex items-center gap-3"
                            >
                                <Calendar className="h-4 w-4 text-green-400" />
                                <span className="text-sm text-gray-300">Ver Relatórios</span>
                            </button>
                        </div>
                    </div>

                    <CourseModals
                        showAddModal={showAddModal}
                        showEditModal={false}
                        showDetailsModal={false}
                        editingCourse={null}
                        detailsCourse={null}
                        onCloseAdd={() => setShowAddModal(false)}
                        onCloseEdit={() => { }}
                        onCloseDetails={() => { }}
                        onSaveCourse={addCourse}
                        onUpdateCourse={() => { }}
                    />
                </div>
            </div>
        </div>
    );
}
