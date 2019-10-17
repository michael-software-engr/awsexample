package actions

import (
    "github.com/gobuffalo/buffalo"

    "github.com/michael-software-engr/awsexample/models"
)

// TodoHandler is a default handler to serve up
// the front end.
func TodoHandler(c buffalo.Context) error {
    todoes := []models.Todo{}
    err := models.DB.All(&todoes)
    if err != nil { panic(err) }

    return c.Render(200, r.JSON(todoes))
    // return c.Render(200, r.JSON(
    //     map[string]string{
    //         "status": "ok",
    //         "msg": "JSON test",
    //     },
    // ))
    // return c.Render(200, r.String("Test string"))
	// return c.Render(200, r.HTML("index.html"))
}
