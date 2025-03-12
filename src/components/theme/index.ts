import { createSystem, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
    theme: {
    }   
});

const theme = createSystem(config);

export default theme;