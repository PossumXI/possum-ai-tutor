import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mock db helpers ────────────────────────────────────────────────────────
vi.mock("./db", () => ({
  createReview: vi.fn().mockResolvedValue(undefined),
  getApprovedReviews: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Alice",
      handle: "@alice",
      rating: 5,
      title: "Legendary session",
      body: "PossumXI completely changed how I think about AI workflows.",
      approved: true,
      createdAt: new Date("2026-01-01"),
    },
  ]),
  getAllReviews: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Alice",
      handle: "@alice",
      rating: 5,
      title: "Legendary session",
      body: "PossumXI completely changed how I think about AI workflows.",
      approved: true,
      createdAt: new Date("2026-01-01"),
    },
    {
      id: 2,
      name: "Bob",
      handle: null,
      rating: 4,
      title: "Great tutor",
      body: "Really helped me understand vibe coding fundamentals.",
      approved: false,
      createdAt: new Date("2026-01-15"),
    },
  ]),
  approveReview: vi.fn().mockResolvedValue(undefined),
  deleteReview: vi.fn().mockResolvedValue(undefined),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

// ─── Mock notification ───────────────────────────────────────────────────────
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// ─── Context helpers ─────────────────────────────────────────────────────────
function publicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function userCtx(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "user-123",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function adminCtx(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-openid",
      email: "possum@example.com",
      name: "PossumXI",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ─── Tests ───────────────────────────────────────────────────────────────────
describe("reviews.list", () => {
  it("returns approved reviews for public users", async () => {
    const caller = appRouter.createCaller(publicCtx());
    const result = await caller.reviews.list();
    expect(result).toHaveLength(1);
    expect(result[0]?.approved).toBe(true);
  });
});

describe("reviews.submit", () => {
  it("accepts a valid review submission", async () => {
    const caller = appRouter.createCaller(publicCtx());
    const result = await caller.reviews.submit({
      name: "Test User",
      handle: "@testuser",
      rating: 5,
      title: "Amazing experience",
      body: "This is a detailed review of the tutoring session.",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects a review with rating out of range", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      caller.reviews.submit({
        name: "Test",
        rating: 6, // invalid
        title: "Title",
        body: "Body text here",
      })
    ).rejects.toThrow();
  });

  it("rejects a review with body too short", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      caller.reviews.submit({
        name: "Test",
        rating: 4,
        title: "Title",
        body: "Short", // < 10 chars
      })
    ).rejects.toThrow();
  });
});

describe("reviews.adminList", () => {
  it("returns all reviews for admin", async () => {
    const caller = appRouter.createCaller(adminCtx());
    const result = await caller.reviews.adminList();
    expect(result).toHaveLength(2);
  });

  it("throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(userCtx());
    await expect(caller.reviews.adminList()).rejects.toThrow("FORBIDDEN");
  });
});

describe("reviews.approve", () => {
  it("allows admin to approve a review", async () => {
    const caller = appRouter.createCaller(adminCtx());
    const result = await caller.reviews.approve({ id: 2 });
    expect(result).toEqual({ success: true });
  });

  it("throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(userCtx());
    await expect(caller.reviews.approve({ id: 2 })).rejects.toThrow("FORBIDDEN");
  });
});

describe("reviews.delete", () => {
  it("allows admin to delete a review", async () => {
    const caller = appRouter.createCaller(adminCtx());
    const result = await caller.reviews.delete({ id: 1 });
    expect(result).toEqual({ success: true });
  });

  it("throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(userCtx());
    await expect(caller.reviews.delete({ id: 1 })).rejects.toThrow("FORBIDDEN");
  });
});
