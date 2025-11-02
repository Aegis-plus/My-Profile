import { useState } from "react";

export default function HomePage() {
  const [selectedArt, setSelectedArt] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Handle scroll to show/hide button
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
      setIsAnimatingOut(false);
    } else {
      setIsAnimatingOut(true);
    }
  };

  // When pop-out animation completes, actually hide the button
  const handleAnimationEnd = () => {
    if (isAnimatingOut) {
      setShowScrollTop(false);
    }
  };

  // Scroll to top smoothly with longer duration
  const scrollToTop = () => {
    const duration = 1000; // 1 second for smooth scroll
    const start = window.scrollY;
    const startTime = Date.now();

    const scroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function for smooth acceleration and deceleration
      const easeProgress =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, start * (1 - easeProgress));

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  // Add scroll listener on mount
  useState(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample pixel art - you can replace these with your actual artwork URLs
  const pixelArtGallery = [
    {
      id: 1,
      title: "Cat",
      url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/Catto.gif",
      description: "A Simple cat animation",
    },
    {
      id: 2,
      title: "Duck",
      url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/Duck.png",
      description: "Wild Duck Appears",
    },
    {
      id: 3,
      title: "Fruit",
      url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/Fruit.png",
      description: "Bunch of fruits",
    },
    {
      id: 4,
      title: "Halloween Pumpkin",
      url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/Labu-Plonga-Plongo.gif",
      description: "Yet another simple animation of pumpkin",
    },
    {
      id: 5,
      title: "Space Marine",
      url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/SpaceMarine.png",
      description: "Adeptus Astartes",
    },
    {
      id: 6,
      title: "Strike Freedom Gundam",
      url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/Strike%20Freedom%20Helmet.png",
      description: "Yet, another Cool Helmet. but it's Gundam!",
    },
  ];

  // Navigate to next art
  const goToNextArt = () => {
    if (!selectedArt) return;
    const currentIndex = pixelArtGallery.findIndex(
      (art) => art.id === selectedArt.id,
    );
    const nextIndex = (currentIndex + 1) % pixelArtGallery.length;
    setSelectedArt(pixelArtGallery[nextIndex]);
  };

  // Navigate to previous art
  const goToPreviousArt = () => {
    if (!selectedArt) return;
    const currentIndex = pixelArtGallery.findIndex(
      (art) => art.id === selectedArt.id,
    );
    const previousIndex =
      (currentIndex - 1 + pixelArtGallery.length) % pixelArtGallery.length;
    setSelectedArt(pixelArtGallery[previousIndex]);
  };

  const darkBg = "#1a1a1a";
  const darkText = "#f0f0f0";
  const darkCard = "#222";
  const darkBorder = "#333";
  const lightBg = "#f5f5f5";
  const lightText = "#1a1a1a";
  const lightCard = "#ffffff";
  const lightBorder = "#e0e0e0";
  const accentColor = isDarkMode ? "#00ff00" : "#7C3AED";

  const bgColor = isDarkMode ? darkBg : lightBg;
  const textColor = isDarkMode ? darkText : lightText;
  const cardColor = isDarkMode ? darkCard : lightCard;
  const borderColor = isDarkMode ? darkBorder : lightBorder;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bgColor,
        color: textColor,
        fontSize: "18px",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
      className="font-pixelify-sans"
    >
      {/* Header */}
      <header
        style={{
          padding: "20px",
          borderBottom: `2px solid ${borderColor}`,
          textAlign: "center",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            margin: "0",
            color: accentColor,
            textShadow: "2px 2px 0px #003300",
          }}
        >
          Aegis+
        </h1>
        <p
          style={{
            margin: "10px 0 0 0",
            color: isDarkMode ? "#888" : "#666",
            fontSize: "16px",
          }}
        >
          Casual Gamer • Pixel Artist • Digital Creator
        </p>

        {/* Dark/Light Mode Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
            border: `2px solid ${accentColor}`,
            padding: "8px 12px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          <span>{isDarkMode ? "🌙" : "☀️"}</span>
          <div
            style={{
              width: "24px",
              height: "12px",
              backgroundColor: accentColor,
              borderRadius: "6px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
                borderRadius: "50%",
                position: "absolute",
                top: "1px",
                left: isDarkMode ? "1px" : "13px",
                transition: "left 0.3s ease",
              }}
            />
          </div>
        </button>
      </header>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
        {/* About Section */}
        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "32px",
              color: accentColor,
              marginBottom: "20px",
              borderBottom: `1px solid ${borderColor}`,
              paddingBottom: "10px",
            }}
          >
            About Me
          </h2>
          <div
            style={{
              backgroundColor: cardColor,
              color: textColor,
              padding: "30px",
              border: `1px solid ${borderColor}`,
              borderRadius: "12px",
              lineHeight: "1.6",
              transition:
                "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
            }}
          >
            <p style={{ marginBottom: "20px" }}>
              <strong>Hey there! 👋 I'm Aegis!</strong>
              <br />
              I'm a <strong>casual gamer</strong> who absolutely lives for{" "}
              <strong>RPGs</strong> and other popular{" "}
              <strong>single-player</strong> adventures. Recently, though, I
              stumbled upon a super fun new hobby: <strong>Drawing</strong>,
              especially <strong>Pixel Art</strong>! I've completely fallen for
              it—I was so hooked that last month I finally started learning how
              to draw it myself, and my journey to level up my skills officially
              began! 🎨
            </p>
            <p style={{ marginBottom: "20px" }}>
              I'm also kicking off another little side project focusing on
              servers, and this site (or whatever you're looking at!) is one
              piece of that puzzle.
            </p>
            <p style={{ margin: "0" }}>
              <strong>Thanks a ton for stopping by!</strong> I really hope you
              enjoy exploring. Happy browsing! 😄
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "32px",
              color: accentColor,
              marginBottom: "20px",
              borderBottom: `1px solid ${borderColor}`,
              paddingBottom: "10px",
            }}
          >
            Pixel Art Gallery
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {pixelArtGallery.map((art) => (
              <div
                key={art.id}
                style={{
                  backgroundColor: cardColor,
                  border: `1px solid ${borderColor}`,
                  padding: "15px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRadius: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "#2a2a2a"
                    : "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.backgroundColor = cardColor;
                }}
                onClick={() => setSelectedArt(art)}
              >
                <img
                  src={art.url}
                  alt={art.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    imageRendering: "pixelated",
                    border: `1px solid ${borderColor}`,
                    marginBottom: "10px",
                  }}
                />
                <h3
                  style={{
                    fontSize: "20px",
                    margin: "0 0 5px 0",
                    color: accentColor,
                  }}
                >
                  {art.title}
                </h3>
                <p
                  style={{
                    margin: "0",
                    color: isDarkMode ? "#888" : "#666",
                    fontSize: "14px",
                  }}
                >
                  {art.description}
                </p>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              color: isDarkMode ? "#888" : "#666",
              fontStyle: "italic",
            }}
          >
            Click on any artwork to view it larger
          </p>
        </section>

        {/* Contact Section */}
        <section>
          <h2
            style={{
              fontSize: "32px",
              color: accentColor,
              marginBottom: "20px",
              borderBottom: `1px solid ${borderColor}`,
              paddingBottom: "10px",
            }}
          >
            Get In Touch
          </h2>
          <div
            style={{
              backgroundColor: cardColor,
              color: textColor,
              padding: "30px",
              border: `1px solid ${borderColor}`,
              borderRadius: "12px",
              transition:
                "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
            }}
          >
            <p style={{ marginBottom: "20px" }}>
              Hey there! I'm still an amateur at pixel art, but if you're interested in a simple commission, I would genuinely be thrilled to help! I promise I won't charge you for straightforward requests :D. I'm also a huge gamer! If you ever want to add me, chat about games, or just find someone to play with, please feel free—my digital door is always wide open!
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ color: accentColor, minWidth: "80px" }}>
                  Email:
                </span>
                <a
                  href="mailto:starfallaegis@gmail.com"
                  style={{
                    color: isDarkMode ? "#888" : "#666",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = accentColor)}
                  onMouseLeave={(e) =>
                    (e.target.style.color = isDarkMode ? "#888" : "#666")
                  }
                >
                  starfallaegis@gmail.com
                </a>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ color: accentColor, minWidth: "80px" }}>
                  Discord:
                </span>
                <span style={{ color: isDarkMode ? "#888" : "#666" }}>
                  @aegis-plus
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ color: accentColor, minWidth: "80px" }}>
                  Steam:
                </span>
                <a
                  href="https://steamcommunity.com/id/AegisPlus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: isDarkMode ? "#888" : "#666",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = accentColor)}
                  onMouseLeave={(e) =>
                    (e.target.style.color = isDarkMode ? "#888" : "#666")
                  }
                >
                  @Aegis+
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for enlarged artwork */}
      {selectedArt && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1000",
            padding: "20px",
          }}
          onClick={() => setSelectedArt(null)}
        >
          <div
            style={{
              backgroundColor: cardColor,
              border: `2px solid ${accentColor}`,
              padding: "30px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              textAlign: "center",
              position: "relative",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "background-color 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedArt.url}
              alt={selectedArt.title}
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                imageRendering: "pixelated",
                marginBottom: "20px",
              }}
            />
            <h3
              style={{
                fontSize: "28px",
                margin: "0 0 10px 0",
                color: accentColor,
              }}
            >
              {selectedArt.title}
            </h3>
            <p
              style={{
                margin: "0 0 15px 0",
                color: isDarkMode ? "#888" : "#666",
                fontSize: "16px",
              }}
            >
              {selectedArt.description}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={goToPreviousArt}
                style={{
                  backgroundColor: isDarkMode ? "#333" : "#eee",
                  color: accentColor,
                  border: `1px solid ${accentColor}`,
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = accentColor;
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isDarkMode ? "#333" : "#eee";
                  e.target.style.color = accentColor;
                }}
              >
                ← Previous
              </button>
              <button
                onClick={() => setSelectedArt(null)}
                style={{
                  backgroundColor: isDarkMode ? "#333" : "#eee",
                  color: accentColor,
                  border: `1px solid ${accentColor}`,
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = accentColor;
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isDarkMode ? "#333" : "#eee";
                  e.target.style.color = accentColor;
                }}
              >
                Close
              </button>
              <button
                onClick={goToNextArt}
                style={{
                  backgroundColor: isDarkMode ? "#333" : "#eee",
                  color: accentColor,
                  border: `1px solid ${accentColor}`,
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = accentColor;
                  e.target.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isDarkMode ? "#333" : "#eee";
                  e.target.style.color = accentColor;
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onAnimationEnd={handleAnimationEnd}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: accentColor,
            color: "#000",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: "1000",
            animation: isAnimatingOut
              ? "popOut 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
              : "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          onClick={scrollToTop}
        >
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>↑</span>
        </button>
      )}

      <style jsx global>{`
        @keyframes popIn {
          from {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes popOut {
          from {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          to {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
