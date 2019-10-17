package actions

import (
	"github.com/gobuffalo/buffalo/render"
	"github.com/gobuffalo/packr/v2"
)

var r *render.Engine
var assetsBox = packr.New("app:assets", "../public/assets")

func init() {
	r = render.New(render.Options{
		// DefaultContentType: "application/json",

		TemplatesBox: packr.New("app:templates", "../templates"),
		AssetsBox:    assetsBox,
	})
}
