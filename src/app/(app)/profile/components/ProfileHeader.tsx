import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Calendar, Edit2, Mail, Save, X } from "lucide-react";
import { useState } from "react";
import AvatarUpload from "./AvatarUpload";

type ProfileHeaderProps = {
    profile: User;
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;
    setEditedProfile: (profile: Partial<User>) => void;
    handleSave: () => void;
    onAvatarChange: (file: File) => void;
}

export default function ProfileHeader({
    profile,
    isEditing,
    setIsEditing,
    setEditedProfile,
    handleSave,
    onAvatarChange,
}: ProfileHeaderProps) {
    const [characterCount, setCharacterCount] = useState<number>((profile?.description ?? '').length);

    const handleCancel = () => {
        setEditedProfile(profile);
        setCharacterCount(profile.description ? profile.description.length : 0);
        setIsEditing(false);
    };

    const handleDescriptionChange = (value: string) => {
        if (value.length <= 340) {
            setEditedProfile({ description: value });
            setCharacterCount(value.length);
        }
    };

    const planColors: Record<string, string> = {
        FREE: "bg-gray-700 text-gray-200 border border-gray-500",
        GOLD: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40",
        PLATINUM: "bg-emerald-600/20 text-emerald-400 border border-emerald-500/40",
    };

    const planStyle =
        planColors[profile.subscriptionPlan] ||
        "bg-gray-700 text-gray-200 border border-gray-500";

    return (
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700/50 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar Section */}
                <div className="relative flex flex-row flex-wrap align-center">
                    <AvatarUpload
                        currentImage={`${process.env.NEXT_PUBLIC_IMAGE_URL}${profile.profileImage}`}
                        onSave={onAvatarChange}
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-4 flex-wrap sm:no-wrap">
                        <div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={profile.firstName || profile.firstName}
                                    onChange={(e) => setEditedProfile({ firstName: e.target.value })}
                                    className="text-2xl font-bold bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    placeholder="Seu nome"
                                />
                            ) : (
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-bold text-white">{profile.firstName}</h1>
                                    <span
                                        className={cn(
                                            "px-3 py-1 text-xs font-semibold rounded-full",
                                            planStyle
                                        )}
                                    >
                                        {profile.subscriptionPlan.toLocaleLowerCase().replace(/^\w/, (char) => char.toUpperCase())}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-400 mt-1">
                                <Mail className="h-4 w-4" />
                                <span>{profile.email}</span>
                            </div>
                        </div>

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                <Edit2 className="h-4 w-4" />
                                Editar Perfil
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                >
                                    <Save className="h-4 w-4" />
                                    Salvar
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                >
                                    <X className="h-4 w-4" />
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2 mb-2 flex-col">
                        {isEditing && (
                            <>
                                <input
                                    name="website"
                                    type="text"
                                    value={profile.website || ''}
                                    onChange={(e) => setEditedProfile({ website: e.target.value })}
                                    placeholder="Website"
                                    className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white w-full sm:w-auto focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                />
                                <input
                                    name="github"
                                    type="text"
                                    value={profile.github || ''}
                                    onChange={(e) => setEditedProfile({ github: e.target.value })}
                                    placeholder="GitHub"
                                    className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white w-full sm:w-auto focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                />
                                <input
                                    name="linkedin"
                                    type="text"
                                    value={profile.linkedin || ''}
                                    onChange={(e) => setEditedProfile({ linkedin: e.target.value })}
                                    placeholder="LinkedIn"
                                    className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white w-full sm:w-auto focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                />
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        {isEditing ? (
                            <div>
                                <textarea
                                    value={profile.description ?? ""}
                                    onChange={(e) => handleDescriptionChange(e.target.value)}
                                    rows={4}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                                    placeholder="Conte um pouco sobre você e seus objetivos de aprendizado..."
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>Máximo 340 caracteres</span>
                                    <span className={cn(
                                        characterCount > 340 ? "text-red-400" : "text-gray-400"
                                    )}>
                                        {characterCount}/340
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-300 leading-relaxed">{profile.description}</p>
                        )}
                    </div>

                    {/* Location and Website */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        {!isEditing ? (
                            <>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>Membro desde {new Date(profile.createdAt).toLocaleDateString()}</span>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}