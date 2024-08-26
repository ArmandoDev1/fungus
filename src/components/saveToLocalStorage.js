// Helper function to get and set data in localStorage
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setInLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Courses (Timetable) Service

export const fetchCourses = () => {
  return Promise.resolve(getFromLocalStorage('courses'));
};

export const addCourse = (course) => {
  const courses = getFromLocalStorage('courses');
  const newCourse = { id: Date.now(), ...course };
  courses.push(newCourse);
  setInLocalStorage('courses', courses);
  return Promise.resolve(newCourse);
};

export const updateCourse = (id, updatedCourse) => {
  let courses = getFromLocalStorage('courses');
  courses = courses.map((course) => (course.id === id ? { ...course, ...updatedCourse } : course));
  setInLocalStorage('courses', courses);
  return Promise.resolve(updatedCourse);
};

export const deleteCourse = (id) => {
  let courses = getFromLocalStorage('courses');
  courses = courses.filter((course) => course.id !== id);
  setInLocalStorage('courses', courses);
  return Promise.resolve();
};

// Techniques Service

export const fetchTechniques = () => {
  return Promise.resolve(getFromLocalStorage('techniques'));
};

export const addTechnique = (technique) => {
  const techniques = getFromLocalStorage('techniques');
  const newTechnique = { id: Date.now(), ...technique };
  techniques.push(newTechnique);
  setInLocalStorage('techniques', techniques);
  return Promise.resolve(newTechnique);
};

export const updateTechnique = (id, updatedTechnique) => {
  let techniques = getFromLocalStorage('techniques');
  techniques = techniques.map((tech) => (tech.id === id ? { ...tech, ...updatedTechnique } : tech));
  setInLocalStorage('techniques', techniques);
  return Promise.resolve(updatedTechnique);
};

export const deleteTechnique = (id) => {
  let techniques = getFromLocalStorage('techniques');
  techniques = techniques.filter((tech) => tech.id !== id);
  setInLocalStorage('techniques', techniques);
  return Promise.resolve();
};
