import { DEFAULT_TEMPLATES } from '../constants';
import { ProgramTemplate } from '../types';

const defaultTemplateIds = new Set(DEFAULT_TEMPLATES.map((t) => t.id));

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
 * Merge user templates with the latest built-in defaults.
 * System templates always win; persisted copies with the same id are discarded.
 */
export const mergeDefaultTemplates = (templates: ProgramTemplate[]): ProgramTemplate[] => {
  const customOnly = templates.filter((t) => !defaultTemplateIds.has(t.id));
  return [...DEFAULT_TEMPLATES, ...customOnly];
};

/**
 * Load templates from localStorage, auto-upgrading old formats and injecting missing defaults.
 */
export const loadTemplatesWithDefaults = (): ProgramTemplate[] => {
  const storedTemplates = localStorage.getItem('airi_templates');
  if (!storedTemplates) {
    // Nothing cached yet; serve built-ins and keep storage empty so system templates stay immutable.
    localStorage.setItem('airi_templates', JSON.stringify([]));
    return DEFAULT_TEMPLATES;
  }

  try {
    const parsed = JSON.parse(storedTemplates);

    if (!Array.isArray(parsed) || isOldTemplateFormat(parsed)) {
      localStorage.setItem('airi_templates', JSON.stringify([]));
      return DEFAULT_TEMPLATES;
    }

    const merged = mergeDefaultTemplates(parsed);

    // Persist only custom templates; defaults stay source-of-truth in constants.
    const customOnly = merged.filter((t) => !defaultTemplateIds.has(t.id));
    if (customOnly.length !== parsed.length) {
      localStorage.setItem('airi_templates', JSON.stringify(customOnly));
    }
    return merged;
  } catch (e) {
    localStorage.setItem('airi_templates', JSON.stringify([]));
    return DEFAULT_TEMPLATES;
  }
};
