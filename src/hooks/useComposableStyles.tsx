type ClassName = string | null;
type ClassCompositionParameter = ClassName[] | string;

export function useComposableStyles(CSSModuleObject: CSSModuleClasses) {
  return (classNames: ClassCompositionParameter) => {
    switch (typeof classNames) {
      case "string":
        return CSSModuleObject[classNames];
      default:
        return classNames
          .filter(item => item !== null)
          .map(className => CSSModuleObject[className as string])
          .join(" ");
    }
  };
}