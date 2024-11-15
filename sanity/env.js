export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-11-20'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const useCdn = true //was false default
export const DEV_TOKEN = process.env.NEXT_DEV_TOKEN