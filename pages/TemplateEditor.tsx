import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { DEFAULT_TEMPLATES } from '../constants';
import { ProgramTemplate, Week, Day, ExerciseType } from '../types';
import { Save, Plus, Trash2, ChevronDown, ChevronRight, FileJson, Layout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getExerciseDisplayName } from '../utils/calculator';
import { loadTemplatesWithDefaults } from '../utils/templates';

export const TemplateEditor: React.FC = () => {
  const [templates, setTemplates] = useState<ProgramTemplate[]>(DEFAULT_TEMPLATES);
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_TEMPLATES[0].id);
  const [showJson, setShowJson] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { t, language } = useLanguage();

  // Load from local storage on mount
  useEffect(() => {
    const parsed = loadTemplatesWithDefaults();
    setTemplates(parsed);
    if (parsed.length > 0) setSelectedId(parsed[0].id);
  }, []);

  const currentTemplate = templates.find(t => t.id === selectedId) || templates[0];

  const saveToStorage = (newTemplates: ProgramTemplate[]) => {
    setTemplates(newTemplates);
    localStorage.setItem('airi_templates', JSON.stringify(newTemplates));
  };

  const handleCreateTemplate = () => {
    const newId = `custom-${Date.now()}`;
    const newTemplate: ProgramTemplate = {
      id: newId,
      name: "New Program",
      author: "User",
      description: "Custom program description",
      weeks: []
    };
    const updated = [...templates, newTemplate];
    saveToStorage(updated);
    setSelectedId(newId);
  };

  const handleDeleteTemplate = () => {
    if (templates.length <= 1) return; // Prevent deleting last one
    if (!window.confirm(t.editor.delete_confirm)) return;
    
    const updated = templates.filter(t => t.id !== selectedId);
    saveToStorage(updated);
    setSelectedId(updated[0].id);
  };

  const updateTemplate = (updates: Partial<ProgramTemplate>) => {
    const updated = templates.map(t => t.id === selectedId ? { ...t, ...updates } : t);
    saveToStorage(updated);
  };

  const handleSave = () => {
    setSuccessMsg(t.editor.save_success);
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  // --- Helpers for Weeks/Days/Exercises ---

  const addWeek = () => {
    const newWeek: Week = {
      name: `Week ${currentTemplate.weeks.length + 1}`,
      days: []
    };
    updateTemplate({ weeks: [...currentTemplate.weeks, newWeek] });
  };

  const removeWeek = (weekIdx: number) => {
    const newWeeks = [...currentTemplate.weeks];
    newWeeks.splice(weekIdx, 1);
    updateTemplate({ weeks: newWeeks });
  };

  const updateWeek = (weekIdx: number, updates: Partial<Week>) => {
    const newWeeks = currentTemplate.weeks.map((w, idx) => idx === weekIdx ? { ...w, ...updates } : w);
    updateTemplate({ weeks: newWeeks });
  };

  const addDay = (weekIdx: number) => {
    const week = currentTemplate.weeks[weekIdx];
    if (!week) return;
    const newDay: Day = {
      name: `Day ${week.days.length + 1}`,
      exercises: []
    };
    updateWeek(weekIdx, { days: [...week.days, newDay] });
  };

  const removeDay = (weekIdx: number, dayIdx: number) => {
    const week = currentTemplate.weeks[weekIdx];
    if (!week) return;
    const newDays = [...week.days];
    newDays.splice(dayIdx, 1);
    updateWeek(weekIdx, { days: newDays });
  };

  const updateDay = (weekIdx: number, dayIdx: number, updates: Partial<Day>) => {
    const week = currentTemplate.weeks[weekIdx];
    if (!week) return;
    const newDays = week.days.map((d, idx) => idx === dayIdx ? { ...d, ...updates } : d);
    updateWeek(weekIdx, { days: newDays });
  };

  // Structured Exercise Update
  const updateExercise = (weekIdx: number, dayIdx: number, exIdx: number, field: string, value: string | number) => {
    const week = currentTemplate.weeks[weekIdx];
    if (!week) return;
    const day = week.days[dayIdx];
    
    const newExList = [...day.exercises];
    // Create shallow copy of exercise object
    newExList[exIdx] = { ...newExList[exIdx], [field]: value };
    
    updateDay(weekIdx, dayIdx, { exercises: newExList });
  };

  const addExercise = (weekIdx: number, dayIdx: number) => {
    const week = currentTemplate.weeks[weekIdx];
    if (!week) return;
    const day = week.days[dayIdx];
    const newExList = [...day.exercises, { name: ExerciseType.Squat, percent: 80, sets: 5, reps: 5 }];
    updateDay(weekIdx, dayIdx, { exercises: newExList });
  };

  const removeExercise = (weekIdx: number, dayIdx: number, exIdx: number) => {
    const week = currentTemplate.weeks[weekIdx];
    if (!week) return;
    const day = week.days[dayIdx];
    const newExList = [...day.exercises];
    newExList.splice(exIdx, 1);
    updateDay(weekIdx, dayIdx, { exercises: newExList });
  };


  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-airi-skin flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-700 flex items-center">
            <Layout className="text-airi-base mr-3" />
            {t.editor.title}
          </h2>
          <p className="text-gray-500 mt-2">{t.editor.description}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select 
            className="p-2 border-2 border-airi-skin rounded-lg font-bold text-gray-600 outline-none focus:border-airi-base bg-white"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <Button variant="secondary" onClick={handleCreateTemplate} icon={<Plus size={18}/>}>{t.editor.new_template}</Button>
          <Button variant="danger" onClick={handleDeleteTemplate} icon={<Trash2 size={18}/>} disabled={templates.length <= 1}></Button>
          <Button onClick={handleSave} icon={<Save size={18}/>}>{t.editor.save}</Button>
        </div>
      </div>

      {successMsg && (
           <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded animate-fade-in">
           <p className="font-bold">{successMsg}</p>
         </div>
      )}

      {/* Editor Main Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Template Meta */}
        <div className="space-y-6">
           <Card title="Template Info">
             <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">{t.editor.template_name}</label>
                  <input className="w-full p-2 border-2 border-airi-skin rounded-lg bg-white text-gray-900" value={currentTemplate.name} onChange={(e) => updateTemplate({name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">{t.editor.template_author}</label>
                  <input className="w-full p-2 border-2 border-airi-skin rounded-lg bg-white text-gray-900" value={currentTemplate.author} onChange={(e) => updateTemplate({author: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">{t.editor.template_desc}</label>
                  <textarea className="w-full p-2 border-2 border-airi-skin rounded-lg h-24 resize-none bg-white text-gray-900" value={currentTemplate.description} onChange={(e) => updateTemplate({description: e.target.value})} />
                </div>
                <div className="pt-4 border-t border-dashed border-gray-200">
                  <button onClick={() => setShowJson(!showJson)} className="flex items-center text-sm text-gray-500 hover:text-airi-base">
                    <FileJson size={14} className="mr-1"/> {t.editor.preview_raw}
                  </button>
                  {showJson && (
                    <textarea className="w-full mt-2 h-40 text-xs font-mono bg-gray-50 p-2 rounded" readOnly value={JSON.stringify(currentTemplate, null, 2)} />
                  )}
                </div>
             </div>
           </Card>
           
           <div className="flex justify-center">
             <Button onClick={addWeek} variant="secondary" className="w-full border-dashed border-4 border-airi-shadow1 bg-transparent hover:bg-white text-airi-shadow2">
               <Plus size={20} className="mr-2"/> {t.editor.add_week}
             </Button>
           </div>
        </div>

        {/* Right Column: Weeks & Days */}
        <div className="lg:col-span-2 space-y-6">
           {currentTemplate.weeks.map((week, wIdx) => (
             <Card key={`week-${wIdx}`} className="border-airi-base/30 relative">
               <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="bg-airi-base text-white text-xs font-bold px-2 py-1 rounded">WEEK {wIdx + 1}</span>
                    <input 
                      className="font-bold text-lg text-gray-700 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-airi-base focus:outline-none focus:bg-white" 
                      value={week.name} 
                      onChange={(e) => updateWeek(wIdx, {name: e.target.value})}
                      placeholder={t.editor.week_name}
                    />
                  </div>
                  <button onClick={() => removeWeek(wIdx)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
               </div>

               <div className="space-y-4">
                 {week.days.map((day, dIdx) => (
                   <div key={dIdx} className="bg-airi-skin/20 rounded-xl p-4 border border-airi-skin">
                     <div className="flex justify-between items-center mb-3">
                        <input 
                          className="font-bold text-gray-600 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-airi-base focus:outline-none w-full mr-4 focus:bg-white" 
                          value={day.name} 
                          onChange={(e) => updateDay(wIdx, dIdx, {name: e.target.value})}
                          placeholder={t.editor.day_name}
                        />
                        <button onClick={() => removeDay(wIdx, dIdx)} className="text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                     </div>
                     
                     <div className="space-y-2">
                       {day.exercises.map((ex, eIdx) => {
                         return (
                           <div key={eIdx} className="flex flex-wrap gap-2 items-center bg-white p-2 rounded-lg shadow-sm">
                             {/* Exercise Name Dropdown to Enforce Enum */}
                             <select 
                               className="flex-grow min-w-[120px] p-1 border rounded text-sm font-bold text-gray-600 bg-white"
                               value={ex.name}
                               onChange={(e) => updateExercise(wIdx, dIdx, eIdx, 'name', e.target.value)}
                             >
                               {Object.values(ExerciseType).map(type => (
                                 <option key={type} value={type}>
                                   {getExerciseDisplayName(type, language)}
                                 </option>
                               ))}
                             </select>

                             <div className="flex items-center">
                               <input 
                                  type="number" 
                                  className="w-12 p-1 border rounded text-sm text-center bg-white text-gray-600" 
                                  value={ex.percent} 
                                  onChange={(e) => updateExercise(wIdx, dIdx, eIdx, 'percent', parseFloat(e.target.value) || 0)} 
                               />
                               <span className="ml-1 text-xs text-gray-500">%</span>
                             </div>
                             <div className="flex items-center gap-1">
                               <input 
                                  type="number" 
                                  className="w-10 p-1 border rounded text-sm text-center bg-white text-gray-600" 
                                  value={ex.sets} 
                                  onChange={(e) => updateExercise(wIdx, dIdx, eIdx, 'sets', parseFloat(e.target.value) || 0)} 
                               />
                               <span className="text-xs">x</span>
                               <input 
                                  type="number" 
                                  className="w-10 p-1 border rounded text-sm text-center bg-white text-gray-600" 
                                  value={ex.reps} 
                                  onChange={(e) => updateExercise(wIdx, dIdx, eIdx, 'reps', parseFloat(e.target.value) || 0)} 
                               />
                             </div>
                             <button onClick={() => removeExercise(wIdx, dIdx, eIdx)} className="ml-auto text-gray-300 hover:text-red-500"><Trash2 size={14}/></button>
                           </div>
                         );
                       })}
                       <button onClick={() => addExercise(wIdx, dIdx)} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm hover:border-airi-base hover:text-airi-base transition-colors flex justify-center items-center">
                         <Plus size={14} className="mr-1"/> {t.editor.add_exercise}
                       </button>
                     </div>
                   </div>
                 ))}
                 <div className="flex justify-end">
                   <Button variant="secondary" onClick={() => addDay(wIdx)} className="text-sm py-1 px-3">
                     <Plus size={14} className="mr-1"/> {t.editor.add_day}
                   </Button>
                 </div>
               </div>
             </Card>
           ))}
        </div>
      </div>
    </div>
  );
};
