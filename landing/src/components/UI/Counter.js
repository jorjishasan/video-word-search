'use client';

export default function Counter({
  value,
  digits = 2,
  fontSize = 16,
  textColor = "white",
  fontWeight = "bold",
  containerStyle = {},
}) {
  // Format with leading zeros
  const formattedValue = String(Number(value) || 0).padStart(digits, '0');
  
  return (
    <span
      className="inline-block font-mono"
      style={{ 
        fontSize: `${fontSize}px`,
        color: textColor,
        fontWeight: fontWeight,
        ...containerStyle
      }}
    >
      {formattedValue}
    </span>
  );
}
