# 🛡️ Desafío de Conciencia de Phishing - PUCE

Juego interactivo para sensibilizar a la comunidad universitaria de la **Pontificia Universidad Católica del Ecuador (PUCE)** (estudiantes, docentes y personal administrativo) sobre los riesgos del phishing.

🎮 **Jugar en línea:** https://carreradanny.github.io/PHSHING_JUEGO/

## ¿Cómo se juega?

1. En cada ronda aparecen **dos correos** lado a lado.
2. Uno es **legítimo** y el otro es un **intento de phishing**.
3. Haz clic en el correo que creas que es real. Tienes **30 segundos**.
4. Al responder verás una explicación de las señales que delatan el phishing.
5. Son **5 rondas**; al final recibes un título según tu puntuación.

## Escenarios incluidos

- Comunicado oficial de Secretaría General PUCE
- Promoción FEUCE por Fiestas de Quito
- Recibo de compra de Apple Store
- Estado de cuenta de Banco Pichincha
- Citación de tránsito de la AMT Quito

Las rondas y la posición de los correos se mezclan en cada partida.

## Qué enseña

- Revisar con cuidado el **dominio del remitente** (ej. `puce.edu.ec` vs `puce.edu.ec.updates.net`).
- Desconfiar de la **urgencia** y los plazos artificiales.
- No hacer clic en **enlaces** que piden "confirmar" o "verificar" datos.
- Fijarse en errores de ortografía y en un tono fuera de lo normal.

## Tecnologías

- HTML5
- CSS3
- JavaScript (sin frameworks)
- [Font Awesome](https://fontawesome.com/) para los íconos

## Ejecutar localmente

No necesita instalación. Clona el repositorio y abre `index.html` en el navegador:

```bash
git clone https://github.com/CarreraDanny/PHSHING_JUEGO.git
cd PHSHING_JUEGO
```

## Estructura

```
├── index.html         # Estructura y pantallas del juego
├── styles.css         # Estilos
├── script.js          # Lógica del juego y escenarios de correo
├── PUCE-BLANCO-H.png  # Logo PUCE
└── ÁGUILA.png         # Mascota PUCE
```

## Contexto del proyecto

Este juego formó parte de mi trabajo en seguridad de la información en la PUCE, donde:

- Sensibilicé sobre phishing a toda la comunidad universitaria con una campaña y este juego interactivo.
- Aceleré el cumplimiento de **ISO 27001** elaborando la matriz de aplicabilidad y un prototipo de aplicativo para automatizarla.
- Di seguimiento a planes de seguridad en las sedes de la PUCE y apoyé la Política de Seguridad de la Información.

## Autor

**Danny Carrera** - [@CarreraDanny](https://github.com/CarreraDanny)
