package controllers

import (
	"goadmin/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Upload(c *fiber.Ctx) error {
	if err := middlewares.IsAuthorized(c, "products"); err != nil {
		return err
	}
	form, err := c.MultipartForm()

	if err != nil {
		return err
	}

	files := form.File["image"]
	filename := ""

	for _, file := range files {
		filename := file.Filename

		if err := c.SaveFile(file, "./uploads/"+filename); err != nil {
			return err
		}
	}

	return c.JSON(fiber.Map{
		"url": "http://127.0.0.1:8000/api/uploads/" + filename,
	})
}
