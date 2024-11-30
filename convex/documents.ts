import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const validateUser = async (ctx: any): Promise<string> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");
  return identity.subject;
};

export const createDocument = mutation({
  args: {
    title: v.string(), // Title of the document
    parentDocument: v.optional(v.id("documents")), // Optional parent document ID
  },
  handler: async (ctx, args) => {
    const userId = await validateUser(ctx); // Validate the user
    return await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId, // Associate the document with the current user
      isArchived: false,
      isPublished: false,
    });
  },
});

export const getSideBar = query({
  args: {
    parentDocument: v.optional(v.id("documents")), // Optional parent document ID
  },
  handler: async (ctx, args) => {
    const userId = await validateUser(ctx); // Validate the user
    return await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q: any) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q: any) => q.eq(q.field("isArchived"), false)) // Exclude archived documents
      .order("desc") // Order by most recent
      .collect(); // Collect and return results
  },
});

const fetchDocument = async (ctx: any, id: Id<"documents">, userId: string) => {
  const document = await ctx.db.get(id);
  if (!document || document.userId !== userId) throw new Error("Unauthorized");
  return document; // Return the document if it exists and the user is authorized
};

const recursiveOperation = async (
  ctx: any,
  documentId: Id<"documents">,
  userId: string,
  isArchived: boolean
) => {
  const children = await ctx.db
    .query("documents")
    .withIndex("by_user_parent", (q: any) =>
      q.eq("userId", userId).eq("parentDocument", documentId)
    )
    .collect();

  // Iterate over each child document
  for (const child of children) {
    await ctx.db.patch(child._id, { isArchived }); // Update the archive status
    await recursiveOperation(ctx, child._id, userId, isArchived); // Recursively update children
  }
};

// Mutation to archive a document and its children
export const archiveDocument = mutation({
  args: { id: v.id("documents") }, // Document ID to archive
  handler: async (ctx, args) => {
    const userId = await validateUser(ctx); // Validate the user
    await fetchDocument(ctx, args.id, userId); // Fetch and validate the document
    await ctx.db.patch(args.id, { isArchived: true }); // Archive the document
    await recursiveOperation(ctx, args.id, userId, true); // Recursively archive children
  },
});
