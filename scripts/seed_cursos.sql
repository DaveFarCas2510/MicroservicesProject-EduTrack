-- ============================================================
-- SEED: Cursos, Lecciones y Categorías para EduTrack
-- Ejecutar contra: coursedb
-- ============================================================
-- USO:
--   psql -U courseuser -d coursedb -f scripts/seed_cursos.sql
-- O desde pgAdmin: abrir Query Tool y pegar todo el contenido.
-- ============================================================
-- ¡ATENCIÓN! Este script BORRA todos los datos existentes en
-- las tablas categories, courses y lessons, y los reemplaza
-- con contenido nuevo variado (cocina, idiomas, diseño, etc.).
-- ============================================================

BEGIN;

-- ============================================================
-- 0. LIMPIAR DATOS EXISTENTES
-- ============================================================
DELETE FROM lessons;
DELETE FROM courses;
DELETE FROM categories;

-- Resetear secuencias
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE courses_id_seq RESTART WITH 1;
ALTER SEQUENCE lessons_id_seq RESTART WITH 1;

-- ============================================================
-- 1. CATEGORÍAS
-- ============================================================
INSERT INTO categories (name) VALUES
('Cocina y Gastronomía'),
('Idiomas'),
('Marketing Digital'),
('Diseño y Creatividad'),
('Fotografía'),
('Música'),
('Finanzas Personales'),
('Salud y Bienestar'),
('Emprendimiento'),
('Deportes y Fitness'),
('Escritura y Literatura'),
('Desarrollo Personal'),
('Programación');

-- ============================================================
-- 2. CURSOS
-- ============================================================

-- ====================== COCINA Y GASTRONOMÍA ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Cocina Italiana: Pastas y Salsas', 'Aprende a preparar pastas frescas y salsas tradicionales italianas como un verdadero chef. Desde spaghetti alla carbonara hasta ravioli rellenos.', id, NOW()
FROM categories WHERE name = 'Cocina y Gastronomía';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Repostería para Principiantes', 'Descubre el arte de la repostería: bizcochos, cremas, decoración básica y postres clásicos que impresionan a todos.', id, NOW()
FROM categories WHERE name = 'Cocina y Gastronomía';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Cocina Saludable: Comer Rico y Sano', 'Platos balanceados, bowls nutritivos, sustitutos inteligentes y meal prep para una alimentación saludable sin sacrificar el sabor.', id, NOW()
FROM categories WHERE name = 'Cocina y Gastronomía';

-- ====================== IDIOMAS ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Inglés Conversacional (B1-B2)', 'Mejora tu fluidez en inglés con ejercicios de conversación, vocabulario contextual y expresiones nativas para el día a día.', id, NOW()
FROM categories WHERE name = 'Idiomas';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Francés para Viajeros', 'Francés práctico para viajar: saludos, pedir comida, preguntar direcciones y manejar situaciones comunes en francés.', id, NOW()
FROM categories WHERE name = 'Idiomas';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Portugués Básico', 'Domina lo esencial del portugués brasileño: pronunciación, vocabulario cotidiano y frases clave para comunicación básica.', id, NOW()
FROM categories WHERE name = 'Idiomas';

-- ====================== MARKETING DIGITAL ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Fundamentos de Marketing Digital', 'Introducción completa al marketing digital: embudo de ventas, canales, métricas clave y cómo crear una estrategia desde cero.', id, NOW()
FROM categories WHERE name = 'Marketing Digital';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Copywriting Persuasivo', 'Técnicas de escritura persuasiva para ventas, emails, landing pages y redes sociales. Convierte lectores en clientes.', id, NOW()
FROM categories WHERE name = 'Marketing Digital';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Email Marketing y Automatización', 'Crea campañas de email efectivas, secuencias automatizadas, segmentación y análisis de resultados con Mailchimp y ActiveCampaign.', id, NOW()
FROM categories WHERE name = 'Marketing Digital';

-- ====================== DISEÑO Y CREATIVIDAD ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Canva para No Diseñadores', 'Aprende a diseñar presentaciones, posts, flyers y branding profesional con Canva sin experiencia previa.', id, NOW()
FROM categories WHERE name = 'Diseño y Creatividad';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Adobe Illustrator: Vectorización', 'Domina la ilustración vectorial: herramientas, trazados, capas, colores y creación de logotipos e ilustraciones profesionales.', id, NOW()
FROM categories WHERE name = 'Diseño y Creatividad';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Diseño de Interiores para el Hogar', 'Principios de diseño de interiores, paletas de color, distribución de espacios y decoración para transformar tu hogar.', id, NOW()
FROM categories WHERE name = 'Diseño y Creatividad';

-- ====================== FOTOGRAFÍA ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Fotografía con el Móvil', 'Saca el máximo provecho a la cámara de tu smartphone: composición, iluminación, edición y trucos para fotos profesionales.', id, NOW()
FROM categories WHERE name = 'Fotografía';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Iluminación y Edición con Lightroom', 'Domina la iluminación en fotografía y el revelado digital con Lightroom: curvas, perfiles, presets y flujo de trabajo eficiente.', id, NOW()
FROM categories WHERE name = 'Fotografía';

-- ====================== MÚSICA ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Guitarra Acústica: Nivel Inicial', 'Aprende los fundamentos de la guitarra: acordes básicos, rasgueos, patrones de acompañamiento y tus primeras canciones.', id, NOW()
FROM categories WHERE name = 'Música';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Producción Musical con GarageBand', 'Introducción a la producción musical: loops, grabación, edición de pistas, mezcla básica y exportación de tus primeras canciones.', id, NOW()
FROM categories WHERE name = 'Música';

-- ====================== FINANZAS PERSONALES ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Finanzas Personales desde Cero', 'Organiza tus finanzas: presupuesto, ahorro, fondo de emergencia, eliminación de deudas y construcción de patrimonio.', id, NOW()
FROM categories WHERE name = 'Finanzas Personales';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Inversiones para Principiantes', 'Introducción al mundo de las inversiones: acciones, ETFs, fondos indexados, riesgo, diversificación e interés compuesto.', id, NOW()
FROM categories WHERE name = 'Finanzas Personales';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Criptomonedas y Blockchain', 'Entiende qué son las criptomonedas, cómo comprarlas, almacenarlas y los fundamentos de la tecnología blockchain.', id, NOW()
FROM categories WHERE name = 'Finanzas Personales';

-- ====================== SALUD Y BIENESTAR ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Yoga y Meditación Guiada', 'Rutinas de yoga para principiantes, técnicas de respiración, meditación guiada y mindfulness para reducir el estrés.', id, NOW()
FROM categories WHERE name = 'Salud y Bienestar';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Nutrición Balanceada', 'Aprende a armar platos balanceados, entender macros y micros, planificar comidas y construir hábitos alimenticios saludables.', id, NOW()
FROM categories WHERE name = 'Salud y Bienestar';

-- ====================== EMPRENDIMIENTO ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Cómo Emprender: De Idea a Negocio', 'Validación de ideas, modelo de negocio, lean startup, MVP, finanzas iniciales y cómo lanzar tu emprendimiento.', id, NOW()
FROM categories WHERE name = 'Emprendimiento';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'LinkedIn y Marca Personal', 'Construye tu marca personal en LinkedIn: perfil optimizado, contenido de valor, networking estratégico y oportunidades laborales.', id, NOW()
FROM categories WHERE name = 'Emprendimiento';

-- ====================== DEPORTES Y FITNESS ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Calistenia para Principiantes', 'Ejercicios con tu peso corporal: flexiones, dominadas, sentadillas y progresiones para ponerte en forma sin equipo.', id, NOW()
FROM categories WHERE name = 'Deportes y Fitness';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Running: De Cero a 5K', 'Plan de entrenamiento progresivo para correr tus primeros 5 kilómetros: técnica, ritmo, estiramientos y prevención de lesiones.', id, NOW()
FROM categories WHERE name = 'Deportes y Fitness';

-- ====================== ESCRITURA Y LITERATURA ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Redacción Creativa', 'Técnicas de escritura creativa: narrativa, descripción, diálogos, creación de personajes y cómo encontrar tu voz como escritor.', id, NOW()
FROM categories WHERE name = 'Escritura y Literatura';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Ortografía y Gramática Esencial', 'Domina las reglas de ortografía, acentuación, puntuación y gramática del español para escribir sin errores.', id, NOW()
FROM categories WHERE name = 'Escritura y Literatura';

-- ====================== DESARROLLO PERSONAL ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Gestión del Tiempo y Productividad', 'Técnicas Pomodoro, GTD, matriz de Eisenhower, OKRs y hábitos para ser más productivo sin quemarte.', id, NOW()
FROM categories WHERE name = 'Desarrollo Personal';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Oratoria y Comunicación Efectiva', 'Habla en público con confianza: estructura de discursos, lenguaje corporal, manejo de nervios y storytelling.', id, NOW()
FROM categories WHERE name = 'Desarrollo Personal';

-- ============================================================
-- 3. LECCIONES
-- ============================================================

-- ====================== COCINA ITALIANA ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Cocina Italiana: Pastas y Salsas';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Utensilios e Ingredientes Básicos', 'Conoce los utensilios esenciales y los ingredientes clave de la cocina italiana: tipos de harina, tomates, quesos y hierbas.', 1),
        (cid, 'Pasta Fresca: Masa y Formas', 'Prepara pasta fresca desde cero: masa básica, spaghetti, fettuccine, ravioli y gnocchi.', 2),
        (cid, 'Salsa Pomodoro y Pesto', 'Salsa de tomate clásica, pesto genovés y salsas derivadas. Trucos para potenciar sabores.', 3),
        (cid, 'Carbonara, Cacio e Pepe y Amatriciana', 'Tres pastas romanas icónicas: técnica, temperatura y emulsión perfecta.', 4),
        (cid, 'Lasagna y Pastas Rellenas al Horno', 'Lasaña clásica, canelones y pastas rellenas horneadas con bechamel y ragú.', 5),
        (cid, 'Plato Final: Menú Italiano Completo', 'Integra todo lo aprendido: antipasto, primo, secondo, contorno y dolce.', 6);
    END IF;
END $$;

-- ====================== REPOSTERÍA ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Repostería para Principiantes';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Herramientas y Técnicas Básicas', 'Batidora, espátulas, moldes y técnicas básicas: cremado, batido de claras y punto de nieve.', 1),
        (cid, 'Bizcochos y Bases', 'Bizcocho clásico, genovés, de chocolate y vainilla. Consejos para que siempre salgan esponjosos.', 2),
        (cid, 'Crema Pastelera y Buttercream', 'Crema pastelera, buttercream americano y suizo, ganache de chocolate.', 3),
        (cid, 'Tartas y Tartaletas', 'Masa quebrada, tartas de fruta, tartaletas dulces y rellenos.', 4),
        (cid, 'Galletas Decoradas y Cupcakes', 'Galletas de mantequilla, glasa real, cupcakes decorados con manga pastelera.', 5),
        (cid, 'Postres Clásicos', 'Tiramisú, flan, cheesecake y mousse de chocolate.', 6);
    END IF;
END $$;

-- ====================== COCINA SALUDABLE ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Cocina Saludable: Comer Rico y Sano';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Fundamentos de Nutrición en la Cocina', 'Macros, micros, porciones y cómo balancear un plato saludable.', 1),
        (cid, 'Bowls y Ensaladas Completa', 'Buddha bowls, ensaladas completas con proteína, granos y vegetales.', 2),
        (cid, 'Sustitutos Inteligentes', 'Alternativas saludables a ingredientes tradicionales: harinas, endulzantes, lácteos.', 3),
        (cid, 'Meal Prep: Cocinar para la Semana', 'Planificación, batch cooking, almacenamiento y recetas que se conservan perfectamente.', 4),
        (cid, 'Cenas Rápidas y Saludables', 'Recetas en menos de 20 minutos nutritivas y deliciosas para cenas entre semana.', 5),
        (cid, 'Snacks, Salsas y Postres Saludables', 'Snacks energéticos, salsas ligeras y postres sin azúcar refinada.', 6);
    END IF;
END $$;

-- ====================== INGLÉS CONVERSACIONAL ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Inglés Conversacional (B1-B2)';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Presentaciones y Small Talk', 'Saludos, presentaciones, charla casual y cómo mantener una conversación fluida.', 1),
        (cid, 'Viajes y Transporte', 'Vocabulario para aeropuertos, hoteles, transporte público y reservas.', 2),
        (cid, 'Comida y Restaurantes', 'Ordenar comida, describir platos, hacer reservas y expresar preferencias alimenticias.', 3),
        (cid, 'Trabajo y Entrevistas', 'Vocabulario laboral, entrevistas de trabajo, reuniones y correos electrónicos profesionales.', 4),
        (cid, 'Expresiones y Phrasal Verbs', 'Phrasal verbs comunes, expresiones idiomáticas y frases hechas del inglés cotidiano.', 5),
        (cid, 'Pronunciación y Fluidez', 'Sonidos difíciles, entonación, linking y ejercicios para hablar con más naturalidad.', 6);
    END IF;
END $$;

-- ====================== FRANCÉS PARA VIAJEROS ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Francés para Viajeros';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Saludos y Cortesía', 'Bonjour, merci, s''il vous plaît y frases esenciales de cortesía francesa.', 1),
        (cid, 'En el Restaurante', 'Pedir comida, la cuenta, expresar alergias y entender el menú en francés.', 2),
        (cid, 'Orientación y Transporte', 'Preguntar direcciones, comprar boletos, estaciones y vocabulario de transporte.', 3),
        (cid, 'Hospedaje y Compras', 'Check-in en hotel, hacer compras, preguntar precios y tallas.', 4),
        (cid, 'Emergencias y Salud', 'Frases útiles para emergencias médicas, pérdida de documentos y situaciones imprevistas.', 5),
        (cid, 'Cultura y Conversación', 'Tópicos culturales, hacer amigos, expresar gustos y despedidas.', 6);
    END IF;
END $$;

-- ====================== PORTUGUÉS BÁSICO ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Portugués Básico';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Pronunciación y Saludos', 'Sonidos del portugués, diferencias con el español, saludos y presentaciones.', 1),
        (cid, 'Día a Día y Rutinas', 'Vocabulario cotidiano, horas, días de la semana y describir tu rutina.', 2),
        (cid, 'Comidas y Bebidas', 'Pedir en restaurantes, vocabulario de comidas típicas brasileñas y expresiones en la mesa.', 3),
        (cid, 'Viajando por Brasil', 'Transporte, alojamiento, compras y frutas útiles para turistas.', 4),
        (cid, 'Verbos Esenciales', 'Principales verbos en presente, pasado y futuro cercano.', 5),
        (cid, 'Conversación Básica', 'Mantener una conversación simple, hacer preguntas y expresar opiniones.', 6);
    END IF;
END $$;

-- ====================== MARKETING DIGITAL ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Fundamentos de Marketing Digital';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Introducción al Marketing Digital', 'Evolución, diferencias con marketing tradicional, canales digitales y tendencias.', 1),
        (cid, 'Embudo de Ventas y Customer Journey', 'TOFU, MOFU, BOFU, etapas del cliente y cómo guiarlo hacia la conversión.', 2),
        (cid, 'Canales Digitales', 'SEO, SEM, redes sociales, email marketing, content marketing y afiliados.', 3),
        (cid, 'Segmentación y Audiencias', 'Buyer persona, segmentación demográfica, conductual y psicográfica.', 4),
        (cid, 'Métricas y KPIs', 'Principales métricas: CTR, CPC, ROAS, LTV, CAC y cómo interpretarlas.', 5),
        (cid, 'Estrategia y Plan de Marketing', 'Arma un plan de marketing digital paso a paso con objetivos, canales y presupuesto.', 6);
    END IF;
END $$;

-- ====================== COPYWRITING ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Copywriting Persuasivo';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Principios de Persuasión', 'Los 6 principios de Cialdini, gatillos mentales y psicología del consumidor.', 1),
        (cid, 'Titulares que Atrapan', 'Fórmulas de titulares, hooks, aperturas poderosas y promesas de valor.', 2),
        (cid, 'Estructura de Ventas (AIDA)', 'Atención, Interés, Deseo, Acción: cómo estructurar textos que venden.', 3),
        (cid, 'Copy para Landing Pages', 'Headline, subheadline, bullets, CTA y pruebas sociales en una landing.', 4),
        (cid, 'Email Marketing Copy', 'Asuntos, cuerpos de email, secuencias de nurture y campañas de venta.', 5),
        (cid, 'Storytelling en Ventas', 'Construye historias que conecten emocionalmente y lleven a la acción.', 6);
    END IF;
END $$;

-- ====================== EMAIL MARKETING ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Email Marketing y Automatización';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Fundamentos del Email Marketing', 'Tipos de emails, métricas clave, entregabilidad y mejores prácticas.', 1),
        (cid, 'Construcción de Listas', 'Estrategias para captar suscriptores, lead magnets y formularios de registro.', 2),
        (cid, 'Segmentación y Etiquetas', 'Segmenta tu lista por comportamiento, intereses y etapa del customer journey.', 3),
        (cid, 'Secuencias Automatizadas', 'Welcome sequence, nurture, carrito abandonado y re-engagement.', 4),
        (cid, 'Diseño y Copy de Emails', 'Diseño responsive, asuntos efectivos, preheader y cuerpo del mensaje.', 5),
        (cid, 'Análisis y Optimización', 'A/B testing, métricas de campaña, heatmaps y mejora continua.', 6);
    END IF;
END $$;

-- ====================== CANVA ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Canva para No Diseñadores';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Introducción a Canva', 'Interfaz, plantillas, búsqueda de elementos y primeros pasos en diseño.', 1),
        (cid, 'Tipografía y Color', 'Combinaciones de colores, fuentes, jerarquía visual y psicología del color.', 2),
        (cid, 'Diseño de Presentaciones', 'Slides profesionales, coherentes y visualmente atractivas para cualquier ocasión.', 3),
        (cid, 'Posts para Redes Sociales', 'Diseños optimizados para Instagram, Facebook, LinkedIn y TikTok.', 4),
        (cid, 'Branding y Identidad Visual', 'Crea un kit de marca: logos, paletas, fuentes y aplicaciones consistentes.', 5),
        (cid, 'Animaciones y Formatos', 'Animaciones básicas, exportación en múltiples formatos y trucos avanzados.', 6);
    END IF;
END $$;

-- ====================== ILLUSTRATOR ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Adobe Illustrator: Vectorización';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Interfaz y Herramientas Esenciales', 'Paneles, herramientas de selección, mesas de trabajo y navegación.', 1),
        (cid, 'Trazados y Pluma', 'Herramienta pluma, curvas Bézier, pathfinder y formas compuestas.', 2),
        (cid, 'Color y Muestras', 'Colores globales, degradados, pattern swatches y armonías de color.', 3),
        (cid, 'Tipografía y Texto', 'Texto en trazado, estilos de párrafo, variables tipográficas y lettering.', 4),
        (cid, 'Diseño de Logotipos', 'Proceso de diseño vectorial de logos: investigación, boceto, vectorización y presentación.', 5),
        (cid, 'Ilustración y Arte Final', 'Trazado de ilustraciones complejas, exportación y preparación para impresión/web.', 6);
    END IF;
END $$;

-- ====================== DISEÑO DE INTERIORES ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Diseño de Interiores para el Hogar';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Principios de Diseño de Interiores', 'Equilibrio, proporción, ritmo, énfasis y unidad en los espacios.', 1),
        (cid, 'Paletas de Color y Ambientación', 'Psicología del color, esquemas cromáticos y cómo afectan la percepción del espacio.', 2),
        (cid, 'Distribución y Mobiliario', 'Distribución funcional, circulación, escalas y selección de muebles.', 3),
        (cid, 'Iluminación y Texturas', 'Tipos de iluminación, capas de luz, texturas y materiales.', 4),
        (cid, 'Decoración y Accesorios', 'Arte, plantas, textiles y accesorios que dan personalidad a un espacio.', 5),
        (cid, 'Proyecto Final: Redecora tu Sala', 'Aplica todo lo aprendido para redecorar un espacio real paso a paso.', 6);
    END IF;
END $$;

-- ====================== FOTOGRAFÍA CON MÓVIL ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Fotografía con el Móvil';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Tu Cámara: Ajustes y Funciones', 'Conoce las funciones de la cámara de tu móvil: HDR, RAW, modo noche, enfoque y exposición.', 1),
        (cid, 'Composición Fotográfica', 'Regla de tercios, líneas guía, simetría, encuadre y perspectivas creativas.', 2),
        (cid, 'Luz Natural y Artificial', 'Cómo aprovechar la luz natural, evitar sombras duras y usar luz artificial simple.', 3),
        (cid, 'Retratos y Autorretratos', 'Técnicas para retratos con móvil, ángulos favorecedores y autorretratos creativos.', 4),
        (cid, 'Edición con Apps Móviles', 'Lightroom Mobile, Snapseed, VSCO: edición rápida y profesional desde el móvil.', 5),
        (cid, 'Fotografía de Producto y Comida', 'Técnicas para fotografía de productos, alimentos y flat lays para redes sociales.', 6);
    END IF;
END $$;

-- ====================== LIGHTROOM ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Iluminación y Edición con Lightroom';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Fundamentos de Iluminación', 'Luz dura vs suave, dirección de la luz, temperatura de color y esquemas básicos.', 1),
        (cid, 'Revelado Digital en Lightroom', 'Catálogo, módulo revelar, histograma, balance de blancos y exposición.', 2),
        (cid, 'Curvas y Tonos', 'Curva de tonos, HSL, split toning y corrección selectiva de color.', 3),
        (cid, 'Máscaras y Ajustes Locales', 'Máscaras radiales, graduadas, pincel de ajuste y rangos de color/luminancia.', 4),
        (cid, 'Presets y Flujo de Trabajo', 'Creación de presets, importación, selección, edición masiva y exportación eficiente.', 5),
        (cid, 'Proyecto: Edita una Sesión Completa', 'Flujo completo de edición para una sesión de fotos real: selección, revelado y exportación.', 6);
    END IF;
END $$;

-- ====================== GUITARRA ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Guitarra Acústica: Nivel Inicial';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Partes de la Guitarra y Afinación', 'Conoce tu instrumento, cómo afinarlo y postura correcta al tocar.', 1),
        (cid, 'Acordes Básicos (Mayores y Menores)', 'Do, Re, Mi, Fa, Sol, La, Si mayores y sus relativos menores.', 2),
        (cid, 'Rasgueos y Patrones Rítmicos', 'Técnicas de rasgueo, patrones básicos y cómo mantener el ritmo.', 3),
        (cid, 'Cambios de Acordes Fluidos', 'Ejercicios para cambiar entre acordes sin pausas y con precisión.', 4),
        (cid, 'Primeras Canciones', 'Tus primeras canciones completas usando los acordes y ritmos aprendidos.', 5),
        (cid, 'Introducción al Punteo', 'Técnica de punteo, escalas mayores y patrones melódicos básicos.', 6);
    END IF;
END $$;

-- ====================== GARAGEBAND ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Producción Musical con GarageBand';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Interfaz de GarageBand', 'Proyectos, pistas, biblioteca de loops e instrumentos virtuales.', 1),
        (cid, 'Grabación de Audio y MIDI', 'Configuración, grabación de voz, instrumentos reales y teclado MIDI.', 2),
        (cid, 'Edición y Arreglos', 'Edición de regiones, comping, quantize, tempo y compás.', 3),
        (cid, 'Mezcla Básica', 'Volumen, pan, ecualización, compresión y efectos de envío.', 4),
        (cid, 'Automatización', 'Automatización de volumen, panorama y parámetros de efectos.', 5),
        (cid, 'Exportación y Distribución', 'Bounce, formatos de exportación, masterización básica y subida a plataformas.', 6);
    END IF;
END $$;

-- ====================== FINANZAS PERSONALES ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Finanzas Personales desde Cero';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Diagnóstico Financiero', 'Evalúa tu situación actual: ingresos, gastos, deudas y patrimonio neto.', 1),
        (cid, 'Presupuesto y Control de Gastos', 'Métodos de presupuesto: 50/30/20, sobre, zero-based y apps de control.', 2),
        (cid, 'Fondo de Emergencia', 'Por qué es importante, cuánto ahorrar y dónde guardarlo.', 3),
        (cid, 'Eliminación de Deudas', 'Estrategias bola de nieve y avalancha para salir de deudas más rápido.', 4),
        (cid, 'Ahorro e Interés Compuesto', 'Hábitos de ahorro, automatización y el poder del interés compuesto.', 5),
        (cid, 'Metas Financieras y Plan', 'Define metas SMART, crea un plan financiero personalizado y haz seguimiento.', 6);
    END IF;
END $$;

-- ====================== INVERSIONES ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Inversiones para Principiantes';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, '¿Qué es Invertir?', 'Diferencia entre ahorrar e invertir, activos vs pasivos, riesgo y retorno.', 1),
        (cid, 'Acciones y Renta Variable', 'Cómo funcionan las acciones, bolsa de valores, dividendo y plusvalía.', 2),
        (cid, 'ETFs y Fondos Indexados', 'Diversificación pasiva, ETFs populares, costos y ventajas sobre fondos activos.', 3),
        (cid, 'Renta Fija y Bonos', 'Bonos gubernamentales, corporativos, CETES, renta fija y perfil conservador.', 4),
        (cid, 'Diversificación y Asset Allocation', 'Construye un portafolio diversificado según tu edad, objetivos y tolerancia al riesgo.', 5),
        (cid, 'Plataformas y Cómo Empezar', 'Brokers, comisiones, tipos de cuenta, orden de compra/venta y primeros pasos reales.', 6);
    END IF;
END $$;

-- ====================== CRIPTOMONEDAS ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Criptomonedas y Blockchain';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, '¿Qué es Blockchain?', 'Tecnología subyacente, bloques, minería, consenso y descentralización.', 1),
        (cid, 'Bitcoin y Ethereum', 'Historia, diferencias, casos de uso y por qué son las criptos más importantes.', 2),
        (cid, 'Comprar y Almacenar Criptos', 'Exchanges, wallets fríos y calientes, seguridad y cómo hacer tu primera compra.', 3),
        (cid, 'DeFi y NFTs', 'Finanzas descentralizadas, staking, yield farming, NFTs y metaverso.', 4),
        (cid, 'Riesgos y Estafas', 'Volatilidad, scams, rug pulls, phishing y cómo proteger tu inversión.', 5),
        (cid, 'Estrategias de Inversión en Cripto', 'HODL, DCA, trading vs inversión a largo plazo y tamaño de posición.', 6);
    END IF;
END $$;

-- ====================== YOGA Y MEDITACIÓN ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Yoga y Meditación Guiada';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Introducción al Yoga', 'Filosofía, tipos de yoga, respiración (pranayama) y conexión mente-cuerpo.', 1),
        (cid, 'Posturas Básicas (Asanas)', 'Posturas fundamentales: montaña, perro boca abajo, guerrero, árbol y niño.', 2),
        (cid, 'Secuencias de Vinyasa', 'Flujo de movimiento sincronizado con la respiración para principiantes.', 3),
        (cid, 'Meditación Guiada', 'Técnicas de meditación: atención plena, escaneo corporal y visualización.', 4),
        (cid, 'Yoga para el Estrés y la Ansiedad', 'Rutinas específicas para relajación, sueño reparador y reducción de ansiedad.', 5),
        (cid, 'Crea tu Rutina Diaria', 'Combina posturas, respiración y meditación en una rutina personalizada de 15-30 minutos.', 6);
    END IF;
END $$;

-- ====================== NUTRICIÓN ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Nutrición Balanceada';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Fundamentos de Nutrición', 'Macronutrientes, micronutrientes, calorías y necesidades según tu estilo de vida.', 1),
        (cid, 'El Plato Balanceado', 'Cómo armar comidas balanceadas: proporciones, grupos de alimentos y variedad.', 2),
        (cid, 'Planificación de Comidas', 'Menú semanal, lista de compras inteligente y preparación de alimentos.', 3),
        (cid, 'Etiquetado Nutricional', 'Lee y entiende las etiquetas de los alimentos, ingredientes y sellos.', 4),
        (cid, 'Mitología y Realidad', 'Desmonta mitos comunes: detox, superalimentos, carbohidratos por la noche, etc.', 5),
        (cid, 'Hábitos Sostenibles', 'Cómo construir hábitos alimenticios que perduren sin dietas restrictivas.', 6);
    END IF;
END $$;

-- ====================== EMPRENDIMIENTO ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Cómo Emprender: De Idea a Negocio';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Encuentra tu Idea', 'Identifica problemas, valida necesidades, analiza mercado y define tu propuesta de valor.', 1),
        (cid, 'Modelo de Negocio y Canvas', 'Lean Canvas, propuesta de valor, segmentos de cliente, canales y fuentes de ingresos.', 2),
        (cid, 'MVP y Validación', 'Construye un producto mínimo viable, entrevistas con clientes e iteración rápida.', 3),
        (cid, 'Finanzas del Emprendimiento', 'Costos, precios, punto de equilibrio, bootstrapping y búsqueda de inversión.', 4),
        (cid, 'Marketing y Ventas para Emprendedores', 'Estrategias de bajo costo para conseguir tus primeros clientes.', 5),
        (cid, 'Legal, Fiscal y Crecimiento', 'Constitución legal, obligaciones fiscales, contratación y escalamiento del negocio.', 6);
    END IF;
END $$;

-- ====================== LINKEDIN ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'LinkedIn y Marca Personal';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Perfil de LinkedIn Óptimo', 'Foto, headline, resumen, experiencia y habilidades para destacar.', 1),
        (cid, 'Estrategia de Contenido', 'Tipos de post, frecuencia, tono y cómo aportar valor a tu red.', 2),
        (cid, 'Networking Estratégico', 'Conexiones de calidad, mensajes personalizados, grupos y eventos.', 3),
        (cid, 'LinkedIn Sales Navigator', 'Búsqueda avanzada, leads, listas y prospección para oportunidades laborales.', 4),
        (cid, 'LinkedIn para Negocios', 'Página de empresa, contenido corporativo, LinkedIn Ads y generación de leads B2B.', 5),
        (cid, 'Marca Personal y Autoridad', 'Conviértete en referencia de tu área: artículos, colaboraciones y posicionamiento.', 6);
    END IF;
END $$;

-- ====================== CALISTENIA ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Calistenia para Principiantes';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Introducción a la Calistenia', 'Qué es, beneficios, calentamiento y movilidad articular.', 1),
        (cid, 'Flexiones (Push-ups)', 'Técnica correcta, variaciones progresivas y series para ganar fuerza.', 2),
        (cid, 'Dominadas y Jalones', 'Progresiones desde colgado hasta dominada completa, agarres y trabajo de espalda.', 3),
        (cid, 'Sentadillas y Piernas', 'Sentadilla peso corporal, pistol squat, zancadas y trabajo de piernas.', 4),
        (cid, 'Core y Plancha', 'Plancha frontal, lateral, hollow body y ejercicios para un core fuerte.', 5),
        (cid, 'Rutina Completa y Progresión', 'Arma tu rutina full-body, sistema de progresión y seguimiento de resultados.', 6);
    END IF;
END $$;

-- ====================== RUNNING ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Running: De Cero a 5K';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Equipo y Preparación', 'Zapatillas, ropa técnica, hidratación y calentamiento pre-carrera.', 1),
        (cid, 'Técnica de Carrera', 'Postura, zancada, frecuencia, respiración y aterrizaje del pie.', 2),
        (cid, 'Semana 1-2: Caminar y Trotar', 'Intervalos caminata/trote, construcción de base aeróbica y ritmo conversacional.', 3),
        (cid, 'Semana 3-5: Trotar y Correr', 'Aumento progresivo de tiempo continuo corriendo y reducción de pausas.', 4),
        (cid, 'Semana 6-8: Rumbo a 5K', 'Entrenamientos de resistencia, fartleks y carrera continua hasta 5 kilómetros.', 5),
        (cid, 'Prevención de Lesiones', 'Estiramientos, foam rolling, días de descanso y señales de alerta.', 6);
    END IF;
END $$;

-- ====================== REDACCIÓN CREATIVA ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Redacción Creativa';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'El Oficio de Escribir', 'Hábitos de escritura, rutinas, reader''s writer y encontrar tu voz.', 1),
        (cid, 'Narrativa y Estructura', 'Planteamiento, nudo, desenlace, estructura en tres actos y arco narrativo.', 2),
        (cid, 'Descripciones y Diálogos', 'Muestra no cuentes, descripciones sensoriales y diálogos naturales.', 3),
        (cid, 'Creación de Personajes', 'Arquetipos, motivaciones, backstory, evolución y fichas de personaje.', 4),
        (cid, 'Géneros y Estilos', 'Narrativa, poesía, cuento, novela, microrrelato y experimentación.', 5),
        (cid, 'Edición y Publicación', 'Autoevaluación, reescritura, corrección de estilo, beta readers y publicación.', 6);
    END IF;
END $$;

-- ====================== ORTOGRAFÍA ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Ortografía y Gramática Esencial';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Acentuación General', 'Reglas de acentuación, tilde diacrítica, hiatos y diptongos.', 1),
        (cid, 'Uso de Mayúsculas y Minúsculas', 'Cuándo usar mayúsculas, títulos, cargos, lugares y normas ortográficas.', 2),
        (cid, 'Puntuación', 'Punto, coma, punto y coma, dos puntos, paréntesis, comillas y guiones.', 3),
        (cid, 'Errores Frecuentes', 'Por qué/porque/porqué, haber/a ver, haya/halla, vaya/valla y más.', 4),
        (cid, 'Concordancia Gramatical', 'Sujeto-verbo, género-número, tiempos verbales y correlación.', 5),
        (cid, 'Redacción Clara y Correcta', 'Aplica todo lo aprendido para escribir textos claros, correctos y profesionales.', 6);
    END IF;
END $$;

-- ====================== GESTIÓN DEL TIEMPO ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Gestión del Tiempo y Productividad';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Diagnóstico de tu Tiempo', 'Registro de actividades, identificación de ladrones de tiempo y análisis de prioridades.', 1),
        (cid, 'Matriz de Eisenhower', 'Urgente vs importante, cuadrantes y cómo decidir qué hacer en cada momento.', 2),
        (cid, 'Técnica Pomodoro y Time Blocking', 'Intervalos de enfoque, descansos programados y bloques de trabajo profundo.', 3),
        (cid, 'GTD (Getting Things Done)', 'Captura, clarificación, organización, reflexión y ejecución del método GTD.', 4),
        (cid, 'OKRs y Metas', 'Define objetivos ambiciosos con resultados clave medibles y haz seguimiento.', 5),
        (cid, 'Herramientas y Hábitos', 'Notion, Todoist, calendario, automatizaciones y construcción de hábitos productivos.', 6);
    END IF;
END $$;

-- ====================== ORATORIA ======================
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Oratoria y Comunicación Efectiva';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'El Miedo Escénico', 'Técnicas para controlar los nervios, respiración, visualización y preparación mental.', 1),
        (cid, 'Estructura del Discurso', 'Apertura, desarrollo, cierre poderoso, transiciones y llamada a la acción.', 2),
        (cid, 'Lenguaje Verbal y No Verbal', 'Voz, ritmo, pausas, gestos, postura, contacto visual y movimiento escénico.', 3),
        (cid, 'Storytelling en Presentaciones', 'Estructura narrativa, metáforas, ejemplos e historias que conectan con la audiencia.', 4),
        (cid, 'Recursos Visuales y Slides', 'Diseño de slides minimalistas, datos visuales y manejo de proyectores.', 5),
        (cid, 'Preguntas, Improvisación y Cierre', 'Manejo de preguntas difíciles, improvisación elegante y cierre memorable.', 6);
    END IF;
END $$;

-- ====================== PROGRAMACIÓN ======================
INSERT INTO courses (title, description, category_id, created_at)
SELECT 'JavaScript Moderno: De Cero a Experto', 'Aprende JavaScript desde lo básico hasta ES2025: variables, closures, promesas, async/await, módulos y el ecosistema moderno.', id, NOW()
FROM categories WHERE name = 'Programación';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Python para Principiantes', 'Domina Python desde cero: sintaxis, estructuras de datos, POO, manejo de archivos y proyectos prácticos.', id, NOW()
FROM categories WHERE name = 'Programación';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'React y Next.js: Apps Modernas', 'Construye aplicaciones web full-stack con React 19, Next.js 15, Server Components, App Router y autenticación.', id, NOW()
FROM categories WHERE name = 'Programación';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Desarrollo Backend con Node.js', 'Crea APIs REST escalables con Node.js, Express, autenticación JWT, bases de datos y despliegue en producción.', id, NOW()
FROM categories WHERE name = 'Programación';

INSERT INTO courses (title, description, category_id, created_at)
SELECT 'Fundamentos de Algoritmos y Estructuras de Datos', 'Resuelve problemas como un ingeniero: arrays, listas, árboles, grafos, sorting, búsqueda y complejidad algorítmica.', id, NOW()
FROM categories WHERE name = 'Programación';

-- Lecciones: JavaScript
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'JavaScript Moderno: De Cero a Experto';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Fundamentos y Sintaxis', 'Variables, tipos de datos, operadores y estructura del lenguaje JavaScript.', 1),
        (cid, 'Funciones y Scope', 'Declaración de funciones, arrow functions, closures y hoisting.', 2),
        (cid, 'Arrays y Objetos', 'Métodos de arrays, destructuring, spread operator y manipulación de objetos.', 3),
        (cid, 'Programación Asíncrona', 'Callbacks, promesas, async/await y manejo de errores.', 4),
        (cid, 'DOM y Eventos', 'Manipulación del DOM, event listeners, delegación y bubbling.', 5),
        (cid, 'Módulos, Bundlers y Proyecto Final', 'ES Modules, import/export, Webpack, Vite y build de una app completa.', 6);
    END IF;
END $$;

-- Lecciones: Python
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Python para Principiantes';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Introducción a Python', 'Instalación, intérprete, tipos básicos y primer programa.', 1),
        (cid, 'Estructuras de Control', 'Condicionales, bucles, range y comprensión de listas.', 2),
        (cid, 'Funciones y Módulos', 'Definición de funciones, argumentos, lambda y módulos estándar.', 3),
        (cid, 'Programación Orientada a Objetos', 'Clases, herencia, polimorfismo y métodos mágicos.', 4),
        (cid, 'Manejo de Archivos y Excepciones', 'Lectura/escritura de archivos, try/except y context managers.', 5),
        (cid, 'Proyecto Final: Gestor de Tareas CLI', 'Aplicación de línea de comandos integrando todos los conceptos del curso.', 6);
    END IF;
END $$;

-- Lecciones: React y Next.js
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'React y Next.js: Apps Modernas';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Introducción a React', 'Componentes, JSX, props, useState y ciclo de vida.', 1),
        (cid, 'Hooks y Estado', 'useEffect, useCallback, useMemo, useRef y custom hooks.', 2),
        (cid, 'Next.js y App Router', 'Layouts, pages, loading, error boundaries y server components.', 3),
        (cid, 'Estado Global y Data Fetching', 'Context API, Zustand, TanStack Query y Server Actions.', 4),
        (cid, 'Autenticación y Middleware', 'NextAuth.js, JWT, middleware y rutas protegidas.', 5),
        (cid, 'Optimización y Deploy', 'SEO, ISR, SSG, image optimization y deploy en Vercel.', 6);
    END IF;
END $$;

-- Lecciones: Node.js Backend
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Desarrollo Backend con Node.js';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Fundamentos de Node.js', 'Event loop, módulos nativos, NPM y package.json.', 1),
        (cid, 'Express.js: Rutas y Middleware', 'Servidor HTTP, routing, middleware, error handling y organización.', 2),
        (cid, 'Bases de Datos con Prisma', 'Modelado, migraciones, queries, relaciones PostgreSQL y seed.', 3),
        (cid, 'Autenticación y Autorización', 'JWT, bcrypt, roles, refresh tokens y protección de rutas.', 4),
        (cid, 'Validación y Testing de APIs', 'Zod, Jest, supertest y cobertura de tests.', 5),
        (cid, 'Deploy y Producción', 'Docker, variables de entorno, CI/CD y deploy en Render o Railway.', 6);
    END IF;
END $$;

-- Lecciones: Algoritmos
DO $$
DECLARE
    cid INTEGER;
BEGIN
    SELECT id INTO cid FROM courses WHERE title = 'Fundamentos de Algoritmos y Estructuras de Datos';
    IF cid IS NOT NULL THEN
        INSERT INTO lessons (course_id, title, content, order_index) VALUES
        (cid, 'Complejidad Algorítmica (Big O)', 'Notación Big O, tiempo vs espacio, casos peor/medio/mejor.', 1),
        (cid, 'Arrays, Strings y Hashing', 'Manipulación, two pointers, sliding window, hash tables.', 2),
        (cid, 'Listas Enlazadas y Pilas', 'Listas simples/dobles, stacks, queues y aplicaciones.', 3),
        (cid, 'Árboles y Grafos', 'BST, tree traversal, BFS, DFS, grafos y shortest path.', 4),
        (cid, 'Algoritmos de Ordenamiento y Búsqueda', 'QuickSort, MergeSort, binary search y variantes.', 5),
        (cid, 'Programación Dinámica', 'Memoización, tabulación, knapsack, LCS y problemas clásicos.', 6);
    END IF;
END $$;

-- ============================================================
-- 4. ACTUALIZAR SECUENCIAS
-- ============================================================
SELECT setval('categories_id_seq', COALESCE((SELECT MAX(id) FROM categories), 1));
SELECT setval('courses_id_seq',    COALESCE((SELECT MAX(id) FROM courses), 1));
SELECT setval('lessons_id_seq',    COALESCE((SELECT MAX(id) FROM lessons), 1));

COMMIT;

-- ============================================================
-- VERIFICACIÓN
-- ============================================================
-- SELECT c.name AS categoria, COUNT(cr.id) AS cursos, COUNT(l.id) AS lecciones
-- FROM categories c
-- LEFT JOIN courses cr ON cr.category_id = c.id
-- LEFT JOIN lessons l ON l.course_id = cr.id
-- GROUP BY c.name
-- ORDER BY c.name;
-- ============================================================
