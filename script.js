/*
  MOTOR DEL PORTAFOLIO (plantilla Datasheet): no necesitas editar este archivo.
  Todo tu contenido va en contenido.js.

  Portfolio engine (Datasheet template): you don't need to edit this file.
  All your content lives in contenido.js.
*/
(function () {
  "use strict";

  var UI = {
    es: {
      otroIdioma: "EN",
      otroIdiomaLargo: "Ver en inglés",
      saltar: "Saltar al contenido",
      secciones: "Secciones",
      inicio: "Inicio",
      cv: "Descargar CV",
      cvPin: "Descargar CV (PDF)",
      correo: "Escríbeme",
      hojaDatos: "Hoja de datos",
      revisado: "Revisado",
      caracteristicas: "Características",
      aplicaciones: "Aplicaciones",
      descripcion: "Descripción",
      especificaciones: "Especificaciones clave",
      parametro: "Parámetro",
      valor: "Valor",
      configuracion: "Configuración de pines, vista superior",
      funcionesPines: "Funciones de pines",
      pin: "Pin",
      nombre: "Nombre",
      tipoPin: "Tipo",
      detalle: "Descripción",
      sinConexion: "Sin conexión",
      indice: "Índice",
      figura: "Figura",
      tabla: "Tabla",
      diagrama: "Diagrama de tiempos",
      hoy: "hoy",
      mes: "mes",
      meses: "meses",
      anio: "año",
      anios: "años",
      fecha: "Fecha",
      reconocimiento: "Detalle",
      entidad: "Institución",
      area: "Área",
      conocimientos: "Herramientas y conocimientos",
      situacion: "Situación",
      accion: "Qué hice",
      resultado: "Resultado",
      aprendizaje: "Qué aprendí",
      actual: "actualidad",
      actualizado: "Última actualización",
      comentarios: "Enviar comentarios sobre este documento",
      errorTitulo: "Tu portafolio tiene un error en contenido.js",
      errorTexto:
        "Casi siempre es una coma, comilla o llave que falta o sobra. Copia todo contenido.js en tu IA (ChatGPT, Claude o Gemini) y pídele: \"Revisa la sintaxis de este archivo JavaScript y corrígela sin cambiar el contenido\".",
      errorDetalle: "Detalle técnico (revisa esa línea y la anterior)"
    },
    en: {
      otroIdioma: "ES",
      otroIdiomaLargo: "Ver en español",
      saltar: "Skip to content",
      secciones: "Sections",
      inicio: "Top",
      cv: "Download CV",
      cvPin: "Download CV (PDF)",
      correo: "Email me",
      hojaDatos: "Datasheet",
      revisado: "Revised",
      caracteristicas: "Features",
      aplicaciones: "Applications",
      descripcion: "Description",
      especificaciones: "Key specifications",
      parametro: "Parameter",
      valor: "Value",
      configuracion: "Pin configuration, top view",
      funcionesPines: "Pin functions",
      pin: "Pin",
      nombre: "Name",
      tipoPin: "Type",
      detalle: "Description",
      sinConexion: "No connect",
      indice: "Table of contents",
      figura: "Figure",
      tabla: "Table",
      diagrama: "Timing diagram",
      hoy: "now",
      mes: "month",
      meses: "months",
      anio: "year",
      anios: "years",
      fecha: "Date",
      reconocimiento: "Detail",
      entidad: "Institution",
      area: "Area",
      conocimientos: "Tools and knowledge",
      situacion: "Situation",
      accion: "What I did",
      resultado: "Result",
      aprendizaje: "What I learned",
      actual: "present",
      actualizado: "Last updated",
      comentarios: "Submit feedback on this document",
      errorTitulo: "Your portfolio has an error in contenido.js",
      errorTexto:
        "It is almost always a missing or extra comma, quote or bracket. Paste all of contenido.js into your AI assistant and ask it to fix the JavaScript syntax without changing the content.",
      errorDetalle: "Technical detail (check that line and the one before)"
    }
  };

  // Íconos de un solo trazo, como el dibujo técnico de una hoja de datos.
  var ICONOS = {
    flecha: '<path d="M3 12h17M14 6l6 6-6 6"/>',
    externo: '<path d="M7 17 17 7M8 7h9v9"/>',
    descarga: '<path d="M12 3v12M6 10l6 6 6-6M4 21h16"/>',
    correo: '<path d="M3 5h18v14H3zM3 6l9 7 9-7"/>',
    chip: '<path d="M7 4h10v16H7zM3 7h4M3 12h4M3 17h4M17 7h4M17 12h4M17 17h4"/><circle cx="10" cy="7.5" r="1"/>'
  };

  var datos = window.CONTENIDO;
  var idioma = "es";
  // Contadores de secciones, figuras y tablas: se reinician en cada dibujo.
  var num = { seccion: 0, figura: 0, tabla: 0 };

  /* ---------- utilidades ---------- */

  // Devuelve el texto en el idioma activo. Acepta "texto" o {es: "...", en: "..."}.
  function t(valor) {
    if (valor === null || valor === undefined) return "";
    if (typeof valor === "string" || typeof valor === "number") return String(valor);
    if (typeof valor === "object") {
      if (valor[idioma] !== undefined && valor[idioma] !== "") return String(valor[idioma]);
      for (var k in valor) {
        if (Object.prototype.hasOwnProperty.call(valor, k) && valor[k]) return String(valor[k]);
      }
    }
    return "";
  }

  function lista(valor) {
    if (!valor) return [];
    return Array.isArray(valor) ? valor : [valor];
  }

  function visibles(valor) {
    return lista(valor).filter(function (x) { return x && x.mostrar !== false; });
  }

  function escapar(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Solo permite enlaces http(s), mailto, tel o rutas del propio repositorio.
  // Un sitio escrito sin https:// ("linkedin.com/in/tu-usuario", "www.github.com/...") se completa;
  // si no, el navegador lo buscaría como una página dentro de tu propio portafolio.
  function urlSegura(url) {
    url = String(url || "").trim();
    if (!url) return "";
    if (/^(https?:|mailto:|tel:)/i.test(url)) return url;
    if (/^[a-z][a-z0-9+.\-]*:/i.test(url)) return "";
    if (/^\/\//.test(url)) return "https:" + url;
    if (pareceSitio(url)) return "https://" + url;
    return url;
  }

  // "linkedin.com/in/x" o "github.com" son sitios; "cv.pdf" o "documentos/cv.pdf" son archivos tuyos.
  function pareceSitio(url) {
    var dominio = url.split(/[\/?#]/)[0];
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(:\d+)?$/i.test(dominio)) return false;
    if (/^www\./i.test(dominio) || url.charAt(dominio.length) === "/") return true;
    return !/\.(pdf|docx?|pptx?|xlsx?|odt|zip|html?|jpe?g|png|gif|svg|webp|txt|md)$/i.test(dominio);
  }

  // Sitios externos y archivos (CV, PDF, póster) se abren en otra pestaña; anclas, correo y teléfono no.
  function enOtraPestana(url) {
    return !/^(#|mailto:|tel:)/i.test(url);
  }

  function externo(url) {
    return enOtraPestana(url) ? ' target="_blank" rel="noopener"' : "";
  }

  // Formato mínimo dentro de los textos: **negrita** y [texto](https://enlace)
  function formato(texto) {
    var html = escapar(texto);
    html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, etiqueta, url) {
      var segura = urlSegura(url.replace(/&amp;/g, "&"));
      if (!segura) return etiqueta;
      return '<a href="' + escapar(segura) + '"' + externo(segura) + ">" + etiqueta + "</a>";
    });
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return html;
  }

  function el(etiqueta, clase, html) {
    var nodo = document.createElement(etiqueta);
    if (clase) nodo.className = clase;
    if (html !== undefined) nodo.innerHTML = html;
    return nodo;
  }

  function icono(nombre) {
    return '<svg class="icono" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICONOS[nombre] + "</svg>";
  }

  // Elige el ícono según el destino: correo, PDF, sitio externo o ancla.
  function iconoPara(url) {
    if (/^mailto:/i.test(url)) return "correo";
    if (/\.pdf(\?|#|$)/i.test(url)) return "descarga";
    if (/^https?:/i.test(url)) return "externo";
    return "flecha";
  }

  function enlace(texto, url, clase, conIcono) {
    var segura = urlSegura(url);
    if (!segura || !texto) return null;
    var a = el("a", clase || "");
    a.href = segura;
    a.innerHTML = "<span>" + escapar(texto) + "</span>" + (conIcono === false ? "" : icono(iconoPara(segura)));
    if (enOtraPestana(segura)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    return a;
  }

  function agregar(padre, hijo) {
    if (hijo) padre.appendChild(hijo);
    return padre;
  }

  function iniciales(nombre, cuantas) {
    return String(nombre || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, cuantas || 2)
      .map(function (p) { return p.charAt(0).toUpperCase(); })
      .join("");
  }

  // Número de parte: el de contenido.js o tus iniciales y el año ("MHR26").
  function codigo(perfil) {
    var propio = t(perfil.codigo).trim();
    if (propio) return propio;
    var letras = iniciales(t(perfil.nombre), 3);
    if (letras.normalize) letras = letras.normalize("NFD").replace(/[̀-ͯ]/g, "");
    return (letras || "CV") + String(new Date().getFullYear()).slice(-2);
  }

  function cajaEnlaces(valor) {
    var enlaces = lista(valor);
    if (!enlaces.length) return null;
    var caja = el("div", "enlaces");
    enlaces.forEach(function (e) { agregar(caja, enlace(t(e.texto), t(e.url), "enlace")); });
    return caja.children.length ? caja : null;
  }

  function logros(valor) {
    var items = lista(valor).filter(function (l) { return t(l); });
    if (!items.length) return null;
    var ul = el("ul", "logros");
    items.forEach(function (l) { ul.appendChild(el("li", "", formato(t(l)))); });
    return ul;
  }

  // «Tabla n. Título» arriba de cada tabla, como en una hoja de datos.
  function tituloTabla(texto) {
    num.tabla++;
    return el("caption", "rotulo", "<span>" + UI[idioma].tabla + " " + num.tabla + ".</span> " + escapar(texto));
  }

  // «Figura n. Título» debajo de cada figura.
  function pieFigura(texto) {
    num.figura++;
    return el("figcaption", "rotulo", "<span>" + UI[idioma].figura + " " + num.figura + ".</span> " + escapar(texto));
  }

  // Título numerado de sección: «4 Sobre mí».
  function tituloNumerado(etiqueta, clase, texto, numero) {
    var h = el(etiqueta, clase);
    h.innerHTML = '<span class="num">' + escapar(numero) + "</span> " + '<span class="titulo__texto">' + escapar(texto) + "</span>";
    return h;
  }

  /* ---------- color ----------
     Con cualquier colorPrincipal, el texto sobre la franja de color se elige solo (blanco o tinta)
     y, si el color es muy claro para usarlo como texto, se oscurece lo necesario. */

  function rgb(hex) {
    var m = String(hex || "").trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!m) return null;
    var h = m[1].length === 3 ? m[1].replace(/(.)/g, "$1$1") : m[1];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }

  function luminancia(c) {
    var v = c.map(function (x) {
      x /= 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }

  function contraste(a, b) {
    var la = luminancia(a), lb = luminancia(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }

  function aHex(c) {
    return "#" + c.map(function (x) { return ("0" + Math.round(x).toString(16)).slice(-2); }).join("");
  }

  function aplicarColor(valor) {
    var raiz = document.documentElement.style;
    var c = rgb(valor);
    if (!c) {
      if (valor) raiz.setProperty("--acento", valor);
      return;
    }
    var papel = [255, 255, 255], tinta = [22, 22, 22];
    raiz.setProperty("--acento", aHex(c));
    raiz.setProperty("--sobre-acento", contraste(c, papel) >= contraste(c, tinta) ? "#ffffff" : "#161616");
    var texto = c.slice(), paso = 0;
    while (contraste(texto, papel) < 4.6 && paso++ < 20) texto = texto.map(function (x) { return x * 0.88; });
    raiz.setProperty("--acento-texto", aHex(texto));
  }

  /* ---------- fechas para la trayectoria ---------- */

  function ahora() {
    var d = new Date();
    return d.getFullYear() + d.getMonth() / 12 + 0.04;
  }

  function esActual(valor) {
    return /^(actual|actualidad|hoy|presente|present|now|current|ahora)$/i.test(String(valor || "").trim());
  }

  // "2022" → inicio de 2022 · "2022-03" → marzo 2022. Con fin=true: "2022" → fin de 2022.
  function fecha(valor, fin) {
    var m = String(valor || "").match(/(\d{4})(?:\s*[-/.]\s*(\d{1,2}))?/);
    if (!m) return null;
    var anio = +m[1], mes = m[2] ? Math.min(12, Math.max(1, +m[2])) : 0;
    if (!mes) return fin ? anio + 1 : anio;
    return anio + (fin ? mes : mes - 1) / 12;
  }

  var MESES = {
    es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };

  function fechaTexto(valor) {
    var m = String(valor || "").match(/(\d{4})(?:\s*[-/.]\s*(\d{1,2}))?/);
    if (!m) return t(valor);
    return m[2] ? MESES[idioma][Math.min(12, Math.max(1, +m[2])) - 1] + " " + m[1] : m[1];
  }

  // Devuelve {inicio, fin, actual, texto} o null si no hay fechas legibles.
  function tramoDe(item) {
    var inicio, fin, actual = false, texto = t(item.fecha);
    if (item.desde) {
      inicio = fecha(t(item.desde), false);
      if (!item.hasta || esActual(t(item.hasta))) { actual = true; fin = ahora(); }
      else fin = fecha(t(item.hasta), true);
      if (!texto) texto = fechaTexto(t(item.desde)) + " – " + (actual ? UI[idioma].actual : fechaTexto(t(item.hasta)));
    } else if (texto) {
      // También entiende "2022 – 2024" o "2022 – actualidad" escritos en fecha.
      var anios = texto.match(/\d{4}/g) || [];
      if (!anios.length) return null;
      inicio = +anios[0];
      actual = /actual|present|hoy|now/i.test(texto);
      fin = actual ? ahora() : +anios[anios.length - 1] + 1;
    }
    if (inicio === null || inicio === undefined || fin === null || isNaN(inicio) || isNaN(fin)) return null;
    if (fin <= inicio) fin = inicio + 1 / 12;
    return { inicio: inicio, fin: fin, actual: actual, texto: texto };
  }

  // Duración legible: "6 meses", "2,6 años".
  function duracion(anios) {
    var ui = UI[idioma];
    var meses = Math.max(1, Math.round(anios * 12));
    if (meses < 12) return meses + " " + (meses === 1 ? ui.mes : ui.meses);
    var a = Math.round((meses / 12) * 10) / 10;
    var texto = String(a);
    if (idioma === "es") texto = texto.replace(".", ",");
    return texto + " " + (a === 1 ? ui.anio : ui.anios);
  }

  /* ---------- partes de la página ---------- */

  function barra(perfil, secciones) {
    var header = el("header", "barra");
    var int = el("div", "barra__int");
    var marca = el("a", "barra__marca");
    marca.href = "#inicio";
    marca.innerHTML = icono("chip") + "<span>" + escapar(codigo(perfil)) + "</span>";
    marca.setAttribute("aria-label", UI[idioma].inicio + ": " + (t(perfil.nombreCorto) || t(perfil.nombre)));
    int.appendChild(marca);

    var nav = el("nav", "barra__nav");
    nav.setAttribute("aria-label", UI[idioma].secciones);
    secciones.forEach(function (s) {
      if (s.enMenu === false || s.tipo === "frase") return;
      var texto = t(s.menu) || t(s.titulo);
      if (!texto) return;
      agregar(nav, enlace(texto, "#" + s.id, "", false));
    });
    int.appendChild(nav);

    if (idiomas().length > 1) {
      var boton = el("button", "barra__idioma");
      boton.type = "button";
      boton.textContent = UI[idioma].otroIdioma;
      boton.setAttribute("aria-label", UI[idioma].otroIdiomaLargo);
      boton.addEventListener("click", function () {
        cambiarIdioma(idioma === "es" ? "en" : "es");
      });
      int.appendChild(boton);
    }
    header.appendChild(int);
    return header;
  }

  // Lista de pines del chip: CV, correo y enlaces. Se completa con NC hasta un número par (mínimo 4).
  function pinesDe(perfil) {
    var ui = UI[idioma], pines = [];
    var cv = urlSegura(t(perfil.cv));
    if (cv) pines.push({ nombre: "CV", tipo: "O", url: cv, detalle: ui.cvPin });
    var correo = t(perfil.correo).trim();
    if (correo) pines.push({ nombre: idioma === "es" ? "CORREO" : "EMAIL", tipo: "I/O", url: "mailto:" + correo, detalle: correo });
    lista(perfil.enlaces).forEach(function (e) {
      var url = urlSegura(t(e.url)), texto = t(e.texto);
      if (!url || !texto) return;
      var corto = url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
      if (corto.length > 34) corto = corto.slice(0, 33) + "…";
      pines.push({ nombre: texto.toUpperCase(), tipo: "O", url: url, detalle: corto });
    });
    var total = Math.max(4, pines.length + (pines.length % 2));
    while (pines.length < total) pines.push({ nombre: "NC", tipo: "—", detalle: ui.sinConexion });
    pines.forEach(function (p, i) { p.n = i + 1; });
    return pines;
  }

  function foto(perfil) {
    var ventana = el("div", "chip__ventana");
    var ponerIniciales = function () {
      ventana.innerHTML = "";
      ventana.classList.add("chip__ventana--iniciales");
      ventana.appendChild(el("span", "chip__iniciales", escapar(iniciales(t(perfil.nombre)))));
    };
    if (perfil.foto) {
      var img = el("img");
      img.alt = t(perfil.nombre);
      img.onerror = ponerIniciales;
      img.src = t(perfil.foto);
      ventana.appendChild(img);
    } else {
      ponerIniciales();
    }
    return ventana;
  }

  // El chip de la portada: tu foto en la ventana del encapsulado y tus enlaces como pines.
  function chip(perfil, pines) {
    var figura = el("figure", "figura figura--chip");
    var dibujo = el("div", "chip");
    var mitad = pines.length / 2;
    dibujo.style.setProperty("--filas", mitad);

    function pin(p, lado, fila) {
      var li = el("li", "pin pin--" + lado);
      li.setAttribute("data-pin", p.n);
      li.style.setProperty("--fila", fila);
      var nombre;
      if (p.url) {
        nombre = el("a", "pin__nombre", escapar(p.nombre));
        nombre.href = p.url;
        if (enOtraPestana(p.url)) { nombre.target = "_blank"; nombre.rel = "noopener"; }
        // La tabla de funciones de pines es la versión accesible: aquí no se repite al tabular.
        nombre.tabIndex = -1;
      } else {
        nombre = el("span", "pin__nombre pin__nombre--nc", escapar(p.nombre));
      }
      li.appendChild(nombre);
      li.appendChild(el("span", "pin__pata", String(p.n)));
      return li;
    }

    var izq = el("ol", "chip__lado chip__lado--izq");
    var der = el("ol", "chip__lado chip__lado--der");
    for (var i = 0; i < mitad; i++) {
      izq.appendChild(pin(pines[i], "izq", i));
      // Como en un encapsulado DIP: el lado derecho se numera de abajo hacia arriba.
      der.appendChild(pin(pines[pines.length - 1 - i], "der", i));
    }
    var cuerpo = el("div", "chip__cuerpo");
    cuerpo.appendChild(el("span", "chip__muesca"));
    cuerpo.appendChild(el("span", "chip__punto"));
    cuerpo.appendChild(foto(perfil));
    cuerpo.appendChild(el("span", "chip__marca", escapar(codigo(perfil))));
    dibujo.appendChild(izq);
    dibujo.appendChild(cuerpo);
    dibujo.appendChild(der);
    dibujo.setAttribute("aria-hidden", "true");
    figura.appendChild(dibujo);
    figura.appendChild(pieFigura(UI[idioma].configuracion));
    return figura;
  }

  function tablaPines(pines) {
    var ui = UI[idioma];
    var tabla = el("table", "tabla tabla--pines");
    tabla.appendChild(tituloTabla(ui.funcionesPines));
    tabla.appendChild(el("thead", "", "<tr><th scope=\"col\">" + ui.pin + "</th><th scope=\"col\">" + ui.nombre + "</th><th scope=\"col\">" + ui.tipoPin + "</th><th scope=\"col\">" + ui.detalle + "</th></tr>"));
    var tbody = el("tbody");
    pines.forEach(function (p) {
      var tr = el("tr");
      tr.setAttribute("data-pin", p.n);
      if (!p.url) tr.className = "fila-nc";
      tr.appendChild(el("td", "tabla__num", String(p.n)));
      tr.appendChild(el("td", "tabla__nombre", escapar(p.nombre)));
      tr.appendChild(el("td", "tabla__tipo", escapar(p.tipo)));
      var td = el("td");
      var a = p.url ? enlace(p.detalle, p.url, "enlace enlace--pin", false) : null;
      // Las direcciones largas solo se cortan después de @, / o punto.
      if (a) { a.firstChild.innerHTML = escapar(p.detalle).replace(/([@\/.])/g, "$1<wbr>"); td.appendChild(a); }
      else td.textContent = p.detalle;
      tr.appendChild(td);
      tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
    return tabla;
  }

  function portada(perfil, indice) {
    var ui = UI[idioma];
    var seccion = el("section", "portada");
    seccion.id = "inicio";
    var int = el("div", "portada__int envoltura");

    var doc = el("div", "portada__doc");
    doc.appendChild(el("span", "portada__codigo", escapar(ui.hojaDatos + " · " + codigo(perfil))));
    var derecha = [];
    if (t(perfil.ubicacion)) derecha.push(escapar(t(perfil.ubicacion)));
    if (t(datos.actualizado)) derecha.push(escapar(ui.revisado + ": " + t(datos.actualizado)));
    if (derecha.length) doc.appendChild(el("span", "portada__rev", derecha.join(" · ")));
    int.appendChild(doc);

    var h1 = el("h1", "portada__nombre");
    h1.appendChild(el("span", "portada__nombre-int", escapar(t(perfil.nombre))));
    int.appendChild(h1);
    if (t(perfil.titular)) int.appendChild(el("p", "portada__titular", formato(t(perfil.titular))));

    var cols = el("div", "portada__cols");
    var izq = el("div", "portada__izq");

    var cifras = lista(perfil.cifras).filter(function (c) { return t(c.numero); });
    if (cifras.length) {
      var bloque = el("div", "bloque bloque--caracteristicas");
      bloque.id = "caracteristicas";
      num.seccion++;
      bloque.appendChild(tituloNumerado("h2", "bloque__titulo", ui.caracteristicas, num.seccion));
      indice.push({ numero: num.seccion, texto: ui.caracteristicas, id: bloque.id });
      var tabla = el("table", "tabla tabla--specs");
      tabla.appendChild(tituloTabla(ui.especificaciones));
      tabla.appendChild(el("thead", "", "<tr><th scope=\"col\">" + ui.parametro + "</th><th scope=\"col\" class=\"tabla__valor\">" + ui.valor + "</th></tr>"));
      var tbody = el("tbody");
      cifras.forEach(function (c, j) {
        var tr = el("tr", "spec");
        tr.style.setProperty("--j", j);
        tr.appendChild(el("td", "spec__texto", formato(t(c.texto))));
        var valor = t(c.numero);
        tr.appendChild(el("td", "spec__valor tabla__valor", '<span class="cifra__numero" style="min-width:' + (valor.length * 0.62).toFixed(2) + 'em">' + escapar(valor) + "</span>"));
        tbody.appendChild(tr);
      });
      tabla.appendChild(tbody);
      bloque.appendChild(tabla);
      izq.appendChild(bloque);
    }

    if (t(perfil.objetivo)) {
      var apl = el("div", "bloque bloque--aplicaciones");
      apl.id = "aplicaciones";
      num.seccion++;
      apl.appendChild(tituloNumerado("h2", "bloque__titulo", ui.aplicaciones, num.seccion));
      indice.push({ numero: num.seccion, texto: ui.aplicaciones, id: apl.id });
      var ul = el("ul", "vinetas");
      ul.appendChild(el("li", "objetivo", formato(t(perfil.objetivo))));
      apl.appendChild(ul);
      izq.appendChild(apl);
    }

    var des = el("div", "bloque bloque--descripcion");
    des.id = "descripcion";
    num.seccion++;
    des.appendChild(tituloNumerado("h2", "bloque__titulo", ui.descripcion, num.seccion));
    indice.push({ numero: num.seccion, texto: ui.descripcion, id: des.id });
    if (t(perfil.bio)) des.appendChild(el("p", "portada__bio", formato(t(perfil.bio))));
    var acciones = el("div", "acciones");
    agregar(acciones, enlace(ui.cv, t(perfil.cv), "boton boton--principal"));
    if (perfil.correo) agregar(acciones, enlace(ui.correo, "mailto:" + t(perfil.correo), "boton"));
    if (acciones.children.length) des.appendChild(acciones);
    izq.appendChild(des);
    cols.appendChild(izq);

    var der = el("div", "portada__der");
    var pines = pinesDe(perfil);
    der.appendChild(chip(perfil, pines));
    der.appendChild(tablaPines(pines));
    cols.appendChild(der);

    int.appendChild(cols);
    seccion.appendChild(int);
    return seccion;
  }

  // Índice con líneas de puntos, como la primera página de una hoja de datos.
  function tablaContenido(indice) {
    var nav = el("nav", "indice");
    nav.id = "indice";
    nav.setAttribute("aria-labelledby", "indice-titulo");
    var int = el("div", "indice__int envoltura");
    var h2 = el("h2", "indice__titulo", escapar(UI[idioma].indice));
    h2.id = "indice-titulo";
    int.appendChild(h2);
    var ol = el("ol", "indice__lista");
    ol.style.setProperty("--filas", Math.ceil(indice.length / 2));
    indice.forEach(function (e) {
      var li = el("li");
      var a = el("a", "indice__enlace");
      a.href = "#" + e.id;
      a.innerHTML = '<span class="num">' + e.numero + '</span><span class="indice__texto">' + escapar(e.texto) + '</span><span class="indice__puntos" aria-hidden="true"></span>' + icono("flecha");
      li.appendChild(a);
      ol.appendChild(li);
    });
    int.appendChild(ol);
    nav.appendChild(int);
    return nav;
  }

  function cabecera(s) {
    var cab = el("header", "seccion__cab");
    if (t(s.titulo)) cab.appendChild(tituloNumerado("h2", "seccion__titulo", t(s.titulo), s._numero));
    if (t(s.intro)) cab.appendChild(el("p", "seccion__intro", formato(t(s.intro))));
    return cab;
  }

  function seccion(s) {
    var tipo = TIPOS[s.tipo] ? s.tipo : "texto";
    var nodo = el("section", "seccion seccion--" + tipo);
    nodo.id = s.id;
    var int = el("div", "seccion__int envoltura");

    if (tipo === "frase") {
      int.appendChild(TIPOS.frase(s));
      nodo.appendChild(int);
      return nodo;
    }

    int.appendChild(cabecera(s));
    var cuerpo = TIPOS[tipo](s);
    if (cuerpo) {
      cuerpo.classList.add("seccion__cuerpo");
      int.appendChild(cuerpo);
    }
    nodo.appendChild(int);
    return nodo;
  }

  var TIPOS = {
    texto: function (s) {
      var caja = el("div", "texto");
      lista(s.parrafos).forEach(function (p, i) {
        if (t(p)) caja.appendChild(el("p", i === 0 ? "texto__entrada" : "", formato(t(p))));
      });
      return caja;
    },

    // Frase grande: cada palabra se enciende al bajar. **Entre asteriscos** va resaltado.
    frase: function (s) {
      var p = el("p", "frase");
      var color = false;
      var palabras = t(s.texto).split(/\s+/).filter(Boolean);
      palabras.forEach(function (palabra, n) {
        var span = el("span", "frase__palabra");
        var ultimo = null;
        palabra.split("**").forEach(function (trozo, i) {
          if (i > 0) color = !color;
          if (!trozo) return;
          ultimo = color ? el("span", "frase__color", escapar(trozo)) : document.createTextNode(trozo);
          span.appendChild(ultimo);
        });
        if (!span.childNodes.length) return;
        p.appendChild(span);
        // Si el resaltado sigue en la palabra siguiente, el espacio también va resaltado.
        if (color && ultimo && ultimo.className === "frase__color" && n < palabras.length - 1) p.appendChild(el("span", "frase__hueco", " "));
        else p.appendChild(document.createTextNode(" "));
      });
      return p;
    },

    // Premios, becas, voluntariado: una tabla con la fecha a la izquierda.
    lista: function (s) {
      var ui = UI[idioma];
      var tabla = el("table", "tabla tabla--filas");
      tabla.appendChild(tituloTabla(t(s.titulo) || ui.reconocimiento));
      var items = visibles(s.items);
      var conLugar = items.some(function (i) { return t(i.lugar); });
      tabla.appendChild(el("thead", "", "<tr><th scope=\"col\">" + ui.fecha + "</th><th scope=\"col\">" + ui.reconocimiento + "</th>" + (conLugar ? "<th scope=\"col\">" + ui.entidad + "</th>" : "") + "</tr>"));
      var tbody = el("tbody");
      items.forEach(function (item) {
        var tr = el("tr", "fila");
        tr.appendChild(el("td", "fila__fecha", escapar(t(item.fecha))));
        var td = el("td", "fila__cuerpo");
        td.appendChild(el("h3", "fila__titulo", formato(t(item.titulo))));
        if (t(item.descripcion)) td.appendChild(el("p", "fila__desc", formato(t(item.descripcion))));
        agregar(td, logros(item.logros));
        agregar(td, cajaEnlaces(item.enlaces || item.enlace));
        tr.appendChild(td);
        if (conLugar) tr.appendChild(el("td", "fila__lugar", formato(t(item.lugar))));
        tbody.appendChild(tr);
      });
      tabla.appendChild(tbody);
      return tabla;
    },

    // Publicaciones como «documentación relacionada».
    publicaciones: function (s) {
      var ol = el("ol", "docs");
      visibles(s.items).forEach(function (p) {
        var li = el("li", "doc");
        li.appendChild(el("div", "doc__anio", escapar(t(p.anio))));
        var cuerpo = el("div", "doc__cuerpo");
        if (t(p.tipo)) cuerpo.appendChild(el("span", "doc__tipo", escapar(t(p.tipo))));
        cuerpo.appendChild(el("h3", "doc__titulo", formato(t(p.titulo))));
        var ref = [];
        if (t(p.autores)) ref.push('<span class="doc__autores">' + formato(t(p.autores)) + "</span>");
        if (t(p.medio)) ref.push('<em class="doc__medio">' + formato(t(p.medio)) + "</em>");
        if (ref.length) cuerpo.appendChild(el("p", "doc__ref", ref.join(" · ")));
        if (t(p.nota)) cuerpo.appendChild(el("p", "doc__nota", formato(t(p.nota))));
        agregar(cuerpo, cajaEnlaces(p.enlaces || p.enlace));
        li.appendChild(cuerpo);
        ol.appendChild(li);
      });
      return ol;
    },

    // Trayectoria como diagrama de tiempos: cada cargo es una señal que sube al empezar y baja al terminar.
    trayectoria: function (s) {
      var ui = UI[idioma];
      var items = visibles(s.items);
      var tramos = items.map(tramoDe);
      var validos = tramos.filter(Boolean);
      if (!validos.length) return TIPOS.lista(s);

      var min = Math.floor(Math.min.apply(null, validos.map(function (x) { return x.inicio; })));
      var max = Math.ceil(Math.max.apply(null, validos.map(function (x) { return x.fin; })));
      if (max - min < 2) max = min + 2;
      var rango = max - min;
      var paso = rango > 16 ? 4 : rango > 8 ? 2 : 1;
      var pos = function (v) { return ((v - min) / rango) * 100; };

      var figura = el("figure", "figura tiempos");
      figura.style.setProperty("--anios", rango);
      figura.style.setProperty("--paso", paso);

      var eje = el("div", "tiempos__eje");
      eje.setAttribute("aria-hidden", "true");
      var marcas = el("div", "tiempos__marcas");
      for (var a = min; a <= max; a += paso) {
        var marca = el("span", "tiempos__anio", String(a));
        marca.style.left = pos(a) + "%";
        if (a === max) marca.classList.add("tiempos__anio--fin");
        if (a === min) marca.classList.add("tiempos__anio--ini");
        // En celulares se ocultan los años vecinos a los extremos para que no se amontonen.
        if (a === min + paso || a === max - paso) marca.classList.add("tiempos__anio--vecino");
        marcas.appendChild(marca);
      }
      var hoy = ahora();
      if (hoy > min && hoy < max) {
        var cursor = el("span", "tiempos__hoy", escapar(ui.hoy));
        cursor.style.left = pos(hoy) + "%";
        marcas.appendChild(cursor);
        figura.style.setProperty("--hoy", (pos(hoy) / 100).toFixed(4));
        figura.classList.add("tiempos--con-hoy");
      }
      eje.appendChild(marcas);
      figura.appendChild(eje);

      var ol = el("ol", "senales");
      items.forEach(function (item, i) {
        var tr = tramos[i];
        var li = el("li", "senal");
        li.style.setProperty("--k", i);

        var cab = el("div", "senal__cab");
        cab.appendChild(el("h3", "senal__titulo", formato(t(item.titulo))));
        var texto = tr ? tr.texto : t(item.fecha);
        if (texto) cab.appendChild(el("span", "senal__fecha", escapar(texto)));
        li.appendChild(cab);

        if (tr) {
          var pista = el("div", "senal__pista");
          pista.setAttribute("aria-hidden", "true");
          var x1 = pos(tr.inicio) * 10, x2 = pos(tr.fin) * 10, b = 5;
          var d = "M0 34H" + Math.max(0, x1 - b).toFixed(1) + "L" + (x1 + b).toFixed(1) + " 6";
          d += tr.actual ? "H1000" : "H" + Math.max(x1 + b, x2 - b).toFixed(1) + "L" + (x2 + b).toFixed(1) + " 34H1000";
          pista.innerHTML =
            '<svg class="senal__onda" viewBox="0 0 1000 40" preserveAspectRatio="none" focusable="false">' +
            '<path class="senal__nivel" d="' + d + '" pathLength="1"/></svg>';
          var cota = el("span", "senal__cota" + (tr.actual ? " senal__cota--actual" : ""), "<span>" + escapar(duracion(tr.fin - tr.inicio)) + "</span>");
          cota.style.left = pos(tr.inicio) + "%";
          cota.style.width = Math.max(pos(tr.fin) - pos(tr.inicio), 1) + "%";
          if (pos(tr.fin) - pos(tr.inicio) < 14) cota.classList.add("senal__cota--corta");
          if (pos(tr.fin) > 86) cota.classList.add("senal__cota--al-final");
          pista.appendChild(cota);
          li.appendChild(pista);
        }

        var detalle = el("div", "senal__detalle");
        if (t(item.lugar)) detalle.appendChild(el("p", "senal__lugar", formato(t(item.lugar))));
        if (t(item.descripcion)) detalle.appendChild(el("p", "senal__desc", formato(t(item.descripcion))));
        agregar(detalle, logros(item.logros));
        agregar(detalle, cajaEnlaces(item.enlaces || item.enlace));
        if (detalle.children.length) li.appendChild(detalle);
        ol.appendChild(li);
      });
      figura.appendChild(ol);
      figura.appendChild(pieFigura(ui.diagrama + ": " + t(s.titulo)));
      return figura;
    },

    // Proyectos como «aplicaciones típicas»: numeradas, con figura y los pasos STAR.
    proyectos: function (s) {
      var caja = el("div", "aplicaciones");
      visibles(s.items).forEach(function (p, n) {
        var art = el("article", "aplicacion");
        art.appendChild(tituloNumerado("h3", "aplicacion__titulo", t(p.titulo), s._numero + "." + (n + 1)));
        var etiquetas = lista(p.etiquetas).map(t).filter(Boolean);
        if (etiquetas.length) {
          var ul = el("ul", "etiquetas");
          etiquetas.forEach(function (e) { ul.appendChild(el("li", "", escapar(e))); });
          art.appendChild(ul);
        }
        if (t(p.resumen)) art.appendChild(el("p", "aplicacion__resumen", formato(t(p.resumen))));

        var cuerpo = el("div", "aplicacion__cuerpo");
        var dl = el("dl", "star");
        ["situacion", "accion", "resultado"].forEach(function (clave) {
          if (!t(p[clave])) return;
          var paso = el("div", "star__paso star__paso--" + clave);
          paso.style.setProperty("--k", dl.children.length);
          paso.appendChild(el("dt", "", escapar(UI[idioma][clave])));
          paso.appendChild(el("dd", "", formato(t(p[clave]))));
          dl.appendChild(paso);
        });
        if (t(p.aprendizaje)) {
          var nota = el("div", "star__paso star__paso--aprendizaje nota");
          nota.style.setProperty("--k", dl.children.length);
          nota.appendChild(el("dt", "", escapar(UI[idioma].aprendizaje)));
          nota.appendChild(el("dd", "", formato(t(p.aprendizaje))));
          dl.appendChild(nota);
        }
        var texto = el("div", "aplicacion__texto");
        if (dl.children.length) texto.appendChild(dl);
        agregar(texto, cajaEnlaces(p.enlaces));
        cuerpo.appendChild(texto);

        if (p.imagen) {
          var figura = el("figure", "figura aplicacion__figura");
          var marco = el("div", "aplicacion__img");
          var img = el("img");
          img.onerror = function () { figura.remove(); art.classList.add("aplicacion--sin-img"); };
          img.src = t(p.imagen);
          img.alt = t(p.alt) || t(p.titulo);
          img.loading = "lazy";
          marco.appendChild(img);
          figura.appendChild(marco);
          figura.appendChild(pieFigura(t(p.titulo)));
          cuerpo.appendChild(figura);
        } else {
          art.classList.add("aplicacion--sin-img");
        }
        art.appendChild(cuerpo);
        caja.appendChild(art);
      });
      return caja;
    },

    habilidades: function (s) {
      var ui = UI[idioma];
      var tabla = el("table", "tabla tabla--habilidades");
      tabla.appendChild(tituloTabla(t(s.titulo) || ui.conocimientos));
      tabla.appendChild(el("thead", "", "<tr><th scope=\"col\">" + ui.area + "</th><th scope=\"col\">" + ui.conocimientos + "</th></tr>"));
      var tbody = el("tbody");
      visibles(s.grupos).forEach(function (g) {
        var tr = el("tr");
        tr.appendChild(el("th", "habilidad__grupo", escapar(t(g.nombre))));
        tr.firstChild.setAttribute("scope", "row");
        var td = el("td");
        var ul = el("ul", "habilidad__lista");
        lista(g.items).forEach(function (i) {
          if (t(i)) ul.appendChild(el("li", "", formato(t(i))));
        });
        td.appendChild(ul);
        tr.appendChild(td);
        tbody.appendChild(tr);
      });
      tabla.appendChild(tbody);
      return tabla;
    },

    contacto: function (s) {
      var perfil = datos.perfil || {};
      var caja = el("div", "contacto");
      lista(s.parrafos).forEach(function (p) {
        if (t(p)) caja.appendChild(el("p", "contacto__texto", formato(t(p))));
      });
      if (perfil.correo) agregar(caja, enlace(t(perfil.correo), "mailto:" + t(perfil.correo), "contacto__correo"));
      var acciones = el("div", "acciones");
      agregar(acciones, enlace(UI[idioma].cv, t(perfil.cv), "boton boton--principal"));
      var redes = el("div", "enlaces");
      lista(perfil.enlaces).forEach(function (e) { agregar(redes, enlace(t(e.texto), t(e.url), "enlace")); });
      if (redes.children.length) acciones.appendChild(redes);
      caja.appendChild(acciones);
      return caja;
    }
  };

  function pie(perfil) {
    var footer = el("footer", "pie");
    var int = el("div", "pie__int envoltura");
    var anio = new Date().getFullYear();
    var texto = "© " + anio + " " + escapar(t(perfil.nombre));
    if (t(datos.actualizado)) texto += " · " + UI[idioma].actualizado + ": " + escapar(t(datos.actualizado));
    int.appendChild(el("p", "", texto));
    if (perfil.correo) agregar(int, enlace(UI[idioma].comentarios, "mailto:" + t(perfil.correo), "pie__comentarios", false));
    int.appendChild(el("p", "pie__codigo", escapar(codigo(perfil))));
    // Nota opcional al pie: solo si contenido.js trae  pie: "..." .
    if (t(datos.pie)) int.appendChild(el("p", "pie__nota", formato(t(datos.pie))));
    footer.appendChild(int);
    return footer;
  }

  /* ---------- idioma ---------- */

  function idiomas() {
    var l = lista(datos.idiomas).filter(function (i) { return UI[i]; });
    return l.length ? l : ["es"];
  }

  function idiomaInicial() {
    var disponibles = idiomas();
    var pedido = (location.search.match(/[?&]lang=(es|en)/) || [])[1];
    if (pedido && disponibles.indexOf(pedido) >= 0) return pedido;
    try {
      var guardado = localStorage.getItem("portafolio-idioma");
      if (guardado && disponibles.indexOf(guardado) >= 0) return guardado;
    } catch (e) {}
    if (datos.idiomaInicial && disponibles.indexOf(datos.idiomaInicial) >= 0) return datos.idiomaInicial;
    return disponibles[0];
  }

  function cambiarIdioma(nuevo) {
    idioma = nuevo;
    try { localStorage.setItem("portafolio-idioma", nuevo); } catch (e) {}
    var y = window.scrollY;
    dibujar();
    window.scrollTo(0, y);
    vida(false);
    var boton = document.querySelector(".barra__idioma");
    if (boton) boton.focus();
  }

  /* ---------- vida: animaciones y menú activo ----------
     Todo es mejora progresiva: si el navegador es antiguo, la persona pidió
     "reducir movimiento" o contenido.js dice  animaciones: false,
     el contenido se ve completo y quieto. Todo el movimiento late con un
     mismo reloj (--tic en estilos.css), como una señal de reloj en un circuito. */

  var estadoVida = { observadores: [], alLimpiar: [] };
  var cada = function (nodos, fn) { Array.prototype.forEach.call(nodos, fn); };

  function quiereMovimiento() {
    if (datos.animaciones === false) return false;
    try { return !window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return true; }
  }

  function observar(callback, opciones) {
    var io = new IntersectionObserver(callback, opciones);
    estadoVida.observadores.push(io);
    return io;
  }

  function alDesplazar(fn) {
    var pendiente = false;
    function mover() {
      if (!pendiente) { pendiente = true; requestAnimationFrame(function () { pendiente = false; fn(); }); }
    }
    window.addEventListener("scroll", mover, { passive: true });
    window.addEventListener("resize", mover);
    estadoVida.alLimpiar.push(function () {
      window.removeEventListener("scroll", mover);
      window.removeEventListener("resize", mover);
    });
  }

  function vida(primeraVez) {
    estadoVida.observadores.forEach(function (io) { io.disconnect(); });
    estadoVida.alLimpiar.forEach(function (fn) { fn(); });
    estadoVida = { observadores: [], alLimpiar: [] };

    var raiz = document.documentElement;
    raiz.classList.remove("animar", "entrada");
    pinesEnlazados();
    if (!("IntersectionObserver" in window)) return;
    var movimiento = quiereMovimiento();
    try {
      barraFlotante();
      menuActivo(movimiento);
      if (!movimiento) return;
      raiz.classList.add("animar");
      if (primeraVez) entradaInicial();
      revelarAlBajar(primeraVez);
      capturas(primeraVez);
      frases();
      pasosStar();
      if (primeraVez) contarCifras();
    } catch (e) {
      raiz.classList.remove("animar", "entrada"); // ante cualquier fallo, todo visible
    }
  }

  // Al pasar por un pin del chip se marca su fila en la tabla, y al revés.
  function pinesEnlazados() {
    var nodos = document.querySelectorAll("[data-pin]");
    function marcar(n, si) {
      cada(document.querySelectorAll('[data-pin="' + n + '"]'), function (x) { x.classList.toggle("pin-activo", si); });
    }
    cada(nodos, function (nodo) {
      var n = nodo.getAttribute("data-pin");
      nodo.addEventListener("mouseenter", function () { marcar(n, true); });
      nodo.addEventListener("mouseleave", function () { marcar(n, false); });
      nodo.addEventListener("focusin", function () { marcar(n, true); });
      nodo.addEventListener("focusout", function () { marcar(n, false); });
    });
  }

  // Línea bajo la barra cuando ya no estás arriba del todo.
  function barraFlotante() {
    var barra = document.querySelector(".barra");
    if (!barra) return;
    var centinela = el("div", "centinela");
    centinela.setAttribute("aria-hidden", "true");
    barra.parentNode.insertBefore(centinela, barra);
    observar(function (e) {
      barra.classList.toggle("barra--flotante", !e[0].isIntersecting);
    }).observe(centinela);
  }

  // Marca en el menú la sección que estás leyendo con una línea que se desliza.
  function menuActivo(movimiento) {
    var nav = document.querySelector(".barra__nav");
    if (!nav) return;
    var enlaces = {}, ids = [];
    cada(nav.querySelectorAll('a[href^="#"]'), function (a) {
      var id = a.getAttribute("href").slice(1);
      if (id && document.getElementById(id)) { enlaces[id] = a; ids.push(id); }
    });
    if (!ids.length) return;

    var indicador = el("span", "barra__indicador");
    indicador.setAttribute("aria-hidden", "true");
    nav.insertBefore(indicador, nav.firstChild);
    var activo = null;

    function colocar() {
      var a = activo && enlaces[activo];
      if (!a) { indicador.style.opacity = "0"; return; }
      var aparece = indicador.style.opacity !== "1";
      if (aparece) indicador.style.transition = "none";
      // La línea mide 100px y se escala al ancho del enlace: así solo se anima transform.
      indicador.style.transform = "translateX(" + a.offsetLeft + "px) scaleX(" + a.offsetWidth / 100 + ")";
      if (aparece) { void indicador.offsetWidth; indicador.style.transition = ""; }
      indicador.style.opacity = "1";
    }

    function activar(id) {
      if (id === activo) return;
      if (activo) { enlaces[activo].classList.remove("activo"); enlaces[activo].removeAttribute("aria-current"); }
      activo = id;
      if (id) {
        var a = enlaces[id];
        a.classList.add("activo");
        a.setAttribute("aria-current", "true");
        if (nav.scrollWidth > nav.clientWidth) {
          nav.scrollTo({ left: a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2, behavior: movimiento ? "smooth" : "auto" });
        }
      }
      colocar();
    }

    // Activa la última sección cuyo inicio ya pasó el 42 % de la pantalla (o la última si llegaste al final).
    function recalcular() {
      var elegido = null, linea = window.innerHeight * 0.42;
      var pie = document.querySelector(".pie");
      var alFinal = window.scrollY > 0 && pie && pie.getBoundingClientRect().bottom <= window.innerHeight + 2;
      if (alFinal) elegido = ids[ids.length - 1];
      else ids.forEach(function (id) {
        if (document.getElementById(id).getBoundingClientRect().top <= linea) elegido = id;
      });
      activar(elegido);
    }

    var io = observar(recalcular, { rootMargin: "-42% 0px -57% 0px" });
    ids.forEach(function (id) { io.observe(document.getElementById(id)); });
    var pie = document.querySelector(".pie");
    if (pie) observar(recalcular, { threshold: [0, 1] }).observe(pie);

    var pendiente = false;
    function alRedimensionar() {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(function () { pendiente = false; colocar(); recalcular(); });
    }
    window.addEventListener("resize", alRedimensionar);
    estadoVida.alLimpiar.push(function () { window.removeEventListener("resize", alRedimensionar); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(colocar);
    recalcular();
  }

  // Al cargar: el nombre sube, la tabla de especificaciones se captura fila a fila y el chip se monta pin por pin.
  function entradaInicial() {
    document.documentElement.classList.add("entrada");
    setTimeout(function () { document.documentElement.classList.remove("entrada"); }, 3400);
  }

  var REVELAR = [
    ".indice", ".seccion__titulo", ".seccion__intro", ".texto > p", ".tabla--filas tbody tr", ".tabla--habilidades tbody tr",
    ".doc", ".aplicacion__titulo", ".aplicacion .etiquetas", ".aplicacion__figura", ".contacto > *"
  ].join(", ");

  // Cada bloque se «traza» de izquierda a derecha al aparecer; los que entran juntos lo hacen al ritmo del reloj.
  function revelarAlBajar(primeraVez) {
    var alto = window.innerHeight;
    var io = observar(function (entradas) {
      var orden = 0;
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var nodo = e.target;
        io.unobserve(nodo);
        var retraso = Math.min(orden++, 6);
        nodo.style.setProperty("--t", retraso);
        nodo.classList.add("visible");
        // Al terminar se quitan las clases para que el hover y la impresión vuelvan a lo normal.
        setTimeout(function () {
          nodo.classList.remove("revelar", "visible");
          nodo.style.removeProperty("--t");
        }, retraso * 90 + 1400);
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    cada(document.querySelectorAll(REVELAR), function (nodo) {
      // Al cambiar de idioma solo se anima lo que aún no has visto.
      if (!primeraVez && nodo.getBoundingClientRect().top < alto) return;
      nodo.classList.add("revelar");
      io.observe(nodo);
    });
  }

  // Diagramas de tiempos: al entrar en pantalla las señales se capturan de izquierda a derecha, una tras otra.
  function capturas(primeraVez) {
    var alto = window.innerHeight;
    var io = observar(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        e.target.classList.add("capturado");
        setTimeout(function () { e.target.classList.remove("capturar", "capturado"); }, 4200);
      });
    }, { rootMargin: "0px 0px -18% 0px" });
    cada(document.querySelectorAll(".tiempos"), function (f) {
      if (!primeraVez && f.getBoundingClientRect().top < alto) return;
      f.classList.add("capturar");
      io.observe(f);
    });
  }

  // Avance (0 a 1) de un bloque mientras cruza la pantalla: empieza al asomar abajo y termina cerca del centro.
  function avance(nodo, inicio, fin) {
    var r = nodo.getBoundingClientRect(), alto = window.innerHeight;
    var a = alto * inicio, b = alto * fin;
    return Math.max(0, Math.min(1, (a - r.top) / (a - b + r.height * 0.5)));
  }

  // Frase: cada palabra se enciende según avanzas.
  function frases() {
    cada(document.querySelectorAll(".frase"), function (frase) {
      var palabras = frase.querySelectorAll(".frase__palabra");
      function pintar() {
        var n = Math.round(avance(frase, 0.9, 0.45) * palabras.length);
        for (var i = 0; i < palabras.length; i++) palabras[i].classList.toggle("encendida", i < n);
      }
      alDesplazar(pintar);
      pintar();
    });
  }

  // Proyectos: situación, qué hice, resultado y aprendizaje se encienden en orden mientras lees.
  function pasosStar() {
    var listas = document.querySelectorAll(".star");
    if (!listas.length) return;
    function pintar() {
      cada(listas, function (dl) {
        var pasos = dl.querySelectorAll(".star__paso");
        var n = Math.ceil(avance(dl, 0.95, 0.5) * pasos.length);
        for (var i = 0; i < pasos.length; i++) pasos[i].classList.toggle("encendido", i < n);
      });
    }
    alDesplazar(pintar);
    pintar();
  }

  // Las cifras de la portada cuentan desde cero. Solo números simples: "4", "15k", "94 %", "3,5".
  function contarCifras() {
    var cargada = Date.now();
    var io = observar(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var fila = e.target.closest(".spec");
        var j = fila ? +fila.style.getPropertyValue("--j") || 0 : 0;
        contar(e.target, Date.now() - cargada < 1500 ? 700 + j * 90 : 0);
      });
    }, { threshold: 0.6 });
    cada(document.querySelectorAll(".cifra__numero"), function (n) {
      if (/^\D*\d+([.,]\d+)?\D*$/.test(n.textContent.trim())) io.observe(n);
    });
    // Si imprimen a mitad de la cuenta, cada cifra salta a su valor real.
    function terminar() {
      cada(document.querySelectorAll(".cifra__numero[data-final]"), function (n) {
        n.textContent = n.getAttribute("data-final");
        n.removeAttribute("data-final");
      });
    }
    window.addEventListener("beforeprint", terminar);
    estadoVida.alLimpiar.push(function () { window.removeEventListener("beforeprint", terminar); });
  }

  function contar(nodo, espera) {
    var final = nodo.textContent;
    var m = final.trim().match(/^(\D*)(\d+)(?:([.,])(\d+))?(\D*)$/);
    if (!m) return;
    var objetivo = parseFloat(m[2] + (m[4] ? "." + m[4] : ""));
    var decimales = m[4] ? m[4].length : 0;
    var duracionMs = 1400, inicio = null;
    nodo.setAttribute("data-final", final);
    function escribir(valor) {
      var texto = valor.toFixed(decimales);
      nodo.textContent = m[1] + (m[3] ? texto.replace(".", m[3]) : texto) + m[5];
    }
    function paso(ahoraMs) {
      if (!nodo.hasAttribute("data-final")) return; // ya terminada (por ejemplo, al imprimir)
      if (inicio === null) inicio = ahoraMs + espera;
      var x = Math.max(0, Math.min(1, (ahoraMs - inicio) / duracionMs));
      if (x >= 1) { nodo.textContent = final; nodo.removeAttribute("data-final"); return; }
      escribir(objetivo * (1 - Math.pow(1 - x, 4))); // arranca rápido y frena al llegar
      requestAnimationFrame(paso);
    }
    escribir(0);
    requestAnimationFrame(paso);
  }

  /* ---------- fuentes ----------
     Opcional en contenido.js:  fuentes: { texto: "Manrope" }
     Nombres exactos de Google Fonts (fonts.google.com). Cambia la letra de los textos;
     los títulos y las cifras siguen con la letra de la plantilla. */

  function aplicarFuentes(f) {
    if (!f || typeof f !== "object") return;
    var limpia = function (n) { return typeof n === "string" ? n.replace(/["';{}<>]/g, "").trim() : ""; };
    var titulos = limpia(f.titulos), texto = limpia(f.texto);
    var familias = [titulos, texto].filter(function (n, i, a) { return n && a.indexOf(n) === i; });
    if (!familias.length) return;
    var link = document.getElementById("fuentes-propias");
    if (!link) {
      link = document.createElement("link");
      link.id = "fuentes-propias";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = "https://fonts.googleapis.com/css2?" + familias.map(function (n) {
      return "family=" + encodeURIComponent(n).replace(/%20/g, "+") + ":wght@400;700";
    }).join("&") + "&display=swap";
    var raiz = document.documentElement.style;
    // En las plantillas híbridas manda la de texto (o la de títulos si es la única).
    raiz.setProperty("--letra", '"' + (texto || titulos) + '", system-ui, sans-serif');
  }

  /* ---------- dibujar ---------- */

  function dibujar() {
    var perfil = datos.perfil || {};
    var secciones = visibles(datos.secciones);
    secciones.forEach(function (s, i) { if (!s.id) s.id = "seccion-" + (i + 1); });
    num = { seccion: 0, figura: 0, tabla: 0 };

    document.documentElement.lang = idioma;
    document.title = t(datos.tituloPestana) || [t(perfil.nombre), t(perfil.titular)].filter(Boolean).join(" · ");
    if (datos.colorPrincipal) aplicarColor(datos.colorPrincipal);
    aplicarFuentes(datos.fuentes);

    var app = document.getElementById("app");
    app.innerHTML = "";

    app.appendChild(enlace(UI[idioma].saltar, "#contenido", "saltar", false));
    app.appendChild(barra(perfil, secciones));
    var main = el("main");
    main.id = "contenido";

    var indice = [];
    main.appendChild(portada(perfil, indice));
    // Las secciones con título siguen la numeración de la portada.
    secciones.forEach(function (s) {
      if (s.tipo === "frase" || !t(s.titulo)) return;
      num.seccion++;
      s._numero = num.seccion;
      indice.push({ numero: num.seccion, texto: t(s.menu) || t(s.titulo), id: s.id });
    });
    if (indice.length > 3) main.appendChild(tablaContenido(indice));
    secciones.forEach(function (s) { main.appendChild(seccion(s)); });
    app.appendChild(main);
    app.appendChild(pie(perfil));
  }

  function mostrarError() {
    var ui = UI.es;
    var app = document.getElementById("app");
    var errores = (window.__erroresPortafolio || []).join("\n");
    app.innerHTML =
      '<div class="error-carga"><h1>' + ui.errorTitulo + "</h1><p>" + escapar(ui.errorTexto) + "</p><p>" +
      escapar(UI.en.errorTexto) + "</p>" +
      (errores ? "<details open><summary>" + ui.errorDetalle + "</summary><pre>" + escapar(errores) + "</pre></details>" : "") +
      "</div>";
  }

  if (!datos || typeof datos !== "object") {
    mostrarError();
    return;
  }
  try {
    idioma = idiomaInicial();
    dibujar();
    vida(true);
  } catch (e) {
    window.__erroresPortafolio = (window.__erroresPortafolio || []).concat(String(e && e.message ? e.message : e));
    mostrarError();
  }
})();
