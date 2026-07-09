// Declarative WebMCP attributes (Chrome origin trial) aren't in Astro's
// built-in HTML attribute types yet. Declare them so .astro templates type-check.
declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    /** Names the tool exposed to AI agents. Required on a WebMCP <form>. */
    toolname?: string;
    /** Describes what the tool does. Required on a WebMCP <form>. */
    tooldescription?: string;
    /** If present, an agent invoking the tool submits the form automatically. */
    toolautosubmit?: boolean;
    /** Describes a single form field as a JSON Schema property description. */
    toolparamdescription?: string;
  }
}
