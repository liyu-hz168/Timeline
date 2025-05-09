package main

import (
	"log/slog"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
)

const (
	DATABASE_HOSTNAME = "http://localhost:8081" // Database microservice URL
	FILES_HOSTNAME    = "http://localhost:8082" // Files/assets microservice URL
	PORT              = "8080"                  // API gateway port
)

func main() {
 slog.SetDefault(slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
  Level: slog.LevelInfo,
 })))
 slog.Info("Starting API Gateway server...")

 // Get service hostnames from environment variables if available
 databaseHost := os.Getenv("DATABASE_HOSTNAME")
 if databaseHost == "" {
  databaseHost = DATABASE_HOSTNAME
 }

 filesHost := os.Getenv("FILES_HOSTNAME")
 if filesHost == "" {
  filesHost = FILES_HOSTNAME
 }

 // Create reverse proxies for each microservice
 databaseProxy := createReverseProxy(databaseHost)
 filesProxy := createReverseProxy(filesHost)

 // Create main router
 mainMux := http.NewServeMux()

 // Route /api/database requests to database microservice
 mainMux.HandleFunc("/api/database/", func(w http.ResponseWriter, r *http.Request) {
  slog.Info("Forwarding database request",
   "method", r.Method,
   "path", r.URL.Path,
   "destination", databaseHost)
  databaseProxy.ServeHTTP(w, r)
 })

 // Route /api/assets requests to files microservice
 mainMux.HandleFunc("/api/assets/", func(w http.ResponseWriter, r *http.Request) {
  slog.Info("Forwarding assets request",
   "method", r.Method,
   "path", r.URL.Path,
   "destination", filesHost)
  filesProxy.ServeHTTP(w, r)
 })

 // Default route
 mainMux.HandleFunc("/", handleDefault)

 // Start server
 port := os.Getenv("PORT")
 if port == "" {
  port = PORT
 }

 slog.Info("API Gateway is running",
  "port", port,
  "database_service", databaseHost,
  "files_service", filesHost)

 if err := http.ListenAndServe(":"+port, mainMux); err != nil {
  slog.Error("Failed to start API Gateway", "error", err)
  os.Exit(1)
 }
}

// createReverseProxy creates a reverse proxy handler for a target URL
func createReverseProxy(targetURL string) *httputil.ReverseProxy {
 url, err := url.Parse(targetURL)
 if err != nil {
  slog.Error("Failed to parse target URL", "url", targetURL, "error", err)
  os.Exit(1)
 }

 proxy := httputil.NewSingleHostReverseProxy(url)

 originalDirector := proxy.Director
 proxy.Director = func(req *http.Request) {
  originalDirector(req)

  // Keeping the original path but changing the host
  // The path is preserved since we're only proxying specific path patterns
  req.URL.Scheme = url.Scheme
  req.URL.Host = url.Host
  req.Host = url.Host

  // Add additional headers if needed
  if _, ok := req.Header["User-Agent"]; !ok {
   req.Header.Set("User-Agent", "API-Gateway")
  }
 }

 // Add error handler
 proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
  slog.Error("Proxy error",
   "path", r.URL.Path,
   "method", r.Method,
   "error", err)
  http.Error(w, "Service Unavailable", http.StatusServiceUnavailable)
 }

 return proxy
}

// Default handler for unmatched routes
func handleDefault(w http.ResponseWriter, r *http.Request) {
 if r.URL.Path == "/" {
  w.Header().Set("Content-Type", "text/html")
  w.Write([]byte("<html><body><h1>Timeline API Gateway</h1><p>Welcome to the Timeline API gateway! The following endpoints are available:</p><ul><li><a href='/api/database/'>/api/database/</a> - Database operations</li><li><a href='/api/assets/'>/api/assets/</a> - Asset operations</li></ul></body></html>"))
  return
 }

 // Return 404 for any other routes
 http.NotFound(w, r)
}