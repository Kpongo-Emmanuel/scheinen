-- Add shipping info columns to Order table
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingPhone" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingAddress" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingCity" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingState" TEXT;
