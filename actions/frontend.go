package actions

import "github.com/gobuffalo/buffalo"

// FrontEndHandler is a default handler to serve up
// the front end.
func FrontEndHandler(c buffalo.Context) error {
	return c.Render(200, r.HTML("index.html"))
}
