import s from './styles.module.scss';

type LogoFaceProps = { faceName: string; };

interface Faces {
  [key: string]: {
    resourcePath: string,
    altText: string;
  };
}

export function LogoFace({ faceName }: LogoFaceProps) {
  const faces: Faces = {
    bolt: {
      resourcePath: './electric-bolt.svg',
      altText: 'Let\'s get down to work!'
    },
    coffee: {
      resourcePath: './coffee.svg',
      altText: 'Well done!'
    },
  };

  return (
    <div>
      <img className={s.img} src={faces[faceName].resourcePath} alt={faces[faceName].altText} />
    </div>
  );
};
