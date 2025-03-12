import { web } from "./application/web";
import { PORT } from "./constants";

web.listen(PORT, () =>
  console.log(`[server] server running on http://localhost:${PORT}`)
);
