import { DEFAULT_TEMPLATES } from '../constants';
import { ProgramTemplate } from '../types';

const isOldTemplateFormat = (templates: any[]): boolean => {
  return templates.some((t: any) =>
    t.weeks?.some((w: any) =>
      w.days?.some(
        (d: any) => Array.isArray(d.exercises) && d.exercises.length > 0 && typeof d.exercises[0] === 'string'
      )
    )
  );
};

/**
 * Merge user templates with the latest built-in defaults by ID to avoid losing new shipped templates.
 */
export const mergeDefaultTemplates = (templates: ProgramTemplate[]): ProgramTemplate[] => {
  const map = new Map(templates.map((t) => [t.id, t]));
  DEFAULT_TEMPLATES.forEach((tpl) => {
    if (!map.has(tpl.id)) {
      map.set(tpl.id, tpl);
    }
  });
  return Array.from(map.values());
};

/**
 * Load templates from localStorage, auto-upgrading old formats and injecting missing defaults.
 */
export const loadTemplatesWithDefaults = (): ProgramTemplate[] => {
  const storedTemplates = localStorage.getItem('airi_templates');
  if (!storedTemplates) {
    localStorage.setItem('airi_templates', JSON.stringify(DEFAULT_TEMPLATES));
    return DEFAULT_TEMPLATES;
  }

  try {
    const parsed = JSON.parse(storedTemplates);

    if (!Array.isArray(parsed) || isOldTemplateFormat(parsed)) {
      localStorage.setItem('airi_templates', JSON.stringify(DEFAULT_TEMPLATES));
      return DEFAULT_TEMPLATES;
    }

    const merged = mergeDefaultTemplates(parsed);
    if (merged.length !== parsed.length) {
      localStorage.setItem('airi_templates', JSON.stringify(merged));
    }
    return merged;
  } catch (e) {
    localStorage.setItem('airi_templates', JSON.stringify(DEFAULT_TEMPLATES));
    return DEFAULT_TEMPLATES;
  }
};
