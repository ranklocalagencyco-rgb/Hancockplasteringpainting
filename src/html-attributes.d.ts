// HTML attributes not yet present in Astro's built-in types.
declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    // Declarative WebMCP (Chrome origin trial).
    /** Names the tool exposed to AI agents. Required on a WebMCP <form>. */
    toolname?: string;
    /** Describes what the tool does. Required on a WebMCP <form>. */
    tooldescription?: string;
    /** If present, an agent invoking the tool submits the form automatically. */
    toolautosubmit?: boolean;
    /** Describes a single form field as a JSON Schema property description. */
    toolparamdescription?: string;
  }

  interface LinkHTMLAttributes {
    /** Resource loading priority hint, e.g. on a preload of the LCP image. */
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}
