-- ============================================================
-- MIGRACIÓN A RENDER
-- ============================================================
-- Antes de ejecutar, conectate a la base de datos de Render.
-- En Render Dashboard → tu DB → "Connect" → copiá el comando psql
-- o usá:
--    psql "postgresql://edutrack_db_ksa5_user:XomR9U4aSuvzzV09CS7vXNvp9AMgV7YQ@dpg-d829nn1j2pic739lrmk0-a.virginia-postgres.render.com/authdb?sslmode=require"
-- ============================================================

-- ============================================================
-- 1. CREAR ADMIN (ejecutar contra authdb)
--    Email: admin@edutrack.com
--    Pass:  Admin123
-- ============================================================
INSERT INTO users (name, email, password, role, created_at)
SELECT 'Admin', 'admin@edutrack.com', '$2a$10$FCVM4Ftt8nkGvcWb89L3U..6FIL3Y54DTFQHFPnyT9De0LiLOgkLO', 'ADMIN', NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@edutrack.com');

-- Si querés otro email/cambiá el password, registrate primero desde
-- el frontend y luego corré:
-- UPDATE users SET role = 'ADMIN' WHERE email = 'tu-email@ejemplo.com';


-- ============================================================
-- 2. MIGRAR CURSOS DESDE DOCKER LOCAL A RENDER
--    (Ejecutar SOLO si Docker Desktop está corriendo)
-- ============================================================
-- PASO A: Dump de la base local
--    Abrí PowerShell como Admin, ejecutá:
--    docker exec -i edutrack-course-db pg_dump -U courseuser coursedb > cursos_dump.sql
--
-- PASO B: Importar a Render
--    psql "postgresql://edutrack_db_ksa5_user:XomR9U4aSuvzzV09CS7vXNvp9AMgV7YQ@..."
--    cursos?...sslmode=require" < cursos_dump.sql

-- ============================================================
-- 3. CATEGORÍAS Y CURSOS DE EJEMPLO (opcional, ejecutar contra coursedb)
-- ============================================================
INSERT INTO categories (name)
SELECT name FROM (VALUES ('Programación'), ('Diseño'), ('Data Science'), ('DevOps')) AS t(name)
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = t.name);
