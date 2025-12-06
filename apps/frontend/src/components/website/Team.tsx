import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { TeamMember } from '../../types/homepage';
import backupUser from '../../assets/backupUser.jpeg';

interface TeamProps {
  content: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    members: TeamMember[];
    story?: string;
  };
}

export function Team({ content }: TeamProps) {
  const teamMembers = content.members ?? [];

  return (
    <section id="team" className="py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          {content.eyebrow && (
            <div className="inline-block mb-2">
              <div className="flex items-center gap-2 text-yellow-400 text-sm uppercase tracking-wider">
                <div className="w-8 h-px bg-yellow-400"></div>
                {content.eyebrow}
                <div className="w-8 h-px bg-yellow-400"></div>
              </div>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl text-black dark:text-white mb-4">
            {content.heading}
          </h2>
          {content.subheading && (
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {content.subheading}
            </p>
          )}
        </div>

        {/* Team Grid - improved visual hierarchy (Law of Common Region) */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-zinc-50 dark:bg-zinc-800 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageWithFallback
                  src={member.imageUrl ?? backupUser}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />

                {/* Subtle checkered grid overlay - top right with fade (visible when not hovered) */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-30 group-hover:opacity-0 transition-opacity duration-500"
                  style={{
                    maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, transparent 70%)',
                    WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, transparent 70%)'
                  }}
                >
                  <div className="grid grid-cols-8 grid-rows-8 h-full">
                    {[...Array(64)].map((_, i) => (
                      <div key={i} className={(i + Math.floor(i / 8)) % 2 === 0 ? 'bg-white' : 'bg-transparent'}></div>
                    ))}
                  </div>
                </div>

                {/* Yellow accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400"></div>

                {/* Icon badge with wrench */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-400 text-black flex items-center justify-center">
                  <div className="w-6 h-6 relative">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content - improved hierarchy and spacing (Visual Hierarchy) */}
              <div className="p-8">
                <h3 className="text-2xl text-black dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-yellow-400 mb-4">
                  {member.role}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                  {member.experience}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {member.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Company Story */}
        <div className="relative">
          {/* Diagonal background element */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-yellow-400"></div>

          <div className="bg-zinc-50 dark:bg-zinc-800 p-12 md:p-16 ml-8">
            <div className="max-w-4xl">
              <div className="inline-block bg-yellow-400 text-black px-4 py-1 text-sm mb-6">
                Seit 2001
              </div>

              <h3 className="text-3xl md:text-4xl text-black dark:text-white mb-6">
                Über 20 Jahre Leidenschaft für Motorräder
              </h3>

              {content.story ? (
                <div
                  className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content.story }}
                />
              ) : (
                <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <p>
                    Was 2001 als kleine Werkstatt begann, ist heute eine etablierte Adresse für Motorradbegeisterte in der Region Rüti. Mit über 20 Jahren Erfahrung bieten wir professionellen Service für alle Motorradmarken.
                  </p>
                  <p>
                    Als offizielle Vertretung von Suzuki, NIU und Beta Racing kombinieren wir fundiertes Fachwissen mit modernster Technik. Gleichzeitig pflegen wir die Kunst der traditionellen Motorradmechanik – besonders bei Oldtimern und Veteranen.
                  </p>
                  <p>
                    Unser 3-köpfiges Team vereint unterschiedliche Spezialisierungen, sodass wir für jedes Anliegen den richtigen Experten haben.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
