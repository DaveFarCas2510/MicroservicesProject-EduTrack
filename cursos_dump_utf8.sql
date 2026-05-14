--
-- PostgreSQL database dump
--

\restrict Up8AjYLrG9vsNdW876496JpYmi4OdNeYdG8jhqUL8fhFtDDqOaf43ix6MTNg9v5

-- Dumped from database version 15.17
-- Dumped by pg_dump version 15.17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: courseuser
--

INSERT INTO public.categories (id, name) VALUES (1, 'Tecnologí¡a y Programación');
INSERT INTO public.categories (id, name) VALUES (2, 'Negocios y Emprendimiento');
INSERT INTO public.categories (id, name) VALUES (3, 'Marketing Digital');
INSERT INTO public.categories (id, name) VALUES (4, 'Diseño y Creatividad');
INSERT INTO public.categories (id, name) VALUES (5, 'Desarrollo Personal');
INSERT INTO public.categories (id, name) VALUES (6, 'Programación Web');
INSERT INTO public.categories (id, name) VALUES (7, 'Diseño Gráfico');
INSERT INTO public.categories (id, name) VALUES (8, 'Data Science');
INSERT INTO public.categories (id, name) VALUES (9, 'Desarrollo Móvil');
INSERT INTO public.categories (id, name) VALUES (10, 'Idiomas');


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: courseuser
--

INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (1, '2026-05-11 10:42:30.271495', 'Aprende a crear páginas web modernas desde cero utilizando HTML, CSS y JavaScript. Ideal para principiantes que quieren entrar al mundo del desarrollo web.', 'https://edutrack-covers.s3.us-east-2.amazonaws.com/covers/f52b73d2-9ddf-4b72-abed-fde681e75410-1.jpg', 'Desarrollo Web desde Cero', 1);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (5, '2026-05-11 10:49:22.319642', 'Mejora tu organización personal y aprende técnicas para ser más eficiente en tu dí¡a a dí¡a.', 'https://edutrack-covers.s3.us-east-2.amazonaws.com/covers/55950181-6a98-4d49-8a20-aa6d80c82483-4.jpg', 'Productividad y Gestión del Tiempo', 5);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (9, '2026-05-13 00:51:07.087107', 'Domina React con hoks, context API, React Router y buenas practicas.', NULL, 'React desde Cero', 6);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (10, '2026-05-13 00:51:07.099392', 'Construye APIs REST escalables con Express, autenticacion JWT y bases de datos.', NULL, 'Node.js Avanzado', 6);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (11, '2026-05-13 00:51:07.112291', 'Domina la edicion de imagenes, capas, mascaras y efectos visuales.', NULL, 'Adobe Photoshop', 7);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (12, '2026-05-13 00:51:07.126174', 'Aprende diseno de interfaces desde cero con Figma, prototipado y sistemas de diseno.', NULL, 'Figma para UI', 7);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (13, '2026-05-13 00:51:07.14086', 'Introduccion al analisis de datos con pandas, numpy y matplotlib.', NULL, 'Python para Data Science', 8);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (14, '2026-05-13 00:51:07.155606', 'Fundamentos de ML: regresion, clasificacion, clustering y redes neuronales.', NULL, 'Machine Learning', 8);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (15, '2026-05-13 00:51:07.170909', 'Estrategias de posicionamiento organico, link building y auditoria tecnica.', NULL, 'SEO Avanzado', 3);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (16, '2026-05-13 00:51:07.184198', 'Campanas de pago por clic, remarketing y optimizacion de conversiones.', NULL, 'Gogle Ads', 3);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (17, '2026-05-13 00:51:07.198398', 'Crea apps multiplataforma con Flutter y Dart, desde cero hasta produccion.', NULL, 'Flutter', 9);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (4, '2026-05-11 10:47:52.206204', 'Aprende principios de diseño gráfico y herramientas para crear piezas visuales atractivas.', 'https://edutrack-covers.s3.us-east-2.amazonaws.com/covers/6c4f64f3-9fa8-4375-b40f-a2a4d8f4f0f2-3.png', 'Diseño Gráfico Básico', 4);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (6, '2026-05-13 00:50:46.436876', 'Desarrolla apps nativas Android con Kotlin, Jetpack Compose y MVVM.', 'https://edutrack-covers.s3.us-east-2.amazonaws.com/covers/abf5195e-76d9-4927-bbca-41023c318aa2-a.png', 'Kotlin para Android', 9);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (18, '2026-05-13 06:56:15.272949', 'a', NULL, 'Inglés', 10);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (3, '2026-05-11 10:44:58.174025', 'Aprende a crear un negocio online desde la idea hasta la ejecución, incluyendo validación de mercado y estrategias de monetización.', 'https://edutrack-covers.s3.us-east-2.amazonaws.com/covers/649a10b4-e389-477f-9a70-c51b815b41f8-2.png', 'Emprendimiento Digital', 2);
INSERT INTO public.courses (id, created_at, description, image_url, title, category_id) VALUES (8, '2026-05-13 00:51:07.06024', 'Aprende JavaScript desde cero hasta nivel avanzado con ES6+, promesas, async/await y mas.', 'https://edutrack-covers.s3.us-east-2.amazonaws.com/covers/9ecd6712-c17f-4606-9a8c-6d6a1e30937b-5.jpg', 'JavaScript Moderno', 6);


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: courseuser
--

INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (1, '¿Cómo funciona internet?', 1, 'Introducción al desarrollo web', 1);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (5, 'Qué es emprender', 1, 'Mentalidad emprendedora', 3);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (6, 'Investigación de mercado', 1, 'Validación de ideas', 3);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (7, 'Naming y branding', 1, 'Creación de marca', 3);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (8, 'Redes sociales', 1, 'Canales de venta', 3);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (9, 'Color, tipografía y composición', 1, 'Fundamentos del diseño', 4);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (10, 'Introducción a Canva / Photoshop', 1, 'Herramientas de diseño', 4);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (11, 'Posts y banners', 1, 'Diseño para redes sociales', 4);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (12, 'Logos y identidad visual', 1, 'Branding visual', 4);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (13, 'Técnicas como Pomodoro', 1, 'Gestión del tiempo', 5);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (14, 'Planificación diaria', 1, 'Organización personal', 5);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (15, 'Enfoque y habitos', 1, 'Eliminación de distracciones', 5);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (16, 'Apps de productividad', 1, 'Herramientas digitales', 5);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (17, 'Rutinas efectivas', 1, 'Plan de acción personal', 5);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (2, 'Estructura de una página', 2, 'HTML básico', 1);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (3, 'Estilos, colores y fuentes', 3, 'CSS básico', 1);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (4, 'Variables y funciones', 4, 'JavaScript básico', 1);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (18, 'Historia, configuracion del entorno, primer script. Variables, tipos de datos y operadores.', 1, 'Introduccion a JS', 8);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (19, 'Arrow functions, template strings, destructuring, spread operator, y parametros rest.', 2, 'ES6+ y Funciones', 8);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (20, 'Callbacks, promesas, async/await, manejo de errores con try/catch.', 3, 'Promesas y Async/Await', 8);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (21, 'Manipulacion del DOM, eventos del navegador, y delegacion de eventos.', 4, 'DOM y Eventos', 8);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (22, 'JSX, componentes funcionales, props, y el virtual DOM.', 1, 'Fundamentos de React', 9);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (23, 'useState, useEffect, useContext, useRef, y custom hoks.', 2, 'Hoks', 9);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (24, 'Ruteo con React Router v6, parametros, nested routes y navegacion.', 3, 'React Router', 9);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (25, 'Configuracion de Express, middlewares, routing y manejo de errores.', 1, 'Express y Routing', 10);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (26, 'Registro, login, JWT tokens, middlewares de autenticacion y proteccion de rutas.', 2, 'Autenticacion con JWT', 10);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (27, 'Conexion a PostgreSQL con Sequelize, modelos, migraciones y consultas.', 3, 'Bases de Datos', 10);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (28, 'Variables de entorno, Dockerizacion, y deploy en produccion.', 4, 'Despliegue', 10);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (29, 'Conocer el espacio de trabajo, paneles, y el sistema de capas.', 1, 'Interfaz y Capas', 11);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (30, 'Herramientas de seleccion, mascaras de capa y de recorte.', 2, 'Selecciones y Mascaras', 11);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (31, 'Capas de ajuste, filtros inteligentes y efectos.', 3, 'Ajustes y Filtros', 11);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (32, 'Interfaz de Figma, herramientas basicas, frames y shapes.', 1, 'Primeros Pasos', 12);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (33, 'Crear componentes, variantes, propiedades y auto layout.', 2, 'Componentes y Variantes', 12);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (34, 'Conexiones, animaciones y prototipado interactivo.', 3, 'Prototipado', 12);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (35, 'Tipos de datos, listas, diccionarios, y comprension de listas.', 1, 'Python para Datos', 13);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (36, 'DataFrames, lectura de CSV, limpieza y transformacion de datos.', 2, 'Pandas', 13);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (37, 'Matplotlib y seaborn para graficos de distribucion y tendencias.', 3, 'Visualizacion', 13);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (38, 'Tipos de aprendizaje, features, labels, y pipeline basico.', 1, 'Introduccion a ML', 14);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (39, 'Regresion lineal y logistica, metricas de evaluacion, overfitting.', 2, 'Regresion', 14);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (40, 'KNN, arboles de decision, random forest y SVM.', 3, 'Clasificacion', 14);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (41, 'Perceptron, backpropagation, y redes con TensorFlow.', 4, 'Redes Neuronales', 14);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (42, 'Como funcionan los motores de busqueda, crawlers e indexacion.', 1, 'Fundamentos SEO', 15);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (43, 'Optimizacion de contenido, meta tags, estructura de URLs y datos estructurados.', 2, 'SEO On-Page', 15);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (44, 'Estrategias de adquisicion de backlinks, anchor text y autoridad de dominio.', 3, 'Link Building', 15);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (45, 'Campanas, grupos de anuncios, palabras clave y presupuestos.', 1, 'Estructura de Campanas', 16);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (46, 'Audiencias, palabras clave negativas, y segmentacion geografica.', 2, 'Segmentacion', 16);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (47, 'Quality Score, pujas, extensiones y pruebas A/B.', 3, 'Optimizacion', 16);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (48, 'Sintaxis de Dart, widgets Stateless y Stateful, y estructura de una app.', 1, 'Dart y Widgets', 17);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (49, 'Navegacion entre pantallas, Provider y manejo de estado.', 2, 'Navegacion y Estado', 17);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (50, 'Consumo de APIs REST con http, y autenticacion con Firebase.', 3, 'APIs y Firebase', 17);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (51, 'Variables, funciones, clases, y null safety en Kotlin.', 1, 'Fundamentos Kotlin', 6);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (52, 'Componentes basicos, layouts, estado y Material Design 3.', 2, 'Jetpack Compose', 6);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (53, 'Arquitectura MVVM, ViewModel, y base de datos local con Rom.', 3, 'MVVM y Rom', 6);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (54, 'Estructura basica, etiquetas semanticas, formularios y accesibilidad.', 1, 'HTML Semantico', 1);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (55, 'Modelo de caja, flexbox, CSS grid y diseno responsivo.', 2, 'CSS Flexbox y Grid', 1);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (56, 'Variables, funciones, condicionales, bucles y arrays.', 3, 'JavaScript Basico', 1);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (57, 'Canvas, propuesta de valor, segmentos de cliente y canales.', 1, 'Modelo de Negocio', 3);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (58, 'Redes sociales, email marketing y embudos de conversion.', 2, 'Marketing Digital', 3);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (59, 'Flujo de caja, pricing, costos fijos y variables.', 3, 'Finanzas para Emprendedores', 3);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (60, 'Circulo cromatico, psicologia del color y paletas armonicas.', 1, 'Teoria del Color', 4);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (61, 'Clasificacion tipografica, jerarquia y legibilidad.', 2, 'Tipografia', 4);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (62, 'Regla de tercios, equilibrio visual y espacios negativos.', 3, 'Composicion', 4);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (63, 'Pomodoro, GTD, Eisenhower matrix y time blocking.', 1, 'Metodos de Productividad', 5);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (64, 'Notion, Todoist, y calendarios para gestion de tareas.', 2, 'Herramientas Digitales', 5);
INSERT INTO public.lessons (id, content, order_index, title, course_id) VALUES (65, 'Construir habitos atomicos, rutinas diarias y eliminacion de distracciones.', 3, 'Habitos y Rutinas', 5);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: courseuser
--

SELECT pg_catalog.setval('public.categories_id_seq', 10, true);


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: courseuser
--

SELECT pg_catalog.setval('public.courses_id_seq', 18, true);


--
-- Name: lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: courseuser
--

SELECT pg_catalog.setval('public.lessons_id_seq', 65, true);


--
-- PostgreSQL database dump complete
--

\unrestrict Up8AjYLrG9vsNdW876496JpYmi4OdNeYdG8jhqUL8fhFtDDqOaf43ix6MTNg9v5

