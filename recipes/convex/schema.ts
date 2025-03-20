import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recipes: defineTable({
    title: v.string(),
    image: v.string(),
    cookingTime: v.number(),
    instructions: v.array(v.string()),
    calories: v.number(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});