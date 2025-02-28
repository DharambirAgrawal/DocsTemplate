import cron from "node-cron";
import mongoose from "mongoose";
import Session from "../models/auth/sesssion.model";
import User from "../models/auth/user.model";
// Create a cron job that runs every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running the cleanup task to delete expired sessions...");

  try {
    // Step 1: Find expired sessions
    const expiredSessions = await Session.find({
      expiresAt: { $lt: new Date() },
    });

    if (expiredSessions.length === 0) {
      console.log("No expired sessions found.");
      return;
    }

    // Step 2: Delete the expired sessions
    const expiredSessionIds = expiredSessions.map((session) => session._id);
    await Session.deleteMany({ _id: { $in: expiredSessionIds } });

    console.log(`${expiredSessions.length} expired session(s) deleted.`);

    // Step 3: Remove sessionId from User's sessionIds array
    for (const session of expiredSessions) {
      await User.updateOne(
        { _id: session.userId },
        { $pull: { sessionIds: session._id } }
      );
    }

    console.log("User sessionIds updated.");
  } catch (error) {
    console.error(
      "Error deleting expired sessions and updating user sessionIds:",
      error
    );
  }
});
