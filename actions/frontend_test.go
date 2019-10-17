package actions

func (as *ActionSuite) Test_FrontEndHandler() {
	res := as.JSON("/").Get()

	as.Equal(200, res.Code)
	as.Contains(res.Body.String(), "Welcome to Buffalo")
}
