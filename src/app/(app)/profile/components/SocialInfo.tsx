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
    <div className="bg-[color:var(--social-info-bg,#23272f)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[color:var(--social-info-border,#52525b)]/50 max-h-[392px]">
            <h2 className="text-xl font-semibold text-[color:var(--social-info-title,#fff)] mb-6 flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-[color:var(--social-info-icon,#34d399)]" />
                Redes Sociais
            </h2>
            <div className="space-y-4">
                {profile.github && (
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-[color:var(--social-info-item-bg,#23272f)]/30 rounded-lg hover:bg-[color:var(--social-info-item-hover-bg,#52525b)]/30 transition-colors duration-200"
                    >
                            <div className="w-8 h-8 bg-[color:var(--social-info-item-icon-bg,#52525b)] rounded-full flex items-center justify-center">
                                <span className="text-[color:var(--social-info-item-icon,#fff)] text-sm font-bold">GH</span>
                        </div>
                        <div>
                            <div className="text-[color:var(--social-info-item-title,#fff)] font-medium">GitHub</div>
                            <div className="text-[color:var(--social-info-item-meta,#a3a3a3)] text-sm">{profile.github.replace('https://', '')}</div>
                        </div>
                    </a>
                )}

                {profile.linkedin && (
                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-[color:var(--social-info-item-bg,#23272f)]/30 rounded-lg hover:bg-[color:var(--social-info-item-hover-bg,#52525b)]/30 transition-colors duration-200"
                    >
                            <div className="w-8 h-8 bg-[color:var(--social-info-item-icon-bg-linkedin,#2563eb)] rounded-full flex items-center justify-center">
                                <span className="text-[color:var(--social-info-item-icon,#fff)] text-sm font-bold">IN</span>
                        </div>
                        <div>
                            <div className="text-[color:var(--social-info-item-title,#fff)] font-medium">LinkedIn</div>
                            <div className="text-[color:var(--social-info-item-meta,#a3a3a3)] text-sm">{profile.linkedin.replace('https://', '')}</div>
                        </div>
                    </a>
                )}

                {profile.website && (
                    <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-[color:var(--social-info-item-bg,#23272f)]/30 rounded-lg hover:bg-[color:var(--social-info-item-hover-bg,#52525b)]/30 transition-colors duration-200"
                    >
                            <div className="w-8 h-8 bg-[color:var(--social-info-item-icon-bg-website,#60a5fa)] rounded-full flex items-center justify-center">
                                <span className="text-[color:var(--social-info-item-icon,#fff)] text-sm font-bold">W</span>
                        </div>
                        <div>
                            <div className="text-[color:var(--social-info-item-title,#fff)] font-medium">website</div>
                            <div className="text-[color:var(--social-info-item-meta,#a3a3a3)] text-sm">{profile.website.replace('https://', '')}</div>
                        </div>
                    </a>
                )}
            </div>
        </div>
    )
}