package actions

import (
    "fmt"
    "os"
    "strings"

    "github.com/gobuffalo/buffalo"
    "github.com/rs/cors"
)

type appCorsType struct {
    AllowedOrigins []string
    AllowedOriginsTable map[string]int
}

func (appCors *appCorsType) Config() *cors.Cors {
    appCors.AllowedOriginsTable = populateOriginsTable(appCors.AllowedOrigins)

    return cors.New(cors.Options{
        AllowedOrigins: appCors.AllowedOrigins,
        // AllowCredentials: true,
        // Enable Debugging for testing, consider disabling in production
        Debug: true,
    })
}

func (appCors *appCorsType) Middleware(next buffalo.Handler) buffalo.Handler {
    if len(appCors.AllowedOriginsTable) == 0 {
        appCors.AllowedOriginsTable = populateOriginsTable(appCors.AllowedOrigins)
    }

    return func(c buffalo.Context) error {
        origin := strings.TrimSpace(c.Request().Header.Get("Origin"))

        if origin != "" {
            if _, ok := appCors.AllowedOriginsTable[origin]; ok {
                return next(c)
            }

            panic("")
        }

        port := strings.TrimSpace(os.Getenv("PORT"))
        if port == "" {
            port = "3000"
        }
        host := strings.TrimSpace(c.Request().Host)
        if host == fmt.Sprintf("localhost:%s", port) {
            return next(c)
        }

        panic("")
    }
}

func populateOriginsTable(origins []string) map[string]int {
    table := map[string]int{}
    for _, origin := range origins {
        table[origin]++
    }

    return table
}
