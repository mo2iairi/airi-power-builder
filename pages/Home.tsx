
import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgramTemplate, UserSettings, ExerciseType, Language } from '../types';
import { DEFAULT_SETTINGS, DEFAULT_TEMPLATES, BODYWEIGHT_EXERCISES } from '../constants';
import { Save, User, Disc, Heart, LayoutTemplate, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { extractRequiredLifts, getExerciseDisplayName } from '../utils/calculator';
import { getCookie, setCookie } from '../utils/cookies';
import { useNavigate } from 'react-router-dom';
import { loadTemplatesWithDefaults } from '../utils/templates';

export const Home: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [allTemplates, setAllTemplates] = useState<ProgramTemplate[]>(DEFAULT_TEMPLATES);
  const [saved, setSaved] = useState(false);
  const [estimateForm, setEstimateForm] = useState({
    exercise: ExerciseType.Squat,
    weight: 60,
    reps: 5,
    rpe: '9',
  });
  const [estimated1RM, setEstimated1RM] = useState<number | null>(null);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Load Settings and Templates
  useEffect(() => {
    // Load Settings: Try Cookie first, then LocalStorage
    const cookieSettings = getCookie('airi_settings');
    if (cookieSettings) {
      try {
        setSettings(JSON.parse(cookieSettings));
      } catch (e) {
        console.error("Failed to parse settings from cookie", e);
      }
    } else {
      // Fallback/Migration
      const storedSettings = localStorage.getItem('airi_settings');
      if (storedSettings) {
        try {
          const parsed = JSON.parse(storedSettings);
          setSettings(parsed);
          // Auto-migrate to cookie for future
          setCookie('airi_settings', storedSettings, 365);
        } catch (e) {
          console.error("Failed to parse settings from localStorage", e);
        }
      }
    }

    // Load Templates (merge defaults with saved custom ones)
    const templatesFromStorage = loadTemplatesWithDefaults();
    setAllTemplates(templatesFromStorage);
  }, []);

  // Compute required lifts based on currently selected template
  const activeTemplate = allTemplates.find(tpl => tpl.id === settings.selectedTemplateId) || allTemplates[0];
  const requiredLifts = activeTemplate ? extractRequiredLifts(activeTemplate) : [];

  const handleSave = () => {
    const jsonSettings = JSON.stringify(settings);
    // Save to Cookie (valid for 365 days)
    setCookie('airi_settings', jsonSettings, 365);
    // Also save to localStorage as backup
    localStorage.setItem('airi_settings', jsonSettings);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, selectedTemplateId: e.target.value }));
  };

  const handleChange = (field: keyof UserSettings, value: string | number) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handle1RMChange = (liftName: string, value: string) => {
    const numVal = parseFloat(value) || 0;
    setSettings(prev => ({
      ...prev,
      oneRMs: {
        ...prev.oneRMs,
        [liftName]: numVal
      }
    }));
  };

  const createNewTemplate = () => {
    navigate('/template');
  };

  const rpeToRir: Record<string, number> = {
    '10': 0,    // RPE10 = 0 reps in reserve
    '9.5': 0.5,
    '9': 1,
    '8.5': 1.5,
    '8': 2,
    '7.5': 2.5,
    '7': 3,
  };

  const handleEstimateChange = (field: string, value: string) => {
    setEstimateForm(prev => ({ ...prev, [field]: value }));
  };

  const estimateOneRM = () => {
    const weight = parseFloat(String(estimateForm.weight));
    const reps = parseInt(String(estimateForm.reps), 10);
    if (!weight || !reps || weight <= 0 || reps <= 0) {
      setEstimated1RM(null);
      return;
    }
    const rir = rpeToRir[estimateForm.rpe] ?? 0;
    const repsToFailure = reps + rir;
    const isBodyweightMove = BODYWEIGHT_EXERCISES.includes(estimateForm.exercise as ExerciseType);
    const liftedWeight = isBodyweightMove ? settings.bodyWeight + weight : weight; // treat pull-ups as BW + external load
    const estTotal1RM = liftedWeight * (1 + repsToFailure / 30); // Epley with RIR adjustment
    const estExternal1RM = isBodyweightMove ? Math.max(estTotal1RM - settings.bodyWeight, 0) : estTotal1RM;
    const value = Math.round(estExternal1RM * 100) / 100;
    setEstimated1RM(value);
  };

  const rpeOptions = [
    { value: '10', labelZh: '极限 (RPE10)', labelEn: 'Max effort (RPE10)' },
    { value: '9.5', labelZh: '几乎极限 (RPE9.5)', labelEn: 'Near max (RPE9.5)' },
    { value: '9', labelZh: '吃力 (RPE9)', labelEn: 'Hard (RPE9)' },
    { value: '8.5', labelZh: '较吃力 (RPE8.5)', labelEn: 'Fairly hard (RPE8.5)' },
    { value: '8', labelZh: '有余力 (RPE8)', labelEn: 'Some reps left (RPE8)' },
    { value: '7.5', labelZh: '轻松 (RPE7.5)', labelEn: 'Easy (RPE7.5)' },
    { value: '7', labelZh: '非常轻松 (RPE7)', labelEn: 'Very easy (RPE7)' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">

      <div className="grid grid-cols-1 gap-6">
        {/* Template Selection */}
        <Card title={t.home.select_template} className="border-airi-base/50">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <LayoutTemplate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-airi-shadow2" size={20} />
              <select 
                value={settings.selectedTemplateId}
                onChange={handleTemplateChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-airi-skin rounded-xl focus:border-airi-base focus:ring-2 focus:ring-airi-base/50 outline-none appearance-none bg-white font-bold text-gray-700"
              >
                {allTemplates.map(tpl => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name} ({tpl.author})
                  </option>
                ))}
              </select>
            </div>
            <Button variant="secondary" onClick={createNewTemplate} icon={<Plus size={16}/>} className="whitespace-nowrap w-full md:w-auto">
              {t.home.create_new}
            </Button>
          </div>
          {activeTemplate && (
            <div className="mt-4 p-4 bg-airi-skin/30 rounded-xl">
              <p className="text-sm text-gray-600 font-bold">{activeTemplate.description}</p>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Stats */}
          <Card title={t.home.trainer_stats}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1 flex items-center">
                  <User size={16} className="mr-2 text-airi-shadow2" /> {t.home.body_weight}
                </label>
                <input
                  type="number"
                  value={settings.bodyWeight}
                  onChange={(e) => handleChange('bodyWeight', parseFloat(e.target.value))}
                  className="w-full p-3 border-2 border-airi-skin rounded-xl focus:border-airi-base focus:ring-2 focus:ring-airi-base/50 outline-none transition-colors text-lg font-bold text-gray-600 bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">{t.home.body_weight_desc}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1 flex items-center">
                  <Disc size={16} className="mr-2 text-airi-shadow2" /> {t.home.smallest_plate}
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={settings.smallestPlate}
                  onChange={(e) => handleChange('smallestPlate', parseFloat(e.target.value))}
                  className="w-full p-3 border-2 border-airi-skin rounded-xl focus:border-airi-base focus:ring-2 focus:ring-airi-base/50 outline-none transition-colors text-lg font-bold text-gray-600 bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">{t.home.smallest_plate_desc}</p>
              </div>
            </div>
          </Card>

          {/* Dynamic 1RMs */}
          <Card title={t.home.onerm_title}>
            <p className="text-xs text-gray-400 mb-4">{t.home.onerm_desc}</p>
            {requiredLifts.length === 0 ? (
               <div className="text-center py-8 text-gray-400 italic">No weighted exercises detected in this template.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {requiredLifts.map((lift) => (
                  <div key={lift}>
                    <label className="block text-sm font-bold text-gray-600 mb-1 capitalize truncate" title={lift}>
                      {getExerciseDisplayName(lift, language)}
                    </label>
                    <input
                      type="number"
                      value={settings.oneRMs[lift] || ''}
                      placeholder="0"
                      onChange={(e) => handle1RMChange(lift, e.target.value)}
                      className="w-full p-2 border-2 border-airi-skin rounded-lg focus:border-airi-base focus:ring-1 focus:ring-airi-base outline-none font-medium bg-white text-gray-600"
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* 1RM Estimator */}
      <Card title={t.home.estimator_title} className="border-airi-base/50">
        <p className="text-sm text-gray-600 mb-4">{t.home.estimator_desc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{t.home.estimator_exercise}</label>
            <select
              value={estimateForm.exercise}
              onChange={(e) => handleEstimateChange('exercise', e.target.value)}
              className="w-full p-3 border-2 border-airi-skin rounded-xl focus:border-airi-base focus:ring-2 focus:ring-airi-base/30 outline-none bg-white font-bold text-gray-700"
            >
              {Object.values(ExerciseType).map(type => (
                <option key={type} value={type}>
                  {getExerciseDisplayName(type, language)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{t.home.estimator_weight}</label>
            <input
              type="number"
              value={estimateForm.weight}
              onChange={(e) => handleEstimateChange('weight', e.target.value)}
              className="w-full p-3 border-2 border-airi-skin rounded-xl focus:border-airi-base focus:ring-2 focus:ring-airi-base/30 outline-none bg-white text-gray-700 font-bold"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{t.home.estimator_reps}</label>
            <input
              type="number"
              value={estimateForm.reps}
              onChange={(e) => handleEstimateChange('reps', e.target.value)}
              className="w-full p-3 border-2 border-airi-skin rounded-xl focus:border-airi-base focus:ring-2 focus:ring-airi-base/30 outline-none bg-white text-gray-700 font-bold"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">{t.home.estimator_rpe}</label>
            <select
              value={estimateForm.rpe}
              onChange={(e) => handleEstimateChange('rpe', e.target.value)}
              className="w-full p-3 border-2 border-airi-skin rounded-xl focus:border-airi-base focus:ring-2 focus:ring-airi-base/30 outline-none bg-white font-bold text-gray-700"
            >
              {rpeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {language === Language.ZH ? opt.labelZh : opt.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          <Button variant="secondary" onClick={estimateOneRM} className="px-6">
            {t.home.estimator_calc}
          </Button>
          <div className="text-lg font-bold text-gray-700">
            {t.home.estimator_result}：
            <span className="ml-2 text-2xl text-airi-base">
              {estimated1RM !== null ? `${estimated1RM} kg` : '--'}
            </span>
          </div>
        </div>
      </Card>

      <div className="flex justify-center pt-4 pb-8">
        <Button onClick={handleSave} icon={<Save size={20} />} className="w-full md:w-auto md:px-12 py-3 text-lg">
          {saved ? t.home.saved : t.home.save}
        </Button>
      </div>
    </div>
  );
};
