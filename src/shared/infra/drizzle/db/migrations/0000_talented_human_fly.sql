CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"slug" varchar(100) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "idx_slug" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_active" ON "categories" USING btree ("active");--> statement-breakpoint
CREATE INDEX "idx_created_at" ON "categories" USING btree ("created_at");