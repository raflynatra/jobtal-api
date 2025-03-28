import { app } from "./application";
import { PORT } from "./constants";

app.listen(PORT, () =>
  console.log(`[server] server running on http://localhost:${PORT}`)
);
