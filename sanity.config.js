// Single workspace configuration

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schema } from "./sanity/schemas/schema";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  projectId: "6ipvdhma",
  dataset: "production",
  plugins: [deskTool(), visionTool()],
  schema: schema,
});
