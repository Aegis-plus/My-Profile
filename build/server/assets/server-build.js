import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, UNSAFE_withErrorBoundaryProps, UNSAFE_withComponentProps, Outlet, useNavigate, useLocation, Meta, Links, ScrollRestoration, Scripts, useRouteError, useAsyncError } from 'react-router';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { useButton } from '@react-aria/button';
import { useEffect, useState, Component, useCallback, useRef } from 'react';
import { f as fetchWithHeaders } from './index-C_Kds2Jo.js';
import { SessionProvider } from '@hono/auth-js/react';
import { serializeError } from 'serialize-error';
import { toast, Toaster } from 'sonner';
import { create } from 'zustand';
import { useIdleTimer } from 'react-idle-timer';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import _JSXStyle from 'styled-jsx/style.js';
import fg from 'fast-glob';
import 'node:async_hooks';
import 'node:console';
import '@auth/core';
import '@auth/core/providers/credentials';
import '@hono/auth-js';
import '@neondatabase/serverless';
import 'argon2';
import 'hono';
import 'hono/context-storage';
import 'hono/cors';
import 'hono/proxy';
import 'hono/request-id';
import 'hono/factory';
import '@hono/node-server';
import '@hono/node-server/serve-static';
import 'hono/logger';
import 'ws';
import '@auth/core/jwt';
import 'node:path';
import 'node:fs';
import 'node:url';
import '@react-router/dev/routes';
import 'node:fs/promises';

const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: 'Module' }));

function LoadFonts() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Pixelify+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=block" }) });
}

const useSandboxStore = create((set, get) => ({
  status: "idle",
  isGenerating: false,
  hasError: false,
  setStatus: (status) => set({
    status,
    isGenerating: status === "codegen-started" || status === "codegen-generating",
    hasError: status === "codegen-error"
  }),
  startCodeGen: () => get().setStatus("codegen-started"),
  setCodeGenGenerating: () => get().setStatus("codegen-generating"),
  completeCodeGen: () => get().setStatus("codegen-complete"),
  errorCodeGen: () => get().setStatus("codegen-error"),
  stopCodeGen: () => get().setStatus("codegen-stopped"),
  resetToIdle: () => get().setStatus("idle")
}));

function HotReloadIndicator() {
  const { status: sandboxStatus } = useSandboxStore();
  useEffect(() => {
    return;
  }, []);
  useEffect(() => {
    const toastStyle = {
      padding: "16px",
      background: "#18191B",
      border: "1px solid #2C2D2F",
      color: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "var(--width)",
      fontSize: "13px",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    };
    switch (sandboxStatus) {
      case "codegen-started":
      case "codegen-generating":
        toast.custom(
          () => /* @__PURE__ */ jsxs("div", { style: { ...toastStyle, padding: "10px" }, children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://www.create.xyz/images/project-revision-button-building-loading-state-white.gif",
                alt: "loading",
                className: "w-8 h-8"
              }
            ),
            /* @__PURE__ */ jsx("span", { children: "Updating" })
          ] }),
          {
            id: "sandbox-codegen",
            duration: 3e3
          }
        );
        break;
      case "codegen-complete":
        toast.custom(
          () => /* @__PURE__ */ jsxs("div", { style: toastStyle, children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                height: "20",
                width: "20",
                children: [
                  /* @__PURE__ */ jsx("title", { children: "Success" }),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
                      clipRule: "evenodd"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx("span", { children: "Updated successfully" })
          ] }),
          {
            id: "sandbox-codegen",
            duration: 3e3
          }
        );
        break;
      case "codegen-error":
        toast.custom(
          () => /* @__PURE__ */ jsxs("div", { style: toastStyle, children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                height: "20",
                width: "20",
                children: [
                  /* @__PURE__ */ jsx("title", { children: "Error" }),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
                      clipRule: "evenodd"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx("span", { children: "Update failed" })
          ] }),
          {
            id: "sandbox-codegen",
            duration: 5e3
          }
        );
        break;
    }
    return () => {
    };
  }, [sandboxStatus]);
  return null;
}

function useDevServerHeartbeat() {
  useIdleTimer({
    throttle: 6e4 * 3,
    timeout: 6e4,
    onAction: () => {
      fetch("/", {
        method: "GET"
      }).catch((error) => {
      });
    }
  });
}

const links = () => [];
if (globalThis.window && globalThis.window !== void 0) {
  globalThis.window.fetch = fetchWithHeaders;
}
function SharedErrorBoundary({
  isOpen,
  children
}) {
  return /* @__PURE__ */ jsx("div", {
    className: `fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
    children: /* @__PURE__ */ jsx("div", {
      className: "bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 max-w-md w-full mx-4 shadow-lg",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex items-start gap-3",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex-shrink-0",
          children: /* @__PURE__ */ jsx("div", {
            className: "w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center",
            children: /* @__PURE__ */ jsx("span", {
              className: "text-black text-[1.125rem] leading-none",
              children: "⚠"
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-2 flex-1",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx("p", {
              className: "font-light text-[#F2F2F2] text-sm",
              children: "App Error Detected"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-[#959697] text-sm font-light",
              children: "It looks like an error occurred while trying to use your app."
            })]
          }), children]
        })]
      })
    })
  });
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  return /* @__PURE__ */ jsx(SharedErrorBoundary, {
    isOpen: true
  });
});
function InternalErrorBoundary({
  error: errorArg
}) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const {
    buttonProps: showLogsButtonProps
  } = useButton({
    onPress: useCallback(() => {
      window.parent.postMessage({
        type: "sandbox:web:show-logs"
      }, "*");
    }, [])
  }, useRef(null));
  const {
    buttonProps: fixButtonProps
  } = useButton({
    onPress: useCallback(() => {
      window.parent.postMessage({
        type: "sandbox:web:fix",
        error: serializeError(error)
      }, "*");
      setIsOpen(false);
    }, [error]),
    isDisabled: !error
  }, useRef(null));
  const {
    buttonProps: copyButtonProps
  } = useButton({
    onPress: useCallback(() => {
      navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
    }, [error])
  }, useRef(null));
  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return /* @__PURE__ */ jsx(SharedErrorBoundary, {
    isOpen,
    children: isInIframe() ? /* @__PURE__ */ jsxs("div", {
      className: "flex gap-2",
      children: [!!error && /* @__PURE__ */ jsx("button", {
        className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#f9f9f9] hover:bg-[#dbdbdb] active:bg-[#c4c4c4] border-[#c4c4c4] text-[#18191B] text-sm px-[8px] py-[4px] cursor-pointer",
        type: "button",
        ...fixButtonProps,
        children: "Try to fix"
      }), /* @__PURE__ */ jsx("button", {
        className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white text-sm px-[8px] py-[4px]",
        type: "button",
        ...showLogsButtonProps,
        children: "Show logs"
      })]
    }) : /* @__PURE__ */ jsx("button", {
      className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white text-sm px-[8px] py-[4px] w-fit",
      type: "button",
      ...copyButtonProps,
      children: "Copy error"
    })
  });
}
class ErrorBoundaryWrapper extends Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(InternalErrorBoundary, {
        error: this.state.error,
        params: {}
      });
    }
    return this.props.children;
  }
}
function LoaderWrapper({
  loader
}) {
  return /* @__PURE__ */ jsx(Fragment, {
    children: loader()
  });
}
const ClientOnly = ({
  loader
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return /* @__PURE__ */ jsx(ErrorBoundaryWrapper, {
    children: /* @__PURE__ */ jsx(LoaderWrapper, {
      loader
    })
  });
};
function useHmrConnection() {
  const [connected, setConnected] = useState(() => false);
  useEffect(() => {
    return;
  }, []);
  return connected;
}
const healthyResponseType = "sandbox:web:healthcheck:response";
const useHandshakeParent = () => {
  const isHmrConnected = useHmrConnection();
  useEffect(() => {
    const healthyResponse = {
      type: healthyResponseType,
      healthy: isHmrConnected
    };
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:healthcheck") {
        window.parent.postMessage(healthyResponse, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(healthyResponse, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isHmrConnected]);
};
const useCodeGen = () => {
  const {
    startCodeGen,
    setCodeGenGenerating,
    completeCodeGen,
    errorCodeGen,
    stopCodeGen
  } = useSandboxStore();
  useEffect(() => {
    const handleMessage = (event) => {
      const {
        type
      } = event.data;
      switch (type) {
        case "sandbox:web:codegen:started":
          startCodeGen();
          break;
        case "sandbox:web:codegen:generating":
          setCodeGenGenerating();
          break;
        case "sandbox:web:codegen:complete":
          completeCodeGen();
          break;
        case "sandbox:web:codegen:error":
          errorCodeGen();
          break;
        case "sandbox:web:codegen:stopped":
          stopCodeGen();
          break;
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [startCodeGen, setCodeGenGenerating, completeCodeGen, errorCodeGen, stopCodeGen]);
};
const useRefresh = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:refresh:request") {
        setTimeout(() => {
          window.location.reload();
        }, 1e3);
        window.parent.postMessage({
          type: "sandbox:web:refresh:complete"
        }, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
function Layout({
  children
}) {
  useHandshakeParent();
  useCodeGen();
  useRefresh();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:navigation") {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "sandbox:web:ready"
    }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({
        type: "sandbox:web:navigation",
        pathname
      }, "*");
    }
  }, [pathname]);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        type: "module",
        src: "/src/__create/dev-error-overlay.js"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/src/__create/favicon.png"
      }), /* @__PURE__ */ jsx(LoadFonts, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ClientOnly, {
        loader: () => children
      }), /* @__PURE__ */ jsx(HotReloadIndicator, {}), /* @__PURE__ */ jsx(Toaster, {
        position: "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "https://kit.fontawesome.com/2c15cc0cc7.js",
        crossOrigin: "anonymous",
        async: true
      })]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(SessionProvider, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ClientOnly,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  useHmrConnection
}, Symbol.toStringTag, { value: 'Module' }));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      // 5 minutes
      cacheTime: 1e3 * 60 * 30,
      // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
function RootLayout({
  children
}) {
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children });
}

function HomePage() {
  const [selectedArt, setSelectedArt] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
      setIsAnimatingOut(false);
    } else {
      setIsAnimatingOut(true);
    }
  };
  const handleAnimationEnd = () => {
    if (isAnimatingOut) {
      setShowScrollTop(false);
    }
  };
  const scrollToTop = () => {
    const duration = 1e3;
    const start = window.scrollY;
    const startTime = Date.now();
    const scroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, start * (1 - easeProgress));
      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };
    requestAnimationFrame(scroll);
  };
  useState(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const pixelArtGallery = [{
    id: 1,
    title: "Cat",
    url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/Catto.gif",
    description: "A Simple cat animation"
  }, {
    id: 2,
    title: "Duck",
    url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/Duck.png",
    description: "Wild Duck Appears"
  }, {
    id: 3,
    title: "Fruit",
    url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/Fruit.png",
    description: "Bunch of fruits"
  }, {
    id: 4,
    title: "Halloween Pumpkin",
    url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/Labu-Plonga-Plongo.gif",
    description: "Yet another simple animation of pumpkin"
  }, {
    id: 5,
    title: "Space Marine",
    url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/SpaceMarine.png",
    description: "Adeptus Astartes"
  }, {
    id: 6,
    title: "Strike Freedom Gundam",
    url: "https://raw.githubusercontent.com/Aegis-plus/My-Profile/refs/heads/main/img/Strike%20Freedom%20Helmet.png",
    description: "Yet, another Cool Helmet. but it's Gundam!"
  }];
  const goToNextArt = () => {
    if (!selectedArt) return;
    const currentIndex = pixelArtGallery.findIndex((art) => art.id === selectedArt.id);
    const nextIndex = (currentIndex + 1) % pixelArtGallery.length;
    setSelectedArt(pixelArtGallery[nextIndex]);
  };
  const goToPreviousArt = () => {
    if (!selectedArt) return;
    const currentIndex = pixelArtGallery.findIndex((art) => art.id === selectedArt.id);
    const previousIndex = (currentIndex - 1 + pixelArtGallery.length) % pixelArtGallery.length;
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
  return /* @__PURE__ */ jsxs("div", { style: {
    minHeight: "100vh",
    backgroundColor: bgColor,
    color: textColor,
    fontSize: "18px",
    transition: "background-color 0.3s ease, color 0.3s ease"
  }, className: "jsx-1495997836 font-pixelify-sans", children: [
    /* @__PURE__ */ jsxs("header", { style: {
      padding: "20px",
      borderBottom: `2px solid ${borderColor}`,
      textAlign: "center",
      position: "relative"
    }, className: "jsx-1495997836", children: [
      /* @__PURE__ */ jsx("h1", { style: {
        fontSize: "48px",
        margin: "0",
        color: accentColor,
        textShadow: "2px 2px 0px #003300"
      }, className: "jsx-1495997836", children: "Aegis+" }),
      /* @__PURE__ */ jsx("p", { style: {
        margin: "10px 0 0 0",
        color: isDarkMode ? "#888" : "#666",
        fontSize: "16px"
      }, className: "jsx-1495997836", children: "Casual Gamer • Pixel Artist • Digital Creator" }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setIsDarkMode(!isDarkMode), style: {
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
        transition: "all 0.3s ease"
      }, onMouseEnter: (e) => {
        e.target.style.transform = "scale(1.05)";
      }, onMouseLeave: (e) => {
        e.target.style.transform = "scale(1)";
      }, className: "jsx-1495997836", children: [
        /* @__PURE__ */ jsx("span", { className: "jsx-1495997836", children: isDarkMode ? "🌙" : "☀️" }),
        /* @__PURE__ */ jsx("div", { style: {
          width: "24px",
          height: "12px",
          backgroundColor: accentColor,
          borderRadius: "6px",
          position: "relative"
        }, className: "jsx-1495997836", children: /* @__PURE__ */ jsx("div", { style: {
          width: "10px",
          height: "10px",
          backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
          borderRadius: "50%",
          position: "absolute",
          top: "1px",
          left: isDarkMode ? "1px" : "13px",
          transition: "left 0.3s ease"
        }, className: "jsx-1495997836" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px"
    }, className: "jsx-1495997836", children: [
      /* @__PURE__ */ jsxs("section", { style: {
        marginBottom: "60px"
      }, className: "jsx-1495997836", children: [
        /* @__PURE__ */ jsx("h2", { style: {
          fontSize: "32px",
          color: accentColor,
          marginBottom: "20px",
          borderBottom: `1px solid ${borderColor}`,
          paddingBottom: "10px"
        }, className: "jsx-1495997836", children: "About Me" }),
        /* @__PURE__ */ jsxs("div", { style: {
          backgroundColor: cardColor,
          color: textColor,
          padding: "30px",
          border: `1px solid ${borderColor}`,
          borderRadius: "12px",
          lineHeight: "1.6",
          transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease"
        }, className: "jsx-1495997836", children: [
          /* @__PURE__ */ jsxs("p", { style: {
            marginBottom: "20px"
          }, className: "jsx-1495997836", children: [
            /* @__PURE__ */ jsx("strong", { className: "jsx-1495997836", children: "Hey there! 👋 I'm Aegis!" }),
            /* @__PURE__ */ jsx("br", { className: "jsx-1495997836" }),
            "I'm a ",
            /* @__PURE__ */ jsx("strong", { className: "jsx-1495997836", children: "casual gamer" }),
            " who absolutely lives for",
            " ",
            /* @__PURE__ */ jsx("strong", { className: "jsx-1495997836", children: "RPGs" }),
            " and other popular",
            " ",
            /* @__PURE__ */ jsx("strong", { className: "jsx-1495997836", children: "single-player" }),
            " adventures. Recently, though, I stumbled upon a super fun new hobby: ",
            /* @__PURE__ */ jsx("strong", { className: "jsx-1495997836", children: "Drawing" }),
            ", especially ",
            /* @__PURE__ */ jsx("strong", { className: "jsx-1495997836", children: "Pixel Art" }),
            "! I've completely fallen for it—I was so hooked that last month I finally started learning how to draw it myself, and my journey to level up my skills officially began! 🎨"
          ] }),
          /* @__PURE__ */ jsx("p", { style: {
            marginBottom: "20px"
          }, className: "jsx-1495997836", children: "I'm also kicking off another little side project focusing on servers, and this site (or whatever you're looking at!) is one piece of that puzzle." }),
          /* @__PURE__ */ jsxs("p", { style: {
            margin: "0"
          }, className: "jsx-1495997836", children: [
            /* @__PURE__ */ jsx("strong", { className: "jsx-1495997836", children: "Thanks a ton for stopping by!" }),
            " I really hope you enjoy exploring. Happy browsing! 😄"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { style: {
        marginBottom: "60px"
      }, className: "jsx-1495997836", children: [
        /* @__PURE__ */ jsx("h2", { style: {
          fontSize: "32px",
          color: accentColor,
          marginBottom: "20px",
          borderBottom: `1px solid ${borderColor}`,
          paddingBottom: "10px"
        }, className: "jsx-1495997836", children: "Pixel Art Gallery" }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "20px"
        }, className: "jsx-1495997836", children: pixelArtGallery.map((art) => /* @__PURE__ */ jsxs("div", { style: {
          backgroundColor: cardColor,
          border: `1px solid ${borderColor}`,
          padding: "15px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          borderRadius: "12px"
        }, onMouseEnter: (e) => {
          e.currentTarget.style.borderColor = accentColor;
          e.currentTarget.style.backgroundColor = isDarkMode ? "#2a2a2a" : "#f0f0f0";
        }, onMouseLeave: (e) => {
          e.currentTarget.style.borderColor = borderColor;
          e.currentTarget.style.backgroundColor = cardColor;
        }, onClick: () => setSelectedArt(art), className: "jsx-1495997836", children: [
          /* @__PURE__ */ jsx("img", { src: art.url, alt: art.title, style: {
            width: "100%",
            height: "200px",
            objectFit: "cover",
            imageRendering: "pixelated",
            border: `1px solid ${borderColor}`,
            marginBottom: "10px"
          }, className: "jsx-1495997836" }),
          /* @__PURE__ */ jsx("h3", { style: {
            fontSize: "20px",
            margin: "0 0 5px 0",
            color: accentColor
          }, className: "jsx-1495997836", children: art.title }),
          /* @__PURE__ */ jsx("p", { style: {
            margin: "0",
            color: isDarkMode ? "#888" : "#666",
            fontSize: "14px"
          }, className: "jsx-1495997836", children: art.description })
        ] }, art.id)) }),
        /* @__PURE__ */ jsx("p", { style: {
          textAlign: "center",
          color: isDarkMode ? "#888" : "#666",
          fontStyle: "italic"
        }, className: "jsx-1495997836", children: "Click on any artwork to view it larger" })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "jsx-1495997836", children: [
        /* @__PURE__ */ jsx("h2", { style: {
          fontSize: "32px",
          color: accentColor,
          marginBottom: "20px",
          borderBottom: `1px solid ${borderColor}`,
          paddingBottom: "10px"
        }, className: "jsx-1495997836", children: "Get In Touch" }),
        /* @__PURE__ */ jsxs("div", { style: {
          backgroundColor: cardColor,
          color: textColor,
          padding: "30px",
          border: `1px solid ${borderColor}`,
          borderRadius: "12px",
          transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease"
        }, className: "jsx-1495997836", children: [
          /* @__PURE__ */ jsx("p", { style: {
            marginBottom: "20px"
          }, className: "jsx-1495997836", children: "Hey there! I'm still an amateur at pixel art, but if you're interested in a simple commission, I would genuinely be thrilled to help! I promise I won't charge you for straightforward requests :D. I'm also a huge gamer! If you ever want to add me, chat about games, or just find someone to play with, please feel free—my digital door is always wide open!" }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }, className: "jsx-1495997836", children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }, className: "jsx-1495997836", children: [
              /* @__PURE__ */ jsx("span", { style: {
                color: accentColor,
                minWidth: "80px"
              }, className: "jsx-1495997836", children: "Email:" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:starfallaegis@gmail.com", style: {
                color: isDarkMode ? "#888" : "#666",
                textDecoration: "none"
              }, onMouseEnter: (e) => e.target.style.color = accentColor, onMouseLeave: (e) => e.target.style.color = isDarkMode ? "#888" : "#666", className: "jsx-1495997836", children: "starfallaegis@gmail.com" })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }, className: "jsx-1495997836", children: [
              /* @__PURE__ */ jsx("span", { style: {
                color: accentColor,
                minWidth: "80px"
              }, className: "jsx-1495997836", children: "Discord:" }),
              /* @__PURE__ */ jsx("span", { style: {
                color: isDarkMode ? "#888" : "#666"
              }, className: "jsx-1495997836", children: "@aegis-plus" })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }, className: "jsx-1495997836", children: [
              /* @__PURE__ */ jsx("span", { style: {
                color: accentColor,
                minWidth: "80px"
              }, className: "jsx-1495997836", children: "Steam:" }),
              /* @__PURE__ */ jsx("a", { href: "https://steamcommunity.com/id/AegisPlus/", target: "_blank", rel: "noopener noreferrer", style: {
                color: isDarkMode ? "#888" : "#666",
                textDecoration: "none"
              }, onMouseEnter: (e) => e.target.style.color = accentColor, onMouseLeave: (e) => e.target.style.color = isDarkMode ? "#888" : "#666", className: "jsx-1495997836", children: "@Aegis+" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    selectedArt && /* @__PURE__ */ jsx("div", { style: {
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
      padding: "20px"
    }, onClick: () => setSelectedArt(null), className: "jsx-1495997836", children: /* @__PURE__ */ jsxs("div", { style: {
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
      transition: "background-color 0.3s ease"
    }, onClick: (e) => e.stopPropagation(), className: "jsx-1495997836", children: [
      /* @__PURE__ */ jsx("img", { src: selectedArt.url, alt: selectedArt.title, style: {
        maxWidth: "100%",
        maxHeight: "70vh",
        imageRendering: "pixelated",
        marginBottom: "20px"
      }, className: "jsx-1495997836" }),
      /* @__PURE__ */ jsx("h3", { style: {
        fontSize: "28px",
        margin: "0 0 10px 0",
        color: accentColor
      }, className: "jsx-1495997836", children: selectedArt.title }),
      /* @__PURE__ */ jsx("p", { style: {
        margin: "0 0 15px 0",
        color: isDarkMode ? "#888" : "#666",
        fontSize: "16px"
      }, className: "jsx-1495997836", children: selectedArt.description }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        gap: "10px"
      }, className: "jsx-1495997836", children: [
        /* @__PURE__ */ jsx("button", { onClick: goToPreviousArt, style: {
          backgroundColor: isDarkMode ? "#333" : "#eee",
          color: accentColor,
          border: `1px solid ${accentColor}`,
          padding: "10px 15px",
          cursor: "pointer",
          fontFamily: "monospace",
          transition: "all 0.3s ease"
        }, onMouseEnter: (e) => {
          e.target.style.backgroundColor = accentColor;
          e.target.style.color = "#000";
        }, onMouseLeave: (e) => {
          e.target.style.backgroundColor = isDarkMode ? "#333" : "#eee";
          e.target.style.color = accentColor;
        }, className: "jsx-1495997836", children: "← Previous" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setSelectedArt(null), style: {
          backgroundColor: isDarkMode ? "#333" : "#eee",
          color: accentColor,
          border: `1px solid ${accentColor}`,
          padding: "10px 20px",
          cursor: "pointer",
          fontFamily: "monospace",
          transition: "all 0.3s ease"
        }, onMouseEnter: (e) => {
          e.target.style.backgroundColor = accentColor;
          e.target.style.color = "#000";
        }, onMouseLeave: (e) => {
          e.target.style.backgroundColor = isDarkMode ? "#333" : "#eee";
          e.target.style.color = accentColor;
        }, className: "jsx-1495997836", children: "Close" }),
        /* @__PURE__ */ jsx("button", { onClick: goToNextArt, style: {
          backgroundColor: isDarkMode ? "#333" : "#eee",
          color: accentColor,
          border: `1px solid ${accentColor}`,
          padding: "10px 15px",
          cursor: "pointer",
          fontFamily: "monospace",
          transition: "all 0.3s ease"
        }, onMouseEnter: (e) => {
          e.target.style.backgroundColor = accentColor;
          e.target.style.color = "#000";
        }, onMouseLeave: (e) => {
          e.target.style.backgroundColor = isDarkMode ? "#333" : "#eee";
          e.target.style.color = accentColor;
        }, className: "jsx-1495997836", children: "Next →" })
      ] })
    ] }) }),
    showScrollTop && /* @__PURE__ */ jsx("button", { onAnimationEnd: handleAnimationEnd, style: {
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
      animation: isAnimatingOut ? "popOut 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
    }, onClick: scrollToTop, className: "jsx-1495997836", children: /* @__PURE__ */ jsx("span", { style: {
      fontSize: "24px",
      fontWeight: "bold"
    }, className: "jsx-1495997836", children: "↑" }) }),
    /* @__PURE__ */ jsx(_JSXStyle, { id: "1495997836", children: ["@-webkit-keyframes popIn{from{-webkit-transform:scale(0) rotate(-180deg);-ms-transform:scale(0) rotate(-180deg);transform:scale(0) rotate(-180deg);opacity:0;}to{-webkit-transform:scale(1) rotate(0deg);-ms-transform:scale(1) rotate(0deg);transform:scale(1) rotate(0deg);opacity:1;}}", "@keyframes popIn{from{-webkit-transform:scale(0) rotate(-180deg);-ms-transform:scale(0) rotate(-180deg);transform:scale(0) rotate(-180deg);opacity:0;}to{-webkit-transform:scale(1) rotate(0deg);-ms-transform:scale(1) rotate(0deg);transform:scale(1) rotate(0deg);opacity:1;}}", "@-webkit-keyframes popOut{from{-webkit-transform:scale(1) rotate(0deg);-ms-transform:scale(1) rotate(0deg);transform:scale(1) rotate(0deg);opacity:1;}to{-webkit-transform:scale(0) rotate(-180deg);-ms-transform:scale(0) rotate(-180deg);transform:scale(0) rotate(-180deg);opacity:0;}}", "@keyframes popOut{from{-webkit-transform:scale(1) rotate(0deg);-ms-transform:scale(1) rotate(0deg);transform:scale(1) rotate(0deg);opacity:1;}to{-webkit-transform:scale(0) rotate(-180deg);-ms-transform:scale(0) rotate(-180deg);transform:scale(0) rotate(-180deg);opacity:0;}}"] })
  ] });
}

const page = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(HomePage, {
      ...props
    })
  });
});

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: 'Module' }));

async function loader({
  params
}) {
  const matches = await fg("src/**/page.{js,jsx,ts,tsx}");
  return {
    path: `/${params["*"]}`,
    pages: matches.sort((a, b) => a.length - b.length).map(match => {
      const url = match.replace("src/app", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "") || "/";
      const path = url.replaceAll("[", "").replaceAll("]", "");
      const displayPath = path === "/" ? "Homepage" : path;
      return {
        url,
        path: displayPath
      };
    })
  };
}
const notFound = UNSAFE_withComponentProps(function CreateDefaultNotFoundPage({
  loaderData
}) {
  const [siteMap, setSitemap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      const handler = event => {
        if (event.data.type === "sandbox:sitemap") {
          window.removeEventListener("message", handler);
          setSitemap(event.data.sitemap);
        }
      };
      window.parent.postMessage({
        type: "sandbox:sitemap"
      }, "*");
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    }
  }, []);
  const missingPath = loaderData.path.replace(/^\//, "");
  const existingRoutes = loaderData.pages.map(page => ({
    path: page.path,
    url: page.url
  }));
  const handleBack = () => {
    navigate("/");
  };
  const handleSearch = value => {
    if (!siteMap) {
      const path = `/${value}`;
      navigate(path);
    } else {
      navigate(value);
    }
  };
  const handleCreatePage = useCallback(() => {
    window.parent.postMessage({
      type: "sandbox:web:create",
      path: missingPath,
      view: "web"
    }, "*");
  }, [missingPath]);
  return /* @__PURE__ */jsxs("div", {
    className: "flex sm:w-full w-screen sm:min-w-[850px] flex-col",
    children: [/* @__PURE__ */jsxs("div", {
      className: "flex w-full items-center gap-2 p-5",
      children: [/* @__PURE__ */jsx("button", {
        type: "button",
        onClick: handleBack,
        className: "flex items-center justify-center w-10 h-10 rounded-md",
        children: /* @__PURE__ */jsxs("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "Back",
          role: "img",
          children: [/* @__PURE__ */jsx("path", {
            d: "M8.5957 2.65435L2.25005 9L8.5957 15.3457",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), /* @__PURE__ */jsx("path", {
            d: "M2.25007 9L15.75 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })]
        })
      }), /* @__PURE__ */jsxs("div", {
        className: "flex flex-row divide-x divide-gray-200 rounded-[8px] h-8 w-[300px] border border-gray-200 bg-gray-50 text-gray-500",
        children: [/* @__PURE__ */jsx("div", {
          className: "flex items-center px-[14px] py-[5px]",
          children: /* @__PURE__ */jsx("span", {
            children: "/"
          })
        }), /* @__PURE__ */jsx("div", {
          className: "flex items-center min-w-0",
          children: /* @__PURE__ */jsx("p", {
            className: "border-0 bg-transparent px-3 py-2 focus:outline-none truncate max-w-[300px]",
            style: {
              minWidth: 0
            },
            title: missingPath,
            children: missingPath
          })
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "flex flex-grow flex-col items-center justify-center pt-[100px] text-center gap-[20px]",
      children: [/* @__PURE__ */jsx("h1", {
        className: "text-4xl font-medium text-gray-900 px-2",
        children: "Uh-oh! This page doesn't exist (yet)."
      }), /* @__PURE__ */jsxs("p", {
        className: "pt-4 pb-12 px-2 text-gray-500",
        children: ['Looks like "', /* @__PURE__ */jsxs("span", {
          className: "font-bold",
          children: ["/", missingPath]
        }), `" isn't part of your project. But no worries, you've got options!`]
      }), /* @__PURE__ */jsx("div", {
        className: "px-[20px] w-full",
        children: /* @__PURE__ */jsxs("div", {
          className: "flex flex-row justify-center items-center w-full max-w-[800px] mx-auto border border-gray-200 rounded-lg p-[20px] mb-[40px] gap-[20px]",
          children: [/* @__PURE__ */jsxs("div", {
            className: "flex flex-col gap-[5px] items-start self-start w-1/2",
            children: [/* @__PURE__ */jsx("p", {
              className: "text-sm text-black text-left",
              children: "Build it from scratch"
            }), /* @__PURE__ */jsxs("p", {
              className: "text-sm text-gray-500 text-left",
              children: ['Create a new page to live at "', /* @__PURE__ */jsxs("span", {
                children: ["/", missingPath]
              }), '"']
            })]
          }), /* @__PURE__ */jsx("div", {
            className: "flex flex-row items-center justify-end w-1/2",
            children: /* @__PURE__ */jsx("button", {
              type: "button",
              className: "bg-black text-white px-[10px] py-[5px] rounded-md",
              onClick: () => handleCreatePage(),
              children: "Create Page"
            })
          })]
        })
      }), /* @__PURE__ */jsx("div", {
        className: "pb-20 lg:pb-[80px]",
        children: /* @__PURE__ */jsx("p", {
          className: "flex items-center text-gray-500",
          children: "Check out all your project's routes here ↓"
        })
      }), siteMap ? /* @__PURE__ */jsx("div", {
        className: "flex flex-col justify-center items-center w-full px-[50px]",
        children: /* @__PURE__ */jsxs("div", {
          className: "flex flex-col justify-between items-center w-full max-w-[600px] gap-[10px]",
          children: [/* @__PURE__ */jsx("p", {
            className: "text-sm text-gray-300 pb-[10px] self-start p-4",
            children: "PAGES"
          }), siteMap.webPages?.map(route => /* @__PURE__ */jsxs("button", {
            type: "button",
            onClick: () => handleSearch(route.cleanRoute || ""),
            className: "flex flex-row justify-between text-center items-center p-4 rounded-lg bg-white shadow-sm w-full hover:bg-gray-50",
            children: [/* @__PURE__ */jsx("h3", {
              className: "font-medium text-gray-900",
              children: route.name
            }), /* @__PURE__ */jsx("p", {
              className: "text-sm text-gray-400",
              children: route.cleanRoute
            })]
          }, route.id))]
        })
      }) : /* @__PURE__ */jsx("div", {
        className: "flex flex-wrap gap-3 w-full max-w-[80rem] mx-auto pb-5 px-2",
        children: existingRoutes.map(route => /* @__PURE__ */jsx("div", {
          className: "flex flex-col flex-grow basis-full sm:basis-[calc(50%-0.375rem)] xl:basis-[calc(33.333%-0.5rem)]",
          children: /* @__PURE__ */jsxs("div", {
            className: "w-full flex-1 flex flex-col items-center ",
            children: [/* @__PURE__ */jsx("div", {
              className: "relative w-full max-w-[350px] h-48 sm:h-56 lg:h-64 overflow-hidden rounded-[8px] border border-comeback-gray-75 transition-all group-hover:shadow-md",
              children: /* @__PURE__ */jsx("button", {
                type: "button",
                onClick: () => handleSearch(route.url.replace(/^\//, "")),
                className: "h-full w-full rounded-[8px] bg-gray-50 bg-cover"
              })
            }), /* @__PURE__ */jsx("p", {
              className: "pt-3 text-left text-gray-500 w-full max-w-[350px]",
              children: route.path
            })]
          })
        }, route.path))
      })]
    })]
  });
});

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: notFound,
  loader
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-BAZVAT42.js','imports':['/assets/chunk-UIGDSWPH-C9B0A0en.js','/assets/index-wpv8WFMF.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':true,'module':'/assets/root-Dh8OoV_J.js','imports':['/assets/chunk-UIGDSWPH-C9B0A0en.js','/assets/index-wpv8WFMF.js','/assets/index-yF3fMKpO.js'],'css':['/assets/root-Coc1wC6S.css'],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'page':{'id':'page','parentId':'root','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-DWp0chHN.js','imports':['/assets/index-yF3fMKpO.js','/assets/chunk-UIGDSWPH-C9B0A0en.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'__create/not-found':{'id':'__create/not-found','parentId':'root','path':'*?','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/not-found-ONVX1Aky.js','imports':['/assets/index-yF3fMKpO.js','/assets/chunk-UIGDSWPH-C9B0A0en.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-d778364c.js','version':'d778364c','sri':undefined};

const assetsBuildDirectory = "build\\client";
      const basename = "/";
      const future = {"v8_middleware":false,"unstable_optimizeDeps":false,"unstable_splitRouteModules":false,"unstable_subResourceIntegrity":false,"unstable_viteEnvironmentApi":false};
      const ssr = true;
      const isSpaMode = false;
      const prerender = ["/"];
      const routeDiscovery = {"mode":"lazy","manifestPath":"/__manifest"};
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "page": {
          id: "page",
          parentId: "root",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route1
        },
  "__create/not-found": {
          id: "__create/not-found",
          parentId: "root",
          path: "*?",
          index: undefined,
          caseSensitive: undefined,
          module: route2
        }
      };

export { serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
