/* =====================================================================
   TU PORTAFOLIO · PLANTILLA DATASHEET
   Este es el ÚNICO archivo que necesitas editar.

   REGLAS RÁPIDAS
   1. Cambia solo el texto que está entre comillas "así".
   2. Los textos bilingües se escriben así: { es: "Hola", en: "Hello" }.
      Si solo quieres un idioma, deja  idiomas: ["es"]  más abajo.
   3. No borres comas, llaves { } ni corchetes [ ]. Cada bloque termina en coma.
   4. Para ocultar una sección o un elemento sin borrarlo: mostrar: false
   5. Dentro de un texto puedes usar **negrita** y [un enlace](https://...).
   6. Si la página sale en blanco o con un aviso rojo, pega este archivo en tu IA
      y pídele: "corrige la sintaxis sin cambiar el contenido".

   TIPOS DE SECCIÓN (elige el que mejor cuente cada parte de tu perfil)
     texto        → párrafos. El primero sale más grande.
     proyectos    → método STAR(R): situacion, accion, resultado, aprendizaje. Cada proyecto es una «aplicación típica».
     trayectoria  → experiencia o formación con fechas. Sale como un diagrama de tiempos: cada cargo es una señal
                    que sube cuando empezó y baja cuando terminó. Usa  desde  y  hasta  ("2022", "2022-03" o "actual").
     publicaciones→ artículos, pósters y congresos.
     lista        → premios, becas, voluntariado: una tabla con la fecha a la izquierda.
     habilidades  → grupos de habilidades, en una tabla de especificaciones.
     frase        → una sola idea grande. **Entre asteriscos** va resaltado.
     contacto     → cierre con tu correo en grande.
   ===================================================================== */

window.CONTENIDO = {
  idiomas: ["en", "es"],          // ["es"] solo español · ["en"] solo inglés · ["en", "es"] inglés primero
  colorPrincipal: "#0e7a4f",       // el color de la franja de arriba y del cierre: https://htmlcolorcodes.com
  // fuentes: { texto: "IBM Plex Sans" },   // opcional: quita las // y usa un nombre de fonts.google.com
  animaciones: true,              // false = página sin animaciones (más sobria)
  actualizado: { es: "septiembre 2026", en: "September 2026" },

  /* ---------- PORTADA ---------- */
  perfil: {
    nombre: "Del Piero",
    nombreCorto: "Del Piero Flores",
    // OPCIONAL: el «número de parte» de arriba. Si no lo pones, se arma con tus iniciales y el año.
    // codigo: "DPF-26",
    foto: "imagenes/foto.jpg",   // sube tu foto (vertical o cuadrada) a la carpeta imagenes. Sin foto, se ven tus iniciales.
    titular: {
      es: "Data Engineer · Ingeniero mecatrónico",
      en: "Data engineer · Mechatronics engineer"
    },
    ubicacion: { es: "Lima, Perú", en: "Lima, Peru" },
    bio: {
      es: "Diseño pipelines que procesan 400 000 eventos al día de más de 50 000 dispositivos. Soy ingeniero mecatrónico, becario del Patronato BCP, y lideré la electrónica de un vehículo autónomo que compitió en Brasil, Francia y Estados Unidos. Ahora busco un máster Erasmus Mundus para ingeniería de datos.",
      en: "I design pipelines that process 400,000 events a day from more than 50,000 devices. I am a mechatronics engineer, a Patronato BCP scholar, and I led the electronics of an autonomous vehicle that competed in Brazil, France and the United States. Now I am looking for an Erasmus Mundus master's to data engineering."
    },
    // Lo que buscas. Sale como «Aplicaciones / Applications» en la portada. Si no lo quieres, bórralo.
    objetivo: {
      es: "Máster Erasmus Mundus en [COMPLETAR: programa o área] en Europa, desde [COMPLETAR: mes y año]",
      en: "Erasmus Mundus Master's in [COMPLETAR: programme or field] in Europe, from [COMPLETAR: month and year]"
    },
    correo: "delpiero22.flores@gmail.com",
    cv: { es: "documentos/cv.pdf", en: "documentos/cv-en.pdf" },   // sube tu CV en PDF a la carpeta documentos
    // Cada enlace sale como un «pin» del chip de la portada.
    enlaces: [
      { texto: "LinkedIn", url: "https://www.linkedin.com/in/[COMPLETAR: tu-usuario]" },
      { texto: "GitHub", url: "https://github.com/[COMPLETAR: tu-usuario]", mostrar: false }
    ],
    // 3 o 4 cifras reales. Solo el número ("12", "94 %", "3,5"): así cuentan desde cero.
    cifras: [
      { numero: "400k", texto: { es: "eventos al día procesados por mis pipelines", en: "events a day processed by my pipelines" } },
      { numero: "73 %", texto: { es: "menos tiempo de ETL: de 45 a 12 minutos", en: "less ETL time: from 45 to 12 minutes" } },
      { numero: "25 %", texto: { es: "menos costo de infraestructura tras migrar de nube", en: "lower infrastructure cost after a cloud migration" } },
      { numero: "3", texto: { es: "países donde compitió nuestro vehículo autónomo", en: "countries where our autonomous vehicle competed" } }
    ]
  },

  /* ---------- SECCIONES (se muestran en este orden) ----------
     intro: una frase corta con lo que el comité debe llevarse de esa sección (sale bajo el título).
     Si no quieres una, bórrala. */
  secciones: [
    {
      id: "sobre-mi",
      titulo: { es: "Sobre mí", en: "About me" },
      intro: { es: "De los vehículos autónomos a los datos a gran escala.", en: "From autonomous vehicles to data at scale." },
      tipo: "texto",
      parrafos: [
        {
          es: "Construyo sistemas de datos que **siguen funcionando** cuando la información llega tarde, duplicada o desordenada.",
          en: "I build data systems that **keep working** when information arrives late, duplicated or out of order."
        },
        {
          es: "Estudié Ingeniería Mecatrónica en UTEC con beca del Patronato BCP. Allí lideré el área de investigación y electrónica del KON Team y mi tesis fue sobre el control de un vehículo autónomo.",
          en: "I studied Mechatronics Engineering at UTEC on a Patronato BCP scholarship. There I led the research and electronics area of KON Team, and my thesis was on controlling an autonomous vehicle."
        },
        {
          es: "Hoy trabajo como Data Engineer de forma remota para equipos internacionales. Quiero un máster Erasmus Mundus porque [COMPLETAR: tu motivación y qué quieres hacer después].",
          en: "Today I work remotely as a data engineer for international teams. I want an Erasmus Mundus master's because [COMPLETAR: your motivation and what you want to do next]."
        }
      ]
    },

    {
      id: "proyectos",
      titulo: { es: "Proyectos", en: "Projects" },
      intro: {
        es: "Cuatro proyectos contados con el método STAR: el problema, lo que hice yo y la evidencia.",
        en: "Four projects told with the STAR method: the problem, what I did and the evidence."
      },
      tipo: "proyectos",
      items: [
        {
          titulo: { es: "Ingesta confiable de 50 000 dispositivos", en: "Reliable ingestion from 50,000 devices" },
          imagen: "imagenes/proyecto-1.png",   // ideal 1600 × 1000 px.
          etiquetas: ["Python", "MongoDB", "Apache Airflow", { es: "Dynamo Edge", en: "Dynamo Edge" }],
          situacion: {
            es: "Más de 50 000 dispositivos enviaban actualizaciones asincrónicas a un ACS en MongoDB, y muchos registros llegaban duplicados.",
            en: "More than 50,000 devices sent asynchronous updates to an ACS on MongoDB, and many records arrived duplicated."
          },
          accion: {
            es: "Diseñé pipelines end-to-end con polling periódico, los hice idempotentes con deduplicación en staging y los orquesté con Airflow.",
            en: "I designed end-to-end pipelines with periodic polling, made them idempotent with deduplication in staging, and orchestrated them with Airflow."
          },
          resultado: {
            es: "**400 000 eventos al día** procesados y 55 % de registros duplicados filtrados, sobre 250 GB de histórico.",
            en: "**400,000 events a day** processed and 55% of duplicate records filtered out, on 250 GB of history."
          },
          aprendizaje: {
            es: "[COMPLETAR: qué aprendiste, por ejemplo sobre datos eventualmente consistentes]",
            en: "[COMPLETAR: what you learned, for example about eventually consistent data]"
          }
        },
        {
          titulo: { es: "Pipelines más rápidos y más baratos", en: "Faster and cheaper pipelines" },
          imagen: "imagenes/proyecto-2.png",
          etiquetas: ["SQL", { es: "Optimización", en: "Optimisation" }, "AWS", "DigitalOcean"],
          situacion: {
            es: "El proceso ETL tardaba 45 minutos y la infraestructura en AWS [COMPLETAR: por qué era un problema].",
            en: "The ETL process took 45 minutes and the AWS infrastructure [COMPLETAR: why it was a problem]."
          },
          accion: {
            es: "Optimicé índices, particionamiento y batching de queries, y migré la infraestructura de AWS a DigitalOcean.",
            en: "I optimised indexing, partitioning and query batching, and migrated the infrastructure from AWS to DigitalOcean."
          },
          resultado: {
            es: "**ETL de 45 a 12 minutos** y 25 % menos en costos de infraestructura.",
            en: "**ETL down from 45 to 12 minutes** and 25% lower infrastructure costs."
          }
        },
        {
          titulo: { es: "Sistema de recomendaciones para soporte", en: "Recommendation system for support" },
          imagen: "imagenes/proyecto-3.png",
          etiquetas: ["Python", { es: "Recomendaciones", en: "Recommendations" }],
          situacion: {
            es: "[COMPLETAR: qué problema tenía el equipo de soporte]",
            en: "[COMPLETAR: what problem the support team had]"
          },
          accion: {
            es: "Desarrollé un sistema de recomendaciones [COMPLETAR: cómo funcionaba y qué datos usaba].",
            en: "I developed a recommendation system [COMPLETAR: how it worked and what data it used]."
          },
          resultado: {
            es: "**20 % menos tickets de soporte**.",
            en: "**20% fewer support tickets**."
          }
        },
        {
          titulo: { es: "Control de un vehículo autónomo (tesis)", en: "Autonomous vehicle control (thesis)" },
          imagen: "imagenes/proyecto-4.png",
          etiquetas: ["EKF", { es: "Control PID/PI", en: "PID/PI control" }, "Stanley", { es: "Tesis", en: "Thesis" }],
          situacion: {
            es: "El vehículo KON MK IV necesitaba localización y control para llegar al nivel 2 de autonomía SAE.",
            en: "The KON MK IV vehicle needed localisation and control to reach SAE Level 2 autonomy."
          },
          accion: {
            es: "Implementé localización con filtro de Kalman extendido, control longitudinal PID/PI y control lateral Stanley.",
            en: "I implemented localisation with an extended Kalman filter, PID/PI longitudinal control and Stanley lateral control."
          },
          resultado: {
            es: "**[COMPLETAR: resultado medible, p. ej. error de seguimiento o nota de la tesis]**",
            en: "**[COMPLETAR: measurable result, e.g. tracking error or thesis grade]**"
          }
        }
      ]
    },

    {
      // Frase grande. Las palabras se encienden al bajar. **Entre asteriscos** va en tu color.
      // Una sola idea, máximo 20 palabras. Si no la quieres: mostrar: false
      id: "frase",
      tipo: "frase",
      texto: {
        es: "Construyo sistemas **confiables** que funcionan aunque los datos lleguen **tarde, duplicados o desordenados**.",
        en: "I build **reliable** systems that work even when data arrives **late, duplicated or out of order**."
      }
    },

    {
      id: "experiencia",
      titulo: { es: "Experiencia", en: "Experience" },
      intro: {
        es: "Datos en producción, desde IoT hasta equipos remotos internacionales.",
        en: "Data in production, from IoT to international remote teams."
      },
      tipo: "trayectoria",
      items: [
        {
          titulo: { es: "Data Engineer", en: "Data engineer" },
          lugar: { es: "Zeal IT Consultants (remoto)", en: "Zeal IT Consultants (remote)" },
          desde: "2026-07",
          hasta: "actual",
          descripcion: {
            es: "[COMPLETAR: qué haces y un logro con evidencia]",
            en: "[COMPLETAR: what you do and one achievement with evidence]"
          }
        },
        {
          titulo: { es: "Data Engineer", en: "Data engineer" },
          lugar: { es: "Dynamo Edge", en: "Dynamo Edge" },
          desde: "2024-08",
          hasta: "[COMPLETAR: AAAA-MM]",
          logros: [
            {
              es: "Diseñé la ingesta de más de 50 000 dispositivos y **procesé 400 000 eventos al día**.",
              en: "Designed ingestion for more than 50,000 devices and **processed 400,000 events a day**."
            },
            {
              es: "Reduje el tiempo de ETL **de 45 a 12 minutos** y los costos de infraestructura en 25 %.",
              en: "Cut ETL time **from 45 to 12 minutes** and infrastructure costs by 25%."
            },
            {
              es: "Creé un sistema de recomendaciones que **redujo los tickets de soporte en 20 %**.",
              en: "Built a recommendation system that **cut support tickets by 20%**."
            }
          ]
        },
        {
          titulo: { es: "Ingeniero de Sistemas IoT", en: "IoT systems engineer" },
          lugar: { es: "Acme & Cia", en: "Acme & Cia" },
          desde: "2022-09",
          hasta: "2025-04",
          descripcion: {
            es: "Diseñé pipelines near real-time, integré varias fuentes en plataformas centrales y mejoré la calidad de datos con limpieza y validación.",
            en: "Designed near real-time pipelines, integrated multiple sources into central platforms and improved data quality with cleaning and validation."
          }
        },
        {
          titulo: { es: "Líder de Investigación y Electrónica", en: "Head of Research and Electronics" },
          lugar: { es: "KON Team, UTEC", en: "KON Team, UTEC" },
          desde: "[COMPLETAR: AAAA]",
          hasta: "[COMPLETAR: AAAA]",
          descripcion: {
            es: "Lideré el área de investigación y electrónica y representé al equipo en competencias en Brasil, Francia y Estados Unidos.",
            en: "Led the research and electronics area and represented the team in competitions in Brazil, France and the United States."
          }
        }
      ]
    },

    {
      id: "publicaciones",
      titulo: { es: "Publicaciones", en: "Publications" },
      intro: { es: "[COMPLETAR: frase si agregas publicaciones]", en: "[COMPLETAR: sentence if you add publications]" },
      tipo: "publicaciones",
      mostrar: false,
      items: [
        {
          tipo: { es: "Artículo", en: "Paper" },
          autores: "**Flores D.**",
          anio: "[COMPLETAR]",
          titulo: {
            es: "[COMPLETAR: título]",
            en: "[COMPLETAR: title]"
          },
          medio: "[COMPLETAR: revista o congreso]"
        }
      ]
    },

    {
      id: "formacion",
      titulo: { es: "Formación", en: "Education" },
      intro: { es: "Base en mecatrónica con beca y experiencia académica en Estados Unidos.", en: "A mechatronics foundation on a scholarship, plus academic experience in the United States." },
      tipo: "trayectoria",
      items: [
        {
          titulo: { es: "Ingeniería Mecatrónica", en: "BEng in Mechatronics Engineering" },
          lugar: { es: "UTEC · Becario Patronato BCP", en: "UTEC · Patronato BCP scholar" },
          desde: "2018",
          hasta: "2023",
          descripcion: { es: "Tesis sobre control de un vehículo autónomo (SAE nivel 2).", en: "Thesis on autonomous vehicle control (SAE Level 2)." }
        },
        {
          titulo: { es: "Intercambio en Electrical and Computer Engineering", en: "Exchange in Electrical and Computer Engineering" },
          lugar: { es: "University of New Mexico, EE. UU.", en: "University of New Mexico, USA" },
          desde: "2022",
          hasta: "2022",
          descripcion: { es: "Además trabajé como mentor académico de otros estudiantes.", en: "I also worked as an academic mentor for other students." }
        }
      ]
    },

    {
      id: "premios",
      titulo: { es: "Becas, competencias y voluntariado", en: "Scholarships, competitions and volunteering" },
      intro: { es: "Instituciones que confiaron en mí y cómo devuelvo esa confianza.", en: "Institutions that trusted me, and how I give back." },
      tipo: "lista",
      items: [
        { titulo: { es: "Beca de pregrado Patronato BCP", en: "Patronato BCP undergraduate scholarship" }, lugar: "Patronato BCP", fecha: "[COMPLETAR: años]" },
        { titulo: { es: "Competencias internacionales de vehículos con KON Team", en: "International vehicle competitions with KON Team" }, lugar: { es: "Brasil, Francia y Estados Unidos", en: "Brazil, France and the United States" }, fecha: "[COMPLETAR: años]" },
        { titulo: { es: "Mentor voluntario, programa Mentoring Laboral (3 años)", en: "Volunteer mentor, Mentoring Laboral programme (3 years)" }, lugar: "BCP", fecha: "[COMPLETAR: años]" },
        { titulo: { es: "Mentor académico", en: "Academic mentor" }, lugar: "University of New Mexico", fecha: "2022" }
      ]
    },

    {
      id: "habilidades",
      titulo: { es: "Habilidades", en: "Skills" },
      intro: { es: "Lo que ya sé hacer el primer día.", en: "What I can do from day one." },
      tipo: "habilidades",
      grupos: [
        { nombre: "Data engineering", items: ["ETL / ELT", { es: "Modelado de datos", en: "Data modelling" }, "Data warehousing", { es: "Batch y near real-time", en: "Batch and near real-time" }] },
        { nombre: { es: "Herramientas", en: "Tools" }, items: ["Apache Spark (PySpark)", "Apache Airflow", "Databricks", "Snowflake", "dbt"] },
        { nombre: { es: "Lenguajes y bases de datos", en: "Languages and databases" }, items: ["Python", "SQL", "JavaScript", "PostgreSQL", "TimescaleDB", "MongoDB"] },
        { nombre: "Cloud y DevOps", items: ["AWS", "DigitalOcean", "Docker", "CI/CD"] },
        { nombre: { es: "Control y robótica", en: "Control and robotics" }, items: [{ es: "Filtro de Kalman extendido", en: "Extended Kalman filter" }, { es: "Control PID/PI", en: "PID/PI control" }, { es: "Control lateral Stanley", en: "Stanley lateral control" }] },
        { nombre: { es: "Idiomas", en: "Languages" }, items: [{ es: "Español (nativo)", en: "Spanish (native)" }, { es: "Inglés ([COMPLETAR: nivel y certificado])", en: "English ([COMPLETAR: level and certificate])" }] }
      ]
    },

    {
      id: "contacto",
      titulo: { es: "Contacto", en: "Contact" },
      tipo: "contacto",
      parrafos: [
        {
          es: "Busco un máster Erasmus Mundus en [COMPLETAR: área]. Me encantará conversar sobre cómo puedo aportar al programa.",
          en: "I am looking for an Erasmus Mundus master's in [COMPLETAR: field]. I would be glad to talk about how I can contribute to the programme."
        }
      ]
    }
  ]
};
