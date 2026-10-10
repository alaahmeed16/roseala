// ROSEALA — shop page: product grid with category / occasion filters and sorting.
// Filters are kept in the address (e.g. shop.html?category=roses) so links can point to them.

(() => {
  const params = new URLSearchParams(window.location.search);
  const state = {
    category: ROSEALA.findCategory(params.get("category")) ? params.get("category") : "all",
    occasion: ROSEALA.findOccasion(params.get("occasion")) ? params.get("occasion") : "all",
    sort: "featured"
  };

  const categoryFilters = document.getElementById("category-filters");
  const occasionSelect = document.getElementById("occasion-filter");
  const sortSelect = document.getElementById("sort-order");
  const grid = document.getElementById("product-grid");
  const countEl = document.getElementById("result-count");
  const emptyState = document.getElementById("empty-state");
  const title = document.getElementById("shop-title");
  const subtitle = document.getElementById("shop-subtitle");

  // ---------- Build the filter controls from the data ----------
  categoryFilters.innerHTML = [{ id: "all", name: "All" }, ...ROSEALA.categories]
    .map((c) => `<button type="button" class="filter-btn" data-category="${c.id}">${ROSEALA.escapeHtml(c.name)}</button>`)
    .join("");

  occasionSelect.innerHTML = [{ id: "all", name: "All occasions" }, ...ROSEALA.occasions]
    .map((o) => `<option value="${o.id}">${ROSEALA.escapeHtml(o.name)}</option>`)
    .join("");

  // ---------- Filtering and sorting ----------
  function visibleProducts() {
    const list = ROSEALA.products.filter((p) =>
      (state.category === "all" || p.category === state.category) &&
      (state.occasion === "all" || p.occasions.includes(state.occasion))
    );
    if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (state.sort === "featured") list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }

  function updateAddress() {
    const query = new URLSearchParams();
    if (state.category !== "all") query.set("category", state.category);
    if (state.occasion !== "all") query.set("occasion", state.occasion);
    const url = window.location.pathname + (query.toString() ? `?${query}` : "");
    try { history.replaceState(null, "", url); } catch (error) { /* not allowed in some browsers for local files */ }
  }

  function render() {
    const category = ROSEALA.findCategory(state.category);
    const occasion = ROSEALA.findOccasion(state.occasion);

    title.textContent = category ? category.name : occasion ? occasion.name : "All Flowers";
    subtitle.textContent = category ? category.blurb : occasion ? occasion.blurb : "Hand-tied bouquets, arrangements and living gifts.";
    document.title = `${title.textContent} — ROSEALA`;

    categoryFilters.querySelectorAll(".filter-btn").forEach((btn) => {
      const isActive = btn.dataset.category === state.category;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive);
    });
    occasionSelect.value = state.occasion;
    sortSelect.value = state.sort;

    const products = visibleProducts();
    grid.innerHTML = products.map(ROSEALA.productCard).join("");
    countEl.textContent = `${products.length} ${products.length === 1 ? "design" : "designs"}`;
    emptyState.hidden = products.length > 0;

    updateAddress();
  }

  // ---------- Events ----------
  categoryFilters.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;
    state.category = btn.dataset.category;
    render();
  });

  occasionSelect.addEventListener("change", () => { state.occasion = occasionSelect.value; render(); });
  sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; render(); });

  document.getElementById("reset-filters").addEventListener("click", () => {
    state.category = "all";
    state.occasion = "all";
    render();
  });

  render();
})();
