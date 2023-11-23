// Single workspace configuration

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schema } from "./sanity/schemas/schema";

export default defineConfig({
  projectId: "6ipvdhma",
  dataset: "production",
  plugins: [deskTool()],
  schema: schema,
});
