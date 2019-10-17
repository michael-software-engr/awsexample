package grifts

import (
	"github.com/gobuffalo/buffalo"
	"github.com/michael-software-engr/awsexample/actions"
)

func init() {
	buffalo.Grifts(actions.App())
}
