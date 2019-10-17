package grifts

import (
    "fmt"
    "time"

	"github.com/markbates/grift/grift"

    "github.com/michael-software-engr/awsexample/models"
)

var _ = grift.Namespace("db", func() {

	grift.Desc("seed", "Seeds a database")
	grift.Add("seed", func(c *grift.Context) error {
		// Add DB seeding stuff here
		return nil
	})

    grift.Desc("seed:reset", "... reset-seeds a database")
    grift.Add("seed:reset", func(c *grift.Context) error {
        // ... START
        todoes := []models.Todo{}
        err := models.DB.All(&todoes)
        if err != nil { panic(err) }
        gotCount := len(todoes)
        fmt.Printf("... todoes found: %#v\n", gotCount)

        if gotCount > 0 {
            for _, todo := range todoes {
                err = models.DB.Destroy(&todo)
                if err != nil { panic(err) }
            }
        }

        now := time.Now()
        deadline := now.AddDate(0, 0, 5)

        data := [][]string{
            []string{"Eggs", "Buy eggs", "groceries"},
            []string{"Lamb", "Cook lamb", "groceries"},
            []string{"Car oil", "Change car oil", "automotive"},
            []string{"Mail", "Get mail", "communications"},
            []string{"Relax", "Rest", "miscellaneous"},
        }

        for _, record := range data {
            todo := &models.Todo{
                Title: record[0],
                Description: record[1],
                Category: record[2],
                Deadline: deadline,
            }

            vErrors, err := models.DB.ValidateAndCreate(todo)
            if err != nil {
                fmt.Errorf("... vErrors, err...\n%#v\n%#v", vErrors, err)
            }
        }

        todoes = []models.Todo{}
        err = models.DB.All(&todoes)
        if err != nil { panic(err) }

        expCount := len(data)
        gotCount = len(todoes)

        if gotCount != expCount {
            panic(fmt.Errorf("... got count '%d' != exp count '%d'", gotCount, expCount))
        }

        for _, todo := range todoes {
            fmt.Println(todo)
            fmt.Println()
        }

        // ... END

        return nil
    })

})
