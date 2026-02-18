export const roles = {
  teacher: "teacher",
  student: "student",
};

export const definition = {
  course: "course"
};

// ביקשו ב cr לעשות קבוע של כל הסטטוסים 
// לא מבין את ההגיון בזה הרי זה קבוע ואין שום סיכוי שנצטרת לשנות את כל הסטטוסים 
// שהרי גם הערכים idle, loading, succeeded, rejected הם ערכים קבועים
// export const statuses = {
//   start: "idle",
//   good: "succeeded",
//   ignore: "rejected",
//   think: "loading"
// }

export const auth = {
  TOKEN_KEY: "token",
};