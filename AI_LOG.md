
Pregunta
Com crear un sistema d'actualització d'ofertes

Prompt
Vull crear un servei d'ofertes que compari les dades abans de fer el findByIdAndUpdate i guardi els canvis en una nova col·lecció d'historials. Passa'm el codi de les rutes d'historial (openapi)

Incoherències
La IA genera comentaris de Swagger amb una indentació YAML incorrecta que feia petar el servidor (YAMLSyntaxError). També va utilitzar l'etiqueta @swagger en lloc de @openapi, que és la que segueix l'estàndard del projecte. 

Solució
Ajustar manualment els espais en el fitxer historialRoutes.ts per corregir el parser de Swagger.