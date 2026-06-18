/** A selectable language in the Language Management filter. */
export interface Language {
  /** BCP-47-ish code, e.g. "en-US". */
  code: string;
  /** Human label shown in the tag, e.g. "English (EN - US)". */
  label: string;
  /** Flag glyph (emoji) shown before the label. */
  flag: string;
}
