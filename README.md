# Demo web Casa Sevilla — Atelier Mexica

Maqueta estática para mostrar al cliente (vía Alfonso): UX tipo Carmina Shoemaker + estilo/paleta del Instagram @casasevilla.mx. Tagline: «Del pensamiento al objeto.»

## Cómo abrir
- Doble clic en `index.html`, o
- `cd /workspace/casa-sevilla/demo && python3 -m http.server 8000` → http://localhost:8000

## Archivos
- `index.html` — hero, colecciones (highlights IG), destacados, bloque A medida, historia, CTA WhatsApp
- `catalogo.html` — grid con filtros por tipo/colección (`?tipo=botas`, `?col=signature`)
- `producto.html` — ficha por `?id=` (talla MX, piel/suela/horma, pedir por WhatsApp, relacionados)
- `a-medida.html` — 5 pasos + formulario que arma el mensaje y abre WhatsApp
- `envios-pagos.html` — envíos, cambios, tarjeta, transferencia (CLABE ficticia), guía de tallas, FAQ
- `assets/styles.css` — único CSS (paleta y tipografías)
- `assets/main.js` — datos de productos demo, menú móvil, filtros, ficha, mensajes WA
- `assets/img/prod-01..08.jpg` — recortes del feed de Instagram; `ref-*.png` — capturas de referencia

## Placeholders pendientes (reemplazar con datos del cliente)
- Precios (marcados DEMO), nombres de modelos y descripciones
- Mules y Accesorios sin productos (muestran «Próximamente»)
- Fotos: recortes de IG a 800px; pedir originales en alta resolución y logo/crest
- Tiempos de envío/confección, política de cambios, tabla de tallas, datos bancarios (CLABE ficticia)
- Pago con tarjeta: sin pasarela (texto)

Sin backend, sin dependencias, sin deploy. No se contactó al cliente.
