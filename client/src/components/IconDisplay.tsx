// Define Icon type locally since it might not be exported yet
interface Icon {
  src: string;
  mimeType?: string;
  sizes?: string[];
  theme?: "light" | "dark";
}

// Helper type for objects that may have icons
export interface WithIcons {
  icons?: Icon[];
}

interface IconDisplayProps {
  icons?: Icon[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

const IconDisplay = ({
  icons,
  className = "",
  size = "md",
}: IconDisplayProps) => {
  if (!icons || icons.length === 0) {
    return null;
  }

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const sizeClass = sizeClasses[size];

  const filterIconsByTheme = (icons: Icon[]): Icon[] => {
    const isDark = document.documentElement.classList.contains("dark");
    const currentTheme = isDark ? "dark" : "light";

    // First, try to find icons that match the current theme
    const themeSpecificIcons = icons.filter(
      (icon) => icon.theme === currentTheme,
    );
    if (themeSpecificIcons.length > 0) {
      return themeSpecificIcons;
    }

    // If no theme-specific icons found, return icons with no theme specified (generic icons)
    const genericIcons = icons.filter((icon) => !icon.theme);
    if (genericIcons.length > 0) {
      return genericIcons;
    }

    // Fallback: return all icons if no matching or generic icons found
    return icons;
  };

  // Filter icons based on current theme
  const filteredIcons = filterIconsByTheme(icons);

  return (
    <div className={`flex gap-1 ${className}`}>
      {filteredIcons.map((icon, index) => (
        <img
          key={index}
          src={icon.src}
          alt=""
          className={`${sizeClass} object-contain flex-shrink-0`}
          style={{
            imageRendering: "auto",
          }}
          onError={(e) => {
            // Hide broken images
            e.currentTarget.style.display = "none";
          }}
        />
      ))}
    </div>
  );
};

export default IconDisplay;
