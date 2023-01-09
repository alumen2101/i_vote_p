-- AlterTable
CREATE SEQUENCE professor_id_seq;
ALTER TABLE "Professor" ALTER COLUMN "id" SET DEFAULT nextval('professor_id_seq');
ALTER SEQUENCE professor_id_seq OWNED BY "Professor"."id";
