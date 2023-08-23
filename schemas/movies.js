const z = require("zod");
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Title must be a string",
    required_error: "Movie title is required",
  }),
  year: z.number().int().min(1900).max(2024),
  genre: z.array(
    z.enum([
      "action",
      "comedy",
      "drama",
      "horror",
      "romance",
      "thriller",
      "western",
      "documentary",
    ]),
    {
      required_error: "Movie genre is required",
      invalid_type_error: "Movie genre must be an array of enum Genre",
    },
  ),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: "Poster must be a valid url",
  }),
});

function validateMovie(movie) {
  return movieSchema.safeParse(movie);
}

function validatePartialMovie(movie) {
  return movieSchema.partial().safeParse(movie);
}

module.exports = { validateMovie, validatePartialMovie };
