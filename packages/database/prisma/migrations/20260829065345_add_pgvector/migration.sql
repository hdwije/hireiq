-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Add the embeding column to the chuck table
ALTER TABLE
  "Chunk"
ADD
  COLUMN "embedding" vector (768);