
Pregunta
Com crear un sistema d'actualització d'ofertes

Prompt
Tinc una entitat 'Oferta'. Crea un nou esquema de Mongoose anomenat 'Historial' per guardar ofertaId, la data i un array de canvis on surti el nom del camp, el valor que tenia abans i el valor nou.

Modifica el meu updateOferta al service perquè abans de fer el findByIdAndUpdate, busqui el document actual, compari els camps amb el req.body i, si hi ha diferències, guardi un registre a la col·lecció 'Historial'.

Genera el codi d'un controlador d'Express getHistorials que accepti paràmetres de paginació (page, limit) i un filtre de cerca (search) que busqui dins de l'array de canvis.

Escriu el fitxer de rutes historialRoutes.ts amb tota la documentació OpenAPI.

Incoherències
La IA genera comentaris de Swagger amb una indentació YAML incorrecta que feia petar el servidor (YAMLSyntaxError). També va utilitzar l'etiqueta @swagger en lloc de @openapi, que és la que segueix l'estàndard del projecte. 

Solució
Ajustar manualment els espais en el fitxer historialRoutes.ts per corregir el parser de Swagger.