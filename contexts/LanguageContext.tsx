
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

export const translations = {
  en: {
    nav: {
      settings: "Settings & Profile",
      editor: "Template Editor",
      generate: "Generate Plan",
      subtitle: "BUILDER",
      ver: "0.0.1 Ver."
    },
    home: {
      select_template: "Select Template",
      create_new: "+ Create New Template",
      trainer_stats: "Trainer Stats",
      estimator_title: "1RM Estimator",
      estimator_desc: "Input your latest set to estimate your 1RM.",
      estimator_exercise: "Exercise",
      estimator_weight: "Weight (kg)",
      estimator_reps: "Reps",
      estimator_rpe: "Perceived Effort",
      estimator_result: "Estimated 1RM",
      estimator_calc: "Estimate",
      body_weight: "Body Weight (kg)",
      body_weight_desc: "Used for Squat/Pull-up calculations.",
      smallest_plate: "Smallest Plate (kg)",
      smallest_plate_desc: "Rounding step will be double this.",
      onerm_title: "1RM Records (kg)",
      onerm_desc: "Please fill in 1RM for exercises used in the selected template.",
      save: "Save Profile",
      saved: "Saved!"
    },
    editor: {
      title: "Template Editor",
      description: "Visually design your training weeks.",
      new_template: "New Template",
      delete_template: "Delete Template",
      template_name: "Template Name",
      template_author: "Author",
      template_desc: "Description",
      add_week: "Add Week",
      delete_week: "Remove Week",
      week_name: "Week Name",
      add_day: "Add Day",
      delete_day: "Remove Day",
      day_name: "Day Name",
      add_exercise: "Add Exercise",
      ex_name: "Exercise Name",
      ex_int: "Intensity %",
      ex_sets: "Sets",
      ex_reps: "Reps",
      save: "Save Template",
      save_success: "Template saved!",
      delete_confirm: "Are you sure you want to delete this template?",
      preview_raw: "Preview JSON"
    },
    generator: {
      title: "Your Training Plan",
      author: "Author",
      failed_parse: "Failed to parse",
      load_note: "(Load = Total - BW)",
      export: "Export / Print Plan",
      kg: "kg",
      no_template: "No template found. Please go to Settings."
    }
  },
  zh: {
    nav: {
      settings: "设置与档案",
      editor: "模板编辑",
      generate: "生成计划",
      subtitle: "构建器",
      ver: "0.0.1 Ver."
    },
    home: {
      select_template: "选择计划模板",
      create_new: "+ 新建模板",
      trainer_stats: "训练者数据",
      estimator_title: "1RM 估算",
      estimator_desc: "输入你最近的一组来估算 1RM。",
      estimator_exercise: "动作",
      estimator_weight: "负重 (kg)",
      estimator_reps: "次数",
      estimator_rpe: "做完后的感受",
      estimator_result: "估算 1RM",
      estimator_calc: "生成预估值",
      body_weight: "体重 (kg)",
      body_weight_desc: "用于计算深蹲/引体向上。",
      smallest_plate: "最小杠铃片 (kg)",
      smallest_plate_desc: "计算结果将以该值的两倍为步进取整。",
      onerm_title: "1RM 极限数据 (kg)",
      onerm_desc: "请根据当前所选模板填写对应动作的极限重量。",
      save: "保存档案",
      saved: "已保存!"
    },
    editor: {
      title: "模板编辑",
      description: "可视化设计你的训练周期。",
      new_template: "新建模板",
      delete_template: "删除当前模板",
      template_name: "模板名称",
      template_author: "作者",
      template_desc: "描述",
      add_week: "添加周",
      delete_week: "删除周",
      week_name: "周名称",
      add_day: "添加日",
      delete_day: "删除日",
      day_name: "日名称",
      add_exercise: "添加动作",
      ex_name: "动作名称",
      ex_int: "强度%",
      ex_sets: "组数",
      ex_reps: "次数",
      save: "保存模板",
      save_success: "模板已保存！",
      delete_confirm: "确定要删除这个模板吗？",
      preview_raw: "预览 JSON"
    },
    generator: {
      title: "你的训练计划",
      author: "作者",
      failed_parse: "解析失败",
      load_note: "(负重 = 总重 - 自重)",
      export: "导出 / 打印计划",
      kg: "kg",
      no_template: "未找到模板，请先去设置页选择。"
    }
  }
};

type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(Language.ZH);

  useEffect(() => {
    const stored = localStorage.getItem('airi_language');
    if (stored === 'en' || stored === 'zh') {
      setLanguageState(stored as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('airi_language', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
