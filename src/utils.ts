type ClassName = string | null;

export function composeClassNames(classesArray: ClassName[]) {
  const classListString = classesArray.filter(item => item !== null).join(" ");
  return classListString;
}

export function generateQuickId(prefix: string = "id") {
  const lettersMap = ['q', 'u', 'i', 'c', 'k'];
  const loopRounds = Math.floor(Math.random() * (6 - 3) + 3);
  let idTail = '';

  for (let i = 1; i <= loopRounds; i++) {
    const optionIndex = Math.floor(Math.random() * 2);
    let character = '';

    if (optionIndex) {
      character = lettersMap[Math.floor(Math.random() * lettersMap.length)];
    } else {
      character = String(Math.floor(Math.random() * 10));
    }

    idTail += character;
  }

  return prefix + idTail.padStart(5, '0');
}