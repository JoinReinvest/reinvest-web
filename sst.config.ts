import { SSTConfig } from "sst"
import { NextJsApp } from "./stacks/NextJsApp"

export default {
    config (_input) {
        return {
            name: "reinvest-web",
            region: "us-east-1",
        }
    },
    stacks (app) {
        app.stack(NextJsApp)
    },
} satisfies SSTConfig
