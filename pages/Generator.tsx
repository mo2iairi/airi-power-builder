
import React, { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, DEFAULT_TEMPLATES } from '../constants';
import { UserSettings, ProgramTemplate } from '../types';
import { calculateLoad, getExerciseDisplayName } from '../utils/calculator';
import { Card } from '../components/Card';
import { ChevronDown, ChevronRight, Download, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { getCookie } from '../utils/cookies';

export const Generator: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [template, setTemplate] = useState<ProgramTemplate | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>({});
  const { t, language } = useLanguage();

  useEffect(() => {
    // 1. Load Settings (Cookie first, then LS)
    let currentSettings = DEFAULT_SETTINGS;
    
    const cookieSettings = getCookie('airi_settings');
    if (cookieSettings) {
      try {
        currentSettings = JSON.parse(cookieSettings);
      } catch (e) {
         console.error("Error parsing cookie settings", e);
      }
    } else {
      // Fallback
      const s = localStorage.getItem('airi_settings');
      if (s) {
        try {
          currentSettings = JSON.parse(s);
        } catch(e) {}
      }
    }
    setSettings(currentSettings);

    // 2. Load Templates
    const tStr = localStorage.getItem('airi_templates');
    let allTemplates: ProgramTemplate[] = DEFAULT_TEMPLATES;
    
    if (tStr) {
       try {
         const parsed = JSON.parse(tStr);
         // Ensure it's not the old string-array format
         const isOldFormat = parsed.some((t: any) => 
            t.weeks.some((w: any) => 
              w.days.some((d: any) => 
                d.exercises.length > 0 && typeof d.exercises[0] === 'string'
              )
            )
          );
          if (!isOldFormat) {
            allTemplates = parsed;
          }
       } catch (e) {
         // ignore
       }
    }

    // 3. Find Selected Template
    const selected = allTemplates.find(tpl => tpl.id === currentSettings.selectedTemplateId) || allTemplates[0];
    setTemplate(selected);

    // Default expand first week
    if (selected && selected.weeks.length > 0) {
      setExpandedWeeks({ [selected.weeks[0].id]: true });
    }
  }, []);

  const toggleWeek = (id: string) => {
    setExpandedWeeks(prev => ({...prev, [id]: !prev[id]}));
  }

  const handlePrint = () => {
    window.print();
  }

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
        <AlertCircle size={48} className="mb-4 text-airi-shadow2"/>
        <p className="text-xl font-bold">{t.generator.no_template}</p>
        <Link to="/" className="mt-4 text-airi-base underline">Go to Settings</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="bg-gradient-to-r from-airi-base to-airi-accent p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold mb-2 text-shadow">{template.name}</h1>
          <p className="opacity-90 font-medium">{template.description}</p>
          <div className="mt-4 inline-flex bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold border border-white/40">
            {t.generator.author}: {template.author}
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
           {/* Decorative generic shape */}
           <div className="w-64 h-64 bg-white rounded-full border-8 border-dashed border-airi-shadow2"></div>
        </div>
      </div>

      {template.weeks.map((week, wIdx) => (
        <div key={week.id} className="space-y-4">
          <div 
            onClick={() => toggleWeek(week.id)}
            className="flex items-center cursor-pointer group"
          >
            <div className="bg-white p-2 rounded-full mr-3 shadow-sm border border-airi-skin group-hover:scale-110 transition-transform">
               {expandedWeeks[week.id] ? <ChevronDown className="text-airi-base"/> : <ChevronRight className="text-gray-400"/>}
            </div>
            <h3 className="text-2xl font-bold text-gray-700 group-hover:text-airi-shadow2 transition-colors">
              {week.name}
            </h3>
            <div className="flex-1 border-b-2 border-dotted border-airi-shadow1 ml-4 opacity-30"></div>
          </div>

          {expandedWeeks[week.id] && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {week.days.map((day, dIdx) => (
                <Card key={dIdx} title={day.name} className="h-full transform hover:-translate-y-1 transition-transform duration-300">
                  <ul className="space-y-4">
                    {day.exercises.map((ex, eIdx) => {
                      const load = calculateLoad(ex.name, ex.percent, settings);
                      // Check for bodyweight calc note: simply check if calculation reduced weight (meaning it used the formula)
                      const displayExName = getExerciseDisplayName(ex.name, language);
                      
                      // A simple heuristic to show note if name implies it, or we could check formula result
                      const isBodyweightMove = ex.name.toLowerCase().includes('pull') || displayExName.includes('引体');

                      return (
                        <li key={eIdx} className="flex flex-col bg-airi-skin/30 p-3 rounded-xl border border-transparent hover:border-airi-base transition-colors">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-gray-700">{displayExName}</span>
                            <span className="text-xs font-bold bg-white text-airi-shadow2 px-2 py-1 rounded-full border border-airi-skin shadow-sm">
                              {ex.percent}%
                            </span>
                          </div>
                          
                          <div className="flex items-end justify-between">
                             <div className="text-2xl font-extrabold text-gray-800">
                                {load} <span className="text-sm font-normal text-gray-500">{t.generator.kg}</span>
                             </div>
                             <div className="text-right">
                               <div className="font-bold text-gray-600">{ex.sets} x {ex.reps}</div>
                               {isBodyweightMove && (
                                 <div className="text-[10px] text-gray-400 leading-tight">
                                   {t.generator.load_note}
                                 </div>
                               )}
                             </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-center mt-12">
        <Button onClick={handlePrint} icon={<Download size={20} />} variant="primary">
           {t.generator.export}
        </Button>
      </div>

      <style>{`
        @media print {
          aside { display: none; }
          .no-print { display: none; }
          body { background: white; }
          main { padding: 0; }
        }
      `}</style>
    </div>
  );
};
