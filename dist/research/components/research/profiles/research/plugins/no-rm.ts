// V2 port of the V1 no-rm guard.
//
// V1 returned an object of hooks keyed by string ("tool.execute.before");
// that does not run in V2. V2 plugins default-export a definition with a
// stable `id` and a `setup(ctx)` that registers hooks on the owning domain.
//
// @opencode/plugin's `define` is the identity function, and the plugin
// runtime does not resolve the bare specifier from this directory, so the
// object is exported directly instead of importing `Plugin`.

export default {
  id: "no-rm",
  async setup(ctx: any) {
    await ctx.tool.hook("execute.before", (event: any) => {
      const tool = event.tool
      if (tool !== "bash" && tool !== "shell") return

      const input = event.input as { command?: string }
      const cmd = input?.command
      if (typeof cmd !== "string") return

      if (/(?:^|[\s;|&(`\/])\s*\b(?:rm|rmdir)\b(?:\s|$)/.test(cmd)) {
        input.command =
          `echo "[DENIED] rm/rmdir is not allowed. Use 'trash-put' or 'trash' instead (see trash-cli skill for usage)."; false`
      }
    })
  },
}
