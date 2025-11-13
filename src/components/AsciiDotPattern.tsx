interface AsciiDotPatternProps {
  density?: 'low' | 'medium' | 'high';
  gradient?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export function AsciiDotPattern({ 
  density = 'medium', 
  gradient = false,
  width = 20,
  height = 10,
  className = ''
}: AsciiDotPatternProps) {
  const dots = ['·', '•', '●', '■'];
  
  const densityMap = {
    low: 0.2,
    medium: 0.4,
    high: 0.6
  };
  
  const getDot = (x: number, y: number) => {
    if (gradient) {
      // Create gradient effect from left to right
      const progress = x / width;
      const threshold = progress;
      const random = Math.random();
      
      if (random < threshold * 0.3) return dots[3];
      if (random < threshold * 0.5) return dots[2];
      if (random < threshold * 0.7) return dots[1];
      if (random < threshold) return dots[0];
      return ' ';
    } else {
      // Random distribution
      const random = Math.random();
      if (random < densityMap[density] * 0.25) return dots[3];
      if (random < densityMap[density] * 0.5) return dots[2];
      if (random < densityMap[density] * 0.75) return dots[1];
      if (random < densityMap[density]) return dots[0];
      return ' ';
    }
  };

  const pattern = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => getDot(x, y)).join('')
  ).join('\n');

  return (
    <pre className={`font-mono text-xs leading-tight select-none ${className}`}>
      {pattern}
    </pre>
  );
}

interface HalftoneDotPatternProps {
  size?: number;
  className?: string;
}

export function HalftoneDotPattern({ size = 8, className = '' }: HalftoneDotPatternProps) {
  return (
    <div className={`grid gap-1 ${className}`} style={{ 
      gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`
    }}>
      {Array.from({ length: size * size }).map((_, i) => {
        const x = i % size;
        const y = Math.floor(i / size);
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - size / 2, 2) + Math.pow(y - size / 2, 2)
        );
        const maxDistance = Math.sqrt(2 * Math.pow(size / 2, 2));
        const scale = 1 - (distanceFromCenter / maxDistance);
        
        return (
          <div
            key={i}
            className="bg-black rounded-full"
            style={{
              transform: `scale(${scale})`,
              opacity: scale
            }}
          />
        );
      })}
    </div>
  );
}

interface DotMatrixTextProps {
  text: string;
  className?: string;
}

export function DotMatrixText({ text, className = '' }: DotMatrixTextProps) {
  const matrix = text.split('').map((char, idx) => {
    const pattern = getCharPattern(char);
    return (
      <div key={idx} className="inline-grid grid-cols-3 gap-[1px] mr-1">
        {pattern.map((dot, i) => (
          <div
            key={i}
            className={`w-1 h-1 ${dot ? 'bg-black' : 'bg-transparent'}`}
          />
        ))}
      </div>
    );
  });

  return <div className={`inline-flex items-center ${className}`}>{matrix}</div>;
}

// Simple 3x5 dot matrix patterns for numbers
function getCharPattern(char: string): boolean[] {
  const patterns: { [key: string]: boolean[] } = {
    '0': [true, true, true, true, false, true, true, false, true, true, false, true, true, true, true],
    '1': [false, true, false, true, true, false, false, true, false, false, true, false, true, true, true],
    '2': [true, true, true, false, false, true, true, true, true, true, false, false, true, true, true],
    '3': [true, true, true, false, false, true, false, true, true, false, false, true, true, true, true],
    '4': [true, false, true, true, false, true, true, true, true, false, false, true, false, false, true],
    '5': [true, true, true, true, false, false, true, true, true, false, false, true, true, true, true],
    '6': [true, true, true, true, false, false, true, true, true, true, false, true, true, true, true],
    '7': [true, true, true, false, false, true, false, false, true, false, false, true, false, false, true],
    '8': [true, true, true, true, false, true, true, true, true, true, false, true, true, true, true],
    '9': [true, true, true, true, false, true, true, true, true, false, false, true, true, true, true],
  };
  
  return patterns[char] || Array(15).fill(false);
}
