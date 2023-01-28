export function composeClassNames(classesArray: string[]) {
  const classListString = classesArray.filter(item => item !== null).join(" ");
  return classListString;
}