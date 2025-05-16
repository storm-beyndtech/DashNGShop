import dotenv from "dotenv";
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to set up scheduled order maintenance tasks
function setupOrderMaintenanceTasks() {
	// Archive expired orders daily at midnight
	const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

	// Schedule first run based on current time
	const now = new Date();
	const midnight = new Date(now);
	midnight.setHours(0, 0, 0, 0);
	midnight.setDate(midnight.getDate() + 1); // Set to next midnight

	const timeUntilMidnight = midnight.getTime() - now.getTime();

	// Schedule first run at the next midnight
	setTimeout(async () => {
		log("Running scheduled order maintenance: archiving expired orders");
		try {
			const archivedCount = await storage.archiveExpiredOrders();
			log(`Archived ${archivedCount} expired orders`);

			// Schedule subsequent runs every 24 hours
			setInterval(async () => {
				try {
					const count = await storage.archiveExpiredOrders();
					log(`Archived ${count} expired orders`);
				} catch (error) {
					log(`Error during order archiving: ${(error as Error).message}`, "error");
				}
			}, TWENTY_FOUR_HOURS);
		} catch (error) {
			log(`Error during initial order archiving: ${(error as Error).message}`, "error");
		}
	}, timeUntilMidnight);

	// Delete archived orders once a week (Sunday at 1 AM)
	const now2 = new Date();
	const nextSunday = new Date(now2);
	nextSunday.setDate(now2.getDate() + ((7 - now2.getDay()) % 7)); // Next Sunday
	nextSunday.setHours(1, 0, 0, 0); // 1 AM

	if (nextSunday <= now2) {
		// If today is Sunday and it's past 1 AM, schedule for next Sunday
		nextSunday.setDate(nextSunday.getDate() + 7);
	}

	const timeUntilNextSunday = nextSunday.getTime() - now2.getTime();
	const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

	// Schedule first run on the next Sunday at 1 AM
	setTimeout(async () => {
		log("Running scheduled maintenance: deleting archived orders");
		try {
			const deletedCount = await storage.deleteArchivedOrders();
			log(`Deleted ${deletedCount} archived orders`);

			// Schedule subsequent runs weekly
			setInterval(async () => {
				try {
					const count = await storage.deleteArchivedOrders();
					log(`Deleted ${count} archived orders`);
				} catch (error) {
					log(`Error during order deletion: ${(error as Error).message}`, "error");
				}
			}, ONE_WEEK);
		} catch (error) {
			log(`Error during initial order deletion: ${(error as Error).message}`, "error");
		}
	}, timeUntilNextSunday);

	log("Order maintenance tasks scheduled");
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
	const start = Date.now();
	const path = req.path;
	let capturedJsonResponse: Record<string, any> | undefined = undefined;

	const originalResJson = res.json;
	res.json = function (bodyJson, ...args) {
		capturedJsonResponse = bodyJson;
		return originalResJson.apply(res, [bodyJson, ...args]);
	};

	res.on("finish", () => {
		const duration = Date.now() - start;
		if (path.startsWith("/api")) {
			let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
			if (capturedJsonResponse) {
				logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
			}

			if (logLine.length > 80) {
				logLine = logLine.slice(0, 79) + "…";
			}

			log(logLine);
		}
	});

	next();
});

(async () => {
	const server = await registerRoutes(app);

	app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
		const status = err.status || err.statusCode || 500;
		const message = err.message || "Internal Server Error";

		res.status(status).json({ message });
		throw err;
	});

	// importantly only setup vite in development and after
	// setting up all the other routes so the catch-all route
	// doesn't interfere with the other routes
	if (app.get("env") === "development") {
		await setupVite(app, server);
	} else {
		serveStatic(app);
	}

	// ALWAYS serve the app on port 5000
	// this serves both the API and the client.
	// It is the only port that is not firewalled.
	const port = 5000;
	server.listen(
		{
			port,
			host: "127.0.0.1",
			reusePort: true,
    },

		() => {
			log(`serving on port ${port}`);

			// Set up scheduled order maintenance tasks
			setupOrderMaintenanceTasks();
		},
	);
})();
