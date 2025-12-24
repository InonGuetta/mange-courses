function normalize(str) {
  return (str ?? "").toString().trim().toLowerCase();
}

function includesAnyField(course, q) {
  if (!q) return true;

  const haystacks = [
    course.title,
    course.description,
    course.teacherName,
    course.category,
    course.level,
    Array.isArray(course.tags) ? course.tags.join(" ") : "",
  ].map(normalize);

  return haystacks.some((h) => h.includes(q));
}

function passFilters(course, filters) {
  if (!filters) return true;

  const {
    category,      
    level,         
    teacherId,     
    minPrice,      
    maxPrice,     
  } = filters;

  if (category && normalize(course.category) !== normalize(category)) return false;
  if (level && normalize(course.level) !== normalize(level)) return false;

  if (teacherId != null && course.teacherId != null && String(course.teacherId) !== String(teacherId)) {
    return false;
  }

  const price = Number(course.price);
  if (!Number.isNaN(price)) {
    if (minPrice != null && price < Number(minPrice)) return false;
    if (maxPrice != null && price > Number(maxPrice)) return false;
  }

  return true;
}

function sortCourses(courses, sort) {
  if (!sort?.by) return courses;

  const { by, dir = "asc" } = sort;
  const direction = dir === "desc" ? -1 : 1;

  const getVal = (c) => {
    const v = c?.[by];
    if (v instanceof Date) return v.getTime();
    if (typeof v === "number") return v;
    const asNum = Number(v);
    if (!Number.isNaN(asNum) && v !== "" && v != null) return asNum;
    return normalize(v);
  };

  return courses
    .map((c, idx) => ({ c, idx }))
    .sort((a, b) => {
      const av = getVal(a.c);
      const bv = getVal(b.c);
      if (av < bv) return -1 * direction;
      if (av > bv) return 1 * direction;
      return a.idx - b.idx;
    })
    .map((x) => x.c);
}

/**
 * @param {Array} courses
 * @param {Object} options
 * @param {string} options.query
 * @param {Object} options.filters
 * @param {{by?: string, dir?: "asc"|"desc"}} options.sort
 */
export function filterCourses(courses, { query = "", filters = null, sort = null } = {}) {
  const list = Array.isArray(courses) ? courses : [];
  const q = normalize(query);

  const filtered = list.filter((course) => {
    return includesAnyField(course, q) && passFilters(course, filters);
  });

  return sortCourses(filtered, sort);
}
