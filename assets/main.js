/* Casa Sevilla — demo. Menú móvil, catálogo, ficha, filtros y mensajes de WhatsApp. */
(function () {
  "use strict";

  var WA_NUMBER = "5215611673448";

  // Productos DEMO: nombres y precios de ejemplo, fotos recortadas del feed de Instagram.
  var PRODUCTS = [
    { id: "chelsea-croc-negro", name: "Chelsea Croc Negro", type: "botas", collection: "signature",
      leather: "Piel grabado cocodrilo", sole: "Suela de cuero roja", price: 9800, img: "prod-01.jpg",
      desc: "Nuestro Chelsea insignia: piel grabado cocodrilo en negro profundo y suela de cuero teñida en rojo. Elástico lateral y tirador trasero." },
    { id: "chelsea-suede-tan", name: "Chelsea Suede Tan", type: "botas", collection: "vintage",
      leather: "Gamuza (suede) tan", sole: "Suela de goma ligera", price: 6900, img: "prod-02.jpg",
      desc: "Gamuza color tabaco con elástico negro. Un clásico de inspiración europea para uso diario." },
    { id: "chelsea-box-negro", name: "Chelsea Box Calf Negro", type: "botas", collection: "signature",
      leather: "Becerro box calf", sole: "Suela de cuero", price: 7800, img: "prod-03.jpg",
      desc: "Líneas limpias en becerro pulido. El Chelsea que va con traje o con jeans." },
    { id: "loafer-horsebit-noir", name: "Loafer Horsebit Noir", type: "loafers", collection: "concept",
      leather: "Becerro negro pulido", sole: "Suela de cuero roja", price: 8500, img: "prod-04.jpg",
      desc: "Mocasín con herraje dorado y suela roja: elegancia nocturna con firma de la casa." },
    { id: "penny-bicolor", name: "Penny Loafer Bicolor", type: "loafers", collection: "retro",
      leather: "Becerro negro y blanco", sole: "Suela tractor", price: 7200, img: "prod-05.jpg",
      desc: "Penny loafer en dos tonos con suela tractor. Guiño retro con presencia." },
    { id: "loafer-cognac-lug", name: "Loafer Horsebit Cognac", type: "loafers", collection: "loafers",
      leather: "Becerro cognac patinado", sole: "Suela tractor", price: 7900, img: "prod-06.jpg",
      desc: "Cognac patinado a mano, herraje metálico y suela gruesa. El favorito del atelier." },
    { id: "bota-arnes-cognac", name: "Bota Arnés Cognac", type: "botas", collection: "vintage",
      leather: "Becerro cognac + grabado reptil", sole: "Suela de cuero", price: 10900, img: "prod-07.jpg",
      desc: "Bota de arnés con caña combinada en grabado reptil y hebillas plateadas." },
    { id: "vaquera-piton", name: "Vaquera Pitón Crema", type: "botas", collection: "concept",
      leather: "Piel pitón natural", sole: "Suela de cuero", price: 12500, img: "prod-08.jpg",
      desc: "Western de caña bordada en negro sobre pitón crema. Pieza de colección." }
  ];

  var TYPE_LABEL = { botas: "Botas", loafers: "Loafers", mules: "Mules", accesorios: "Accesorios" };

  function fmt(n) { return "$" + n.toLocaleString("es-MX") + " MXN"; }
  function waLink(text) { return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text); }
  function find(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function cardHTML(p) {
    return '<a class="card" href="producto.html?id=' + p.id + '">' +
      '<div class="thumb"><img src="assets/img/' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" width="800" height="800">' +
      '<span class="tag">' + esc(p.collection) + '</span></div>' +
      '<h3>' + esc(p.name) + '</h3><p class="meta">' + esc(p.leather) + '</p>' +
      '<p class="price">' + fmt(p.price) + '<small>DEMO</small></p></a>';
  }

  // Menú móvil
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Cerrar" : "Menú";
    });
  }

  // Destacados (index)
  var featured = document.querySelector("[data-featured]");
  if (featured) {
    featured.innerHTML = PRODUCTS.slice(0, 4).map(cardHTML).join("");
  }

  // Catálogo + filtros (por tipo o colección, también vía ?tipo= o ?col=)
  var catalog = document.querySelector("[data-catalog]");
  if (catalog) {
    var buttons = document.querySelectorAll(".filter");
    var empty = document.querySelector("[data-empty]");
    var render = function (key, value) {
      var list = PRODUCTS.filter(function (p) { return !value || value === "todo" || p[key] === value; });
      catalog.innerHTML = list.map(cardHTML).join("");
      if (empty) empty.hidden = list.length > 0;
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.key === key && b.dataset.value === (value || "todo")));
      });
    };
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        render(b.dataset.key, b.dataset.value);
        var url = b.dataset.value === "todo" ? "catalogo.html" : "catalogo.html?" + (b.dataset.key === "type" ? "tipo=" : "col=") + b.dataset.value;
        history.replaceState(null, "", url);
      });
    });
    var params = new URLSearchParams(location.search);
    if (params.get("tipo")) render("type", params.get("tipo"));
    else if (params.get("col")) render("collection", params.get("col"));
    else render("type", "todo");
  }

  // Ficha de producto
  var productRoot = document.querySelector("[data-product]");
  if (productRoot) {
    var id = new URLSearchParams(location.search).get("id");
    var p = find(id) || PRODUCTS[0];
    document.title = p.name + " — Casa Sevilla (demo)";
    var set = function (sel, val) { var el = productRoot.querySelector(sel); if (el) el.textContent = val; };
    set("[data-name]", p.name);
    set("[data-crumb]", p.name);
    set("[data-price]", fmt(p.price));
    set("[data-desc]", p.desc);
    set("[data-leather]", p.leather);
    set("[data-sole]", p.sole);
    set("[data-type]", TYPE_LABEL[p.type]);
    var crumbType = productRoot.querySelector("[data-type-link]");
    if (crumbType) { crumbType.textContent = TYPE_LABEL[p.type]; crumbType.href = "catalogo.html?tipo=" + p.type; }
    var img = productRoot.querySelector("[data-img]");
    img.src = "assets/img/" + p.img; img.alt = p.name;

    var form = document.getElementById("buy-form");
    var err = document.getElementById("size-error");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var size = form.querySelector('input[name="talla"]:checked');
      if (!size) { err.textContent = "Elige tu talla para continuar."; form.querySelector('input[name="talla"]').focus(); return; }
      err.textContent = "";
      var msg = "Hola Casa Sevilla, me interesa el modelo " + p.name + " (" + p.leather + "), talla MX " + size.value + ". ¿Disponibilidad y tiempo de entrega?";
      window.open(waLink(msg), "_blank", "noopener");
    });

    var related = document.querySelector("[data-related]");
    if (related) {
      related.innerHTML = PRODUCTS.filter(function (x) { return x.id !== p.id && x.type === p.type; })
        .slice(0, 3).map(cardHTML).join("");
    }
  }

  // Formulario A medida → mensaje de WhatsApp
  var mto = document.getElementById("mto-form");
  if (mto) {
    mto.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!mto.reportValidity()) return;
      var v = function (n) { return (mto.elements[n].value || "").trim(); };
      var file = mto.elements.referencia.files[0];
      var lines = [
        "Hola Casa Sevilla, quiero un par a medida:",
        "• Modelo: " + v("modelo"),
        "• Piel: " + v("piel"),
        "• Color: " + v("color"),
        "• Puntera: " + v("puntera"),
        "• Tacón: " + v("tacon"),
        "• Talla MX: " + v("talla")
      ];
      if (v("notas")) lines.push("• Notas: " + v("notas"));
      if (file) lines.push("• Tengo foto de referencia (" + file.name + "), se las mando por aquí.");
      lines.push("Nombre: " + v("nombre"));
      var text = lines.join("\n");
      var preview = document.getElementById("mto-preview");
      if (preview) { preview.textContent = text; preview.hidden = false; }
      window.open(waLink(text), "_blank", "noopener");
    });
  }

  // Año en el footer
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
