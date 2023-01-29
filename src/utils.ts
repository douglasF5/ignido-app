type ClassName = string | null;

export function composeClassNames(classesArray: ClassName[]) {
  const classListString = classesArray.filter(item => item !== null).join(" ");
  return classListString;
}