import { LinkIcon } from "lucide-react";

type socialInfoProps = {
    profile: {
        github?: string;
        linkedin?: string;
        website?: string;
    }
}

export default function SocialInfo({ profile }: socialInfoProps) {
    return (
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 max-h-[392px]">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-emerald-400" />
                Redes Sociais
            </h2>
            <div className="space-y-4">
                {profile.github && (
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-600/30 transition-colors duration-200"
                    >
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">GH</span>
                        </div>
                        <div>
                            <div className="text-white font-medium">GitHub</div>
                            <div className="text-gray-400 text-sm">{profile.github.replace('https://', '')}</div>
                        </div>
                    </a>
                )}

                {profile.linkedin && (
                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-600/30 transition-colors duration-200"
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">IN</span>
                        </div>
                        <div>
                            <div className="text-white font-medium">LinkedIn</div>
                            <div className="text-gray-400 text-sm">{profile.linkedin.replace('https://', '')}</div>
                        </div>
                    </a>
                )}

                {profile.website && (
                    <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-600/30 transition-colors duration-200"
                    >
                        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">W</span>
                        </div>
                        <div>
                            <div className="text-white font-medium">website</div>
                            <div className="text-gray-400 text-sm">{profile.website.replace('https://', '')}</div>
                        </div>
                    </a>
                )}
            </div>
        </div>
    )
}